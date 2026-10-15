import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const sessionCookie = request.cookies.get("bppi_admin_session")?.value;

  // 1. Allow login page and auth API freely
  if (pathname === "/admin/login" || pathname.startsWith("/api/auth")) {
    // If already logged in and visiting /admin/login, redirect to /admin dashboard
    if (sessionCookie && pathname === "/admin/login") {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
    return NextResponse.next();
  }

  // 2. Protect Admin Pages (/admin/...)
  if (pathname.startsWith("/admin")) {
    if (!sessionCookie) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("from", pathname);
      return NextResponse.redirect(loginUrl);
    }
    return NextResponse.next();
  }

  // 3. Protect Admin API Routes (/api/admin/...)
  if (pathname.startsWith("/api/admin")) {
    if (!sessionCookie) {
      return NextResponse.json(
        { ok: false, error: "Akses ditolak: Autentikasi diperlukan." },
        { status: 401 }
      );
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/api/admin/:path*"],
};
