"use client";

import {
  Bell,
  Eye,
  Globe,
  Lock,
  Mail,
  Moon,
  Palette,
  ShieldCheck,
  Smartphone,
  User,
} from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="w-full space-y-6 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
        <p className="mt-1 text-sm text-muted-foreground">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* General */}
      <section className="rounded-xl border bg-card">
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Globe className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">General</h2>
              <p className="text-sm text-muted-foreground">
                Basic application preferences
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {/* Language */}
          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Globe className="size-5 text-muted-foreground" />

              <div>
                <p className="font-medium">Language</p>
                <p className="text-sm text-muted-foreground">
                  Choose your preferred language
                </p>
              </div>
            </div>

            <div className="rounded-md border px-3 py-2 text-sm">English</div>
          </div>

          {/* Timezone */}
          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Smartphone className="size-5 text-muted-foreground" />

              <div>
                <p className="font-medium">Timezone</p>
                <p className="text-sm text-muted-foreground">
                  Your current timezone
                </p>
              </div>
            </div>

            <div className="rounded-md border px-3 py-2 text-sm">GMT +6</div>
          </div>
        </div>
      </section>

      {/* Account */}
      <section className="rounded-xl border bg-card">
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <User className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Account</h2>
              <p className="text-sm text-muted-foreground">
                Manage your personal account information
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          <div className="flex items-center gap-4 p-5">
            <User className="size-5 text-muted-foreground" />

            <div className="flex-1">
              <p className="font-medium">Profile Information</p>
              <p className="text-sm text-muted-foreground">
                Name, phone number and profile information
              </p>
            </div>

            <span className="text-sm text-muted-foreground">Manage</span>
          </div>

          <div className="flex items-center gap-4 p-5">
            <Mail className="size-5 text-muted-foreground" />

            <div className="flex-1">
              <p className="font-medium">Email Address</p>
              <p className="text-sm text-muted-foreground">
                Manage your email address
              </p>
            </div>

            <span className="text-sm text-muted-foreground">Manage</span>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="rounded-xl border bg-card">
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Bell className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Notifications</h2>
              <p className="text-sm text-muted-foreground">
                Control how you receive notifications
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="font-medium">Order Updates</p>
              <p className="text-sm text-muted-foreground">
                Receive updates about your orders
              </p>
            </div>

            <div className="h-6 w-11 rounded-full bg-primary p-1">
              <div className="size-4 translate-x-5 rounded-full bg-primary-foreground" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive important updates through email
              </p>
            </div>

            <div className="h-6 w-11 rounded-full bg-primary p-1">
              <div className="size-4 translate-x-5 rounded-full bg-primary-foreground" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="font-medium">Promotional Notifications</p>
              <p className="text-sm text-muted-foreground">
                Receive offers, gifts and promotions
              </p>
            </div>

            <div className="h-6 w-11 rounded-full bg-muted p-1">
              <div className="size-4 rounded-full bg-background shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="rounded-xl border bg-card">
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Security</h2>
              <p className="text-sm text-muted-foreground">
                Keep your account secure
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          <div className="flex items-center gap-4 p-5">
            <Lock className="size-5 text-muted-foreground" />

            <div className="flex-1">
              <p className="font-medium">Password</p>
              <p className="text-sm text-muted-foreground">
                Change your account password
              </p>
            </div>

            <span className="text-sm text-muted-foreground">Manage</span>
          </div>

          <div className="flex items-center gap-4 p-5">
            <ShieldCheck className="size-5 text-muted-foreground" />

            <div className="flex-1">
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">
                Add an extra layer of security
              </p>
            </div>

            <span className="text-sm text-muted-foreground">Disabled</span>
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="rounded-xl border bg-card">
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <Palette className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Appearance</h2>
              <p className="text-sm text-muted-foreground">
                Customize how the application looks
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Moon className="size-5 text-muted-foreground" />

              <div>
                <p className="font-medium">Theme</p>
                <p className="text-sm text-muted-foreground">
                  Choose light, dark or system theme
                </p>
              </div>
            </div>

            <div className="rounded-md border px-3 py-2 text-sm">System</div>
          </div>

          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Eye className="size-5 text-muted-foreground" />

              <div>
                <p className="font-medium">Compact Mode</p>
                <p className="text-sm text-muted-foreground">
                  Reduce spacing throughout the dashboard
                </p>
              </div>
            </div>

            <div className="h-6 w-11 rounded-full bg-muted p-1">
              <div className="size-4 rounded-full bg-background shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="rounded-xl border border-destructive/30 bg-destructive/5">
        <div className="border-b border-destructive/20 p-5">
          <h2 className="font-semibold text-destructive">Danger Zone</h2>
          <p className="mt-1 text-sm text-muted-foreground">
            Irreversible account actions
          </p>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">Delete Account</p>
            <p className="text-sm text-muted-foreground">
              Permanently delete your account and associated data.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="cursor-not-allowed rounded-md border border-destructive/30 px-4 py-2 text-sm font-medium text-destructive opacity-50"
          >
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
}
