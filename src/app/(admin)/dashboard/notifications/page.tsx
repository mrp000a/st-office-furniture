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
  return (
    <main className="w-full space-y-6 p-3 sm:p-5 lg:p-6">
      {/* Header */}
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-end">
        <div>
          <div className="flex items-center gap-2">
            <Bell className="h-5 w-5 text-green-primary" />
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Notifications
            </h1>
          </div>

          <p className="mt-1 text-sm text-muted-foreground">
            Send promotions, announcements and important updates to your
            customers.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border border-border bg-card px-3 py-2 text-sm">
          <Bell className="h-4 w-4 text-green-primary" />
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
        <section className="rounded-xl border border-border bg-card shadow-sm">
          <div className="border-b border-border p-4 sm:p-5">
            <div className="flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-primary/10">
                <Send className="h-4 w-4 text-green-primary" />
              </div>

              <div>
                <h2 className="font-semibold">Create Notification</h2>
                <p className="text-xs text-muted-foreground">
                  Compose a notification for your customers.
                </p>
              </div>
            </div>
          </div>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              console.log({ form: "Submitted" });
              e.target.reset();
            }}
            className="space-y-5 p-4 sm:p-5"
          >
            {/* Type + Audience */}
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <label>Notification Type</label>

                <Select defaultValue="promotional">
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

                <Select defaultValue="all">
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
                <span className="text-[11px] text-muted-foreground">
                  Maximum 60 characters
                </span>
              </div>

              <Input
                id="notification-title"
                placeholder="e.g. 20% Off on All Office Chairs"
                maxLength={60}
              />
            </div>

            {/* Message */}
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <label htmlFor="notification-message">Message</label>
                <span className="text-[11px] text-muted-foreground">
                  Maximum 180 characters
                </span>
              </div>

              <Textarea
                id="notification-message"
                placeholder="Write your notification message here..."
                maxLength={180}
                className="min-h-28 resize-none"
              />
            </div>

            {/* Image */}
            <div className="space-y-2">
              <label>Notification Image</label>

              <label className="flex min-h-28 cursor-pointer flex-col items-center justify-center rounded-lg border border-dashed border-border bg-muted/20 px-4 text-center transition-colors hover:bg-muted/40">
                <ImagePlus className="mb-2 h-6 w-6 text-muted-foreground" />

                <span className="text-sm font-medium">Upload an image</span>

                <span className="mt-1 text-xs text-muted-foreground">
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
                <ExternalLink className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

                <Input
                  id="notification-url"
                  placeholder="/products/office-chair"
                  className="pl-9"
                />
              </div>

              <p className="text-[11px] text-muted-foreground">
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
            <div className="rounded-xl border border-border bg-muted/20 p-4">
              <div className="mb-3 flex items-center justify-between">
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Preview
                </span>

                <span className="text-[10px] text-muted-foreground">
                  Push notification
                </span>
              </div>

              <div className="flex gap-3 rounded-lg border border-border bg-background p-3 shadow-sm">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-primary/10">
                  <Bell className="h-5 w-5 text-green-primary" />
                </div>

                <div className="min-w-0">
                  <p className="truncate text-sm font-semibold">
                    20% Off on All Office Chairs
                  </p>
                  <p className="mt-0.5 line-clamp-2 text-xs text-muted-foreground">
                    Upgrade your workspace with our latest office chairs.
                    Limited time offer.
                  </p>
                  <p className="mt-1 text-[10px] text-muted-foreground">
                    ST Office Furniture · now
                  </p>
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex flex-col-reverse gap-2 border-t border-border pt-5 sm:flex-row sm:justify-end">
              <Button type="button" variant="outline">
                Save Draft
              </Button>

              <Button type="button" variant="outline">
                <CalendarClock className="h-4 w-4" />
                Schedule
              </Button>

              <Button
                type="submit"
                className="bg-green-primary text-white hover:bg-green-primary/90"
              >
                <Send className="h-4 w-4" />
                Send Notification
              </Button>
            </div>
          </form>
        </section>

        {/* Recent Notifications */}
        <section className="h-fit rounded-xl border border-border bg-card shadow-sm">
          <div className="flex items-center justify-between border-b border-border p-4 sm:p-5">
            <div>
              <h2 className="font-semibold">Recent Notifications</h2>
              <p className="mt-0.5 text-xs text-muted-foreground">
                Your latest notification activity.
              </p>
            </div>

            <Button variant="ghost" size="sm">
              View all
            </Button>
          </div>

          <div className="divide-y divide-border">
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
    <div className="rounded-xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="mt-1 text-2xl font-bold tracking-tight">{value}</p>
          <p className="mt-1 truncate text-[10px] text-muted-foreground">
            {description}
          </p>
        </div>

        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-green-primary/10">
          <Icon className="h-4 w-4 text-green-primary" />
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
    <div className="group p-4 transition-colors hover:bg-muted/30">
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

            <span className="shrink-0 text-[10px] text-muted-foreground">
              {notification.time}
            </span>
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-1.5 text-[10px] text-muted-foreground">
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
