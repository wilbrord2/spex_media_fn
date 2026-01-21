import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlMiddleware = createMiddleware(routing);

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  // 1. Extract token
  const token = request.cookies.get("auth_token")?.value;

  // 2. Identify if it's an Auth page or Protected route
  // We check for auth and protected routes
  const isAuthPage = pathname.match(/\/(auth)(\/|$)/);
  const isProtectedRoute = ["/dashboard", "/profile", "/settings"].some(
    (route) => pathname.includes(route)
  );

  // 3. Logic: No token + Protected Route -> Redirect to Auth
  if (!token && isProtectedRoute) {
    const url = new URL("/auth", request.url);
    return NextResponse.redirect(url);
  }

  // 4. Logic: Token exists + Auth Page -> Redirect to Home
  if (token && isAuthPage) {
    const url = new URL("/", request.url);
    return NextResponse.redirect(url);
  }

  // 5. Finally, let next-intl handle language routing
  return intlMiddleware(request);
}


export const config = {
  matcher: [
    // Match all pathnames except for static files and api
    "/((?!api|_next|_vercel|.*\\..*).*)",
  ],
};