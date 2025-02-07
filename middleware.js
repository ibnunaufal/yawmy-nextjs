import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");

  const protectedRoutes = ["/home", "/profile", "/evaluate"];

  if (protectedRoutes.some((route) => req.nextUrl.pathname.startsWith(route)) && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }
}
