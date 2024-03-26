import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value ?? "";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    await jose.jwtVerify(token, secret);

    if (request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } catch {
    if (!request.nextUrl.pathname.startsWith("/auth")) {
      return NextResponse.redirect(new URL("/auth/signin", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
