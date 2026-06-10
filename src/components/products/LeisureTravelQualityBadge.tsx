import Image from "next/image";
import { cn } from "@/lib/cn";

const LOGO_LIGHT = "/images/logo-aixiaoyao.png";
const LOGO_DARK = "/images/logo-aixiaoyao-white.jpg";

export function LeisureTravelQualityBadge({
  label,
  size = "section",
  tone = "light",
  className,
}: {
  label: string;
  size?: "section" | "compact";
  /** light = ivory/card backgrounds; dark = navy hero backgrounds */
  tone?: "light" | "dark";
  className?: string;
}) {
  const isCompact = size === "compact";
  const isDark = tone === "dark";

  return (
    <div
      className={cn(
        "inline-flex items-center gap-2.5 rounded-lg border",
        isDark
          ? "border-white/10 bg-white/5"
          : "border-navy-900/10 bg-white/80",
        isCompact ? "px-2.5 py-1.5" : "px-3.5 py-2.5",
        className
      )}
    >
      <div
        className={cn(
          "relative shrink-0",
          isCompact ? "h-7 w-14" : "h-9 w-20"
        )}
      >
        <Image
          src={isDark ? LOGO_DARK : LOGO_LIGHT}
          alt=""
          fill
          unoptimized
          className="object-contain object-left"
          sizes={isCompact ? "56px" : "80px"}
        />
      </div>
      <span
        className={cn(
          "leading-snug tracking-wide",
          isDark
            ? "text-ivory-100/70"
            : "text-navy-900/65",
          isCompact ? "text-[10px]" : "text-xs"
        )}
      >
        {label}
      </span>
    </div>
  );
}
