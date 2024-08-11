import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verify";

  const token = request.cookies.get("authToken")?.value ?? "";

  if (!isPublicPath && !token) {
    // '/' && !token = /login
    return NextResponse.redirect(new URL("/login", request.url));
  }
  console.log(path, "path");

  if (isPublicPath && token) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access if the conditions are not met
  return NextResponse.next();
}

export const config = {
  // Corrected matcher paths
  matcher: ["/", "/login", "/signup", "/verify"],
};
