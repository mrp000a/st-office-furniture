"use client";

import Link from "next/link";
import { motion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  Search,
  ShoppingBag,
  Sparkles,
} from "lucide-react";

interface NoProductsProps {
  searchQuery?: string;
  title?: string;
  description?: string;
}

export default function ProductsNotFound({
  searchQuery,
  title,
  description,
}: NoProductsProps) {
  const isSearch = Boolean(searchQuery);

  return (
    <section className="relative isolate flex min-h-155 items-center justify-center overflow-hidden  px-5 py-20">
      {/* Grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.025] dark:opacity-[0.04]"
        style={{
          backgroundImage: `
            linear-gradient(currentColor 1px, transparent 1px),
            linear-gradient(90deg, currentColor 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Content */}
      <div className="relative z-10 mx-auto w-full max-w-2xl text-center">
        {/* Icon */}
        <div className="mx-auto mb-8">
          <div className="relative mx-auto flex h-24 w-24 items-center justify-center rounded-[2rem] border border-border bg-card shadow-xl">
            <div className="absolute inset-0 rounded-[2rem] bg-lime-400/10 blur-xl" />

            <ShoppingBag className="relative h-9 w-9 text-foreground/70" />

            <div className="absolute -right-2 -top-2 flex h-8 w-8 items-center justify-center rounded-full border border-border  shadow-lg">
              <Sparkles className="h-3.5 w-3.5 text-lime-500" />
            </div>
          </div>
        </div>

        {/* Heading */}
        <div>
          {isSearch ? (
            <>
              <p className="mb-3 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Search results
              </p>

              <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                Nothing matched your search.
              </h1>
            </>
          ) : (
            <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">
              {title ?? "No products found"}
            </h1>
          )}
        </div>

        {/* Search query */}
        {searchQuery && (
          <div className="mt-5">
            <div className="mx-auto inline-flex max-w-full items-center gap-2 rounded-full border border-border bg-muted/50 px-4 py-2 text-sm">
              <Search className="h-4 w-4 shrink-0 text-muted-foreground" />

              <span className="truncate text-muted-foreground">
                {searchQuery}
              </span>
            </div>
          </div>
        )}

        {/* Description */}
        <p className="mx-auto mt-6 max-w-lg text-sm leading-7 text-muted-foreground sm:text-base">
          {description ??
            (isSearch
              ? "Try checking your spelling, using fewer words, or searching for something more general."
              : "There are currently no products available in this collection. Explore our other categories to discover something you might like.")}
        </p>

        {/* Actions */}
        <div className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/products"
            className="group inline-flex w-full items-center justify-center gap-2 rounded-full bg-foreground px-6 py-3.5 text-sm font-medium text-background shadow-lg transition-all duration-300 hover:-translate-y-0.5 hover:shadow-xl sm:w-auto"
          >
            Explore all products
            <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>

          <Link
            href="/"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-border bg-background/70 px-6 py-3.5 text-sm font-medium backdrop-blur-xl transition-all duration-300 hover:-translate-y-0.5 hover:bg-muted sm:w-auto"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to home
          </Link>
        </div>

        {/* Search suggestions */}
        {isSearch && (
          <div className="mt-12">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
              You could try
            </p>

            <div className="flex flex-wrap justify-center gap-2">
              {["Electronics", "Fashion", "Accessories", "Home"].map((item) => (
                <Link
                  key={item}
                  href={`/products?search=${encodeURIComponent(item)}`}
                  className="rounded-full border border-border px-4 py-2 text-xs text-muted-foreground transition hover:border-foreground/30 hover:text-foreground"
                >
                  {item}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
