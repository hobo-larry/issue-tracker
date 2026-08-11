import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getToken } from "next-auth/jwt";

export async function middleware(request: NextRequest) {
  const token = await getToken({ req: request });

  if (!token) {
    // Not logged in → redirect to sign in
    return NextResponse.redirect(new URL("/api/auth/signin", request.url));
  }

  // User is authenticated → continue
  return NextResponse.next();
}

export const config = {
  matcher: ["/issues/new", "/issues/edit/:path*"],
};
