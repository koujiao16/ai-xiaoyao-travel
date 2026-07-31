import Image from "next/image";
import Link from "next/link";
import { IconArrowRight } from "@/components/ui/Icons";

export function DestinationShowcaseCard({
  title,
  subtitle,
  description,
  href,
  imageSrc,
  imageAlt,
}: {
  title: string;
  subtitle: string;
  description: string;
  href: string;
  imageSrc: string;
  imageAlt: string;
}) {
  return (
    <Link
      href={href}
      className="group block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60"
    >
      <div className="relative min-h-[380px] overflow-hidden rounded-xl2 border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.28)] sm:min-h-[420px] lg:min-h-[480px]">
        <Image
          src={imageSrc}
          alt={imageAlt}
          fill
          unoptimized
          className="object-cover"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[68%] bg-gradient-to-t from-[#060f1a]/95 via-[#060f1a]/72 to-transparent"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-5 sm:p-6">
          <div className="min-w-0 flex-1 pr-2">
            <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tightish text-ivory-50 sm:text-2xl">
              {title}
            </h3>
            <p className="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-ivory-100/75 sm:text-[0.8125rem]">
              {subtitle}
            </p>
            <p className="mt-3 max-w-[18rem] text-sm leading-relaxed text-ivory-100/80 sm:max-w-none">
              {description}
            </p>
          </div>
          <span
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/15 bg-white/10 text-ivory-50 transition-colors group-hover:border-gold-400/40 group-hover:bg-white/15"
            aria-hidden="true"
          >
            <IconArrowRight className="h-4 w-4" />
          </span>
        </div>
      </div>
    </Link>
  );
}
