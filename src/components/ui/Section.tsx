import { cn } from "@/lib/cn";

type Tone = "navy" | "ivory";

export function Section({
  tone,
  className,
  children,
}: {
  tone: Tone;
  className?: string;
  children: React.ReactNode;
}) {
  const base =
    tone === "navy"
      ? "bg-navy-950 text-ivory-100"
      : "bg-ivory-50 text-navy-950";

  return (
    <section className={cn("py-14 sm:py-20", base, className)}>
      {children}
    </section>
  );
}

