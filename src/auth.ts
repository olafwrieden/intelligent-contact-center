import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import EntraID from "next-auth/providers/microsoft-entra-id";
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
  ],
});
