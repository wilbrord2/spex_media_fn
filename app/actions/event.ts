"use server";

import { Category, CategoryListRes } from "@/lib/dto";
import { revalidatePath } from "next/cache";
import { cookies } from "next/headers";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

// --- Interfaces ---

export interface AgendaHighlight {
  id?: number;
  day: string;
  time: string;
  title: string;
  description: string;
}

export interface Speaker {
  id?: number;
  profilePicture: string;
  fullName: string;
  title: string;
  company: string;
}

export interface Event {
  id?: number;
  title: string;
  location: string;
  description: string;
  eventType: "Virtual" | "Hybrid" | "InPerson";
  categoryId: number;
  category: {
    id: number;
    name: string;
    description: string;
  };
  coverImage: string;
  isEventPublished: boolean;
  agendaHighlights: AgendaHighlight[];
  speakers: Speaker[];
  createdAt: string;
  updatedAt: string;
}

export interface EventsResponse {
  events: Event[];
  page: number;
  take: number;
  totalEvents: number;
  pageCount: number;
  hasNextPage: boolean;
}

export interface ApiError {
  message: string | string[];
  statusCode: number;
  error?: string;
}

export type EventQueryParams = {
  page?: number;
  take?: number;
  fromDate?: string;
  toDate?: string;
  presetTimeFrame?:
    | "Today"
    | "Yesterday"
    | "ThisWeek"
    | "LastWeek"
    | "ThisMonth"
    | "LastMonth"
    | "ThisYear"
    | "LastYear"
    | "AllTime";
  eventType?: "Virtual" | "Hybrid" | "InPerson";
};

/**
 * GET /api/v1/events
 * Fetches published events with dynamic filtering.
 * No-cache enabled. Returns API error object on failure.
 */
export async function getEvents(
  params: EventQueryParams = {},
): Promise<{ success: boolean; data?: EventsResponse; error?: ApiError }> {
  try {
    const query = new URLSearchParams();

    Object.entries(params).forEach(([key, value]) => {
      if (value !== undefined && value !== null) {
        query.append(key, value.toString());
      }
    });

    const response = await fetch(`${API_BASE_URL}/events?${query.toString()}`, {
      cache: "no-store", // Removed caching as requested
    });

    const result = await response.json();

    if (!response.ok) {
      // Return the error object provided by the API
      return {
        success: false,
        error: result as ApiError,
      };
    }

    return {
      success: true,
      data: result as EventsResponse,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message: "An unexpected connection error occurred",
        statusCode: 500,
        error: "Internal Server Error",
      },
    };
  }
}

/**
 * GET /api/v1/events/{id}
 * Fetches details for a single event.
 */
export async function getEventById(
  id: number,
): Promise<{ success: boolean; data?: Event; error?: ApiError }> {
  try {
    if (!id || isNaN(id)) {
      return {
        success: false,
        error: { message: "Invalid Event ID", statusCode: 400 },
      };
    }

    const response = await fetch(`${API_BASE_URL}/events/${id}`, {
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result as ApiError,
      };
    }

    return {
      success: true,
      data: result as Event,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message: "An unexpected connection error occurred",
        statusCode: 500,
        error: "Internal Server Error",
      },
    };
  }
}

/**
 * POST /api/v1/admin/events
 * Protected: Adds a new event with image uploads.
 * Use FormData to handle files and JSON strings for arrays.
 */
export async function addEvent(
  formData: FormData,
): Promise<{ success: boolean; data?: Event; error?: ApiError }> {
  try {
    const authHeaders = await getAuthHeader();

    // We remove "Content-Type" because the browser must set it
    // automatically with the boundary for FormData.
    const { "Content-Type": _, ...headers } = authHeaders;

    const response = await fetch(`${API_BASE_URL}/admin/events`, {
      method: "POST",
      headers,
      body: formData,
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result as ApiError,
      };
    }

    // Refresh the events list and dashboard
    revalidatePath("/admin/events");
    revalidatePath("/events");

    return {
      success: true,
      data: result as Event,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message: "Connection error while creating event",
        statusCode: 500,
        error: "Internal Server Error",
      },
    };
  }
}

/**
 * GET /api/v1/admin/events
 * Protected: Fetches all events (including unpublished) for admin management.
 */
export async function getAllAdminEvents(): Promise<{
  success: boolean;
  data?: Event[];
  error?: ApiError;
}> {
  try {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_BASE_URL}/admin/events`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result as ApiError,
      };
    }

    return {
      success: true,
      data: result as Event[],
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message: "Failed to connect to admin events service",
        statusCode: 500,
        error: "Internal Server Error",
      },
    };
  }
}

/**
 * GET /api/v1/admin/events/{id}
 * Protected: Admin-specific fetch for a single event by ID.
 */
export async function getAdminEventById(
  id: number,
): Promise<{ success: boolean; data?: Event; error?: ApiError }> {
  try {
    if (!id || isNaN(id)) {
      return {
        success: false,
        error: { message: "Invalid Event ID", statusCode: 400 },
      };
    }

    const headers = await getAuthHeader();

    const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
      method: "GET",
      headers,
      cache: "no-store",
    });

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result as ApiError,
      };
    }

    return {
      success: true,
      data: result as Event,
    };
  } catch (err) {
    return {
      success: false,
      error: {
        message: "Failed to connect to admin event service",
        statusCode: 500,
        error: "Internal Server Error",
      },
    };
  }
}

/**
 * DELETE /api/v1/admin/events/{id}
 * Protected: Deletes an event by ID.
 */
export async function deleteEvent(
  id: number,
): Promise<{ success: boolean; error?: ApiError }> {
  try {
    const headers = await getAuthHeader();

    const response = await fetch(`${API_BASE_URL}/admin/events/${id}`, {
      method: "DELETE",
      headers,
      cache: "no-store",
    });

    // DELETE requests sometimes return empty bodies or simple status messages
    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: result as ApiError,
      };
    }

    // Refresh both admin and public views
    revalidatePath("/admin/events");
    revalidatePath("/events");

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: {
        message: "Connection error during deletion",
        statusCode: 500,
        error: "Internal Server Error",
      },
    };
  }
}

/**
 * PATCH /api/v1/admin/events/{id}/publish OR /unpublish
 * Protected: Toggles the publication status of an event.
 */
export async function toggleEventPublishStatus(
  id: number,
  isPublished: boolean,
): Promise<{ success: boolean; error?: ApiError }> {
  const endpoint = isPublished ? "unpublish" : "publish";

  try {
    const headers = await getAuthHeader();

    const response = await fetch(
      `${API_BASE_URL}/admin/events/${id}/${endpoint}`,
      {
        method: "PATCH",
        headers,
        cache: "no-store",
      },
    );

    const result = await response.json().catch(() => ({}));

    if (!response.ok) {
      return {
        success: false,
        error: result as ApiError,
      };
    }

    // Refresh pages to reflect the new status immediately
    revalidatePath("/admin/events");
    revalidatePath("/events");
    revalidatePath(`/events/${id}`);

    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: {
        message: `Failed to ${endpoint} event`,
        statusCode: 500,
        error: "Internal Server Error",
      },
    };
  }
}

/**
 * POST /api/v1/admin/event-categories
 * Protected: Creates a new event category.
 */
export async function addEventCategory(data: {
  name: string;
  description: string;
}): Promise<{ success: boolean; data?: Category; error?: ApiError }> {
  try {
    const headers = await getAuthHeader();
    const response = await fetch(`${API_BASE_URL}/admin/event-categories`, {
      method: "POST",
      headers,
      body: JSON.stringify(data),
      cache: "no-store",
    });

    const result = await response.json();
    if (!response.ok) return { success: false, error: result as ApiError };

    revalidatePath("/admin/events");
    return { success: true, data: result as Category };
  } catch (err) {
    return {
      success: false,
      error: { message: "Connection error", statusCode: 500 },
    };
  }
}

/**
 * GET /api/v1/admin/event-categories
 * Protected: Fetches paginated list of categories.
 */
export async function getEventCategories(
  page: number = 1,
  take: number = 5,
): Promise<{ success: boolean; data?: CategoryListRes; error?: ApiError }> {
  try {
    const headers = await getAuthHeader();
    const response = await fetch(
      `${API_BASE_URL}/admin/event-categories?page=${page}&take=${take}`,
      { headers, cache: "no-store" },
    );

    const result = await response.json();
    if (!response.ok) return { success: false, error: result as ApiError };

    return { success: true, data: result as CategoryListRes };
  } catch (err) {
    return {
      success: false,
      error: { message: "Connection error", statusCode: 500 },
    };
  }
}

/**
 * GET /api/v1/admin/event-categories/{id}
 * Protected: Fetches a single category by ID.
 */
export async function getEventCategoryById(
  id: number,
): Promise<{ success: boolean; data?: Category; error?: ApiError }> {
  try {
    const headers = await getAuthHeader();
    const response = await fetch(
      `${API_BASE_URL}/admin/event-categories/${id}`,
      {
        headers,
        cache: "no-store",
      },
    );

    const result = await response.json();
    if (!response.ok) return { success: false, error: result as ApiError };

    return { success: true, data: result as Category };
  } catch (err) {
    return {
      success: false,
      error: { message: "Connection error", statusCode: 500 },
    };
  }
}

/**
 * DELETE /api/v1/admin/event-categories/{id}
 * Protected: Deletes a category by ID.
 */
export async function deleteEventCategory(
  id: number,
): Promise<{ success: boolean; error?: ApiError }> {
  try {
    const headers = await getAuthHeader();
    const response = await fetch(
      `${API_BASE_URL}/admin/event-categories/${id}`,
      {
        method: "DELETE",
        headers,
        cache: "no-store",
      },
    );

    const result = await response.json().catch(() => ({}));
    if (!response.ok) return { success: false, error: result as ApiError };

    revalidatePath("/admin/events");
    return { success: true };
  } catch (err) {
    return {
      success: false,
      error: { message: "Connection error", statusCode: 500 },
    };
  }
}

async function getAuthHeader() {
  const token = (await cookies()).get("auth_token")?.value;
  return {
    Authorization: `Bearer ${token}`,
    "Content-Type": "application/json",
  };
}
