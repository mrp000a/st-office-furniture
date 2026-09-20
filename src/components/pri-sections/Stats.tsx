import { Users, Armchair, Star, Headphones } from "lucide-react";

const stats = [
  {
    value: "500+",
    label: "Happy Customers",
    description: "Trusted by customers",
    icon: Users,
  },
  {
    value: "100+",
    label: "Products",
    description: "Furniture for every space",
    icon: Armchair,
  },
  {
    value: "4.8",
    label: "Average Rating",
    description: "Rated by our customers",
    icon: Star,
  },
  {
    value: "24/7",
    label: "Customer Support",
    description: "We're always here to help",
    icon: Headphones,
  },
];

export function StatsSection() {
  return (
    <section className="relative overflow-hidden bg-zinc-950 py-16 text-white dark:text-white sm:py-20 lg:py-24">
      {/* Background decoration */}
      <div className="pointer-events-none absolute left-1/2 top-0 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[100px]" />

      <div className="relative mx-auto max-w-384 px-4 sm:px-6 lg:px-8">
        {/* Section heading */}
        <div className="mx-auto mb-12 max-w-2xl text-center lg:mb-16">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.25em] text-gray-secondary">
            ST Office Furniture
          </p>

          <h2 className="text-2xl font-bold tracking-tight sm:text-3xl lg:text-4xl">
            Trusted by businesses and{" "}
            <span className="text-gray-secondary">individuals</span>
          </h2>

          <p className="mt-4 text-sm leading-6 text-zinc-400 sm:text-base">
            Quality furniture, comfortable designs, and dependable service built
            around the people who choose us.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 divide-x divide-zinc-800 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className="
                  group relative flex flex-col items-center
                  px-4 py-5 text-center
                  transition-transform duration-300
                  hover:-translate-y-1
                  sm:px-8 sm:py-6
                "
              >
                {/* Icon */}
                <div
                  className="
                    mb-5 flex size-11 items-center justify-center
                    rounded-full border border-zinc-800
                    bg-zinc-900
                    transition-all duration-300
                    group-hover:border-primary/40
                    group-hover:bg-primary/10
                  "
                >
                  <Icon
                    className="size-5 text-zinc-400 transition-colors duration-300 group-hover:text-primary"
                    strokeWidth={1.7}
                  />
                </div>

                {/* Number */}
                <div
                  className="
                    text-4xl font-bold tracking-tight
                    sm:text-5xl lg:text-5xl
                  "
                >
                  {stat.value}
                </div>

                {/* Label */}
                <h3 className="mt-2 text-sm font-semibold text-white sm:text-base">
                  {stat.label}
                </h3>

                {/* Description */}
                <p className="mt-1 max-w-[170px] text-xs leading-5 text-zinc-500">
                  {stat.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
