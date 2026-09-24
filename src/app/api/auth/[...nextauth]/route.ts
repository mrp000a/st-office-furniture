import { authOptions } from "@/lib/auth";
import NextAuth from "next-auth";
import { CredentialsConfig } from "next-auth/providers/index";

const handler = NextAuth(
  authOptions, // as {
  //   providers: CredentialsConfig<{
  //     email: {
  //       label: string;
  //       type: string;
  //     };
  //     password: {
  //       label: string;
  //       type: string;
  //     };
  //   }>[];
  // },
);

export { handler as GET, handler as POST };
