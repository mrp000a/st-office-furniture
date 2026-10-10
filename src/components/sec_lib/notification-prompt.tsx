"use client";

import { Bell, Check, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import {
  enablePushNotifications,
} from "@/components/sec_lib/enableNotificationButton";
import { Button } from "@/components/ui/button";

const DISMISSED_KEY = "st-office-notification-prompt-dismissed";
const DISMISS_FOR_MS = 30 * 24 * 60 * 60 * 1000;

export default function NotificationPrompt() {
  const pathname = usePathname();
  const [visible, setVisible] = useState(false);
  const [isEnabling, setIsEnabling] = useState(false);

  useEffect(() => {
    if (
      pathname.startsWith("/dashboard") ||
      !("Notification" in window) ||
      Notification.permission !== "default"
    ) {
      return;
    }

    const timer = window.setTimeout(() => {
      const dismissedAt = Number(localStorage.getItem(DISMISSED_KEY));
      if (!dismissedAt || Date.now() - dismissedAt > DISMISS_FOR_MS) {
        setVisible(true);
      }
    }, 8000);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  if (!visible) return null;

  const dismiss = () => {
    localStorage.setItem(DISMISSED_KEY, String(Date.now()));
    setVisible(false);
  };

  const enable = async () => {
    setIsEnabling(true);
    try {
      await enablePushNotifications();
      toast.success("Notifications enabled", {
        description: "We will keep you updated about your orders and new products.",
      });
      setVisible(false);
    } catch (error) {
      if (
        error instanceof Error &&
        error.message === "Notification permission was not granted."
      ) {
        toast.info("Notifications were not enabled.");
      } else {
        toast.error(
          error instanceof Error
            ? error.message
            : "Unable to enable notifications.",
        );
      }
    } finally {
      setIsEnabling(false);
    }
  };

  return (
    <aside
      role="dialog"
      aria-label="Enable notifications"
      className="bg-background fixed left-4 bottom-4 z-60 box-border w-[min( calc(100vw-2rem),_25rem)] rounded-xl border p-4 shadow-xl"
    >
      <div className="flex gap-3">
        <div className="bg-green-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
          <Bell className="text-green-primary h-5 w-5" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h2 className="text-sm font-semibold">Stay up to date</h2>
            <Button
              type="button"
              variant="ghost"
              size="icon-xs"
              aria-label="Dismiss notification prompt"
              onClick={dismiss}
            >
              <X />
            </Button>
          </div>
          <p className="text-muted-foreground mt-1 text-xs">
            Get useful updates without checking back manually.
          </p>
          <ul className="text-muted-foreground mt-3 space-y-1 text-xs">
            <li className="flex items-center gap-1.5">
              <Check className="text-green-primary h-3.5 w-3.5" />
              Order status and delivery updates
            </li>
            <li className="flex items-center gap-1.5">
              <Check className="text-green-primary h-3.5 w-3.5" />
              New products and helpful offers
            </li>
          </ul>
          <div className="mt-4 flex justify-end gap-2">
            <Button type="button" variant="ghost" onClick={dismiss}>
              Not now
            </Button>
            <Button
              type="button"
              onClick={enable}
              disabled={isEnabling}
              className="bg-green-primary text-white hover:bg-green-primary/90"
            >
              {isEnabling ? "Enabling..." : "Enable notifications"}
            </Button>
          </div>
        </div>
      </div>
    </aside>
  );
}
