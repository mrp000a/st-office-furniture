import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";
import { prisma } from "./prisma";
import { compare } from "bcryptjs";
import { ProfileDefaultImage } from "@/components/data/core";

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password)
          throw new Error("Missing email or password!");

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              { email: credentials.email.toLowerCase().trim() },
              { phone: credentials.email.toLowerCase().trim() },
            ],
          },
        });
        if (!user) throw new Error("Email not found!");

        const valid = await compare(credentials.password, user.password);
        if (!valid) throw new Error("Incorrect password!");

        // return a minimal user object for session
        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image ?? ProfileDefaultImage,
          phone: user.phone ?? "",
          address: user.address ?? "",
          role: user.role,
        };
      },
    }),
  ],
  session: { strategy: "jwt" },
  callbacks: {
    async jwt({
      token,
      user,
      trigger,
      session,
    }: {
      token: any;
      user?: any;
      trigger?: any;
      session?: any;
    }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.phone = user.phone;
        token.address = user.address;
      }

      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
        token.phone = session.phone;
        token.role = "USER";
        token.gender = session.gender;
        token.image = session.image;
        token.address = session.address;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: any }) {
      if (!session.user) session.user = {};
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.phone = token.phone;
      session.user.address = token.address;
      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

export default NextAuth(authOptions);
