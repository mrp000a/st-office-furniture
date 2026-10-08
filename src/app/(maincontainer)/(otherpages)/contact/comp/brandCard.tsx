import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function BrandCard() {
  return (
    <div className="group border-border text-background reveal relative w-full overflow-hidden rounded-2xl border bg-[#362b2b] p-6 shadow-sm dark:bg-[#dbd6d6]">
      {/* Decorative accent */}
      <div className="bg-green-primary/20 pointer-events-none w-full rounded-full blur-3xl" />

      <div className="reveal relative">
        {/* Brand */}
        <div className="reveal flex items-center gap-3">
          <div className="bg-green-primary flex h-11 w-11 items-center justify-center rounded-xl text-lg font-black text-white shadow-sm">
            ST
          </div>

          <div>
            <p className="text-sm font-bold tracking-tight">
              ST Office Furniture
            </p>

            <p className="text-background/50 mt-0.5 text-[10px] font-medium tracking-[0.18em] uppercase">
              Office Furniture
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="bg-background/10 my-2 h-px" />

        {/* Message */}
        <div className="reveal">
          <p className="reveal text-xl leading-tight font-bold tracking-tight">
            Better Seating.
            <br />
            <span className="text-green-primary">Better Working.</span>
          </p>

          <p className="text-background/55 reveal mt-3 max-w-70 text-xs leading-5">
            Comfortable, practical and professional furniture for modern
            workspaces.
          </p>
        </div>

        {/* Footer */}
        <div className="reveal mt-3 flex items-center justify-between gap-4">
          <div>
            <p className="text-background/40 text-[10px] tracking-wider uppercase">
              Based in
            </p>

            <p className="mt-1 text-xs font-medium">Dhaka, Bangladesh</p>
          </div>

          <Link
            href="/products"
            className="bg-green-primary reveal inline-flex h-9 items-center gap-1.5 rounded-lg px-3.5 text-xs font-semibold text-white transition-all hover:-translate-y-0.5 hover:shadow-lg"
          >
            Explore
            <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>
      </div>
    </div>
  );
}
