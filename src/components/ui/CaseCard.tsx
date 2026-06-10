import { cn } from "@/lib/cn";

export function CaseCard({
  headline,
  meta,
  className,
}: {
  headline: string;
  meta: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl2 border border-white/10 bg-[rgba(15,18,28,0.92)] p-5 shadow-soft",
        className
      )}
    >
      <div className="text-sm font-semibold tracking-tightish text-white">{headline}</div>
      <div className="mt-1 text-xs tracking-[0.18em] uppercase text-[rgba(255,255,255,0.62)]">
        {meta}
      </div>
    </div>
  );
}

