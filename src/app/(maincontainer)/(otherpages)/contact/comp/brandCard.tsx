import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BrandCard() {
  return (
    <div className="group relative w-full overflow-hidden rounded-2xl border border-border bg-[#362b2b] dark:bg-[#dbd6d6] p-6 text-background shadow-sm">
      {/* Decorative accent */}
      <div className="pointer-events-none w-full  rounded-full bg-green-primary/20 blur-3xl" />

      <div className="relative">
        {/* Brand */}
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-green-primary text-lg font-black text-white shadow-sm">
            ST
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight">
              ST Office Furniture
            </p>

            <p className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.18em] text-background/50">
              Office Furniture
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-2 h-px bg-background/10" />

        {/* Message */}
        <div>
          <p className="text-xl font-bold leading-tight tracking-tight">
            Better Seating.
            <br />
            <span className="text-green-primary">Better Working.</span>
          </p>

          <p className="mt-3 max-w-70 text-xs leading-5 text-background/55">
            Comfortable, practical and professional furniture for modern
            workspaces.
          </p>
        </div>

        {/* Footer */}
        <div className="mt-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-[10px] uppercase tracking-wider text-background/40">
              Based in
            </p>

            <p className="mt-1 text-xs font-medium">Dhaka, Bangladesh</p>
          </div>

          <Link
            href="/products"
            className="inline-flex h-9 items-center gap-1.5 rounded-lg bg-green-primary px-3.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
