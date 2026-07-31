import { cn } from "@/lib/cn";

type Tone = "navy" | "ivory";

export function Section({
  tone,
  className,
  children,
  id,
}: {
  tone: Tone;
  className?: string;
  children: React.ReactNode;
  id?: string;
}) {
  const base =
    tone === "navy"
      ? "bg-navy-950 text-ivory-100"
      : "bg-ivory-50 text-navy-950";

  return (
    <section id={id} className={cn("py-14 sm:py-20 scroll-mt-24", base, className)}>
      {children}
    </section>
  );
}

