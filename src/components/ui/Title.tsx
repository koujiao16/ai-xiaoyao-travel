import { cn } from "@/lib/cn";

export function Title({
  eyebrow,
  title,
  description,
  invert,
  className,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  invert?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("max-w-2xl", className)}>
      {eyebrow ? (
        <p
          className={cn(
            "text-xs font-medium tracking-[0.22em] uppercase",
            invert ? "text-gold-300/90" : "text-navy-900/60"
          )}
        >
          {eyebrow}
        </p>
      ) : null}
      <h2
        className={cn(
          "mt-3 font-[family-name:var(--font-display)] text-3xl tracking-tightish sm:text-4xl",
          invert ? "text-white" : "text-[#0f172a]"
        )}
      >
        {title}
      </h2>
      {description ? (
        <p
          className={cn(
            "mt-4 text-base leading-relaxed",
            invert ? "text-white/[0.68]" : "text-[rgba(15,23,42,0.68)]"
          )}
        >
          {description}
        </p>
      ) : null}
    </div>
  );
}

