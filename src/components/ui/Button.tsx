import Link from "next/link";
import { cn } from "@/lib/cn";

type Variant = "primary" | "secondary" | "secondaryDark" | "ghost";

const styles: Record<Variant, string> = {
  primary:
    "bg-gold-400 text-navy-950 hover:bg-gold-300 shadow-card border border-gold-300/40",
  secondary:
    "bg-white/5 text-ivory-100 hover:bg-white/10 border border-white/10",
  secondaryDark:
    "bg-navy-950 text-ivory-100 hover:bg-navy-900 border border-navy-900/20",
  ghost: "bg-transparent text-ivory-100/80 hover:text-ivory-50",
};

export function ButtonLink({
  href,
  variant = "secondary",
  className,
  children,
  onClick,
  external,
}: {
  href: string;
  variant?: Variant;
  className?: string;
  children: React.ReactNode;
  onClick?: () => void;
  external?: boolean;
}) {
  const openInNewTab = external ?? href.startsWith("http");

  return (
    <Link
      href={href}
      onClick={onClick}
      {...(openInNewTab ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={cn(
        "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-medium transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950",
        styles[variant],
        className
      )}
    >
      {children}
    </Link>
  );
}

