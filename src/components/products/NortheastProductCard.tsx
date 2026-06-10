import { ButtonLink } from "@/components/ui/Button";
import { LeisureTravelQualityBadge } from "@/components/products/LeisureTravelQualityBadge";
import { localePath, type SiteLocale } from "@/lib/locale-paths";
import type { NortheastListingLabels, NortheastProduct } from "@/lib/northeast-products-content";

function MetaRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex flex-col gap-0.5 sm:flex-row sm:gap-3">
      <dt className="shrink-0 text-xs font-medium tracking-wide text-navy-900/50 sm:w-24">
        {label}
      </dt>
      <dd className="text-sm leading-relaxed text-navy-950/85">{value}</dd>
    </div>
  );
}

export function NortheastProductCard({
  product,
  labels,
  locale,
}: {
  product: NortheastProduct;
  labels: NortheastListingLabels;
  locale: SiteLocale;
}) {
  const detailHref = localePath(
    `/products/destination-products/northeast/${product.slug}`,
    locale
  );

  return (
    <article className="flex h-full flex-col rounded-xl2 border border-navy-900/10 bg-white p-6 shadow-soft sm:p-7">
      <LeisureTravelQualityBadge
        label={labels.qualityBadgeLabel}
        size="compact"
        tone="light"
      />

      <h3 className="mt-5 font-[family-name:var(--font-display)] text-xl tracking-tightish text-navy-950">
        {product.title}
      </h3>

      <dl className="mt-5 space-y-3">
        <MetaRow label={labels.routeLabel} value={product.route} />
        <MetaRow label={labels.durationLabel} value={product.duration} />
        {product.arrivalDeparture ? (
          <MetaRow label={labels.arrivalDepartureLabel} value={product.arrivalDeparture} />
        ) : null}
        <MetaRow label={labels.departureLabel} value={product.departure} />
        <MetaRow label={labels.groupSizeLabel} value={product.groupSize} />
      </dl>

      <div className="mt-7 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
        <ButtonLink href={detailHref} variant="secondaryDark" className="!text-sm">
          {labels.viewDetailsLabel}
        </ButtonLink>
        <ButtonLink href={product.pdfUrl} variant="secondaryDark" className="!text-sm" external>
          {labels.viewPdfLabel}
        </ButtonLink>
      </div>
    </article>
  );
}
