import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/Icons";
import { cn } from "@/lib/cn";

type ProductShowcaseCardProps = {
  title: string;
  subtitle?: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
};

const overlayGradient =
  "linear-gradient(90deg, rgba(2, 11, 22, 0.92) 0%, rgba(2, 11, 22, 0.78) 28%, rgba(2, 11, 22, 0.35) 55%, rgba(2, 11, 22, 0) 100%)";

export function ProductShowcaseCard({
  title,
  subtitle,
  description,
  href,
  imageSrc,
  imageAlt,
}: ProductShowcaseCardProps) {
  const card = (
    <div
      className={cn(
        "relative aspect-[8/3] min-h-[220px] overflow-hidden rounded-xl2 border border-[rgba(15,23,42,0.12)]",
        "shadow-[0_8px_32px_rgba(15,23,42,0.12)] sm:min-h-[260px]"
      )}
    >
      <Image
        src={imageSrc}
        alt={imageAlt}
        fill
        unoptimized
        className="object-cover"
        sizes="(max-width: 1024px) 100vw, 1280px"
      />
      <div
        className="absolute inset-0"
        style={{ background: overlayGradient }}
        aria-hidden
      />
      <div className="absolute inset-0 flex items-center justify-between gap-4 px-6 py-5 sm:px-12 sm:py-8 lg:px-16 lg:py-10">
        <div className="min-w-0 max-w-xl flex-1 pr-2">
          <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tightish text-white sm:text-2xl lg:text-[1.75rem]">
            {title}
          </h3>
          {subtitle ? (
            <p className="mt-1.5 text-xs font-medium uppercase tracking-[0.14em] text-gold-300/90 sm:text-[0.8125rem]">
              {subtitle}
            </p>
          ) : null}
          <p className="mt-3 max-w-lg text-sm leading-relaxed text-ivory-100/88 sm:text-[0.9375rem]">
            {description}
          </p>
        </div>
        <span
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold-400/45 bg-[rgba(2,11,22,0.35)] text-gold-300 sm:h-11 sm:w-11"
          aria-hidden="true"
        >
          <IconArrowRight className="h-4 w-4" />
        </span>
      </div>
    </div>
  );

  if (href === "#") {
    return <div className="block h-full">{card}</div>;
  }

  return (
    <Link
      href={href}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60"
    >
      {card}
    </Link>
  );
}
