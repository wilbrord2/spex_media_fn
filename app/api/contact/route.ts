import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";

// Validation schema
const contactFormSchema = z.object({
  fullName: z
    .string()
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must not exceed 100 characters"),
  email: z.string().email("Please enter a valid email address"),
  subject: z
    .string()
    .min(5, "Subject must be at least 5 characters")
    .max(100, "Subject must not exceed 100 characters"),
  message: z
    .string()
    .min(10, "Message must be at least 10 characters")
    .max(2000, "Message must not exceed 2000 characters"),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the request body
    const validationResult = contactFormSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        {
          success: false,
          errors: validationResult.error.flatten().fieldErrors,
          message: "Validation failed",
        },
        { status: 400 },
      );
    }

    const { fullName, email, subject, message } = validationResult.data;

    // TODO: Implement your backend logic here
    // Examples:
    // - Send email notification
    // - Save to database
    // - Send to third-party service (SendGrid, Slack, etc.)

    console.log("Contact form submission:", {
      fullName,
      email,
      subject,
      message,
      timestamp: new Date().toISOString(),
    });

    // For now, we'll just return a success response
    // In production, implement actual email sending or database storage
    return NextResponse.json(
      {
        success: true,
        message: "Thank you for your message! We will get back to you soon.",
        data: {
          fullName,
          email,
          subject,
          timestamp: new Date().toISOString(),
        },
      },
      { status: 200 },
    );
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      {
        success: false,
        message: "An error occurred while processing your request.",
      },
      { status: 500 },
    );
  }
}
