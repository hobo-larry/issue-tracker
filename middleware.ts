export { default } from "next-auth/middleware";

export const config = {
  // As rotas que você quer proteger
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
