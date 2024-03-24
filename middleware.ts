import * as jose from "jose";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(request: NextRequest) {
  try {
    const token = request.cookies.get("token")?.value ?? "";
    const secret = new TextEncoder().encode(process.env.JWT_SECRET);

    await jose.jwtVerify(token, secret);

    if (
      token &&
      (request.nextUrl.pathname === "/signin" ||
        request.nextUrl.pathname === "/signup")
    ) {
      return NextResponse.redirect(new URL("/", request.url));
    }

    if (
      !token &&
      !(
        request.nextUrl.pathname === "/signin" ||
        request.nextUrl.pathname === "/signup"
      )
    ) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  } catch {
    if (
      !(
        request.nextUrl.pathname === "/signin" ||
        request.nextUrl.pathname === "/signup"
      )
    ) {
      return NextResponse.redirect(new URL("/signin", request.url));
    }
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
