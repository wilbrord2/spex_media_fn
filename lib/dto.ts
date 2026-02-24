import { z } from "zod";

export const SignUpSchema = z.object({
  name: z.string().min(2, "Name is required"),
  phone: z.string().min(10, "Invalid phone number"),
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[A-Z]/, "Need uppercase")
    .regex(/[a-z]/, "Need lowercase")
    .regex(/[0-9]/, "Need number")
    .regex(/[^A-Za-z0-9]/, "Need special character"),
  address: z.string().min(5, "Address is required"),
});

export const SignInSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(1, "Password is required"),
});

export const VerifyEmailSchema = z.object({
  code: z.string().length(6, "Code must be exactly 6 digits"),
});

export type SignUpReqDto = z.infer<typeof SignUpSchema>;
export type SignInReqDto = z.infer<typeof SignInSchema>;
export type VerifyEmailReqDto = z.infer<typeof VerifyEmailSchema>;

export interface SignUpResDto {
  message: string;
  verifyEmailToken: string;
}

export interface SignInResDto {
  message: string;
  accessToken: string;
}

export interface Category {
  id: number;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
}

export interface ContentItem {
  id: number;
  title: string;
  categoryId: number;
  category: Category;
  content: string;
  link: string;
  coverImage: string;
  images: string[];
  imageDescriptions: string[];
  status: "DRAFT" | "APPROVED" | "REJECTED";
  adminComment: string;
  publishedAt: string;
  createdAt: string;
  updatedAt: string;
  authorName: string;
}

export interface ContentListRes {
  contentList: ContentItem[];
  page: number;
  take: number;
  totalContents: number;
  pageCount: number;
  hasNextPage: boolean;
}

export interface AnalyticsRes {
  likes: number;
  dislikes: number;
  comments: number;
}

export interface CommentRes {
  id: number;
  contentId: number;
  fullName: string;
  email: string;
  phoneNumber: string;
  comment: string;
  createdAt: string;
  updatedAt: string;
}

export interface RatingRes {
  id: number;
  contentId: number;
  email: string;
  rating: number;
  createdAt: string;
  updatedAt: string;
}

// --- Zod Schemas & Inferred Types ---

export const CategorySchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
});
export type CategoryInput = z.infer<typeof CategorySchema>;

export const ContentSchema = z.object({
  title: z.string().min(1, "Title is required"),
  categoryId: z.coerce.number().min(1, "Category is required"),
  content: z.string().min(1, "Content body is required"),
  link: z.url().optional().or(z.literal("")),
  imageDescriptions: z.string().optional(),
});
export type ContentInput = z.infer<typeof ContentSchema>;

export const CommentSchema = z.object({
  fullName: z.string().min(2),
  email: z.email("Invalid email address"),
  phoneNumber: z.string().optional(),
  comment: z.string().min(5, "Short comments are not allowed"),
});
export type CommentInput = z.infer<typeof CommentSchema>;

export const RatingSchema = z.object({
  email: z.email("Invalid email address"),
  rating: z.number().min(1).max(5),
});
export type RatingInput = z.infer<typeof RatingSchema>;

export const AdminReviewSchema = z.object({
  status: z.enum(["APPROVED", "REJECTED", "DRAFT"]),
  comment: z.string().optional(),
});
export type AdminReviewInput = z.infer<typeof AdminReviewSchema>;
