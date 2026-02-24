import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const pdfUrl = searchParams.get("url");

  if (!pdfUrl) return new NextResponse("Missing URL", { status: 400 });

  try {
    const response = await fetch(pdfUrl);

    if (!response.ok || !response.body) {
      throw new Error(`Remote server error: ${response.status}`);
    }

    // Forward the stream directly to the client for instant loading
    return new NextResponse(response.body, {
      headers: {
        "Content-Type": "application/pdf",
        "Content-Length": response.headers.get("Content-Length") || "",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Streaming Proxy Error:", error);
    return new NextResponse("Failed to stream PDF", { status: 500 });
  }
}
