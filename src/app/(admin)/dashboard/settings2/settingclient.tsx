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
        <p className="text-muted-foreground mt-1 text-sm">
          Manage your account preferences and application settings.
        </p>
      </div>

      {/* General */}
      <section className="bg-card rounded-xl border">
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
              <Globe className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">General</h2>
              <p className="text-muted-foreground text-sm">
                Basic application preferences
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {/* Language */}
          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Globe className="text-muted-foreground size-5" />

              <div>
                <p className="font-medium">Language</p>
                <p className="text-muted-foreground text-sm">
                  Choose your preferred language
                </p>
              </div>
            </div>

            <div className="rounded-md border px-3 py-2 text-sm">English</div>
          </div>

          {/* Timezone */}
          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Smartphone className="text-muted-foreground size-5" />

              <div>
                <p className="font-medium">Timezone</p>
                <p className="text-muted-foreground text-sm">
                  Your current timezone
                </p>
              </div>
            </div>

            <div className="rounded-md border px-3 py-2 text-sm">GMT +6</div>
          </div>
        </div>
      </section>

      {/* Account */}
      <section className="bg-card rounded-xl border">
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
              <User className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Account</h2>
              <p className="text-muted-foreground text-sm">
                Manage your personal account information
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          <div className="flex items-center gap-4 p-5">
            <User className="text-muted-foreground size-5" />

            <div className="flex-1">
              <p className="font-medium">Profile Information</p>
              <p className="text-muted-foreground text-sm">
                Name, phone number and profile information
              </p>
            </div>

            <span className="text-muted-foreground text-sm">Manage</span>
          </div>

          <div className="flex items-center gap-4 p-5">
            <Mail className="text-muted-foreground size-5" />

            <div className="flex-1">
              <p className="font-medium">Email Address</p>
              <p className="text-muted-foreground text-sm">
                Manage your email address
              </p>
            </div>

            <span className="text-muted-foreground text-sm">Manage</span>
          </div>
        </div>
      </section>

      {/* Notifications */}
      <section className="bg-card rounded-xl border">
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
              <Bell className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Notifications</h2>
              <p className="text-muted-foreground text-sm">
                Control how you receive notifications
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="font-medium">Order Updates</p>
              <p className="text-muted-foreground text-sm">
                Receive updates about your orders
              </p>
            </div>

            <div className="bg-primary h-6 w-11 rounded-full p-1">
              <div className="bg-primary-foreground size-4 translate-x-5 rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="font-medium">Email Notifications</p>
              <p className="text-muted-foreground text-sm">
                Receive important updates through email
              </p>
            </div>

            <div className="bg-primary h-6 w-11 rounded-full p-1">
              <div className="bg-primary-foreground size-4 translate-x-5 rounded-full" />
            </div>
          </div>

          <div className="flex items-center justify-between gap-4 p-5">
            <div>
              <p className="font-medium">Promotional Notifications</p>
              <p className="text-muted-foreground text-sm">
                Receive offers, gifts and promotions
              </p>
            </div>

            <div className="bg-muted h-6 w-11 rounded-full p-1">
              <div className="bg-background size-4 rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Security */}
      <section className="bg-card rounded-xl border">
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
              <ShieldCheck className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Security</h2>
              <p className="text-muted-foreground text-sm">
                Keep your account secure
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          <div className="flex items-center gap-4 p-5">
            <Lock className="text-muted-foreground size-5" />

            <div className="flex-1">
              <p className="font-medium">Password</p>
              <p className="text-muted-foreground text-sm">
                Change your account password
              </p>
            </div>

            <span className="text-muted-foreground text-sm">Manage</span>
          </div>

          <div className="flex items-center gap-4 p-5">
            <ShieldCheck className="text-muted-foreground size-5" />

            <div className="flex-1">
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-muted-foreground text-sm">
                Add an extra layer of security
              </p>
            </div>

            <span className="text-muted-foreground text-sm">Disabled</span>
          </div>
        </div>
      </section>

      {/* Appearance */}
      <section className="bg-card rounded-xl border">
        <div className="border-b p-5">
          <div className="flex items-center gap-3">
            <div className="bg-primary/10 text-primary flex size-10 items-center justify-center rounded-lg">
              <Palette className="size-5" />
            </div>

            <div>
              <h2 className="font-semibold">Appearance</h2>
              <p className="text-muted-foreground text-sm">
                Customize how the application looks
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Moon className="text-muted-foreground size-5" />

              <div>
                <p className="font-medium">Theme</p>
                <p className="text-muted-foreground text-sm">
                  Choose light, dark or system theme
                </p>
              </div>
            </div>

            <div className="rounded-md border px-3 py-2 text-sm">System</div>
          </div>

          <div className="flex items-center justify-between gap-4 p-5">
            <div className="flex items-center gap-4">
              <Eye className="text-muted-foreground size-5" />

              <div>
                <p className="font-medium">Compact Mode</p>
                <p className="text-muted-foreground text-sm">
                  Reduce spacing throughout the dashboard
                </p>
              </div>
            </div>

            <div className="bg-muted h-6 w-11 rounded-full p-1">
              <div className="bg-background size-4 rounded-full shadow-sm" />
            </div>
          </div>
        </div>
      </section>

      {/* Danger Zone */}
      <section className="border-destructive/30 bg-destructive/5 rounded-xl border">
        <div className="border-destructive/20 border-b p-5">
          <h2 className="text-destructive font-semibold">Danger Zone</h2>
          <p className="text-muted-foreground mt-1 text-sm">
            Irreversible account actions
          </p>
        </div>

        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-medium">Delete Account</p>
            <p className="text-muted-foreground text-sm">
              Permanently delete your account and associated data.
            </p>
          </div>

          <button
            type="button"
            disabled
            className="border-destructive/30 text-destructive cursor-not-allowed rounded-md border px-4 py-2 text-sm font-medium opacity-50"
          >
            Delete Account
          </button>
        </div>
      </section>
    </div>
  );
}
