import Link from "next/link";
import { cn } from "@/lib/cn";
import { localePath, type SiteLocale } from "@/lib/locale-paths";

const DESTINATION_PROGRAM_ANCHORS: Record<string, string> = {
  shaanxi: "shaanxi-programs",
  heilongjiang: "heilongjiang-programs",
  jilin: "jilin-programs",
  henan: "henan-programs",
};

const labels = {
  en: {
    regular: "Regular Products",
    study: "Study Tours",
    special: "Special Interest Travel",
  },
  zh: {
    regular: "常规产品",
    study: "研学旅行",
    special: "特殊兴趣旅行",
  },
} as const;

const linkClass =
  "inline-flex items-center justify-center rounded-full border border-navy-900/12 bg-white px-4 py-2 text-sm font-medium text-navy-900/85 shadow-soft transition-colors hover:border-gold-400/45 hover:text-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50";

export function DestinationProductEntryNav({
  locale,
  destinationSlug,
}: {
  locale: SiteLocale;
  destinationSlug: string;
}) {
  const anchor = DESTINATION_PROGRAM_ANCHORS[destinationSlug];
  if (!anchor) return null;

  const copy = labels[locale];
  const regularHref = localePath(`/products/destination-products#${anchor}`, locale);
  const studyHref = localePath("/products/study-tours", locale);
  const specialHref = localePath("/products/special-interest-travel", locale);

  return (
    <section className="border-b border-navy-900/8 bg-ivory-50">
      <div className="mx-auto max-w-6xl px-4 py-6 sm:px-6 sm:py-7">
        <nav
          aria-label={locale === "zh" ? "产品入口" : "Product entry"}
          className="flex flex-wrap gap-2 sm:gap-2.5"
        >
          <Link href={regularHref} className={cn(linkClass, "border-gold-400/30 text-navy-950")}>
            {copy.regular}
          </Link>
          <Link href={studyHref} className={linkClass}>
            {copy.study}
          </Link>
          <Link href={specialHref} className={linkClass}>
            {copy.special}
          </Link>
        </nav>
      </div>
    </section>
  );
}
