import Link from "next/link";
import {
  ArrowRight,
  Clock3,
  Headphones,
  Mail,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShoppingBag,
} from "lucide-react";
import FaqQuestion from "@/components/sections/faq";

const contactMethods = [
  {
    icon: Phone,
    title: "Call Us",
    description: "Talk directly with our team.",
    value: "+880 1XXXXXXXXX",
    href: "tel:+8801XXXXXXXXX",
  },
  {
    icon: MessageCircle,
    title: "WhatsApp",
    description: "Quick questions and product help.",
    value: "Chat on WhatsApp",
    href: "https://wa.me/8801XXXXXXXXX",
  },
  {
    icon: Mail,
    title: "Email Us",
    description: "For detailed questions and inquiries.",
    value: "info@stofficefurniture.com",
    href: "mailto:info@stofficefurniture.com",
  },
  {
    icon: MapPin,
    title: "Visit Us",
    description: "Come and discuss your requirements.",
    value: "Rajshahi, Bangladesh",
    href: "#location",
  },
];

const inquiryTypes = [
  {
    icon: ShoppingBag,
    title: "Product Inquiry",
    description: "Need help choosing the right chair or furniture?",
  },
  {
    icon: MessageCircle,
    title: "Bulk Order",
    description: "Looking for furniture for an office or business?",
  },
  {
    icon: TruckIcon,
    title: "Delivery",
    description: "Have questions about delivery or your order?",
  },
  {
    icon: Headphones,
    title: "Customer Support",
    description: "Need help with an existing purchase?",
  },
];

const faqs = [
  {
    question: "How can I place an order?",
    answer:
      "You can browse our products, select the product you need, and place your order directly through our website. You can also contact our team for assistance.",
  },
  {
    question: "Can I place a bulk office furniture order?",
    answer:
      "Yes. Contact our team with your requirements and we can discuss suitable products, quantities, and delivery arrangements.",
  },
  {
    question: "Do you provide delivery?",
    answer:
      "We provide delivery services according to the delivery areas and policies available for your order.",
  },
  {
    question: "Can I ask about a product before ordering?",
    answer:
      "Absolutely. Contact us by phone, WhatsApp, email, or through the form and our team can help you with product-related questions.",
  },
];

export default function ContactPage() {
  return (
    <main className="w-full overflow-hidden bg-background">
      {/* =========================================================
          INQUIRY TYPES
      ========================================================= */}
      <section className="border-y border-border bg-muted/20">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-primary">
              {"We're Here to Help"}
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              {"Whatever you need, let's talk."}
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-primary sm:text-base">
              {
                "Whether you're buying one chair or planning an entire workspace,we're happy to help."
              }
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {inquiryTypes.map((item) => {
              const Icon = item.icon;

              return (
                <div
                  key={item.title}
                  className="group rounded-2xl border border-border bg-background p-6 transition-all duration-300 hover:-translate-y-1 hover:border-green-primary/30 hover:shadow-xl"
                >
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-primary/10 transition-colors group-hover:bg-green-primary">
                    <Icon className="h-5 w-5 text-green-primary transition-colors group-hover:text-white" />
                  </div>

                  <h3 className="mt-5 text-base font-semibold">{item.title}</h3>

                  <p className="mt-2 text-sm leading-6 text-gray-primary">
                    {item.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =========================================================
          LOCATION
      ========================================================= */}
      <section
        id="location"
        className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24"
      >
        <div className="grid overflow-hidden rounded-2xl border border-border bg-card lg:grid-cols-2">
          {/* Map */}
          <div className="relative min-h-[350px] bg-muted lg:min-h-[450px]">
            <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-green-primary/10 via-muted to-muted">
              <div className="text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-green-primary text-white shadow-lg">
                  <MapPin className="h-6 w-6" />
                </div>

                <p className="mt-4 text-sm font-semibold">
                  ST Office Furniture
                </p>

                <p className="mt-1 text-xs text-gray-primary">
                  Rajshahi, Bangladesh
                </p>
              </div>
            </div>
          </div>

          {/* Location information */}
          <div className="flex flex-col justify-center p-7 sm:p-10 lg:p-14">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-primary">
              Visit Us
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight">
              Come and talk to us.
            </h2>

            <p className="mt-4 text-sm leading-7 text-gray-primary">
              {
                "If you prefer discussing your requirements in person, we'd be happy to help you explore suitable furniture solutions."
              }
            </p>

            <div className="mt-8 space-y-5">
              <div className="flex gap-4">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-green-primary" />

                <div>
                  <p className="text-sm font-semibold">Our Location</p>
                  <p className="mt-1 text-sm leading-6 text-gray-primary">
                    Rajshahi, Bangladesh
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <Clock3 className="mt-0.5 h-5 w-5 shrink-0 text-green-primary" />

                <div>
                  <p className="text-sm font-semibold">Business Hours</p>
                  <p className="mt-1 text-sm leading-6 text-gray-primary">
                    Please contact us for current business hours.
                  </p>
                </div>
              </div>
            </div>

            <a
              href="https://maps.google.com/?q=Rajshahi,Bangladesh"
              target="_blank"
              rel="noreferrer"
              className="mt-8 inline-flex h-11 w-fit items-center gap-2 rounded-lg border border-border px-5 text-sm font-semibold transition-colors hover:bg-muted"
            >
              Open in Google Maps
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </section>

      {/* =========================================================
          FAQ
      ========================================================= */}
      <section className="border-t border-border bg-muted/20">
        <div className="mx-auto w-full max-w-4xl px-4 py-20 sm:px-6 lg:py-24">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-green-primary">
              FAQ
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Frequently asked questions
            </h2>
          </div>

          <div className="mt-10 divide-y divide-border rounded-2xl border border-border bg-background">
            <FaqQuestion />
          </div>
        </div>
      </section>

      {/* =========================================================
          FINAL CTA
      ========================================================= */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
        <div className="relative mx-auto max-w-7xl overflow-hidden rounded-3xl bg-green-primary px-6 py-14 text-center text-white sm:px-10 lg:px-16 lg:py-20">
          <div className="absolute -right-20 -top-20 h-64 w-64 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-20 -left-20 h-64 w-64 rounded-full bg-black/10 blur-3xl" />

          <div className="relative mx-auto max-w-2xl">
            <Headphones className="mx-auto h-8 w-8" />

            <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
              Need help choosing the right furniture?
            </h2>

            <p className="mt-4 text-sm leading-7 text-white/80 sm:text-base">
              {
                "Tell us about your workspace and what you're looking for. We'll help you find a suitable solution."
              }
            </p>

            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Link
                href="/products"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg bg-white px-6 text-sm font-semibold text-green-primary transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>

              <a
                href="https://wa.me/8801521120706"
                className="inline-flex h-11 items-center justify-center gap-2 rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white backdrop-blur transition-colors hover:bg-white/20"
              >
                <MessageCircle className="h-4 w-4" />
                WhatsApp Us
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function TruckIcon(props: React.ComponentProps<"svg">) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M14 18V6a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v11a1 1 0 0 0 1 1h3" />
      <path d="M15 18H9" />
      <path d="M19 18h2a1 1 0 0 0 1-1v-5l-3-4h-4v10" />
      <circle cx="7" cy="18" r="2" />
      <circle cx="17" cy="18" r="2" />
    </svg>
  );
}
