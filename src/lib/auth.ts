import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import NextAuth from "next-auth";
import type { NextAuthOptions } from "next-auth";

import { prisma } from "./prisma";
import { compare } from "bcryptjs";

import { ProfileDefaultImage } from "@/components/data/core";
import { createActivity } from "./activity-log";

export const authOptions: NextAuthOptions = {
  providers: [
    // CREDENTIALS LOGIN
    CredentialsProvider({
      name: "Credentials",

      credentials: {
        email: {
          label: "Email or Phone",
          type: "text",
        },

        password: {
          label: "Password",
          type: "password",
        },
      },

      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error("Missing email or password!");
        }

        const loginValue = credentials.email.toLowerCase().trim();

        const user = await prisma.user.findFirst({
          where: {
            OR: [
              {
                email: loginValue,
              },
              {
                phone: loginValue,
              },
            ],
          },
        });

        if (!user) {
          throw new Error("Email or Phone not found!");
        }

        // Google-only account
        if (!user.password) {
          throw new Error(
            "This account uses Google login. Please continue with Google.",
          );
        }

        const valid = await compare(credentials.password, user.password);

        if (!valid) {
          throw new Error("Incorrect password!");
        }

        if (!user.emailVerified) {
          throw new Error("Please verify your email before logging in.");
        }

        // Login activity
        await createActivity({
          type: "AUTH",
          action: "LOGIN",
          title: "A User Logged in to his/her account",
          description: `${user.name} logged in to his/her account with email or phone - ${credentials.email}`,
          userId: user.id,
          entityId: user.id.toString(),
          entityType: "User",
        });

        return {
          id: user.id.toString(),
          name: user.name,
          email: user.email,
          image: user.image ?? ProfileDefaultImage,
          phone: user.phone ?? "",
          address: user.address ?? "",
          gender: user.gender ?? "",
          role: user.role,
        };
      },
    }),

    // google

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,

      authorization: {
        params: {
          prompt: "select_account",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],

  //  session

  session: {
    strategy: "jwt",
  },

  //  callbacks

  callbacks: {
    // GOOGLE / SIGN-IN CONTROL

    async signIn({ account, profile }) {
      // Normal credentials login
      if (account?.provider !== "google") {
        return true;
      }

      // no email
      if (!profile?.email) {
        return "/signin?error=GoogleEmailNotFound";
      }

      const email = profile.email.toLowerCase().trim();

      const user = await prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        return "/signin?error=GoogleAccountNotRegistered";
      }

      return true;
    },

    async jwt({
      token,
      user,
      account,
      profile,
      trigger,
      session,
    }: {
      token: any;
      user?: any;
      account?: any;
      profile?: any;
      trigger?: any;
      session?: any;
    }) {
      // ===================================================
      // NORMAL CREDENTIAL LOGIN
      // ===================================================

      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.name = user.name;
        token.email = user.email;
        token.image = user.image;
        token.phone = user.phone;
        token.address = user.address;
        token.gender = user.gender;
      }

      // ===================================================
      // GOOGLE LOGIN
      // ===================================================

      if (account?.provider === "google" && profile?.email) {
        const email = profile.email.toLowerCase().trim();

        const dbUser = await prisma.user.findUnique({
          where: {
            email,
          },
        });

        if (dbUser) {
          token.id = dbUser.id.toString();
          token.role = dbUser.role;
          token.name = dbUser.name;
          token.email = dbUser.email;
          token.image = dbUser.image ?? profile.picture ?? ProfileDefaultImage;
          token.phone = dbUser.phone ?? "";
          token.address = dbUser.address ?? "";
          token.gender = dbUser.gender ?? "";

          // Save Google ID if it hasn't been saved yet
          if (account.providerAccountId && !dbUser.googleId) {
            await prisma.user.update({
              where: {
                id: dbUser.id,
              },

              data: {
                googleId: account.providerAccountId,
                image: dbUser.image ?? profile.picture,
              },
            });
          }
        }
      }

      // ===================================================
      // SESSION UPDATE
      // ===================================================

      if (trigger === "update" && session) {
        token.name = session.name;
        token.email = session.email;
        token.phone = session.phone;
        token.role = session.role;
        token.gender = session.gender;
        token.image = session.image;
        token.address = session.address;
      }

      return token;
    },

    async session({ session, token }: { session: any; token: any }) {
      if (!session.user) {
        session.user = {};
      }

      session.user.id = token.id;
      session.user.role = token.role;
      session.user.name = token.name;
      session.user.email = token.email;
      session.user.image = token.image;
      session.user.phone = token.phone;
      session.user.address = token.address;
      session.user.gender = token.gender;

      return session;
    },
  },

  // =======================================================
  // CUSTOM PAGES
  // =======================================================

  pages: {
    signIn: "/signin",
  },
};

export default NextAuth(authOptions);
