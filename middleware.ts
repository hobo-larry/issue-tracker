import { NextResponse } from "next/server";

export function middleware() {
  return NextResponse.next();
}

export const config = {
  // As rotas que você quer proteger
  matcher: ["/issues/new", "/issues/edit/:id+", "/api/:path*"],
};
