import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const protectedPrefixes = [
  "/dashboard",
  "/vault",
  "/spaces",
  "/collections",
  "/items",
  "/ask",
  "/search",
  "/timeline",
  "/insights",
  "/settings"
];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get("nexvault_session")?.value;

  const isProtected = protectedPrefixes.some(
    (prefix) => pathname === prefix || pathname.startsWith(`${prefix}/`)
  );

  if (isProtected && !token) {
    const url = new URL("/auth/sign-in", request.url);
    return NextResponse.redirect(url);
  }

  if ((pathname === "/auth/sign-in" || pathname === "/auth/sign-up") && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
