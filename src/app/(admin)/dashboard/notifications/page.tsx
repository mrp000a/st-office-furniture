"use client";

import React from "react";
import { Bell, CheckCircle2, ImagePlus, Send, XCircle } from "lucide-react";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { deleteFile, uploadFile } from "@/lib/api";
import { getImageUrl } from "@/lib/getImageUrl";
import { OTHER_IMAGE_MAX_SIZE } from "@/lib/image-upload-limits";
// import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

type RecentNotification = {
  id: number;
  title: string;
  body: string;
  url: string | null;
  delivered: boolean;
  error: string | null;
  createdAt: string;
};

export default function AdminNotifications() {
  const [isSending, setIsSending] = React.useState(false);
  const [notifications, setNotifications] = React.useState<
    RecentNotification[]
  >([]);

  useEffect(() => {
    fetch("/api/push/send", { cache: "no-store" })
      .then(async (response) => {
        const result = await response.json();
        if (!response.ok || !result.success) {
          throw new Error(result.message ?? "Unable to load notifications.");
        }
        setNotifications(result.notifications);
      })
      .catch((error) => {
        console.error("Recent notification loading error:", error);
        toast.error("Unable to load recent notifications.");
      });
  }, []);

  async function sendNotification(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    const formElement = event.currentTarget;
    let uploadedImageKey: string | undefined;

    try {
      const form = new FormData(formElement);
      const imageFile = form.get("imageFile");
      let image =
        typeof form.get("imageUrl") === "string"
          ? String(form.get("imageUrl")).trim()
          : "";

      if (imageFile instanceof File && imageFile.size > 0) {
        if (imageFile.size > OTHER_IMAGE_MAX_SIZE) {
          throw new Error("Notification image must be 2 MB or smaller.");
        }

        const upload = await uploadFile(
          imageFile,
          "r2upload/notifications/images",
        );
        if (!upload.success || !upload.key) {
          throw new Error(
            upload.message ?? "Unable to upload notification image.",
          );
        }

        uploadedImageKey = upload.key;
        image = getImageUrl(upload.key);
      }

      const response = await fetch("/api/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.get("type"),
          audience: form.get("audience"),
          title: form.get("title"),
          message: form.get("message"),
          url: form.get("url"),
          icon: image,
          image,
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        if (uploadedImageKey) {
          await deleteFile(uploadedImageKey);
          uploadedImageKey = undefined;
        }
        toast.error(result.message ?? "Unable to send notification.");
      } else {
        toast.success(result.message);
        formElement.reset();
      }
    } catch (error) {
      if (uploadedImageKey) {
        await deleteFile(uploadedImageKey);
        uploadedImageKey = undefined;
      }
      console.error("Notification send error:", error);
      toast.error("Unable to send notification. Please try again.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <main className="w-full space-y-6 p-3 sm:p-5 lg:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="text-green-primary h-5 w-5" />
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Notifications
            </h1>
          </div>

          <p className="text-muted-foreground mt-1 text-sm">
            Send promotions, announcements and important updates to your
            customers.
          </p>
        </div>

        <div className="border-border bg-card flex items-center gap-2 rounded-lg border px-3 py-2 text-sm">
          <Bell className="text-green-primary h-4 w-4" />
          <span className="font-medium">Push notifications</span>
          <span className="h-2 w-2 rounded-full bg-green-500" />
          <span className="text-muted-foreground">Active</span>
        </div>
      </div>

      {/* Main */}
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.15fr)_minmax(360px,0.85fr)]">
        {/* Create Notification */}
        <section className="border-border bg-card rounded-xl border shadow-sm">
          <div className="border-border border-b p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="bg-green-primary/10 flex h-9 w-9 items-center justify-center rounded-lg">
                <Send className="text-green-primary h-4 w-4" />
              </div>

              <div>
                <h2 className="font-semibold">Create Notification</h2>
                <p className="text-muted-foreground text-xs">
                  Compose a notification for your customers.
                </p>
              </div>
            </div>
          </div>

          <form onSubmit={sendNotification} className="space-y-5 p-4 sm:p-5">
            {/* Type + Audience */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label>Notification Type</label>

                <Select name="type" defaultValue="promotional">
                  <SelectTrigger>
                    <SelectValue placeholder="Select notification type" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="promotional">Promotional</SelectItem>
                    <SelectItem value="notice">Notice</SelectItem>
                    <SelectItem value="order">Order Update</SelectItem>
                    <SelectItem value="system">System Announcement</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label>Audience</label>

                <Select name="audience" defaultValue="all">
                  <SelectTrigger>
                    <SelectValue placeholder="Select audience" />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="all">All Subscribers</SelectItem>
                    <SelectItem value="customers">Customers</SelectItem>
                    <SelectItem value="new-customers">New Customers</SelectItem>
                    <SelectItem value="inactive">Inactive Customers</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Title */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="notification-title">Notification Title</label>
                <span className="text-muted-foreground text-[11px]">
                  Maximum 60 characters
                </span>
              </div>

              <Input
                id="notification-title"
                name="title"
                placeholder="e.g. 20% Off on All Office Chairs"
                maxLength={60}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="notification-message">Message</label>
                <span className="text-muted-foreground text-[11px]">
                  Maximum 180 characters
                </span>
              </div>

              <Textarea
                id="notification-message"
                name="message"
                placeholder="Write your notification message here..."
                maxLength={180}
                className="min-h-28 resize-none"
              />
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label>Notification icon and image</label>

              <label className="border-border bg-muted/20 hover:bg-muted/40 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 text-center transition-colors">
                <ImagePlus className="text-muted-foreground mb-2 h-6 w-6" />

                <span className="text-sm font-medium">
                  Upload notification image
                </span>

                <span className="text-muted-foreground mt-1 text-xs">
                  Optional · JPG, PNG or WebP · maximum 2 MB
                </span>

                <Input
                  id="notification-image-file"
                  name="imageFile"
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="file:rounded-full file:border-2 file:px-3"
                />
              </label>

              <Input
                id="notification-image-url"
                name="imageUrl"
                type="url"
                placeholder="Or paste a public image URL"
              />

              <p className="text-muted-foreground text-[11px]">
                Optional. The selected image is used as both the notification
                icon and image. Uploaded files take priority over the URL.
              </p>
            </div>

            {/* Action URL */}
            <div className="space-y-2">
              <label htmlFor="notification-url">Action URL</label>

              <div className="relative">
                <Input
                  id="notification-url"
                  name="url"
                  placeholder="e.g /products/office-chair"
                />
              </div>

              <p className="text-muted-foreground text-[11px]">
                Where should the customer go when they click the notification?
              </p>
            </div>

            {/* Buttons */}
            <div className="border-border flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:justify-end">
              <Button
                type="submit"
                disabled={isSending}
                className="bg-green-primary hover:bg-green-primary/90 text-white"
              >
                <Send className="h-4 w-4" />
                {isSending ? "Sending..." : "Send Notification"}
              </Button>
            </div>
          </form>
        </section>

        {/* Recent Notifications */}
        <section className="border-border bg-card h-fit rounded-xl border shadow-sm">
          <div className="border-border flex items-center justify-between border-b p-4 sm:p-5">
            <div>
              <h2 className="font-semibold">Recent Notifications</h2>
              <p className="text-muted-foreground mt-0.5 text-xs">
                Your latest notification activity.
              </p>
            </div>

            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>

          <div className="divide-border divide-y">
            {notifications.map((notification) => (
              <NotificationItem
                key={notification.id}
                notification={notification}
              />
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function NotificationItem({
  notification,
}: {
  notification: RecentNotification;
}) {
  const statusConfig = {
    Sent: {
      icon: CheckCircle2,
      className: "text-green-600 bg-green-500/10",
    },
    Failed: {
      icon: XCircle,
      className: "text-red-500 bg-red-500/10",
    },
  };

  const status = notification.delivered ? "Sent" : "Failed";
  const config = statusConfig[status];
  const StatusIcon = config.icon;

  return (
    <div className="group hover:bg-muted/30 p-4 transition-colors">
      <div className="flex gap-3">
        <div
          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${config.className}`}
        >
          <StatusIcon className="h-4 w-4" />
        </div>

        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <h3 className="truncate text-sm font-medium">
              {notification.title}
            </h3>

            <span className="text-muted-foreground shrink-0 text-[10px]">
              {new Date(notification.createdAt).toLocaleString("en-BD")}
            </span>
          </div>

          <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
            <span>Admin panel</span>
            <span>•</span>
            <span>{notification.body}</span>
          </div>

          <div className="mt-2">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.className}`}
            >
              {status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
