"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import GridShape from "@/components/common/GridShape";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function VerifyEmailPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [message, setMessage] = useState("Verifying your email...");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = searchParams.get("token");
    const userId = searchParams.get("userId");

    if (!token) {
      const a = () => {
        setMessage("Invalid verification link.");
        setLoading(false);
      };
      a();
      return;
    }

    async function verifyEmail() {
      try {
        const response = await fetch("/api/auth/verify-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token, userId }),
        });

        const data = await response.json();

        if (!response.ok) {
          setMessage(data.message || "Verification failed.");
          return;
        }

        setMessage("Email verified successfully!");

        setTimeout(() => {
          router.push("/signin");
        }, 2000);
      } catch {
        setMessage("Something went wrong.");
      } finally {
        setLoading(false);
      }
    }

    verifyEmail();
  }, [searchParams, router]);

  return (
    <div className="flex relative min-h-screen items-center justify-center w-full h-full px-2">
      <GridShape />
      <div className="flex-center flex-col max-w-lg w-full h-full bg-background min-h-48 shadow-lg shadow-foreground/40 rounded-md">
        <h1 className="text-2xl font-bold">
          {loading ? "Verifying..." : message}
        </h1>
          {!loading && (
            <Button variant={"outline"} asChild>
              <Link href={"/"}>Go to Home</Link>
            </Button>
          )}
      </div>
    </div>
  );
}
