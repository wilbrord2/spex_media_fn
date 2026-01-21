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