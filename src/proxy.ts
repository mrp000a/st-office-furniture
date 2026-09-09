import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const { pathname, searchParams } = req.nextUrl;

    if (
      token &&
      (pathname.startsWith("/signin") || pathname.startsWith("/register"))
    ) {
      const callbackUrl = searchParams.get("callbackUrl");
      const redTarget = callbackUrl || "/";
      return NextResponse.redirect(new URL(redTarget, req.url));
    }

    if (
      !token &&
      (pathname.startsWith("/profile") || pathname.startsWith("/dashboard"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      (token?.role == "USER") &&
      (pathname.startsWith("/admin") || pathname.startsWith("/dashboard"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    if (
      token?.role !== "SUPER_ADMIN" &&
      (pathname.startsWith("/super_admin") || pathname.startsWith("/super_dashboard"))
    ) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token, req }) => {
        const pathname = req.nextUrl.pathname;

        // Allow auth pages without a token
        if (
          pathname.startsWith("/signin") ||
          pathname.startsWith("/register")
        ) {
          return true;
        }

        // Other matched routes require login
        return !!token;
      },
    },
  },
);

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/admin/:path*",
    "/profile/:path*",
    "/dashboard",
    "/admin",
    "/profile",
    "/signin",
    "/register",
  ],
};
