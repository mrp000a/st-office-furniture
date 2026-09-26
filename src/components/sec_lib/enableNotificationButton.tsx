"use client";

import { useAlertDialog } from "../hooks/use-alert-dialog";
import { Button } from "../ui/button";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export default function EnableNotificationButton() {
  const { alert } = useAlertDialog();
  const handleEnableClick = async () => {
    if (!("Notification" in window)) {
      alert({ title: "Notifications are not supported." });
      return;
    }

    if (!("serviceWorker" in navigator)) {
      alert({ title: "Service Worker is not supported." });
      return;
    }

    const permission = await Notification.requestPermission();

    if (permission !== "granted") {
      return;
    }

    const registration = await navigator.serviceWorker.register("/sw.js");

    const subscription = await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    });

    await fetch("/api/push/subscribe", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(subscription),
    });

    alert({ title: "Notifications enabled!" });
  };

  return <Button onClick={handleEnableClick}>Enable Notifications</Button>;
}
