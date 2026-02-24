"use server";

import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// --- Interfaces from Documentation ---

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface Book {
  id: number;
  title: string;
  authorName: string;
  categoryId: number;
  category: Category;
  primaryRegion: string;
  description: string;
  numberOfPages: number;
  releaseDate: string;
  numberOfBooksInStock: number;
  priceReadOnPlatform: number;
  priceDigitalDownload: number;
  pricePhysicalBook: number;
  language: string;
  coverImage: string;
  manuscript: string;
  isBookPublished: boolean;
  averageRating: number;
  createdAt: string;
  updatedAt: string;
  comments: {
    fullName: string;
    email: string;
    phoneNumber: string;
    comment: string;
  }[];
  ratings: {
    email: string;
    rating: number;
  }[];
}

export interface BookResponse {
  books: Book[];
}
/**
 * GET /api/v1/admin/books
 */
export async function getAdminBooks(): Promise<BookResponse | null> {
  try {
    const response = await fetch(`${API_BASE_URL}/books`, {
      cache: "no-store",
    });
    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    return null;
  }
}

/**
 * POST /api/v1/admin/books
 */
export async function addBook(
  formData: FormData,
): Promise<{ success: boolean; data?: Book; error?: string }> {
  try {
    console.log(formData);

    const response = await fetch(`${API_BASE_URL}/admin/books`, {
      method: "POST",
      body: formData, // title, authorName, categoryId, etc.
    });
    console.log(response);

    if (response.ok) {
      const data = await response.json();
      revalidatePath("/admin/bookstore");
      return { success: true, data };
    }
    return { success: false, error: "Failed to create book" };
  } catch (error) {
    return {
      success: false,
      error: error instanceof Error ? error.message : "Connection error",
    };
  }
}

/**
 * GET /api/v1/admin/books/{id}
 */
export async function getBookById(id: number): Promise<Book | null> {
  // 1. Guard clause for invalid IDs
  if (!id || isNaN(id)) return null;
  try {
    const response = await fetch(`${API_BASE_URL}/books/${id}`);

    if (!response.ok) return null;
    return await response.json();
  } catch (error) {
    console.error("Fetch Error:", error);
    return null;
  }
}

/**
 * DELETE /api/v1/admin/books/{id}
 */
export async function deleteBook(
  id: number,
): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/books/${id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      revalidatePath("/admin/bookstore");
      return { success: true };
    }
    return { success: false, error: "Failed to delete book" };
  } catch (error) {
    return { success: false, error: "Connection error" };
  }
}

/**
 * PUT /api/v1/admin/books/{id}
 */
export async function updateBook(
  id: number,
  formData: FormData,
): Promise<{ success: boolean; data?: BookResponse; error?: string }> {
  try {
    const response = await fetch(`${API_BASE_URL}/admin/books/${id}`, {
      method: "PUT",
      body: formData, // title, authorName, categoryId, etc.
    });
    if (response.ok) {
      const data = await response.json();
      revalidatePath("/admin/bookstore");
      return { success: true, data };
    }
    return { success: false, error: "Failed to update book" };
  } catch (error) {
    return { success: false, error: "Connection error" };
  }
}

async function getAuthHeader() {
  const token = (await cookies()).get("auth_token")?.value;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}

export async function updateStock(id: number, amount: number) {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/admin/books/${id}/stock`, {
      method: "PATCH",
      headers,
      body: JSON.stringify({ numberOfBooksInStock: amount }),
    });
    if (res.ok) revalidatePath("/dashboard/books");
    return res.ok;
  } catch (error) {
    return false;
  }
}

export async function clearStock(id: number) {
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/admin/books/${id}/stock/clear`, {
      method: "PATCH",
      headers,
    });
    if (res.ok) revalidatePath("/dashboard/books");
    return res.ok;
  } catch (error) {
    return false;
  }
}

export async function toggleBookStatus(id: number, isPublished: boolean) {
  const endpoint = isPublished ? "unpublish" : "publish";
  try {
    const headers = await getAuthHeader();
    const res = await fetch(`${API_BASE_URL}/admin/books/${id}/${endpoint}`, {
      method: "PATCH",
      headers,
    });
    if (res.ok) revalidatePath("/dashboard/books");
    return res.ok;
  } catch (error) {
    return false;
  }
}

export async function getCategories() {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/book-categories`, {
      headers: await getAuthHeader(),
      next: { tags: ["categories"] },
    });
    return res.ok ? await res.json() : [];
  } catch (error) {
    return [];
  }
}

export async function addCategory(data: { name: string; description: string }) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/book-categories`, {
      method: "POST",
      headers: await getAuthHeader(),
      body: JSON.stringify(data),
    });
    if (res.ok) revalidatePath("/dashboard/books");
    return res.ok;
  } catch (error) {
    return false;
  }
}

export async function deleteCategory(id: number) {
  try {
    const res = await fetch(`${API_BASE_URL}/admin/book-categories/${id}`, {
      method: "DELETE",
      headers: await getAuthHeader(),
    });
    if (res.ok) revalidatePath("/dashboard/books");
    return res.ok;
  } catch (error) {
    return false;
  }
}
