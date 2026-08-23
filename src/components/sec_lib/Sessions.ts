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
  await signOut({ callbackUrl: "/", redirect: true });
};
