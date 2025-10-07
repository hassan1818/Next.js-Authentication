import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// First part: is the logic part
export function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath = path === "/login" || path === "/signup";

  const token = request.cookies.get("token")?.value || "";

  if (isPublicPath && token) {
    // if user is logged in and trying to access login or signup page, redirect to home page
    return NextResponse.redirect(new URL("/", request.url));
  }

  if (!isPublicPath && !token) {
    // if user is not logged in and trying to access a protected page, redirect to login page
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// Second Part (Matching Part): on what path u want to match and run the middleware function
export const config = {
  matcher: ["/", "/profile/:path*", "/login", "/signup"],
};
