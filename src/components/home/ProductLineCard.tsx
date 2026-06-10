import Link from "next/link";
import { IconArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

export function ProductLineCard({
  title,
  description,
  href,
  exploreLabel,
}: {
  title: string;
  description: string;
  href: string;
  exploreLabel: string;
}) {
  return (
    <Link
      href={href}
      className={cn(
        "group block h-full rounded-xl2 border border-[rgba(15,23,42,0.10)] bg-white p-6 shadow-[0_4px_24px_rgba(15,23,42,0.06)]",
        "transition-[transform,box-shadow,border-color] duration-300 ease-out",
        "hover:-translate-y-0.5 hover:border-[rgba(15,23,42,0.18)] hover:shadow-[0_12px_40px_rgba(15,23,42,0.10)]",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60"
      )}
    >
      <h3 className="text-base font-semibold tracking-tightish text-[#0f172a] sm:text-[1.0625rem]">
        {title}
      </h3>
      <p className="mt-3 text-sm leading-relaxed text-[rgba(15,23,42,0.68)]">{description}</p>
      <span className="mt-5 inline-flex items-center gap-1.5 text-xs font-medium tracking-wide text-navy-900/55 transition-colors group-hover:text-navy-900/75">
        {exploreLabel}
        <IconArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" />
      </span>
    </Link>
  );
}
