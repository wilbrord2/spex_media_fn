"use server";

import { cookies } from "next/headers";
import { revalidatePath, revalidateTag } from "next/cache";
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

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const safeRevalidate = (tag: string) =>
  (revalidateTag as (t: string) => void)(tag);

async function getAuthHeader(): Promise<Record<string, string>> {
  const token = (await cookies()).get("auth_token")?.value;
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// --- 1. CONTENT CORE (Public & Protected) ---

// scopes: 'public' for general feed, 'author' for private dashboard
export async function getContentList(
  page: number = 1,
  scope: "public" | "author" = "public",
): Promise<ContentListRes | null> {
  // 1. Determine the endpoint based on scope
  const endpoint =
    scope === "author" ? "/content/content-by-author" : "/content";

  // 2. Only get Auth headers if it's the author's private list
  const headers = scope === "author" ? await getAuthHeader() : {};

  try {
    const res = await fetch(`${API_BASE_URL}${endpoint}?page=${page}`, {
      headers,
      next: { tags: [scope === "author" ? "author-content" : "content-list"] },
      cache: scope === "author" ? "no-store" : "force-cache",
    });

    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error(`Error fetching ${scope} content:`, error);
    return null;
  }
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

export async function deleteContent(
  id: number,
): Promise<{ success: boolean; message: string }> {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/content/${id}`, {
      method: "DELETE",
      headers,
    });

    console.log(`Delete Content Status: ${res.status}`);

    if (res.ok) {
      revalidatePath("/dashboard/magazine");
      return {
        success: true,
        message: "Content deleted successfully.",
      };
    }

    // Try to parse error message from API, fallback to status text
    const errorText = await res.text();
    let errorMessage = "Failed to delete content.";

    try {
      const parsedError = JSON.parse(errorText);
      errorMessage = parsedError.message || errorMessage;
    } catch {
      errorMessage = errorText || `Error: ${res.statusText}`;
    }

    console.error(`Failed to delete content ${id}:`, errorText);
    return { success: false, message: errorMessage };
  } catch (error) {
    console.error("Server Action Error (deleteContent):", error);
    return {
      success: false,
      message: "A network error occurred. Please try again.",
    };
  }
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
  const categories = await res.json();
  console.log(categories);
  return res.ok ? categories : [];
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
  console.log(data);

  const res = await fetch(`${API_BASE_URL}/admin/content-categories`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });
  console.log(`Create Category Status: ${res.status}`);
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

export async function reviewArticle(
  id: number,
  data: { status: "APPROVED" | "REJECTED"; comment: string },
) {
  try {
    const token = (await cookies()).get("auth_token")?.value;

    if (!token) {
      console.error("Review Article: No authentication token found");
      return false;
    }

    const res = await fetch(`${API_BASE_URL}/admin/content/${id}/review`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      // Log the specific status and error message from the API
      const errorText = await res.text();
      console.error(`Review Article Error (${res.status}):`, errorText);
      return false;
    }

    revalidatePath("/dashboard/magazine");
    return true;
  } catch (error) {
    // Catch network failures or parsing errors
    console.error("Review Article Exception:", error);
    return false;
  }
}

export async function addContentCategory(data: {
  name: string;
  description: string;
}) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/content-categories`, {
      method: "POST",
      headers: await getAuthHeader(),
      body: JSON.stringify(data),
    });

    const contentType = res.headers.get("content-type");
    let responseBody: any = null;

    // Try to parse backend response safely
    if (contentType?.includes("application/json")) {
      responseBody = await res.json();
    } else {
      responseBody = await res.text();
    }

    console.log("Add Content Category Request:", data);
    console.log("Status:", res.status);
    console.log("Response:", responseBody);

    if (!res.ok) {
      // Backend error (4xx / 5xx)
      return {
        success: false,
        status: res.status,
        message:
          responseBody?.message ||
          responseBody?.error ||
          "Failed to create content category",
        raw: responseBody,
      };
    }

    // Success
    revalidatePath("/create-content");

    return {
      success: true,
      status: res.status,
      data: responseBody,
    };
  } catch (error: any) {
    // Network / runtime error
    console.error("Add Content Category Error:", error);

    return {
      success: false,
      status: 0,
      message: "Network error or server unreachable",
      error: error?.message || error,
    };
  }
}

export async function deleteContentCategory(id: number) {
  const res = await fetch(`${API_BASE_URL}/admin/content-categories/${id}`, {
    method: "DELETE",
    headers: await getAuthHeader(),
  });
  if (res.ok) revalidatePath("/create-content");
  return res.ok;
}
