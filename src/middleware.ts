import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Admin sayfası kontrolü — login hariç
 if (pathname.includes("/admin") && !pathname.includes("/admin/login") && !pathname.includes("/api/admin")) {
    const auth = request.cookies.get("admin-auth");
    if (!auth || auth.value !== "true") {
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Pathname header'a ekle (navbar için)
  const response = NextResponse.next();
  response.headers.set("x-pathname", pathname);
  return response;
}

export const config = {
  matcher: "/:path*",
};