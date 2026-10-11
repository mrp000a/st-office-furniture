"use client";

import { Bell, Check, ShieldCheck, Smartphone } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

import { enablePushNotifications } from "@/components/sec_lib/enableNotificationButton";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function ProfileNotificationCard() {
  const [shouldShow, setShouldShow] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isEnabling, setIsEnabling] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function checkNotificationStatus() {
      if (
        typeof window === "undefined" ||
        !("Notification" in window) ||
        !("serviceWorker" in navigator) ||
        Notification.permission === "denied"
      ) {
        setIsLoading(false);
        return;
      }

      try {
        const registration =
          await navigator.serviceWorker.getRegistration("/sw.js");
        const subscription = await registration?.pushManager.getSubscription();

        if (!subscription) {
          if (!cancelled) setShouldShow(true);
          return;
        }

        const response = await fetch(
          `/api/push/status?endpoint=${encodeURIComponent(subscription.endpoint)}`,
          { cache: "no-store" },
        );
        const result = await response.json();

        if (!cancelled && (!response.ok || !result.enabled)) {
          setShouldShow(true);
        }
      } catch (error) {
        console.error("Unable to check notification status:", error);
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    }

    void checkNotificationStatus();
    return () => {
      cancelled = true;
    };
  }, []);

  if (isLoading || !shouldShow) return null;

  async function enable() {
    setIsEnabling(true);
    try {
      await enablePushNotifications();
      toast.success("Notifications enabled", {
        description: "This device will receive your order and account updates.",
      });
      setShouldShow(false);
    } catch (error) {
      toast.error(
        error instanceof Error
          ? error.message
          : "Unable to enable notifications.",
      );
    } finally {
      setIsEnabling(false);
    }
  }

  return (
    <Card className="border-blue-primary/20 overflow-hidden">
      <div className="from-blue-primary/10 via-background to-green-primary/10 bg-gradient-to-r">
        <CardHeader className="flex flex-row items-start gap-3 space-y-0">
          <div className="bg-blue-primary/10 text-blue-primary flex size-10 shrink-0 items-center justify-center rounded-xl">
            <Bell className="size-5" />
          </div>
          <div className="min-w-0">
            <CardTitle className="text-lg">
              Enable notifications on this device
            </CardTitle>
            <p className="text-muted-foreground mt-1 text-sm">
              Stay informed without keeping the website open.
            </p>
          </div>
        </CardHeader>
        <CardContent className="pt-0">
          <div className="grid gap-3 sm:grid-cols-3">
            <Advantage
              icon={Check}
              title="Order updates"
              description="Know when your order is confirmed or delivered."
            />
            <Advantage
              icon={Smartphone}
              title="This device only"
              description="Enable notifications exactly where you shop."
            />
            <Advantage
              icon={ShieldCheck}
              title="Useful alerts"
              description="Receive relevant offers and account messages."
            />
          </div>
          <Button
            type="button"
            onClick={enable}
            disabled={isEnabling}
            className="bg-blue-primary hover:bg-blue-primary/90 mt-5 w-full text-white sm:w-auto"
          >
            {isEnabling ? "Enabling..." : "Enable notifications"}
          </Button>
        </CardContent>
      </div>
    </Card>
  );
}

function Advantage({
  icon: Icon,
  title,
  description,
}: {
  icon: typeof Check;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-background/70 rounded-lg border p-3">
      <Icon className="text-green-primary mb-2 size-4" />
      <p className="text-sm font-medium">{title}</p>
      <p className="text-muted-foreground mt-1 text-xs leading-5">
        {description}
      </p>
    </div>
  );
}
