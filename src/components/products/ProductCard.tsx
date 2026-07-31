import Image from "next/image";
import { ButtonLink } from "@/components/ui/Button";
import {
  getProductCategory,
  getProductDuration,
  getProductRoute,
  getProductTags,
  getProductTitle,
  type Product,
} from "@/data/products";
import { localePath, type SiteLocale } from "@/lib/locale-paths";
import { cn } from "@/lib/cn";

type ImagePosition = "top" | "center" | "bottom";

const imageObjectPosition: Record<ImagePosition, string> = {
  top: "top center",
  center: "center center",
  bottom: "bottom center",
};

export function ProductCard({
  product,
  locale,
  tone = "light",
  imagePosition = "center",
}: {
  product: Product;
  locale: SiteLocale;
  tone?: "light" | "dark";
  /** Photographic covers default to center; posters can use top. */
  imagePosition?: ImagePosition;
}) {
  const title = getProductTitle(product, locale);
  const route = getProductRoute(product, locale);
  const duration = getProductDuration(product, locale);
  const category = getProductCategory(product, locale);
  const tags = getProductTags(product, locale).slice(0, 3);
  const detailHref = localePath(`/products/${product.id}`, locale);
  const viewLabel = locale === "zh" ? "查看详情" : "View Details";
  const pdfLabel = locale === "zh" ? "查看PDF" : "View PDF";
  const durationLabel = locale === "zh" ? "行程" : "Duration";
  const routeLabel = locale === "zh" ? "线路" : "Route";
  const featuredLabel = locale === "zh" ? "精选" : "Featured";
  const isFeatured = Boolean(product.featured);
  const isDark = tone === "dark";
  const buttonVariant = isDark ? "secondary" : "secondaryDark";

  return (
    <article
      className={cn(
        "flex h-full flex-col overflow-hidden rounded-xl2",
        isFeatured
          ? "border border-gold-400/45 bg-white shadow-[0_10px_32px_rgba(15,23,42,0.12)] ring-1 ring-gold-400/25"
          : isDark
            ? "border border-white/10 bg-white/[0.04] shadow-[0_8px_28px_rgba(0,0,0,0.22)]"
            : "border border-navy-900/10 bg-white shadow-soft"
      )}
    >
      <div className="relative h-[220px] w-full overflow-hidden sm:h-[320px]">
        <Image
          src={product.coverImage}
          alt={title}
          fill
          unoptimized
          className="object-cover"
          style={{ objectPosition: imageObjectPosition[imagePosition] }}
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(6,20,34,0.88)] via-[rgba(6,20,34,0.35)] to-transparent"
          aria-hidden
        />

        <div className="absolute left-4 top-4 flex flex-wrap gap-2">
          {isFeatured ? (
            <span className="inline-flex rounded-full border border-gold-400/55 bg-navy-950/80 px-3 py-1 text-[11px] font-medium tracking-wide text-gold-300 backdrop-blur-sm">
              {featuredLabel}
            </span>
          ) : null}
          <span className="inline-flex rounded-full border border-white/20 bg-navy-950/70 px-3 py-1 text-[11px] font-medium tracking-wide text-ivory-100/90 backdrop-blur-sm">
            {category}
          </span>
        </div>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-5">
          <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tightish text-white sm:text-2xl">
            {title}
          </h3>
          <p className="mt-1.5 text-sm text-ivory-100/80">
            {duration}
            <span className="mx-2 text-ivory-100/35" aria-hidden>
              ·
            </span>
            {route}
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col p-5 sm:p-6">
        {tags.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {tags.map((tag) => (
              <span
                key={tag}
                className={
                  isDark
                    ? "border border-white/12 px-2 py-0.5 text-[10px] tracking-wide text-ivory-100/60"
                    : "border border-navy-900/10 px-2 py-0.5 text-[10px] tracking-wide text-navy-900/55"
                }
              >
                {tag}
              </span>
            ))}
          </div>
        ) : null}

        <dl
          className={cn(
            "space-y-2.5",
            tags.length > 0 ? "mt-4" : "mt-0"
          )}
        >
          <div>
            <dt
              className={
                isDark
                  ? "text-xs tracking-wide text-ivory-100/45"
                  : "text-xs tracking-wide text-navy-900/45"
              }
            >
              {durationLabel}
            </dt>
            <dd
              className={
                isDark
                  ? "mt-0.5 text-sm text-ivory-100/85"
                  : "mt-0.5 text-sm text-navy-950/85"
              }
            >
              {duration}
            </dd>
          </div>
          <div>
            <dt
              className={
                isDark
                  ? "text-xs tracking-wide text-ivory-100/45"
                  : "text-xs tracking-wide text-navy-900/45"
              }
            >
              {routeLabel}
            </dt>
            <dd
              className={
                isDark
                  ? "mt-0.5 text-sm leading-relaxed text-ivory-100/85"
                  : "mt-0.5 text-sm leading-relaxed text-navy-950/85"
              }
            >
              {route}
            </dd>
          </div>
        </dl>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <ButtonLink href={detailHref} variant={buttonVariant} className="!text-sm">
            {viewLabel}
          </ButtonLink>
          <ButtonLink
            href={product.pdfFile}
            variant={buttonVariant}
            className="!text-sm"
            external
          >
            {pdfLabel}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}
