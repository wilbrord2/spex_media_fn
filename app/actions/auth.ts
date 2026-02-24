"use server";

import {
  SignUpSchema,
  SignInSchema,
  VerifyEmailSchema,
  SignUpResDto,
  SignInResDto,
} from "@/lib/dto";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

export interface User {
  id: number;
  name: string;
  email: string;
  role?: string;
  phone?: string;
  address?: string;
  company?: string;
  imageUrl?: string;
  is_account_verified?: boolean;
}

interface ErrorResponse {
  error: true;
  message: string;
}

// Helper to decode JWT payload without a library
function getJwtPayload(token: string) {
  try {
    return JSON.parse(Buffer.from(token.split(".")[1], "base64").toString());
  } catch {
    return null;
  }
}

function getTokenMaxAge(token: string): number | undefined {
  try {
    const payload = JSON.parse(
      Buffer.from(token.split(".")[1], "base64").toString(),
    );
    if (payload.exp) {
      return payload.exp - Math.floor(Date.now() / 1000);
    }
  } catch (e) {
    return undefined;
  }
}

export async function getUser(): Promise<User | null> {
  const token = (await cookies()).get("auth_token")?.value;
  if (!token) return null;
  const payload = getJwtPayload(token);
  try {
    const response = await fetch(`${API_BASE_URL}/users/user`, {
      headers: { Authorization: `Bearer ${token}` },
      next: { revalidate: 0, tags: ["user-profile"] },
    });

    if (response.status === 401) {
      await logout(); // Auto-clear cookies if token is invalid
      return null;
    }

    if (!response.ok) return null;
    const userData = await response.json();

    // Merge API data with the role from the token
    return {
      ...userData,
      role: payload?.role || "USER",
    };
  } catch {
    return null;
  }
}

export async function logout() {
  (await cookies()).delete("auth_token");
  redirect("/auth");
}

export async function registerUser(
  formData: FormData,
): Promise<SignUpResDto | ErrorResponse> {
  const rawData = Object.fromEntries(formData);
  const result = SignUpSchema.safeParse(rawData);

  if (!result.success) {
    return { error: true, message: result.error.issues[0].message };
  }

  const response = await fetch(`${API_BASE_URL}/auth/signup`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.data),
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: true, message: data.message || "Registration failed" };
  }

  if (data.verifyEmailToken) {
    (await cookies()).set("verify_email_token", data.verifyEmailToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getTokenMaxAge(data.verifyEmailToken) || 900,
      path: "/",
    });
  }

  return data;
}

export async function loginUser(
  formData: FormData,
): Promise<SignInResDto | ErrorResponse> {
  const rawData = Object.fromEntries(formData);
  const result = SignInSchema.safeParse(rawData);

  if (!result.success) {
    return { error: true, message: result.error.issues[0].message };
  }

  const response = await fetch(`${API_BASE_URL}/auth/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(result.data),
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: true, message: data.message || "Invalid credentials" };
  }

  (await cookies()).set("auth_token", data.accessToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: getTokenMaxAge(data.accessToken),
    path: "/",
  });

  return data;
}

export async function verifyEmail(
  code: string,
): Promise<SignInResDto | ErrorResponse> {
  const result = VerifyEmailSchema.safeParse({ code });
  const cookieStore = await cookies();
  const verifyEmailToken = cookieStore.get("verify_email_token")?.value;

  if (!verifyEmailToken) {
    return { error: true, message: "Verification session expired." };
  }

  if (!result.success) {
    return { error: true, message: result.error.issues[0].message };
  }

  const response = await fetch(`${API_BASE_URL}/auth/verify-email`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${verifyEmailToken}`,
    },
    body: JSON.stringify({ code }),
  });

  const data = await response.json();

  if (!response.ok) {
    return { error: true, message: data.message || "Verification failed" };
  }

  cookieStore.delete("verify_email_token");

  if (data.accessToken) {
    cookieStore.set("auth_token", data.accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: getTokenMaxAge(data.accessToken),
      path: "/",
    });
  }

  return data;
}
