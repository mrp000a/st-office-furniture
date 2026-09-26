import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight, ArrowRight } from "lucide-react";
import WorkSpaceSol_1 from "@/components/images/Office/a-large-black-desk-with-a-black-chair-and-a-black-board-on-the-wall-photo.jpg";
import WorkSpaceSol_2 from "@/components/images/Office/open-plan-work-space.jpg";
import WorkSpaceSol_3 from "@/components/images/Office/modern sofas.webp";

const workspaceSolutions = [
  {
    title: "Home Office",
    subtitle: "Work comfortably from home.",
    description:
      "Create a focused, comfortable workspace designed around the way you work.",
    image: WorkSpaceSol_1,
    href: "/products?workspace=home-office",
    number: "01",
  },
  {
    title: "Corporate Office",
    subtitle: "Build a productive workspace.",
    description:
      "Professional furniture solutions designed for productive teams and modern offices.",
    image: WorkSpaceSol_2,
    href: "/products?workspace=corporate-office",
    number: "02",
  },
  {
    title: "Reception",
    subtitle: "Make a strong first impression.",
    description:
      "Create welcoming reception spaces that reflect your brand and professionalism.",
    image: WorkSpaceSol_3,
    href: "/products?workspace=reception",
    number: "03",
  },
];

export function WorkspaceSolutions() {
  return (
    <section className="relative overflow-hidden bg-background py-20 sm:py-24 lg:py-32">
      <div className="mx-auto max-w-384 px-4 sm:px-6 lg:px-8">
        {/* ================= HEADER ================= */}

        <div className="mb-10 flex flex-col justify-between gap-6 sm:mb-14 lg:flex-row lg:items-end">
          <div className="max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-4 flex items-center gap-3">
              <span className="h-px w-9 bg-primary" />

              <span className="text-xs font-semibold uppercase tracking-[0.25em] text-primary">
                Workspace Solutions
              </span>
            </div>

            {/* Heading */}
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
              Find your{" "}
              <span className="text-primary">workspace solution.</span>
            </h2>

            <p className="mt-4 max-w-xl text-sm leading-6 text-muted-foreground sm:text-base">
              Whether you're working from home, building a growing team, or
              welcoming clients, find furniture designed for the space you want
              to create.
            </p>
          </div>

          {/* Desktop link */}
          <Link
            href="/workspace-solutions"
            className="
              group hidden items-center gap-2
              text-sm font-semibold
              sm:inline-flex
            "
          >
            Explore all solutions
            <ArrowRight
              className="
                size-4
                transition-transform duration-300
                group-hover:translate-x-1
              "
            />
          </Link>
        </div>

        {/* ================= CARDS ================= */}

        <div className="grid gap-5 md:grid-cols-3">
          {workspaceSolutions.map((solution) => (
            <Link
              key={solution.title}
              href={solution.href}
              className="
                group relative
                h-[430px]
                overflow-hidden rounded-2xl
                bg-zinc-900
                sm:h-[470px]
                lg:h-[500px]
              "
            >
              {/* Image */}
              <Image
                unoptimized
                src={solution.image}
                alt={solution.title}
                fill
                className="
                  object-cover
                  transition-transform duration-700
                  ease-out
                  group-hover:scale-105
                "
                sizes="
                  (max-width: 768px) 100vw,
                  (max-width: 1280px) 33vw,
                  420px
                "
              />

              {/* Dark overlay */}
              <div
                className="
                  absolute inset-0
                  bg-gradient-to-t
                  from-black via-black/45
                  to-black/5
                  transition-opacity duration-500
                  group-hover:from-black/90
                "
              />

              {/* Hover glow */}
              <div
                className="
                  absolute inset-0
                  bg-primary/0
                  transition-colors duration-500
                  group-hover:bg-primary/5
                "
              />

              {/* Number */}
              <div className="absolute right-5 top-5">
                <span
                  className="
                    text-xs font-medium
                    tracking-[0.2em]
                    text-white/60
                  "
                >
                  {solution.number}
                </span>
              </div>

              {/* Content */}
              <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7 lg:p-8">
                {/* Small line */}
                <div
                  className="
                    mb-4 h-px w-8 bg-primary
                    transition-all duration-500
                    group-hover:w-14
                  "
                />

                {/* Title */}
                <h3
                  className="
                    text-2xl font-bold capitalize
                    text-white sm:text-3xl
                  "
                >
                  {solution.title}
                </h3>

                {/* Subtitle */}
                <p className="mt-2 text-base font-medium text-white/90">
                  {solution.subtitle}
                </p>

                {/* Description */}
                <div
                  className="
                    grid grid-rows-[0fr]
                    transition-all duration-500
                    group-hover:grid-rows-[1fr]
                  "
                >
                  <div className="overflow-hidden">
                    <p className="mt-3 max-w-sm text-sm leading-6 text-white/65">
                      {solution.description}
                    </p>
                  </div>
                </div>

                {/* Explore */}
                <div className="mt-5 flex items-center gap-2 text-sm font-semibold text-white">
                  <span>Explore solution</span>

                  <span
                    className="
                      flex size-8 items-center justify-center
                      rounded-full bg-white/10
                      transition-all duration-300
                      group-hover:bg-primary
                    "
                  >
                    <ArrowUpRight
                      className="
                        size-4
                        transition-transform duration-300
                        group-hover:rotate-45
                      "
                    />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile / secondary CTA */}
        <div className="mt-8 sm:hidden">
          <Link
            href="/workspace-solutions"
            className="
              group inline-flex items-center gap-2
              text-sm font-semibold
            "
          >
            Explore all solutions
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
