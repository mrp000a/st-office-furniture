"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function AnalyticsTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const fullPath = searchParams.toString()
      ? `${pathname}?${searchParams.toString()}`
      : pathname;

    // Asynchronously log custom pageview to your PostgreSQL DB
    fetch("/api/track", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        path: fullPath,
        referrer: document.referrer || null,
      }),
    }).catch((err) => console.error("Failed to send DB telemetry", err));
  }, [pathname, searchParams]);

  return null;
}
