import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/api/auth/signin", // or your custom login page
  },
});

export const config = {
  // As rotas que você quer proteger
  matcher: ["/issues/new", "/issues/edit/:path*", "/api/users"],
};
