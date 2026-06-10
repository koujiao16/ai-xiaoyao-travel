import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ButtonLink } from "@/components/ui/Button";
import { CTABox } from "@/components/ui/CTABox";
import { IconArrowRight, IconMail, IconMessage } from "@/components/ui/Icons";
import { LeisureTravelQualityBadge } from "@/components/products/LeisureTravelQualityBadge";
import {
  CONTACT_EMAIL_MAILTO,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import { localePath, type SiteLocale } from "@/lib/locale-paths";
import type {
  NortheastDetailLabels,
  NortheastProduct,
} from "@/lib/northeast-products-content";

function HeroMeta({
  label,
  value,
  invert,
}: {
  label: string;
  value: string;
  invert?: boolean;
}) {
  return (
    <div>
      <p
        className={
          invert
            ? "text-xs font-medium tracking-wide text-ivory-100/50"
            : "text-xs font-medium tracking-wide text-navy-900/50"
        }
      >
        {label}
      </p>
      <p
        className={
          invert
            ? "mt-1 text-sm leading-relaxed text-ivory-50/90"
            : "mt-1 text-sm leading-relaxed text-navy-950/85"
        }
      >
        {value}
      </p>
    </div>
  );
}

function GalleryPlaceholder({
  label,
  futureImagePath,
}: {
  label: string;
  futureImagePath: string;
}) {
  return (
    <div
      className="overflow-hidden rounded-xl2 border border-navy-900/10 bg-white shadow-soft"
      data-future-image={futureImagePath}
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-950/8 via-ivory-50 to-navy-950/5">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,106,0.08),transparent_70%)]" />
        <div className="absolute inset-0 flex items-center justify-center px-4">
          <span className="text-center text-xs tracking-wide text-navy-900/40">{label}</span>
        </div>
      </div>
    </div>
  );
}

export function NortheastProductDetailContent({
  product,
  labels,
  locale,
}: {
  product: NortheastProduct;
  labels: NortheastDetailLabels;
  locale: SiteLocale;
}) {
  const backHref = localePath("/products/destination-products", locale);
  const contactHref = localePath("/contact", locale);

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10 bg-navy-950">
        <div className="absolute inset-0 bg-gradient-to-b from-navy-950 via-navy-950 to-navy-900/95" />
        <Container className="relative py-12 sm:py-16">
          <Link
            href={backHref}
            className="inline-flex items-center text-sm text-ivory-100/60 transition-colors hover:text-ivory-50"
          >
            <IconArrowRight className="mr-2 h-4 w-4 rotate-180" aria-hidden="true" />
            {labels.backLabel}
          </Link>

          <div className="mt-8 max-w-3xl">
            <LeisureTravelQualityBadge
              label={labels.qualityBadgeLabel}
              size="compact"
              tone="dark"
            />

            <h1 className="mt-6 font-[family-name:var(--font-display)] text-3xl tracking-tightish text-ivory-50 sm:text-4xl">
              {product.title}
            </h1>

            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <HeroMeta label={labels.routeLabel} value={product.route} invert />
              <HeroMeta label={labels.durationLabel} value={product.duration} invert />
              {product.arrivalDeparture ? (
                <HeroMeta
                  label={labels.arrivalDepartureLabel}
                  value={product.arrivalDeparture}
                  invert
                />
              ) : null}
              <HeroMeta label={labels.departureLabel} value={product.departure} invert />
              <HeroMeta label={labels.groupSizeLabel} value={product.groupSize} invert />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="ivory">
        <Container>
          <Title title={labels.overviewTitle} />
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-navy-900/75">
            {product.overview}
          </p>
        </Container>
      </Section>

      <Section tone="navy" className="!py-12 sm:!py-16">
        <Container>
          <Title title={labels.qualitySupportTitle} invert />
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory-100/75">
            {labels.qualitySupportText}
          </p>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <Title title={labels.highlightsTitle} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2">
            {product.highlights.map((highlight) => (
              <div
                key={highlight}
                className="rounded-xl2 border border-navy-900/10 bg-white px-5 py-5 shadow-soft"
              >
                <p className="text-sm leading-relaxed text-navy-950/85">{highlight}</p>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <Title title={labels.itineraryTitle} invert />
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-ivory-100/75">
            {product.itineraryIntro}
          </p>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-ivory-100/60">
            {labels.itineraryPdfNote}
          </p>
          <div className="mt-7">
            <ButtonLink href={product.pdfUrl} variant="primary" external>
              {labels.viewPdfLabel}
            </ButtonLink>
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <Title title={labels.galleryTitle} />
          <div className="mt-8 grid gap-4 sm:grid-cols-3">
            {product.gallerySlots.map((slot) => (
              <GalleryPlaceholder
                key={slot.futureImagePath}
                label={slot.label}
                futureImagePath={slot.futureImagePath}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy" className="!pb-16 sm:!pb-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <CTABox
              title={labels.finalCtaTitle}
              description={labels.finalCtaDescription}
              actions={
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href={contactHref} variant="primary">
                    {labels.contactLabel}
                  </ButtonLink>
                  <ButtonLink href={CONTACT_WHATSAPP_URL} variant="secondary" external>
                    <IconMessage className="mr-1.5 h-4 w-4 shrink-0" />
                    {labels.whatsappLabel}
                  </ButtonLink>
                  <ButtonLink href={CONTACT_EMAIL_MAILTO} variant="secondary">
                    <IconMail className="mr-1.5 h-4 w-4 shrink-0" />
                    {labels.emailLabel}
                  </ButtonLink>
                </div>
              }
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
