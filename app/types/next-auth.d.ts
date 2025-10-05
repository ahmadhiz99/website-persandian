import NextAuth, { DefaultSession, DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    id: string; // tambahkan id ke user
  }

  interface Session {
    user: {
      id: string; // tambahkan id ke session.user
    } & DefaultSession["user"];
  }
}
