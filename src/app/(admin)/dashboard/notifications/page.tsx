"use client";

import React from "react";
import {
  Bell,
  CalendarClock,
  CheckCircle2,
  Clock3,
  ExternalLink,
  ImagePlus,
  Send,
  Users,
  XCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
// import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const notifications = [
  {
    id: 1,
    title: "Weekend Special Offer",
    type: "Promotional",
    status: "Sent",
    audience: "All Subscribers",
    time: "2 hours ago",
  },
  {
    id: 2,
    title: "Your order has been shipped",
    type: "Notice",
    status: "Sent",
    audience: "Customers",
    time: "5 hours ago",
  },
  {
    id: 3,
    title: "New Office Chair Collection",
    type: "Promotional",
    status: "Scheduled",
    audience: "All Subscribers",
    time: "Tomorrow, 10:00 AM",
  },
  {
    id: 4,
    title: "Scheduled Maintenance",
    type: "Notice",
    status: "Failed",
    audience: "All Subscribers",
    time: "Yesterday",
  },
];

export default function AdminNotifications() {
  const [isSending, setIsSending] = React.useState(false);

  async function sendNotification(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSending(true);
    const formElement = event.currentTarget;

    try {
      const form = new FormData(formElement);
      const response = await fetch("/api/push/send", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type: form.get("type"),
          audience: form.get("audience"),
          title: form.get("title"),
          message: form.get("message"),
          url: form.get("url"),
          icon: form.get("icon"),
        }),
      });
      const result = await response.json();

      if (!response.ok || !result.success) {
        toast.error(result.message ?? "Unable to send notification.");
      } else {
        toast.success(result.message);
        formElement.reset();
      }
    } catch (error) {
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

      {/* Statistics */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard
          icon={Users}
          label="Subscribers"
          value="842"
          description="Active subscribers"
        />
        <StatCard
          icon={Send}
          label="Sent Today"
          value="28"
          description="Notifications sent"
        />
        <StatCard
          icon={CalendarClock}
          label="Scheduled"
          value="4"
          description="Upcoming notifications"
        />
        <StatCard
          icon={CheckCircle2}
          label="Delivery Rate"
          value="98.4%"
          description="Successful delivery"
        />
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

          <form
            onSubmit={sendNotification}
            className="space-y-5 p-4 sm:p-5"
          >
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

            {/* Icon */}
            <div className="space-y-2">
              <label htmlFor="notification-icon">Notification Icon</label>

              <Input
                id="notification-icon"
                name="icon"
                type="url"
                placeholder="https://example.com/notification-icon.png"
              />

              <p className="text-muted-foreground text-[11px]">
                Optional. Use a publicly accessible square PNG or JPG URL.
              </p>
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label>Notification Image</label>

              <label className="border-border bg-muted/20 hover:bg-muted/40 flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed px-4 text-center transition-colors">
                <ImagePlus className="text-muted-foreground mb-2 h-6 w-6" />

                <span className="text-sm font-medium">Upload an image</span>

                <span className="text-muted-foreground mt-1 text-xs">
                  Optional · JPG, PNG or WebP
                </span>

                <Input
                  type="file"
                  accept="image/png,image/jpeg,image/webp"
                  className="hidden"
                />
              </label>
            </div>

            {/* Action URL */}
            <div className="space-y-2">
              <label htmlFor="notification-url">Action URL</label>

              <div className="relative">
                <ExternalLink className="text-muted-foreground absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2" />

                <Input
                  id="notification-url"
                  name="url"
                  placeholder="/products/office-chair"
                  className="pl-9"
                />
              </div>

              <p className="text-muted-foreground text-[11px]">
                Where should the customer go when they click the notification?
              </p>
            </div>

            {/* Schedule */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label>Delivery</label>

                <Select defaultValue="now">
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>

                  <SelectContent>
                    <SelectItem value="now">Send Immediately</SelectItem>
                    <SelectItem value="schedule">Schedule</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <label htmlFor="schedule">Schedule Time</label>

                <Input id="schedule" type="datetime-local" />
              </div>
            </div>

            {/* Preview */}
            <div className="border-border bg-muted/20 rounded-xl border p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-muted-foreground text-xs font-semibold tracking-wider uppercase">
                  Preview
                </span>

                <span className="text-muted-foreground text-[10px]">
                  Push notification
                </span>
              </div>

              <div className="border-border bg-background flex gap-3 rounded-lg border p-3 shadow-sm">
                <div className="bg-green-primary/10 flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <Bell className="text-green-primary h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    20% Off on All Office Chairs
                  </p>
                  <p className="text-muted-foreground mt-0.5 line-clamp-2 text-xs">
                    Upgrade your workspace with our latest office chairs.
                    Limited time offer.
                  </p>
                  <p className="text-muted-foreground mt-1 text-[10px]">
                    ST Office Furniture · now
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="border-border flex flex-col-reverse gap-2 border-t pt-5 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline">
                Save Draft
              </Button>

              <Button type="button" variant="outline">
                <CalendarClock className="h-4 w-4" />
                Schedule
              </Button>

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

function StatCard({
  icon: Icon,
  label,
  value,
  description,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  description: string;
}) {
  return (
    <div className="border-border bg-card rounded-xl border p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-muted-foreground text-xs">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
          <p className="text-muted-foreground mt-1 truncate text-[10px]">
            {description}
          </p>
        </div>

        <div className="bg-green-primary/10 flex h-9 w-9 shrink-0 items-center justify-center rounded-lg">
          <Icon className="text-green-primary h-4 w-4" />
        </div>
      </div>
    </div>
  );
}

function NotificationItem({
  notification,
}: {
  notification: (typeof notifications)[number];
}) {
  const statusConfig = {
    Sent: {
      icon: CheckCircle2,
      className: "text-green-600 bg-green-500/10",
    },
    Scheduled: {
      icon: Clock3,
      className: "text-orange-500 bg-orange-500/10",
    },
    Failed: {
      icon: XCircle,
      className: "text-red-500 bg-red-500/10",
    },
  };

  const config = statusConfig[notification.status as keyof typeof statusConfig];
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
              {notification.time}
            </span>
          </div>

          <div className="text-muted-foreground mt-1 flex flex-wrap items-center gap-1.5 text-[10px]">
            <span>{notification.type}</span>
            <span>•</span>
            <span>{notification.audience}</span>
          </div>

          <div className="mt-2">
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-medium ${config.className}`}
            >
              {notification.status}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
