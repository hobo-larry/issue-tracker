// middleware.ts
import { withAuth } from "next-auth/middleware";

// O Next.js exige que o export seja "default" ou uma função chamada "middleware"
export default withAuth({
  pages: {
    signIn: "/api/auth/signin",
  },
});

export const config = {
  // As rotas que você quer proteger
  matcher: [
    "/issues/new",
    "/issues/edit/:id+",
  ],
};