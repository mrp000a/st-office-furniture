import { DefaultSession, DefaultUser } from "next-auth";
import { Role } from "@/generated/prisma";
declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      role: "ADMIN" | "USER" | "SUPER_ADMIN";
      phone: string;
      address?: string;
    } & DefaultSession["user"];
  }

  interface User extends DefaultUser {
    phone: string;
    role: "ADMIN" | "USER" | "SUPER_ADMIN";
    address?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    phone: string;
    role: "ADMIN" | "USER" | "SUPER_ADMIN";
    address?: string;
  }
}
