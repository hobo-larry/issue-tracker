import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "@/prisma/client";
import { NextAuthOptions } from "next-auth";
import { Role } from "@prisma/client";

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
    maxAge: 12 * 60 * 60, // 12 hours
  },
  callbacks: {
    async session({ session, user }) {
      if (session.user) {
        session.user.id = user.id;
        // user comes from the DB via PrismaAdapter
        session.user.role = (user as { role?: Role }).role ?? "USER";
      }
      return session;
    },
  },
  cookies: {
    sessionToken: {
      name: isProduction
        ? `__Secure-next-auth.session-token`
        : `next-auth.session-token`,
      options: {
        httpOnly: true,
        secure: isProduction,
        sameSite: "lax",
        path: "/",
      },
    },
  },
};

export default authOptions;
