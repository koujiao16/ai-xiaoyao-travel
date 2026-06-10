import { cn } from "@/lib/cn";

export function Stat({
  label,
  value,
  className,
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "rounded-xl2 border border-navy-900/10 bg-white px-5 py-4 shadow-soft",
        className
      )}
    >
      <div className="text-2xl font-semibold tracking-tightish text-navy-950">
        {value}
      </div>
      <div className="mt-1 text-xs tracking-[0.18em] uppercase text-navy-900/60">
        {label}
      </div>
    </div>
  );
}

