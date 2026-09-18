"use client";

import {
  BookOpen,
  ChevronRight,
  CircleHelp,
  FileText,
  Headphones,
  Mail,
  MessageCircle,
  Package,
  Search,
  ShieldCheck,
  ShoppingBag,
} from "lucide-react";

const categories = [
  {
    title: "Orders & Delivery",
    description: "Learn about orders, delivery, tracking and returns.",
    icon: Package,
  },
  {
    title: "Products",
    description: "Get help with products, pricing, availability and reviews.",
    icon: ShoppingBag,
  },
  {
    title: "Account",
    description: "Manage your profile, password and account information.",
    icon: ShieldCheck,
  },
  {
    title: "Payments",
    description: "Information about payments, billing and transactions.",
    icon: FileText,
  },
];

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "Browse our products, select the product you want, add it to your cart and complete the checkout process.",
  },
  {
    question: "How can I track my order?",
    answer:
      "You can check your order status from the Orders section of your dashboard.",
  },
  {
    question: "How long does delivery take?",
    answer:
      "Delivery time depends on your delivery area and product availability.",
  },
  {
    question: "Can I cancel my order?",
    answer: "Order cancellation depends on the current status of your order.",
  },
  {
    question: "How can I contact support?",
    answer:
      "You can contact our support team through the available contact channels.",
  },
];

export default function HelpPage() {
  return (
    <div className="w-full space-y-8 p-3">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Help & Support</h1>

        <p className="mt-1 text-sm text-muted-foreground">
          Find answers to common questions or get help with your account.
        </p>
      </div>

      {/* Search */}
      <section className="relative overflow-hidden rounded-2xl border bg-muted/30 p-6 md:p-10">
        <div className="relative z-10 mx-auto max-w-2xl text-center">
          <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-primary/10">
            <CircleHelp className="size-6 text-primary" />
          </div>

          <h2 className="mt-4 text-xl font-bold md:text-2xl">
            How can we help you?
          </h2>

          <p className="mt-2 text-sm text-muted-foreground">
            Search our help center or browse the categories below.
          </p>

          <div className="relative mt-6">
            <Search className="absolute left-4 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

            <input
              type="text"
              placeholder="Search for help..."
              className="h-12 w-full rounded-xl border bg-background pl-11 pr-4 text-sm outline-none transition placeholder:text-muted-foreground focus:ring-2 focus:ring-primary/20"
            />
          </div>
        </div>
      </section>

      {/* Help Categories */}
      <section className="space-y-4">
        <div>
          <h2 className="text-lg font-semibold">Browse Help Topics</h2>

          <p className="text-sm text-muted-foreground">
            Find information based on what you need help with.
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {categories.map((category) => {
            const Icon = category.icon;

            return (
              <div
                key={category.title}
                className="group rounded-xl border bg-card p-5 transition hover:-translate-y-0.5 hover:shadow-md"
              >
                <div className="flex items-start justify-between">
                  <div className="flex size-11 items-center justify-center rounded-xl bg-primary/10">
                    <Icon className="size-5 text-primary" />
                  </div>

                  <ChevronRight className="size-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>

                <h3 className="mt-5 font-semibold">{category.title}</h3>

                <p className="mt-1 text-sm leading-5 text-muted-foreground">
                  {category.description}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* FAQ */}
      <section className="rounded-xl border bg-card">
        <div className="border-b p-5 md:p-6">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-muted">
              <BookOpen className="size-5 text-muted-foreground" />
            </div>

            <div>
              <h2 className="font-semibold">Frequently Asked Questions</h2>

              <p className="text-sm text-muted-foreground">
                Quick answers to common questions.
              </p>
            </div>
          </div>
        </div>

        <div className="divide-y">
          {faqs.map((faq) => (
            <div key={faq.question} className="flex items-start gap-4 p-5">
              <div className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-lg bg-muted">
                <CircleHelp className="size-4 text-muted-foreground" />
              </div>

              <div className="min-w-0">
                <h3 className="font-medium">{faq.question}</h3>

                <p className="mt-1 text-sm leading-6 text-muted-foreground">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Contact Support */}
      <section className="rounded-xl border bg-card">
        <div className="p-6 md:p-8">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="flex items-start gap-4">
              <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-primary/10">
                <Headphones className="size-6 text-primary" />
              </div>

              <div>
                <h2 className="font-semibold">Still need help?</h2>

                <p className="mt-1 max-w-xl text-sm leading-6 text-muted-foreground">
                  Our support team is here to help you with questions about your
                  orders, products or account.
                </p>
              </div>
            </div>

            <button
              disabled
              className="inline-flex h-10 items-center justify-center gap-2 rounded-lg bg-primary px-4 text-sm font-medium text-primary-foreground opacity-80"
            >
              <MessageCircle className="size-4" />
              Contact Support
            </button>
          </div>

          <div className="mt-6 grid gap-3 border-t pt-6 sm:grid-cols-2">
            <div className="flex items-center gap-3 rounded-lg border p-4">
              <Mail className="size-5 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">Email Support</p>

                <p className="text-sm font-medium">
                  support@stofficefurniture.com
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 rounded-lg border p-4">
              <MessageCircle className="size-5 text-muted-foreground" />

              <div>
                <p className="text-xs text-muted-foreground">Support Hours</p>

                <p className="text-sm font-medium">
                  Sat – Thu · 9:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
