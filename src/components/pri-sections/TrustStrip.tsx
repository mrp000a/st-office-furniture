import {
  Truck,
  ShieldCheck,
  RotateCcw,
  MessageCircle,
} from "lucide-react";

const trustItems = [
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Reliable delivery across Bangladesh",
  },
  {
    icon: ShieldCheck,
    title: "Quality Assured",
    description: "Carefully selected furniture",
  },
  {
    icon: RotateCcw,
    title: "Easy Support",
    description: "We're here when you need us",
  },
  {
    icon: MessageCircle,
    title: "Expert Help",
    description: "Need help choosing?",
  },
];

export function TrustStrip() {
  return (
    <section className="relative w-full bg-background">
      <div className="mx-auto max-w-384 px-4 py-8 sm:px-6 lg:px-8 lg:py-10">
        <div className="grid grid-cols-2 gap-y-8 md:grid-cols-4 md:gap-y-0">
          {trustItems.map((item, index) => {
            const Icon = item.icon;

            return (
              <div
                key={item.title}
                className={`
                  flex items-center gap-4 px-4
                  sm:px-6
                  md:justify-center
                  ${
                    index !== 0
                      ? "md:border-l md:border-border"
                      : ""
                  }
                `}
              >
                <div className="flex size-12 shrink-0 items-center justify-center rounded-full bg-primary/10">
                  <Icon
                    className="size-5 text-primary"
                    strokeWidth={1.8}
                  />
                </div>

                <div>
                  <h3 className="text-sm font-semibold sm:text-base">
                    {item.title}
                  </h3>

                  <p className="mt-1 max-w-[180px] text-xs leading-5 text-muted-foreground sm:text-sm">
                    {item.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}