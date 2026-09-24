"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";

export default function GoogleButton() {
  const [loading, setLoading] = useState(false);

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);

      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (error) {
      console.error("Google login error:", error);
      setLoading(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleGoogleLogin}
      disabled={loading}
      className="flex cursor-pointer h-11 w-full items-center justify-center gap-3 rounded-lg border bg-background px-4 text-sm font-medium transition hover:bg-muted disabled:pointer-events-none disabled:opacity-60"
    >
      {loading ? (
        <>
          <span className="h-4 w-4 animate-spin rounded-full border-2 border-current border-t-transparent" />

          <span>Connecting...</span>
        </>
      ) : (
        <>
          <GoogleIcon />

          <span>Continue with Google</span>
        </>
      )}
    </button>
  );
}

function GoogleIcon() {
  return (
    <svg viewBox="0 0 24 24" className="h-5 w-5" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.35 12.23c0-.79-.07-1.55-.23-2.27H12v4.3h5.22a4.47 4.47 0 0 1-1.94 2.93v2.44h3.14c1.84-1.69 2.93-4.18 2.93-7.4Z"
      />

      <path
        fill="#34A853"
        d="M12 21.75c2.63 0 4.84-.87 6.46-2.35l-3.14-2.44c-.87.58-1.98.92-3.32.92-2.55 0-4.71-1.72-5.49-4.03H3.27v2.52A9.75 9.75 0 0 0 12 21.75Z"
      />

      <path
        fill="#FBBC05"
        d="M6.51 13.85A5.86 5.86 0 0 1 6.2 12c0-.64.11-1.26.31-1.85V7.63H3.27A9.75 9.75 0 0 0 2.25 12c0 1.57.38 3.05 1.02 4.37l3.24-2.52Z"
      />

      <path
        fill="#EA4335"
        d="M12 6.12c1.43 0 2.72.49 3.74 1.46l2.8-2.8C16.84 3.2 14.63 2.25 12 2.25a9.75 9.75 0 0 0-8.73 5.38l3.24 2.52C7.29 7.84 9.45 6.12 12 6.12Z"
      />
    </svg>
  );
}
