import { ROLE } from "@/lib/constant";
import NextAuth, { DefaultSession } from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      role: ROLE;
    } & DefaultSession["user"];
  }
}
