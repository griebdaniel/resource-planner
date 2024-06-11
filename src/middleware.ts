import { jwtVerify } from "jose";
import { verify } from "jsonwebtoken";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// This function can be marked `async` if using `await` inside
export async function middleware(request: NextRequest) {
  const token = cookies().get("session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  const { payload } = await jwtVerify(
    token as string,
    new TextEncoder().encode(process.env.SESSION_SECRET),
  );

  if (!payload) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
  if (
    request.nextUrl.pathname.startsWith("/admin") &&
    payload.role !== "admin"
  ) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: ["/admin/:path*", "/user/:path*"],
};
