import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "./lib/session";

// 1. Specify protected and public routes
const protectedRoutes = ["/"];
const publicRoutes = [
  "/auth/signin",
  "/auth/signup",
  "/auth/verify-account",
  "/auth/reset-password",
  "/auth/change-password",
];

export async function middleware(request: NextRequest) {
  // 2. Check if the current route is protected or public
  const path = request.nextUrl.pathname;
  console.log(path);

  const isProtectedRoute =
    protectedRoutes.includes(path) ||
    request.nextUrl.pathname.startsWith("/profile/");
  const isPublicRoute = publicRoutes.includes(path);

  // 3. Decrypt the payload from the token
  const token = request.cookies.get("token")?.value ?? "";
  const payload = await decrypt(token);

  // 5. Redirect to /login if the user is not authenticated
  if (isProtectedRoute && !payload?.id) {
    return NextResponse.redirect(new URL("/auth/signin", request.nextUrl));
  }

  // 6. Redirect to "/" if the user is authenticated
  if (
    isPublicRoute &&
    payload?.id &&
    request.nextUrl.pathname !== "/" &&
    !request.nextUrl.pathname.startsWith("/profile/")
  ) {
    return NextResponse.redirect(new URL("/", request.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
