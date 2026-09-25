"use client";

import { useEffect } from "react";

export default function PushProvider() {
  useEffect(() => {
    if (!("serviceWorker" in navigator)) return;

    navigator.serviceWorker
      .register("/sw.js")
      .then((registration) => {
        console.log("Service worker registered:", registration.scope);
      })
      .catch(console.error);
  }, []);

  return null;
}
