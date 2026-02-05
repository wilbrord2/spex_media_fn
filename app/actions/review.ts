"use server";

import { cookies } from "next/headers";
import { revalidateTag } from "next/cache";
import {
  Category,
  CategoryInput,
  ContentItem,
  ContentListRes,
  AnalyticsRes,
  CommentInput,
  CommentRes,
  RatingInput,
  RatingRes,
  AdminReviewInput,
} from "@/lib/dto";

const API_BASE_URL = "http://194.163.164.211:3001/api/v1";

const safeRevalidate = (tag: string) =>
  (revalidateTag as (t: string) => void)(tag);

async function getAuthHeader(): Promise<Record<string, string>> {
  const token = (await cookies()).get("auth_token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// --- 1. CONTENT CORE (Public & Protected) ---

export async function getContentList(
  page: number = 1,
): Promise<ContentListRes | null> {
  const res = await fetch(`${API_BASE_URL}/content?page=${page}`, {
    next: { tags: ["content-list"] },
  });
  return res.ok ? await res.json() : null;
}

export async function getContentById(id: number): Promise<ContentItem | null> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/content/${id}`, {
    next: { tags: [`content-${id}`] },
    headers,
  });

  const result = await res.json();

  return res.ok ? await result : null;
}

export async function createContent(
  formData: FormData,
): Promise<ContentItem | { error: boolean }> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/content`, {
    method: "POST",
    headers,
    body: formData,
  });
  if (res.ok) safeRevalidate("content-list");
  return res.ok ? await res.json() : { error: true };
}

export async function updateContent(
  id: number,
  formData: FormData,
): Promise<ContentItem | { error: boolean }> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/content/${id}`, {
    method: "PATCH",
    headers,
    body: formData,
  });
  if (res.ok) {
    safeRevalidate(`content-${id}`);
    safeRevalidate("content-list");
  }
  return res.ok ? await res.json() : { error: true };
}

export async function deleteContent(id: number): Promise<boolean> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/content/${id}`, {
    method: "DELETE",
    headers,
  });
  if (res.ok) safeRevalidate("content-list");
  return res.status === 204;
}

// --- 2. COMMENTS ---

export async function getComments(id: number): Promise<CommentRes[]> {
  const res = await fetch(`${API_BASE_URL}/content/${id}/comments`, {
    next: { tags: [`comments-${id}`] },
  });
  return res.ok ? await res.json() : [];
}

export interface BackendError {
  message: string;
  statusCode: number;
  error: string;
}

export async function postComment(
  id: number,
  data: CommentInput,
): Promise<CommentRes | BackendError> {
  const res = await fetch(`${API_BASE_URL}/content/${id}/comments`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  const payload = await res.json();
  if (res.ok) {
    safeRevalidate(`comments-${id}`);
    return payload as CommentRes;
  }
  return payload as BackendError;
}

// --- 3. RATINGS ---

export async function getRatings(id: number): Promise<RatingRes[]> {
  const res = await fetch(`${API_BASE_URL}/content/${id}/ratings`, {
    next: { tags: [`ratings-${id}`] },
  });
  return res.ok ? await res.json() : [];
}

export async function postRating(
  id: number,
  data: RatingInput,
): Promise<RatingRes | { error: boolean }> {
  const res = await fetch(`${API_BASE_URL}/content/${id}/ratings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) safeRevalidate(`ratings-${id}`);
  return res.ok ? await res.json() : { error: true };
}

// --- 4. ADMIN CATEGORIES ---

export async function getCategories(): Promise<Category[]> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/admin/content-categories`, {
    headers,
    next: { tags: ["categories"] },
  });
  return res.ok ? await res.json() : [];
}

export async function getCategoryById(id: number): Promise<Category | null> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/admin/content-categories/${id}`, {
    headers,
  });
  return res.ok ? await res.json() : null;
}

export async function createCategory(
  data: CategoryInput,
): Promise<Category | { error: boolean }> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/admin/content-categories`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) safeRevalidate("categories");
  return res.ok ? await res.json() : { error: true };
}

export async function updateCategory(
  id: number,
  data: CategoryInput,
): Promise<Category | { error: boolean }> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/admin/content-categories/${id}`, {
    method: "PATCH",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) safeRevalidate("categories");
  return res.ok ? await res.json() : { error: true };
}

export async function deleteCategory(id: number): Promise<boolean> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/admin/content-categories/${id}`, {
    method: "DELETE",
    headers,
  });
  if (res.ok) safeRevalidate("categories");
  return res.status === 204;
}

// --- 5. ADMIN REVIEW & ANALYTICS ---

export async function getAnalytics(id: number): Promise<AnalyticsRes | null> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/content/${id}/analytics`, {
    headers,
  });
  return res.ok ? await res.json() : null;
}

export async function adminReviewContent(
  id: number,
  data: AdminReviewInput,
): Promise<ContentItem | { error: boolean }> {
  const headers = await getAuthHeader();
  const res = await fetch(`${API_BASE_URL}/admin/content/${id}/review`, {
    method: "PATCH",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  if (res.ok) {
    safeRevalidate(`content-${id}`);
    safeRevalidate("content-list");
  }
  return res.ok ? await res.json() : { error: true };
}
