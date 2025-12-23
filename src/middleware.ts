import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // Block admin routes in production
    if (process.env.NODE_ENV === "production") {
        if (pathname.startsWith("/admin") || pathname.startsWith("/api/admin")) {
            // Return 404 for admin routes in production
            return NextResponse.rewrite(new URL("/404", request.url));
        }
    }

    return NextResponse.next();
}

export const config = {
    matcher: ["/admin/:path*", "/api/admin/:path*"],
};
