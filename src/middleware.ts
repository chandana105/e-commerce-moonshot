import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  console.log("Middleware Executed");
  const path = request.nextUrl.pathname;

  const isPublicPath =
    path === "/login" || path === "/signup" || path === "/verify";

  const verifyPath = path === "/verify";

  const token = request.cookies.get("authToken")?.value ?? "";
  const verifyOTP = request.cookies.get("isOtpSet")?.value ?? "";

  if (!isPublicPath && !token) {
    //going to '/' && !token = /login
    return NextResponse.redirect(new URL("/login", request.url));
  }

  if (verifyPath && !verifyOTP) {
    //going to '/verify' && !verifyOTP = /siignup
    return NextResponse.redirect(new URL("/signup", request.url));
  }

  if (isPublicPath && token) {
    //going to /login | /signup | /verify and token is there
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Allow access if the conditions are not met
  return NextResponse.next();
}

export const config = {
  // Corrected matcher paths
  matcher: ["/", "/login", "/signup", "/verify"],
};
