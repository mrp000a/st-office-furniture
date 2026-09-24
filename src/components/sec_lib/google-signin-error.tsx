"use client";

import { useSearchParams } from "next/navigation";

export default function GoogleLoginMessage() {
  const searchParams = useSearchParams();

  const error = searchParams.get("error");

  if (!error) {
    return null;
  }

  let message = "";

  switch (error) {
    case "GoogleAccountNotRegistered":
      message =
        "No ST Office Furniture account was found with this Google account. Please register first.";

      break;

    case "GoogleEmailNotFound":
      message =
        "Google did not provide an email address. Please try another Google account.";

      break;

    default:
      message = "We couldn't sign you in with Google. Please try again.";
  }

  return (
    <div className="mb-4 rounded-lg border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive">
      {message}
    </div>
  );
}
