"use client";

import { Gift, Sparkles, Clock3, CheckCircle2, Ticket } from "lucide-react";

const gifts = [
  {
    title: "Welcome Gift",
    description: "A special gift for joining our community.",
    value: "৳500",
    status: "Available",
    icon: Gift,
  },
  {
    title: "Premium Customer Gift",
    description: "Exclusive reward for our valued customers.",
    value: "৳1,000",
    status: "Available",
    icon: Sparkles,
  },
  {
    title: "Festival Gift",
    description: "Special seasonal gift for our customers.",
    value: "৳750",
    status: "Coming Soon",
    icon: Gift,
  },
];

const history = [
  {
    title: "Welcome Gift",
    date: "September 12, 2026",
    value: "৳500",
    status: "Redeemed",
  },
  {
    title: "Special Customer Reward",
    date: "August 24, 2026",
    value: "৳300",
    status: "Redeemed",
  },
];

export default function GiftsPage() {
  return (
    <div className="w-full space-y-8  p-3">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Gifts</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            View your available gifts and rewards.
          </p>
        </div>

        <div className="flex items-center gap-2 rounded-lg border bg-card px-4 py-2">
          <Gift className="size-5 text-primary" />

          <div>
            <p className="text-xs text-muted-foreground">Available Rewards</p>

            <p className="font-semibold">2 Gifts</p>
          </div>
        </div>
      </div>

      {/* Gift Banner */}
      <section className="relative overflow-hidden rounded-2xl border bg-muted/30 p-6 md:p-8">
        <div className="relative z-10 max-w-2xl">
          <div className="mb-3 flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <Gift className="size-6 text-primary" />
          </div>

          <h2 className="text-xl font-bold md:text-2xl">
            Something special is waiting for you 🎁
          </h2>

          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            Check your available rewards and enjoy exclusive gifts from ST
            Office Furniture.
          </p>
        </div>

        <Gift className="absolute -right-6 -bottom-8 size-40 rotate-12 text-primary/5" />
        <Sparkles className="absolute right-20 top-6 size-10 text-primary/10" />
      </section>

      {/* Available Gifts */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Available Gifts</h2>

          <p className="text-sm text-muted-foreground">
            Gifts and rewards currently available to you.
          </p>
        </div>

        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {gifts.map((gift) => {
            const Icon = gift.icon;
            const available = gift.status === "Available";

            return (
              <div
                key={gift.title}
                className="group relative overflow-hidden rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                {/* Icon */}
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>

                  <span
                    className={`rounded-full px-2.5 py-1 text-xs font-medium ${
                      available
                        ? "bg-green-500/10 text-green-600 dark:text-green-400"
                        : "bg-muted text-muted-foreground"
                    }`}
                  >
                    {gift.status}
                  </span>
                </div>

                {/* Content */}
                <div className="mt-5">
                  <h3 className="font-semibold">{gift.title}</h3>

                  <p className="mt-1 min-h-10 text-sm leading-5 text-muted-foreground">
                    {gift.description}
                  </p>
                </div>

                {/* Value */}
                <div className="mt-5 flex items-end justify-between border-t pt-4">
                  <div>
                    <p className="text-xs text-muted-foreground">Gift Value</p>

                    <p className="mt-0.5 text-xl font-bold">{gift.value}</p>
                  </div>

                  <button
                    disabled={!available}
                    className="rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                  >
                    {available ? "View Gift" : "Coming Soon"}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Gift History */}
      <section className="rounded-xl border bg-card">
        <div className="border-b p-5 md:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <Clock3 className="size-5 text-muted-foreground" />
            </div>

            <div>
              <h2 className="font-semibold">Gift History</h2>

              <p className="text-sm text-muted-foreground">
                Your previously received rewards.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {history.map((item) => (
            <div
              key={`${item.title}-${item.date}`}
              className="flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-green-500/10">
                  <CheckCircle2 className="size-5 text-green-600 dark:text-green-400" />
                </div>

                <div>
                  <p className="font-medium">{item.title}</p>

                  <p className="text-sm text-muted-foreground">{item.date}</p>
                </div>
              </div>

              <div className="flex items-center gap-4 sm:justify-end">
                <div className="text-right">
                  <p className="font-semibold">{item.value}</p>

                  <p className="text-xs text-muted-foreground">Redeemed</p>
                </div>

                <Ticket className="size-5 text-muted-foreground" />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
