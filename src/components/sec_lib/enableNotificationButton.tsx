"use client";

import { useAlertDialog } from "../hooks/use-alert-dialog";
import { Button } from "../ui/button";

function urlBase64ToUint8Array(base64String: string) {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4);

  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/");

  const rawData = window.atob(base64);

  return Uint8Array.from([...rawData].map((char) => char.charCodeAt(0)));
}

export async function enablePushNotifications() {
  if (!("Notification" in window)) {
    throw new Error("Notifications are not supported by this browser.");
  }

  if (!("serviceWorker" in navigator)) {
    throw new Error("Service workers are not supported by this browser.");
  }

  const permission = await Notification.requestPermission();

  if (permission !== "granted") {
    throw new Error("Notification permission was not granted.");
  }

  const registration = await navigator.serviceWorker.register("/sw.js");
  const existingSubscription =
    await registration.pushManager.getSubscription();
  const subscription =
    existingSubscription ??
    (await registration.pushManager.subscribe({
      userVisibleOnly: true,
      applicationServerKey: urlBase64ToUint8Array(
        process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!,
      ),
    }));

  const response = await fetch("/api/push/subscribe", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subscription),
  });

  if (!response.ok) {
    throw new Error("Unable to save notification preferences.");
  }
}

export default function EnableNotificationButton() {
  const { alert } = useAlertDialog();
  const handleEnableClick = async () => {
    try {
      await enablePushNotifications();
      alert({ title: "Notifications enabled!" });
    } catch (error) {
      alert({
        title:
          error instanceof Error
            ? error.message
            : "Unable to enable notifications.",
      });
    }
  };

  return <Button onClick={handleEnableClick}>Enable Notifications</Button>;
}
