import { Metadata } from "next";
import Link from "next/link";
import {
  ArrowLeft,
  Bell,
  CalendarDays,
  CheckCircle2,
  Clock3,
  Mail,
  MapPin,
  Package,
  Phone,
  ShieldCheck,
  UserRound,
  XCircle,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { coreInfo } from "@/components/data/core";
import { prisma } from "@/lib/prisma";
import { getImageUrl } from "@/lib/getImageUrl";
import { notFound } from "next/navigation";

type Props = {
  params: Promise<{ id: string }>;
};

const money = (value: unknown) =>
  `৳${Number(value ?? 0).toLocaleString("en-BD", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })}`;

const date = (value: Date | string) =>
  new Date(value).toLocaleDateString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

const dateTime = (value: Date | string) =>
  new Date(value).toLocaleString("en-BD", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");
}

function statusClass(status: string) {
  if (["DELIVERED", "PAID", "CONFIRMED"].includes(status)) {
    return "bg-green-600 text-white hover:bg-green-600";
  }
  if (["FAILED", "CANCELLED", "FAILED_DELIVERY"].includes(status)) {
    return "bg-destructive text-white hover:bg-destructive";
  }
  return "";
}

export default async function UserDetailsPage({ params }: Props) {
  const { id } = await params;
  const userId = Number(id);

  if (!Number.isInteger(userId) || userId < 1) notFound();

  const user = await prisma.user.findUnique({
    where: { id: userId },
    select: {
      id: true,
      name: true,
      email: true,
      phone: true,
      address: true,
      image: true,
      gender: true,
      role: true,
      emailVerified: true,
      varifiedAt: true,
      googleId: true,
      createdAt: true,
      updatedAt: true,
      _count: {
        select: {
          orders: true,
          proReviews: true,
          pushSubscriptions: true,
          notifications: true,
        },
      },
      orders: {
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          id: true,
          publicId: true,
          status: true,
          paymentStatus: true,
          total: true,
          createdAt: true,
          _count: { select: { items: true } },
        },
      },
      activityLogs: {
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          id: true,
          title: true,
          description: true,
          action: true,
          createdAt: true,
        },
      },
      notifications: {
        orderBy: { createdAt: "desc" },
        take: 8,
        select: {
          id: true,
          title: true,
          body: true,
          type: true,
          delivered: true,
          error: true,
          createdAt: true,
        },
      },
    },
  });

  if (!user) notFound();

  const spending = await prisma.order.aggregate({
    where: { userId: user.id },
    _sum: { total: true },
  });
  const totalSpent = Number(spending._sum.total ?? 0);

  return (
    <main className="mx-auto w-full max-w-[1500px] space-y-6 px-3 pb-8 sm:px-5 lg:px-6">
      <div className="flex flex-col justify-between gap-4 border-b pb-5 sm:flex-row sm:items-center">
        <div className="flex items-start gap-3">
          <Button asChild variant="outline" size="icon">
            <Link href="/dashboard/users" aria-label="Back to users">
              <ArrowLeft className="size-4" />
            </Link>
          </Button>
          <div>
            <p className="text-muted-foreground text-sm">Dashboard / Users</p>
            <h1 className="text-2xl font-bold tracking-tight">
              {user.name} <span className="text-muted-foreground font-mono text-base">#{user.id}</span>
            </h1>
          </div>
        </div>
        <div className="flex gap-2">
          <Button asChild variant="outline">
            <Link href="/dashboard/users">All users</Link>
          </Button>
        </div>
      </div>

      <section className="grid gap-5 xl:grid-cols-[minmax(0,1fr)_360px]">
        <div className="space-y-5">
          <section className="rounded-xl border bg-card p-5 shadow-sm">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
              <Avatar className="size-24 border-4 border-background shadow sm:size-28">
                <AvatarImage src={getImageUrl(user.image)} alt={user.name} />
                <AvatarFallback className="text-2xl font-bold">{initials(user.name)}</AvatarFallback>
              </Avatar>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h2 className="text-2xl font-bold">{user.name}</h2>
                  <Badge variant="outline" className="capitalize">{user.role.toLowerCase()}</Badge>
                  {user.emailVerified ? (
                    <Badge className="gap-1 bg-green-600 hover:bg-green-600"><CheckCircle2 className="size-3.5" /> Verified</Badge>
                  ) : (
                    <Badge variant="destructive" className="gap-1"><XCircle className="size-3.5" /> Unverified</Badge>
                  )}
                </div>
                <p className="text-muted-foreground mt-1">{user.email}</p>
                <div className="text-muted-foreground mt-3 flex flex-wrap gap-x-5 gap-y-2 text-xs">
                  <span className="inline-flex items-center gap-1"><CalendarDays className="size-3.5" /> Joined {date(user.createdAt)}</span>
                  <span className="inline-flex items-center gap-1"><Clock3 className="size-3.5" /> Updated {date(user.updatedAt)}</span>
                  {user.googleId && <span className="inline-flex items-center gap-1"><ShieldCheck className="size-3.5" /> Google account</span>}
                </div>
              </div>
            </div>
          </section>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <Stat icon={Package} label="Orders" value={user._count.orders} />
            <Stat icon={Bell} label="Notifications" value={user._count.notifications} />
            <Stat icon={ShieldCheck} label="Reviews" value={user._count.proReviews} />
            <Stat icon={CheckCircle2} label="Total spent" value={money(totalSpent)} />
          </div>

          <section className="rounded-xl border bg-card shadow-sm">
            <SectionTitle icon={UserRound} title="Contact and account details" />
            <div className="grid gap-5 p-5 sm:grid-cols-2">
              <Detail icon={Mail} label="Email" value={user.email} />
              <Detail icon={Phone} label="Phone" value={user.phone || "Not provided"} />
              <Detail icon={MapPin} label="Address" value={user.address || "Not provided"} />
              <Detail icon={UserRound} label="Gender" value={user.gender?.toLowerCase() || "Not provided"} />
              <Detail icon={ShieldCheck} label="Verification" value={user.emailVerified ? `Verified ${user.varifiedAt ? `on ${date(user.varifiedAt)}` : ""}` : "Email not verified"} />
              <Detail icon={CalendarDays} label="Account created" value={dateTime(user.createdAt)} />
            </div>
          </section>

          <section className="rounded-xl border bg-card shadow-sm">
            <SectionTitle icon={Package} title="Recent orders" action={`${user._count.orders} total`} />
            {user.orders.length ? (
              <div className="divide-y">
                {user.orders.map((order) => (
                  <div key={order.id} className="flex flex-col gap-2 p-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                      <Link href={`/dashboard/orders/${order.id}`} className="font-semibold hover:underline">Order #{order.id}</Link>
                      <p className="text-muted-foreground text-xs">{dateTime(order.createdAt)} · {order._count.items} item(s)</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right"><p className="font-semibold">{money(order.total)}</p><p className="text-muted-foreground text-xs">{order.paymentStatus}</p></div>
                      <Badge className={statusClass(order.status)} variant="outline">{order.status.replaceAll("_", " ")}</Badge>
                    </div>
                  </div>
                ))}
              </div>
            ) : <Empty text="No orders found for this user." />}
          </section>
        </div>

        <aside className="space-y-5">
          <section className="rounded-xl border bg-card shadow-sm">
            <SectionTitle icon={Bell} title="Notification history" action={`${user._count.notifications} total`} />
            {user.notifications.length ? (
              <div className="divide-y">
                {user.notifications.map((notification) => (
                  <div key={notification.id} className="space-y-1 p-4">
                    <div className="flex items-start justify-between gap-2">
                      <p className="text-sm font-semibold">{notification.title}</p>
                      {notification.delivered ? <CheckCircle2 className="size-4 shrink-0 text-green-600" /> : <XCircle className="text-muted-foreground size-4 shrink-0" />}
                    </div>
                    <p className="text-muted-foreground line-clamp-2 text-xs">{notification.body}</p>
                    <p className="text-muted-foreground text-[11px]">{notification.type} · {dateTime(notification.createdAt)}</p>
                  </div>
                ))}
              </div>
            ) : <Empty text="No notifications sent yet." />}
          </section>

          <section className="rounded-xl border bg-card shadow-sm">
            <SectionTitle icon={Clock3} title="Recent activity" />
            {user.activityLogs.length ? (
              <div className="divide-y">
                {user.activityLogs.map((activity) => (
                  <div key={activity.id} className="p-4">
                    <p className="text-sm font-semibold">{activity.title}</p>
                    <p className="text-muted-foreground mt-1 text-xs">{activity.description}</p>
                    <p className="text-muted-foreground mt-1 text-[11px]">{activity.action} · {dateTime(activity.createdAt)}</p>
                  </div>
                ))}
              </div>
            ) : <Empty text="No activity recorded yet." />}
          </section>

          <section className="rounded-xl border bg-card p-4 shadow-sm">
            <h2 className="font-semibold">Push subscription</h2>
            <p className="text-muted-foreground mt-1 text-sm">
              {user._count.pushSubscriptions > 0
                ? `${user._count.pushSubscriptions} active subscription(s) connected.`
                : "This user has not enabled push notifications."}
            </p>
          </section>
        </aside>
      </section>
    </main>
  );
}

function Stat({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string | number }) {
  return <div className="rounded-xl border bg-card p-4 shadow-sm"><div className="text-muted-foreground flex items-center justify-between text-xs"><span>{label}</span><Icon className="size-4" /></div><p className="mt-2 text-xl font-bold">{value}</p></div>;
}

function SectionTitle({ icon: Icon, title, action }: { icon: typeof Package; title: string; action?: string }) {
  return <div className="flex items-center justify-between border-b px-5 py-4"><h2 className="flex items-center gap-2 font-semibold"><Icon className="text-primary size-4" />{title}</h2>{action && <span className="text-muted-foreground text-xs">{action}</span>}</div>;
}

function Detail({ icon: Icon, label, value }: { icon: typeof Package; label: string; value: string }) {
  return <div className="flex gap-3"><Icon className="text-muted-foreground mt-0.5 size-4 shrink-0" /><div className="min-w-0"><p className="text-muted-foreground text-xs">{label}</p><p className="mt-1 break-words text-sm font-medium capitalize">{value}</p></div></div>;
}

function Empty({ text }: { text: string }) {
  return <p className="text-muted-foreground p-5 text-sm">{text}</p>;
}

export const metadata: Metadata = {
  title: `User Details | ${coreInfo.name}`,
  description: coreInfo.description,
};
