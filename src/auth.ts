import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import EntraID from "next-auth/providers/microsoft-entra-id";
import GitHub from "next-auth/providers/github";
import { authConfig } from "./auth.config";
import { db } from "./lib/db";

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(db),
  providers: [
    EntraID({
      clientId: process.env.AZURE_CLIENT_ID,
      clientSecret: process.env.AZURE_CLIENT_SECRET,
      tenantId: process.env.AZURE_TENANT_ID,
    }),
    GitHub,
  ],
  callbacks: {
    async session({ token, session }) {
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      const existingUser = await db.user.findUnique({
        where: { id: token.sub },
      });
      // if (!existingUser) return token;

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.picture;
        session.user.role = existingUser?.role;
      }

      return session;
    },
    async jwt({ token }) {
      if (!token.sub) return token;

      const existingUser = await db.user.findUnique({
        where: { id: token.sub },
      });
      if (!existingUser) return token;

      token.name = existingUser.name;
      token.email = existingUser.email;
      token.picture = existingUser.image;
      token.role = existingUser.role;

      return token;
    },
  },
});
