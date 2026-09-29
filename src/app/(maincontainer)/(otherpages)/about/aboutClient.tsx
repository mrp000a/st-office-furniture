import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Headphones,
  PackageCheck,
  ShieldCheck,
  Sparkles,
  Truck,
  Users,
  Wrench,
} from "lucide-react";

import aboutHeroImage from "@/components/images/Office/imageoffice4.jpg";

const values = [
  {
    icon: ShieldCheck,
    title: "Quality First",
    description:
      "We focus on dependable materials, thoughtful design, and products made for everyday working environments.",
  },
  {
    icon: Sparkles,
    title: "Better Design",
    description:
      "We believe office furniture should look professional while making the workspace more comfortable and practical.",
  },
  {
    icon: Users,
    title: "Customer Focused",
    description:
      "From choosing a product to receiving it, we aim to make the buying experience simple and reliable.",
  },
  {
    icon: Wrench,
    title: "Practical Solutions",
    description:
      "Our products are selected with real offices, real workspaces, and real everyday needs in mind.",
  },
];

const benefits = [
  "Quality-focused office furniture",
  "Products for different workspace needs",
  "Professional customer support",
  "Reliable delivery across Bangladesh",
  "Practical designs for everyday use",
  "Solutions for home and corporate offices",
];

const process = [
  {
    number: "01",
    title: "Explore",
    description:
      "Browse our collection and discover furniture suited to your workspace.",
  },
  {
    number: "02",
    title: "Choose",
    description:
      "Compare products, features, pricing, and find the right solution for your needs.",
  },
  {
    number: "03",
    title: "Order",
    description:
      "Place your order through our simple and convenient purchasing process.",
  },
  {
    number: "04",
    title: "Enjoy",
    description:
      "Receive your furniture and create a workspace that feels better every day.",
  },
];

export default function AboutPage() {
  return (
    <main className="bg-background w-full overflow-hidden">
      {/* Hero */}
      <section className="border-border relative border-b">
        <div className="from-green-primary/10 via-background to-foreground/20 absolute inset-0 bg-linear-to-br" />

        <div className="relative mx-auto grid min-h-[520px] w-full max-w-7xl items-center gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:px-8 lg:py-20">
          <div className="max-w-2xl">
            <span className="border-green-primary/20 bg-green-primary/10 text-green-primary inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-semibold">
              <Sparkles className="h-3.5 w-3.5" />
              About ST Office Furniture
            </span>

            <h1 className="text-foreground mt-5 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">
              Better furniture for
              <span className="text-green-primary block">better working.</span>
            </h1>

            <p className="text-gray-primary mt-5 max-w-xl text-sm leading-7 sm:text-base">
              We believe a workspace should be more than a place to work. It
              should be comfortable, functional, professional, and designed to
              help people do their best work.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/products"
                className="bg-green-primary inline-flex h-11 items-center justify-center gap-2 rounded-lg px-6 text-sm font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
              >
                Explore Products
                <ArrowRight className="h-4 w-4" />
              </Link>

              <Link
                href="/contact"
                className="border-border bg-background hover:bg-muted inline-flex h-11 items-center justify-center gap-2 rounded-lg border px-6 text-sm font-semibold transition-colors"
              >
                Talk to Us
              </Link>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-xl">
            <div className="bg-green-primary/10 absolute -inset-4 rounded-[2rem] blur-3xl" />

            <div className="border-border bg-muted relative aspect-[4/3] overflow-hidden rounded-2xl border shadow-2xl">
              <Image
                src={aboutHeroImage}
                alt="Modern office workspace with ST Office Furniture"
                fill
                priority
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>

            <div className="border-border bg-background/95 absolute -bottom-5 -left-3 rounded-xl border p-4 shadow-xl backdrop-blur-xl sm:-left-6">
              <div className="flex items-center gap-3">
                <div className="bg-green-primary/10 flex h-10 w-10 items-center justify-center rounded-lg">
                  <PackageCheck className="text-green-primary h-5 w-5" />
                </div>

                <div>
                  <p className="text-gray-primary text-xs">Our promise</p>
                  <p className="text-sm font-bold">
                    Better Seating. Better Working.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="border-border bg-violet-primary/10 border-y">
        <div className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
          <div className="mx-auto max-w-2xl text-center">
            <span className="text-green-primary text-xs font-bold tracking-[0.2em] uppercase">
              What We Stand For
            </span>

            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              Built around the way people work.
            </h2>

            <p className="text-gray-primary mt-4 text-sm leading-7 sm:text-base">
              Every part of our approach comes back to one simple idea:
              furniture should make working better.
            </p>
          </div>

          <div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => {
              const Icon = value.icon;

              return (
                <div
                  key={value.title}
                  className="group border-border bg-background hover:border-green-primary/30 rounded-2xl border p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="bg-green-primary/10 group-hover:bg-green-primary flex h-11 w-11 items-center justify-center rounded-xl transition-colors">
                    <Icon className="text-green-primary h-5 w-5 transition-colors group-hover:text-white" />
                  </div>

                  <h3 className="mt-5 text-lg font-semibold">{value.title}</h3>

                  <p className="text-gray-primary mt-2 text-sm leading-6">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto w-full max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-green-primary text-xs font-bold tracking-[0.2em] uppercase">
            Simple Experience
          </span>

          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            From browsing to better working.
          </h2>
        </div>

        <div className="relative mt-12 grid gap-8 md:grid-cols-4">
          <div className="bg-border absolute top-7 right-[12%] left-[12%] hidden h-px md:block" />

          {process.map((item) => (
            <div key={item.number} className="relative text-center">
              <div className="border-background bg-green-primary relative mx-auto flex h-14 w-14 items-center justify-center rounded-full border-4 text-sm font-bold text-white shadow-md">
                {item.number}
              </div>

              <h3 className="mt-5 text-lg font-semibold">{item.title}</h3>

              <p className="text-gray-primary mt-2 text-sm leading-6">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="px-3 py-6 text-center sm:px-6 sm:py-8">
      <p className="text-2xl font-bold tracking-tight sm:text-3xl">{value}</p>
      <p className="text-gray-primary mt-1 text-[10px] font-medium tracking-wider uppercase sm:text-xs">
        {label}
      </p>
    </div>
  );
}

function WorkspaceCard({
  title,
  description,
  image,
}: {
  title: string;
  description: string;
  image: string;
}) {
  return (
    <Link
      href="/products"
      className="group relative min-h-[300px] overflow-hidden rounded-2xl border border-white/10"
    >
      <Image
        src={image}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, 33vw"
      />

      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

      <div className="absolute right-0 bottom-0 left-0 p-6">
        <h3 className="text-xl font-bold">{title}</h3>
        <p className="mt-2 max-w-sm text-sm leading-6 text-white/70">
          {description}
        </p>

        <span className="text-green-primary mt-4 inline-flex items-center gap-2 text-xs font-semibold">
          Explore
          <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
