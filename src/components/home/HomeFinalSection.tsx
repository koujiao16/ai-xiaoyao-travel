import { HomeContactActions, type HomeContactLabels } from "@/components/home/HomeContactActions";
import { HomeOfficeLocationsSection } from "@/components/home/HomeOfficeLocationsSection";
import { SiteFooterContent } from "@/components/site/SiteFooterContent";
import { Container } from "@/components/ui/Container";
import type { SiteLocale } from "@/lib/locale-paths";

/**
 * Homepage-only final CTA + footer (English & Chinese).
 */
export function HomeFinalSection({
  locale,
  title,
  description,
  labels,
  contactHref,
}: {
  locale: SiteLocale;
  title: string;
  description: string;
  labels: HomeContactLabels;
  contactHref: string;
}) {
  return (
    <section
      aria-labelledby="home-final-cta-heading"
      className="relative overflow-hidden border-t border-gold-400/20 text-ivory-100"
      style={{
        background: "linear-gradient(180deg, #07101c 0%, #0b1320 55%, #05070d 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/45 to-transparent"
        aria-hidden
      />

      <Container className="relative pt-12 pb-9 sm:pt-16 sm:pb-10">
        <div className="relative mx-auto max-w-3xl">
          <div
            className="pointer-events-none absolute left-1/2 top-1/2 h-[min(100%,22rem)] w-[min(100%,28rem)] -translate-x-1/2 -translate-y-[38%] bg-[radial-gradient(ellipse_at_center,rgba(201,168,106,0.14),transparent_68%)]"
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-[32px] border border-white/[0.12] bg-white/[0.04] shadow-[0_10px_48px_rgba(0,0,0,0.22)] ring-1 ring-inset ring-white/[0.06]">
            <div className="px-6 py-9 text-center sm:px-10 sm:py-11">
              <h2
                id="home-final-cta-heading"
                className="font-[family-name:var(--font-display)] text-2xl tracking-tightish text-ivory-50 sm:text-[1.875rem]"
              >
                {title}
              </h2>
              <p className="mx-auto mt-3 max-w-xl text-sm leading-relaxed text-ivory-100/70 sm:text-[0.9375rem]">
                {description}
              </p>

              <HomeContactActions
                labels={labels}
                contactHref={contactHref}
                showProposal={false}
                variant="closing"
                className="mt-8 sm:mt-9"
              />
            </div>

            <SiteFooterContent locale={locale} integrated />
          </div>
        </div>

        <HomeOfficeLocationsSection locale={locale} />
      </Container>
    </section>
  );
}
