import { createActivity } from "@/lib/activity-log";
import { getSession, getUserId } from "@/lib/serverAuth";
import { signIn, signOut } from "next-auth/react";

export const SignIn = async ({
  email,
  password,
  redirect = true,
}: {
  email: string;
  password: string;
  redirect?: boolean;
}) => {
  const result = await signIn("credentials", { email, password, redirect });
  if (result?.error) {
    return;
  }
};

export const SignOut = async () => {
  await fetch("/api/auth/activity/logout", {
    method: "POST",
  });

  await signOut({ callbackUrl: "/", redirect: true });
};
