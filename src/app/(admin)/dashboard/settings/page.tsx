"use client";

import Link from "next/link";
import {
  Settings,
  Store,
  ShieldCheck,
  Bell,
  Mail,
  Truck,
  CreditCard,
  Users,
  Database,
  Globe,
  Palette,
  LockKeyhole,
  ChevronRight,
  ExternalLink,
  AlertTriangle,
  Server,
} from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

export default function AdminSettingsPage() {
  return (
    <main className="mx-auto w-full  space-y-8 p-4 sm:p-6 lg:p-8">
      {/* ========================================================= */}
      {/* HEADER */}
      {/* ========================================================= */}

      <section>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="mb-2 flex items-center gap-2 text-sm text-muted-foreground">
              <Settings className="h-4 w-4" />
              <span>Administration</span>
              <ChevronRight className="h-4 w-4" />
              <span>Settings</span>
            </div>

            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Admin Settings
            </h1>

            <p className="mt-1 max-w-2xl text-sm text-muted-foreground">
              Manage your store, administration, security, notifications,
              delivery and system preferences from one place.
            </p>
          </div>

          <Badge
            variant="outline"
            className="w-fit gap-2 border-green-500/30 bg-green-500/10 px-3 py-1.5 text-green-600"
          >
            <span className="h-2 w-2 rounded-full bg-green-500" />
            System Operational
          </Badge>
        </div>
      </section>

      {/* ========================================================= */}
      {/* QUICK OVERVIEW */}
      {/* ========================================================= */}

      <section className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <OverviewCard
          icon={Store}
          title="Store"
          description="Business settings"
          href="#store"
        />

        <OverviewCard
          icon={ShieldCheck}
          title="Security"
          description="Admin protection"
          href="#security"
        />

        <OverviewCard
          icon={Mail}
          title="Email"
          description="Email configuration"
          href="#email"
        />

        <OverviewCard
          icon={Server}
          title="System"
          description="System information"
          href="#system"
        />
      </section>

      {/* ========================================================= */}
      {/* SETTINGS CONTENT */}
      {/* ========================================================= */}

      <div className="grid gap-6 lg:grid-cols-3">
        {/* ======================================================= */}
        {/* MAIN SETTINGS */}
        {/* ======================================================= */}

        <div className="space-y-6 lg:col-span-2">
          {/* ----------------------------------------------------- */}
          {/* STORE SETTINGS */}
          {/* ----------------------------------------------------- */}

          <SettingsSection
            id="store"
            icon={Store}
            title="Store Configuration"
            description="Manage the basic information and behavior of your store."
          >
            <SettingsItem
              href="/dashboard/settings#"
              icon={Store}
              title="Store Information"
              description="Store name, logo, contact information and business details."
            />

            <Separator />

            <SettingsItem
              href="/dashboard/settings#"
              icon={Palette}
              title="Appearance"
              description="Manage branding, colors, logos and storefront appearance."
            />

            <Separator />

            <SettingsItem
              href="/dashboard/settings#"
              icon={Globe}
              title="General Settings"
              description="Configure general store preferences and regional settings."
            />
          </SettingsSection>

          {/* ----------------------------------------------------- */}
          {/* ORDER & DELIVERY */}
          {/* ----------------------------------------------------- */}

          <SettingsSection
            id="orders"
            icon={Truck}
            title="Orders & Delivery"
            description="Configure how orders and deliveries are handled."
          >
            <SettingsItem
              href="/dashboard/settings#"
              icon={Truck}
              title="Delivery Areas"
              description="Manage delivery locations, charges and delivery availability."
            />

            <Separator />

            <SettingsItem
              href="/dashboard/settings#"
              icon={CreditCard}
              title="Order Configuration"
              description="Configure order processing and order-related preferences."
            />

            <Separator />

            <SettingsItem
              href="/dashboard/settings#"
              icon={CreditCard}
              title="Payment Methods"
              description="Manage available payment methods and payment preferences."
            />
          </SettingsSection>

          {/* ----------------------------------------------------- */}
          {/* NOTIFICATIONS */}
          {/* ----------------------------------------------------- */}

          <SettingsSection
            id="email"
            icon={Bell}
            title="Notifications"
            description="Control administrative notifications and customer communication."
          >
            <SettingsItem
              href="/dashboard/settings#"
              icon={Bell}
              title="Notification Preferences"
              description="Choose which events should generate notifications."
            />

            <Separator />

            <SettingsItem
              href="/dashboard/settings#"
              icon={Mail}
              title="Email Configuration"
              description="Manage sender information and transactional email settings."
            />
          </SettingsSection>

          {/* ----------------------------------------------------- */}
          {/* ADMINISTRATION */}
          {/* ----------------------------------------------------- */}

          <SettingsSection
            id="security"
            icon={ShieldCheck}
            title="Administration & Security"
            description="Control administrator access and account security."
          >
            <SettingsItem
              href="/dashboard/settings#"
              icon={Users}
              title="Administrators"
              description="Manage administrators and their access to the dashboard."
            />

            <Separator />

            <SettingsItem
              href="/dashboard/settings#"
              icon={LockKeyhole}
              title="Security Settings"
              description="Manage password, authentication and security preferences."
            />

            <Separator />

            <SettingsItem
              href="/dashboard/settings#"
              icon={ShieldCheck}
              title="Active Sessions"
              description="Review and manage active administrator sessions."
            />
          </SettingsSection>

          {/* ----------------------------------------------------- */}
          {/* SYSTEM */}
          {/* ----------------------------------------------------- */}

          <SettingsSection
            id="system"
            icon={Database}
            title="System"
            description="Manage technical and system-level configuration."
          >
            <SettingsItem
              href="/dashboard/settings#"
              icon={Database}
              title="Database"
              description="View database status and system data information."
            />

            <Separator />

            <SettingsItem
              href="/dashboard/settings#"
              icon={Server}
              title="System Information"
              description="View application, environment and server information."
            />
          </SettingsSection>
        </div>

        {/* ======================================================= */}
        {/* RIGHT SIDEBAR */}
        {/* ======================================================= */}

        <aside className="space-y-6">
          {/* Admin Account */}
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Administrator</CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-primary/10 text-blue-primary">
                  <ShieldCheck className="h-5 w-5" />
                </div>

                <div className="min-w-0">
                  <p className="truncate font-semibold">Administrator</p>

                  <p className="truncate text-xs text-muted-foreground">
                    Full administrative access
                  </p>
                </div>
              </div>

              <Separator />

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Role</span>

                <Badge variant="secondary">ADMIN</Badge>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">Security</span>

                <span className="flex items-center gap-1.5 text-green-600">
                  <span className="h-2 w-2 rounded-full bg-green-500" />
                  Protected
                </span>
              </div>

              <Link
                href="/profile/settings"
                className="flex items-center justify-between rounded-lg border p-3 text-sm font-medium transition-colors hover:bg-muted"
              >
                Manage My Account
                <ChevronRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>

          {/* System Status */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base">
                <Server className="h-4 w-4" />
                System Status
              </CardTitle>
            </CardHeader>

            <CardContent className="space-y-4">
              <StatusRow label="Application" status="Operational" />

              <StatusRow label="Database" status="Connected" />

              <StatusRow label="Email Service" status="Operational" />

              <StatusRow label="Storage" status="Connected" />
            </CardContent>
          </Card>

          {/* Danger Zone */}
          <Card className="border-red-500/20">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-base text-red-600">
                <AlertTriangle className="h-4 w-4" />
                Sensitive Actions
              </CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-sm leading-6 text-muted-foreground">
                Some administrative actions can affect the entire store or
                customer data. Review them carefully before proceeding.
              </p>

              <Link
                href="/dashboard/settings#"
                className="mt-4 flex items-center justify-between rounded-lg border border-red-500/20 bg-red-500/5 p-3 text-sm font-medium text-red-600 transition-colors hover:bg-red-500/10"
              >
                View Sensitive Settings
                <ChevronRight className="h-4 w-4" />
              </Link>
            </CardContent>
          </Card>
        </aside>
      </div>
    </main>
  );
}

/* ============================================================= */
/* SETTINGS SECTION */
/* ============================================================= */

function SettingsSection({
  id,
  icon: Icon,
  title,
  description,
  children,
}: {
  id?: string;
  icon: React.ElementType;
  title: string;
  description: string;
  children: React.ReactNode;
}) {
  return (
    <Card id={id} className="scroll-mt-24">
      <CardHeader>
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-blue-primary/10 text-blue-primary">
            <Icon className="h-5 w-5" />
          </div>

          <div>
            <CardTitle className="text-lg">{title}</CardTitle>

            <p className="mt-1 text-sm text-muted-foreground">{description}</p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="pt-0">
        <div className="rounded-xl border">{children}</div>
      </CardContent>
    </Card>
  );
}

/* ============================================================= */
/* SETTINGS ITEM */
/* ============================================================= */

function SettingsItem({
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
      className="group flex items-center gap-4 p-4 transition-colors hover:bg-muted/50 sm:p-5"
    >
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-muted transition-colors group-hover:bg-background">
        <Icon className="h-4 w-4" />
      </div>

      <div className="min-w-0 flex-1">
        <h3 className="text-sm font-semibold">{title}</h3>

        <p className="mt-1 text-xs leading-5 text-muted-foreground sm:text-sm">
          {description}
        </p>
      </div>

      <ChevronRight className="h-4 w-4 shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1" />
    </Link>
  );
}

/* ============================================================= */
/* OVERVIEW CARD */
/* ============================================================= */

function OverviewCard({
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
    <a
      href={href}
      className="group rounded-xl border bg-background p-4 transition-all hover:-translate-y-0.5 hover:shadow-md sm:p-5"
    >
      <div className="mb-3 flex h-9 w-9 items-center justify-center rounded-lg bg-blue-primary/10 text-blue-primary">
        <Icon className="h-4 w-4" />
      </div>

      <p className="font-semibold">{title}</p>

      <p className="mt-1 text-xs text-muted-foreground">{description}</p>
    </a>
  );
}

/* ============================================================= */
/* STATUS ROW */
/* ============================================================= */

function StatusRow({ label, status }: { label: string; status: string }) {
  return (
    <div className="flex items-center justify-between gap-3 text-sm">
      <span className="text-muted-foreground">{label}</span>

      <span className="flex items-center gap-1.5 font-medium text-green-600">
        <span className="h-2 w-2 rounded-full bg-green-500" />

        {status}
      </span>
    </div>
  );
}
