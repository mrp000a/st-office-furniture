"use client"
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft, Package } from "lucide-react";

interface CategoryHeaderProps {
  name: string;
  description?: string | null;
  image?: string | null;
  productCount?: number;
}

export default function CategoryHeader({
  name,
  description,
  image,
  productCount,
}: CategoryHeaderProps) {
  return (
    <section className=" ">
      <div className="mx-auto max-w-384 px-5 py-10 sm:px-8 lg:px-12 lg:py-16 bg-background border rounded-md">
        <div className="mb-8">
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            <ArrowLeft className="h-4 w-4" />
            All categories
          </Link>
        </div>

        <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-2xl">
            <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground">
              Category
            </p>

            <h1 className="text-4xl font-semibold tracking-[-0.04em] sm:text-5xl lg:text-6xl">
              {name}
            </h1>

            {description && (
              <p className="mt-6 max-w-xl text-base leading-7 text-muted-foreground sm:text-lg sm:leading-8">
                {description}
              </p>
            )}

            {typeof productCount === "number" && (
              <div className="mt-8 inline-flex items-center gap-2 rounded-full border border-border bg-background px-4 py-2 text-sm text-muted-foreground">
                <Package className="h-4 w-4" />
                {productCount} {productCount === 1 ? "product" : "products"}
              </div>
            )}
          </div>

          <div className="relative aspect-[16/10] bg-white  overflow-hidden rounded-[2rem] border border-border  shadow-sm">
            {image ? (
              <Image
                src={image}
                alt={name}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain"
              />
            ) : (
              <div className="flex h-full items-center justify-center">
                <Package className="h-16 w-16 text-muted-foreground/30" />
              </div>
            )}

            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
