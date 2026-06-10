import Image from "next/image";
import { cn } from "@/lib/cn";

export function DestinationImagePlaceholder({
  label,
  className,
  variant = "horizontal",
}: {
  label: string;
  className?: string;
  variant?: "horizontal" | "vertical";
}) {
  return (
    <div
      className={cn(
        "relative overflow-hidden rounded-xl2 border border-navy-900/10 bg-gradient-to-br from-navy-900/90 via-navy-950 to-navy-900/95",
        variant === "vertical" && "bg-gradient-to-b from-navy-900/85 via-navy-950 to-navy-900",
        className
      )}
      aria-hidden
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,106,0.1),transparent_72%)]" />
      <div className="absolute inset-0 flex items-center justify-center p-4">
        <span className="rounded-full border border-white/12 bg-white/[0.04] px-3 py-1 text-[10px] font-medium tracking-[0.14em] uppercase text-ivory-100/50">
          {label}
        </span>
      </div>
    </div>
  );
}

export function DestinationMedia({
  src,
  alt,
  available,
  placeholderLabel,
  aspectClassName,
  imageClassName,
}: {
  src: string;
  alt: string;
  available: boolean;
  placeholderLabel: string;
  aspectClassName: string;
  imageClassName?: string;
}) {
  return (
    <div className={cn("relative w-full overflow-hidden rounded-xl2", aspectClassName)}>
      {available ? (
        <Image
          src={src}
          alt={alt}
          fill
          unoptimized
          className={cn("object-cover", imageClassName)}
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      ) : (
        <DestinationImagePlaceholder
          label={placeholderLabel}
          className="absolute inset-0 h-full w-full"
          variant={aspectClassName.includes("4/5") ? "vertical" : "horizontal"}
        />
      )}
    </div>
  );
}
