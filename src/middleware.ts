import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  const path = request.nextUrl.pathname;
  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verify";
  const verifyPath = path === "/verify";
  const token = request.cookies.get("authToken")?.value ?? "";
  const verifyOTP = request.cookies.get("isOtpSet")?.value ?? "";

  if (!isPublicPath && !token) {
    //going to '/' && !token = /login
    // Redirect to login with a query parameter for error message
    const url = new URL("/login", request.url);
    url.searchParams.set("error", "Unauthorized");
    return NextResponse.redirect(url);
  }

  if (verifyPath && !verifyOTP) {
    //going to '/verify' && !verifyOTP = /siignup
    // Redirect to signup with a query parameter for error message
    const url = new URL("/signup", request.url);
    url.searchParams.set("error", "Verification required");
    return NextResponse.redirect(url);
  }

  if (isPublicPath && token) {
    //going to /login | /signup | /verify and token is there
    // Redirect to home with a query parameter for error message
    const url = new URL("/", request.url);
    url.searchParams.set("error", "Already logged in");
    return NextResponse.redirect(url);
  }

  // Allow access if the conditions are not met
  return NextResponse.next();
}

export const config = {
  // Corrected matcher paths
  matcher: ["/", "/login", "/signup", "/verify"],
};
