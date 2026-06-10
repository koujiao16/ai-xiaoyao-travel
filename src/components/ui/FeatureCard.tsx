import Link from "next/link";
import { cn } from "@/lib/cn";
import { IconArrowRight } from "@/components/ui/Icons";

export function FeatureCard({
  title,
  description,
  href,
  tone = "navy",
  hover = "default",
}: {
  title: string;
  description?: string;
  href?: string;
  tone?: "navy" | "ivory";
  hover?: "default" | "subtle";
}) {
  const card =
    tone === "ivory"
      ? "bg-white border-[rgba(15,23,42,0.10)] text-[#0f172a] hover:border-[rgba(15,23,42,0.18)]"
      : "border-white/10 bg-white/[0.04] text-white hover:border-[rgba(212,175,55,0.45)]";

  const hoverMotion =
    hover === "subtle" && href
      ? tone === "ivory"
        ? "transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:shadow-[0_8px_28px_rgba(6,20,34,0.08)]"
        : "transition-[transform,box-shadow,border-color] duration-300 ease-out hover:-translate-y-0.5 hover:border-[rgba(212,175,55,0.45)] hover:shadow-[0_12px_40px_rgba(0,0,0,0.22)]"
      : "transition-[transform,border-color] duration-300 ease-out";

  const content = (
    <div
      className={cn(
        "group rounded-xl2 border p-6",
        tone === "ivory" ? "shadow-[0_4px_24px_rgba(15,23,42,0.06)]" : "shadow-[0_4px_24px_rgba(0,0,0,0.12)]",
        hoverMotion,
        card
      )}
    >
      <div className="flex items-start justify-between gap-6">
        <div>
          <h3
            className={cn(
              "text-base font-semibold tracking-tightish",
              tone === "ivory" ? "text-[#0f172a]" : "text-white"
            )}
          >
            {title}
          </h3>
          {description ? (
            <p
              className={cn(
                "mt-2 text-sm leading-relaxed",
                tone === "ivory" ? "text-[rgba(15,23,42,0.68)]" : "text-white/[0.68]"
              )}
            >
              {description}
            </p>
          ) : null}
        </div>
        {href ? (
          <span
            className={cn(
              "mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-full border transition-colors",
              tone === "ivory"
                ? "border-navy-900/10 bg-navy-950 text-ivory-50 group-hover:bg-navy-900"
                : "border-white/10 bg-white/5 text-ivory-50 group-hover:bg-white/10"
            )}
            aria-hidden="true"
          >
            <IconArrowRight className="h-4 w-4" />
          </span>
        ) : null}
      </div>
    </div>
  );

  if (!href) return content;

  return (
    <Link href={href} className="block focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60">
      {content}
    </Link>
  );
}

