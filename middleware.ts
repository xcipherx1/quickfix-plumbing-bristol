import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { jwtVerify } from "jose";

const secret = new TextEncoder().encode(process.env.JWT_SECRET!);

export async function middleware(request: NextRequest) {
  const token = request.cookies.get("admin-token")?.value;

  if (request.nextUrl.pathname.startsWith("/admin")) {
    // Allow login page
    if (request.nextUrl.pathname === "/admin/login")
      return NextResponse.next();

    // API routes handle their own auth
    if (request.nextUrl.pathname.startsWith("/api/"))
      return NextResponse.next();

    // Redirect to login if no token
    if (!token)
      return NextResponse.redirect(new URL("/admin/login", request.url));

    try {
      await jwtVerify(token, secret);
      return NextResponse.next();
    } catch {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
