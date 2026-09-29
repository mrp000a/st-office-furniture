"use client";

import Link from "next/link";
import Image from "next/image";
import {
  User,
  Mail,
  Phone,
  MapPin,
  CalendarDays,
  ShieldCheck,
  ShoppingBag,
  Heart,
  Settings,
  Pencil,
  ChevronRight,
  Package,
  Clock3,
  CheckCircle2,
  CreditCard,
  Trash2,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { ProfileDefaultImage } from "@/components/data/core";
import { OrderStatusBadge } from "@/components/uiComponent/order-status-badge";
import { Gender, OrderStatus, UserRole } from "@/generated/prisma";
import EditProfile from "./_tabs/editProfile";
import { useState } from "react";
import { SignOut } from "@/components/sec_lib/Sessions";
import { IoMdLogOut } from "react-icons/io";
import { getImageUrl } from "@/lib/getImageUrl";

type ProfileHomeProps = {
  user: {
    id?: number;
    name?: string | null;
    email?: string | null;
    phone?: string | null;
    gender?: Gender | null;
    image?: string | null;
    address?: string | null;
    role?: UserRole | null;
    verified?: boolean;
    createdAt?: string | Date;
  };

  stats?: {
    orders?: number;
    completedOrders?: number;
    pendingOrders?: number;
    wishlist?: number;
  };

  recentOrders?: {
    id: string | number;
    orderNumber?: string;
    status: OrderStatus;
    total?: number;
    createdAt?: string | Date;
  }[];
};

export default function ProfileHome({
  user,
  stats = {},
  recentOrders = [],
}: ProfileHomeProps) {
  const [openEditUser, setOpenEditUser] = useState(false);

  const displayName = user.name || "User";

  const initials = displayName
    .split(" ")
    .map((word) => word[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const formatDate = (date?: string | Date) => {
    if (!date) return "N/A";

    return new Date(date).toLocaleDateString("en-BD", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatCurrency = (value?: number) => {
    if (value === undefined) return "৳0.00";

    return `৳${value.toLocaleString("en-BD", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    })}`;
  };

  return (
    <main className="mx-auto w-full max-w-384 space-y-6 p-3">
      {/* ========================================================= */}
      {/* PROFILE HEADER */}
      {/* ========================================================= */}

      <section className="bg-background relative overflow-hidden rounded-2xl border shadow-sm">
        {/* Background */}
        <div className="from-blue-primary/20 via-blue-primary/10 to-background h-32 bg-gradient-to-r sm:h-40" />

        <div className="relative px-5 pb-6 sm:px-8">
          {/* Avatar */}
          <div className="-mt-12 flex flex-col gap-5 sm:-mt-16 sm:flex-row sm:items-end sm:justify-between">
            <div className="flex items-end gap-4">
              <div className="border-background bg-muted relative h-24 w-24 shrink-0 overflow-hidden rounded-full border-4 shadow-lg sm:h-32 sm:w-32">
                {user.image ? (
                  <Image
                    unoptimized
                    src={getImageUrl(user.image)}
                    alt={displayName}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                ) : (
                  <div className="text-muted-foreground flex h-full w-full items-center justify-center text-2xl font-bold sm:text-3xl">
                    {initials}
                  </div>
                )}
              </div>

              <div className="pb-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h1 className="text-xl font-bold sm:text-2xl">
                    {displayName}
                  </h1>

                  {user.verified && (
                    <ShieldCheck className="text-background h-5 w-5 fill-blue-500" />
                  )}
                </div>

                <p className="text-muted-foreground text-sm">
                  {user.role || "Customer"}
                </p>
              </div>
            </div>

            {/* Edit button */}
            <div className="flex flex-wrap items-center gap-2">
              <Button
                variant={"outline"}
                onClick={() => {
                  console.log("object");
                  setOpenEditUser(true);
                }}
                className="w-full sm:w-auto"
              >
                <Pencil className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
              <Button
                onClick={() => SignOut()}
                variant={"destructive"}
                className="cursor-pointer"
              >
                <IoMdLogOut size={3.2} />
                Logout
              </Button>
              {/* <Button
                variant={"default"}
                disabled
                className="cursor-pointer bg-green-primary"
              >
                <Trash2 size={3.2} />
                Delete Account
              </Button> */}
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================= */}
      {/* STATISTICS */}
      {/* ========================================================= */}

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <StatCard
          icon={ShoppingBag}
          title="Total Orders"
          value={stats.orders ?? 0}
        />

        <StatCard
          icon={CheckCircle2}
          title="Completed"
          value={stats.completedOrders ?? 0}
        />

        <StatCard
          icon={Clock3}
          title="Pending"
          value={stats.pendingOrders ?? 0}
        />

        <StatCard icon={Heart} title="Wishlist" value={stats.wishlist ?? 0} />
      </section>

      {/* ========================================================= */}
      {/* MAIN CONTENT */}
      {/* ========================================================= */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* LEFT */}
        <div className="space-y-6 lg:col-span-2">
          {/* Personal Information */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Personal Information</CardTitle>

              <Button
                onClick={() => setOpenEditUser(true)}
                variant="ghost"
                size="icon"
              >
                <Pencil className="h-4 w-4" />
              </Button>
            </CardHeader>

            <CardContent className="grid gap-5 sm:grid-cols-2">
              <InfoItem icon={User} label="Full Name" value={user.name} />

              <InfoItem icon={User} label="Gender" value={user.gender} />

              <InfoItem icon={Mail} label="Email" value={user.email} />

              <InfoItem icon={Phone} label="Phone" value={user.phone} />
            </CardContent>
          </Card>

          {/* Address */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Delivery Address</CardTitle>
            </CardHeader>

            <CardContent>
              <div className="bg-muted/30 flex gap-4 rounded-xl border p-4">
                <div className="bg-blue-primary/10 text-blue-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
                  <MapPin className="h-5 w-5" />
                </div>

                <div>
                  <p className="mb-1 text-sm font-medium">Default Address</p>

                  <p className="text-muted-foreground text-sm leading-6">
                    {user.address || "No delivery address added yet."}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Orders */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle className="text-lg">Recent Orders</CardTitle>

              <Button asChild variant="ghost" size="sm">
                <Link href="/profile/orders">
                  View All
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </CardHeader>

            <CardContent className="space-y-3">
              {recentOrders.length === 0 ? (
                <div className="flex flex-col items-center justify-center rounded-xl border border-dashed py-10 text-center">
                  <Package className="text-muted-foreground mb-3 h-10 w-10" />

                  <h3 className="font-semibold">No orders yet</h3>

                  <p className="text-muted-foreground mt-1 text-sm">
                    Your recent orders will appear here.
                  </p>

                  <Button asChild className="mt-4">
                    <Link href="/products">Start Shopping</Link>
                  </Button>
                </div>
              ) : (
                recentOrders.map((order) => (
                  <Link
                    key={order.id}
                    href={`/dashboard/orders/${order.id}`}
                    className="group hover:bg-muted/50 flex items-center justify-between gap-4 rounded-xl border p-4 transition-colors"
                  >
                    <div className="flex min-w-0 items-center gap-4">
                      <div className="bg-muted flex h-11 w-11 shrink-0 items-center justify-center rounded-lg">
                        <Package className="h-5 w-5" />
                      </div>

                      <div className="min-w-0">
                        <p className="truncate font-semibold">
                          {order.orderNumber || `Order #${order.id}`}
                        </p>

                        <p className="text-muted-foreground mt-1 text-xs">
                          {formatDate(order.createdAt)}
                        </p>
                      </div>
                    </div>

                    <div className="flex shrink-0 flex-col items-end gap-2">
                      <OrderStatusBadge status={order.status} />

                      <span className="text-sm font-semibold">
                        {formatCurrency(order.total)}
                      </span>
                    </div>
                  </Link>
                ))
              )}
            </CardContent>
          </Card>
        </div>

        {/* ======================================================= */}
        {/* RIGHT SIDEBAR */}
        {/* ======================================================= */}

        <div className="space-y-6">
          {/* Account */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account</CardTitle>
            </CardHeader>

            <CardContent className="space-y-2">
              <QuickAction
                href="/profile/orders"
                icon={ShoppingBag}
                title="My Orders"
                description="Track your purchases"
              />

              <QuickAction
                href="/profile/cartitems"
                icon={Heart}
                title="Wishlist"
                description="Your saved products"
              />

              <QuickAction
                href="/profile/settings"
                icon={Settings}
                title="Settings"
                description="Manage your account"
              />
            </CardContent>
          </Card>

          {/* Account Details */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Account Details</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-lg">
                  <CalendarDays className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-muted-foreground text-xs">Member Since</p>

                  <p className="text-sm font-medium">
                    {formatDate(user.createdAt)}
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center gap-3">
                <div className="bg-muted flex h-9 w-9 items-center justify-center rounded-lg">
                  <ShieldCheck className="h-4 w-4" />
                </div>

                <div>
                  <p className="text-muted-foreground text-xs">
                    Account Status
                  </p>

                  <p className="text-sm font-medium">
                    {user.verified ? "Verified Account" : "Not Verified"}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Payment / Shopping shortcut */}
          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <Link
                href="/products"
                className="group from-blue-primary/10 via-background to-background block bg-gradient-to-br p-6"
              >
                <div className="bg-blue-primary/10 text-blue-primary mb-4 flex h-11 w-11 items-center justify-center rounded-xl">
                  <CreditCard className="h-5 w-5" />
                </div>

                <h3 className="font-semibold">Continue Shopping</h3>

                <p className="text-muted-foreground mt-1 text-sm">
                  Discover comfortable chairs and quality office furniture.
                </p>

                <div className="text-blue-primary mt-4 flex items-center text-sm font-semibold">
                  Browse Products
                  <ChevronRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </Link>
            </CardContent>
          </Card>
        </div>
      </div>

      <EditProfile
        openEditUser={openEditUser}
        setOpenEditUser={setOpenEditUser}
        userData={user}
      />
    </main>
  );
}

/* ============================================================= */
/* STAT CARD */
/* ============================================================= */

function StatCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ElementType;
  title: string;
  value: number;
}) {
  return (
    <Card className="transition-shadow hover:shadow-md">
      <CardContent className="flex items-center gap-3 p-3">
        <div className="bg-blue-primary/10 text-blue-primary flex h-10 w-10 shrink-0 items-center justify-center rounded-xl">
          <Icon className="h-5 w-5" />
        </div>

        <div className="min-w-0">
          <p className="text-muted-foreground truncate text-xs sm:text-sm">
            {title}
          </p>

          <p className="text-xl font-bold sm:text-2xl">{value}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ============================================================= */
/* INFO ITEM */
/* ============================================================= */

function InfoItem({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value?: string | null;
}) {
  return (
    <div className="flex items-start gap-3">
      <div className="bg-muted flex h-10 w-10 shrink-0 items-center justify-center rounded-lg">
        <Icon className="text-muted-foreground h-4 w-4" />
      </div>

      <div className="min-w-0">
        <p className="text-muted-foreground text-xs">{label}</p>

        <p className="mt-1 truncate text-sm font-medium">
          {value || "Not provided"}
        </p>
      </div>
    </div>
  );
}

/* ============================================================= */
/* QUICK ACTION */
/* ============================================================= */

function QuickAction({
  href,
  icon: Icon,
  title,
  description,
}: {
  href: string;
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <Link
      href={href}
      className="group hover:bg-muted flex items-center gap-3 rounded-xl p-3 transition-colors"
    >
      <div className="bg-muted group-hover:bg-background flex h-10 w-10 shrink-0 items-center justify-center rounded-lg transition-colors">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <p className="text-sm font-medium">{title}</p>

        <p className="text-muted-foreground truncate text-xs">{description}</p>
      </div>

      <ChevronRight className="text-muted-foreground h-4 w-4 shrink-0 transition-transform group-hover:translate-x-1" />
    </Link>
  );
}
