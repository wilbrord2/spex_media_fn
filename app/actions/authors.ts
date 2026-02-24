"use server";

import { cookies } from "next/headers";

export type UserRole = "admin" | "author" | "content_provider";
export type VerificationStatus = "APPROVED" | "PENDING" | "REJECTED";

export interface Author {
  id: number;
  name: string;
  phone: string;
  email: string;
  role: UserRole | string;
  verification_status: VerificationStatus | string;
  created_at: string;
  is_account_verified: boolean;
  verifiedAt: string | null;
  archived_date: string | null;
}

export interface AuthorResponse {
  userInfoList: Author[];
  page: number;
  take: number;
  totalUsers: number;
  pageCount: number;
  hasNextPage: boolean;
}

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

interface FetchAuthorsParams {
  page?: number;
  search?: string;
  status?: string;
  sorting?: string;
  searchOptions?: string;
}

export async function getAuthorsList({
  page = 1,
  search = "",
  status = "All",
  sorting = "newest",
  searchOptions = "All",
}: FetchAuthorsParams): Promise<AuthorResponse | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  const sortingOptions = sorting === "newest" ? "DESC" : "ASC";

  const queryParams = new URLSearchParams({
    page: page.toString(),
    searchOptions: searchOptions,
    searchTerm: search,
    statusOptions: status || "All",
    sortingOptions: sortingOptions,
  });

  console.log({ queryParams });

  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/list-available-signups?${queryParams}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );
    console.log(response);

    if (!response.ok) throw new Error("Failed to fetch authors");

    return await response.json();
  } catch (error) {
    console.error("Server Action Error:", error);
    return null;
  }
}

export async function approveAuthor(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  try {
    const response = await fetch(
      `${API_BASE_URL}/admin/signups/${id}/approve`,
      {
        method: "PATCH",
        headers: { Authorization: `Bearer ${token}` },
      },
    );
    return response.ok;
  } catch (error) {
    return false;
  }
}

export async function rejectAuthor(id: number) {
  const cookieStore = await cookies();
  const token = cookieStore.get("auth_token")?.value;

  try {
    const response = await fetch(`${API_BASE_URL}/admin/signups/${id}/reject`, {
      method: "PATCH",
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.ok;
  } catch (error) {
    return false;
  }
}
