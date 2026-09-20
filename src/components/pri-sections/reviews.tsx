"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Quote, Star, BadgeCheck } from "lucide-react";
import { ProductDefaultImage, ProfileDefaultImage } from "../data/core";

const reviews = [
  {
    name: "Tanvir Ahmed",
    role: "Business Owner",
    image: ProfileDefaultImage,
    rating: 5,
    review:
      "The chair quality is excellent and the design looks even better in person. It made a noticeable difference in our office setup.",
    date: "2 weeks ago",
    verified: true,
  },
  {
    name: "Nusrat Jahan",
    role: "Corporate Professional",
    image: ProfileDefaultImage,
    rating: 5,
    review:
      "Very comfortable and well-built. The ordering process was smooth and the support team was helpful throughout.",
    date: "1 month ago",
    verified: true,
  },
  {
    name: "Mahmud Hasan",
    role: "Entrepreneur",
    image: ProfileDefaultImage,
    rating: 4,
    review:
      "Good quality furniture with a professional look. Delivery was convenient and the product matched the description.",
    date: "1 month ago",
    verified: true,
  },
];

function RatingStars({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          className={`size-4 ${
            star <= rating
              ? "fill-primary text-primary"
              : "text-muted-foreground/30"
          }`}
        />
      ))}
    </div>
  );
}

export function ReviewsSection() {
  return (
    <section className="relative overflow-hidden bg-muted/30 py-20 sm:py-24 lg:py-32">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-0 top-20 size-80 rounded-full bg-primary/5 blur-[100px]" />
      <div className="pointer-events-none absolute bottom-0 right-0 size-96 rounded-full bg-primary/5 blur-[120px]" />

      <div className="relative mx-auto max-w-384 px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}

        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-primary" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Customer Stories
              </span>
            </div>

            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Trusted by people who{" "}
              <span className="text-primary">value better workspaces.</span>
            </h2>

            <p className="mt-5 max-w-xl text-sm leading-7 text-muted-foreground sm:text-base">
              From home offices to professional workplaces, our customers choose
              ST Office Furniture for comfort, quality, and dependable service.
            </p>
          </div>

          {/* Overall rating */}
          <div className="flex shrink-0 items-center gap-4 rounded-2xl border bg-background px-5 py-4 shadow-sm">
            <div>
              <div className="text-3xl font-bold tracking-tight">4.8</div>

              <RatingStars rating={5} />
            </div>

            <div className="h-10 w-px bg-border" />

            <div>
              <p className="text-sm font-semibold">Excellent</p>

              <p className="text-xs text-muted-foreground">Customer rating</p>
            </div>
          </div>
        </div>

        {/* ================= REVIEWS ================= */}

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {reviews.map((review) => (
            <article
              key={review.name}
              className="
                group relative flex h-full flex-col
                rounded-2xl border bg-background
                p-6
                shadow-sm
                transition-all duration-300
                hover:-translate-y-1
                hover:shadow-xl
                sm:p-7
              "
            >
              {/* Quote icon */}
              <div
                className="
                  absolute right-6 top-6
                  flex size-9 items-center justify-center
                  rounded-full bg-primary/10
                "
              >
                <Quote className="size-4 text-primary" />
              </div>

              {/* Rating */}
              <RatingStars rating={review.rating} />

              {/* Review */}
              <blockquote className="mt-5 flex-1 text-sm leading-7 text-foreground/80 sm:text-[15px]">
                “{review.review}”
              </blockquote>

              {/* Divider */}
              <div className="my-6 h-px bg-border" />

              {/* Customer */}
              <div className="flex items-center gap-3">
                {/* Avatar */}
                <div className="relative size-11 shrink-0 overflow-hidden rounded-full bg-muted">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_URL_R2}/${review.image}`}
                    alt={review.name}
                    fill
                    className="object-cover"
                    sizes="44px"
                  />
                </div>

                {/* Details */}
                <div className="min-w-0">
                  <div className="flex items-center gap-1.5">
                    <p className="truncate text-sm font-semibold">
                      {review.name}
                    </p>

                    {review.verified && (
                      <BadgeCheck
                        className="size-4 shrink-0 text-primary"
                        fill="currentColor"
                        strokeWidth={1.5}
                      />
                    )}
                  </div>

                  <p className="text-xs text-muted-foreground">{review.role}</p>
                </div>

                <span className="ml-auto text-[11px] text-muted-foreground">
                  {review.date}
                </span>
              </div>

              {/* Verified */}
              {review.verified && (
                <div className="mt-4 flex items-center gap-1.5 text-[11px] font-medium text-muted-foreground">
                  <BadgeCheck className="size-3.5 text-primary" />
                  Verified purchase
                </div>
              )}
            </article>
          ))}
        </div>

        {/* ================= BOTTOM CTA ================= */}

        <div className="mt-10 flex flex-col items-center justify-between gap-5 rounded-2xl border bg-background px-6 py-6 sm:flex-row sm:px-8">
          <div>
            <p className="text-sm font-semibold">
              See what our customers are saying
            </p>

            <p className="mt-1 text-xs text-muted-foreground sm:text-sm">
              Explore more verified customer experiences.
            </p>
          </div>

          <Link
            href="/reviews"
            className="
              group inline-flex shrink-0 items-center gap-2
              rounded-xl border
              px-5 py-3
              text-sm font-semibold
              transition-all duration-300
              hover:border-primary/40
              hover:bg-primary/5
            "
          >
            View All Reviews
            <ArrowRight
              className="
                size-4
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>
      </div>
    </section>
  );
}
