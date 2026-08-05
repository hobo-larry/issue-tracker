import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";



const isProduction = process.env.NODE_ENV === "production";

const authOptions: NextAuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  session: {
    strategy: "database",
    updateAge: 24 * 60 * 60,
    maxAge: 12 * 60 * 60, //12hours
  },
  // O NextAuth já gerencia os nomes (com ou sem __Secure)
  // automaticamente com base no protocolo (HTTP vs HTTPS).
  // Se quiser personalizar, use:
  cookies: {
    sessionToken: {
      name: isProduction
        ? `__Secure-next-auth.session-token`
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: isProduction, // false no localhost
        sameSite: "lax",
        path: "/",
      },
    },
  },
};

export default authOptions