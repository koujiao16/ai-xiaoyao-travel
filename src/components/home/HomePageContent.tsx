import { Container } from "@/components/ui/Container";
import { IconMessage } from "@/components/ui/Icons";
import { DestinationShowcaseCard } from "@/components/home/DestinationShowcaseCard";
import { NetworkMapPreview } from "@/components/home/NetworkMapPreview";
import { HomeFinalSection } from "@/components/home/HomeFinalSection";
import { ProductShowcaseCard } from "@/components/home/ProductShowcaseCard";
import { Media } from "@/components/ui/Media";
import { Section } from "@/components/ui/Section";
import { Stat } from "@/components/ui/Stat";
import { Title } from "@/components/ui/Title";
import type { HomeContent } from "@/lib/home-content";
import type { SiteLocale } from "@/lib/locale-paths";
import { localePath } from "@/lib/locale-paths";
import { cn } from "@/lib/cn";

export function HomePageContent({
  content,
  locale = "en",
}: {
  content: HomeContent;
  locale?: SiteLocale;
}) {
  const { hero, network, destinations, products, quality, finalCta } = content;
  const p = (path: string) => localePath(path, locale);

  return (
    <>
      <main className="overflow-x-hidden">
        <section className="relative min-h-[480px] overflow-hidden border-b border-white/10 sm:min-h-[540px]">
          <div className="absolute inset-0">
            <Media
              src="/images/hero-xiaoyao.jpg"
              alt={hero.imageAlt}
              priority
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[rgba(6,20,34,0.85)] via-[rgba(6,20,34,0.55)] to-[rgba(6,20,34,0.25)]" />
          </div>

          <Container className="relative py-16 sm:py-24 lg:py-28">
            <div className="max-w-5xl">
              <p className="mb-4 inline-flex max-w-full items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs tracking-wide text-ivory-100/80">
                {hero.badge}
              </p>
              <h1 className="font-[family-name:var(--font-display)] text-4xl tracking-tightish text-ivory-50 sm:text-5xl lg:text-6xl">
                {hero.title}
              </h1>
              {hero.brandLine ? (
                <p className="mt-3 text-xl tracking-wide text-ivory-100/90 sm:text-2xl">
                  {hero.brandLine}
                </p>
              ) : null}
              <p
                className={cn(
                  "max-w-3xl text-lg text-ivory-100/80 sm:text-xl",
                  hero.brandLine ? "mt-4" : "mt-5"
                )}
              >
                {hero.subtitle}
              </p>

              <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-12 sm:grid-cols-3 sm:gap-4">
                {quality.cards.map((card) => (
                  <div
                    key={card.title}
                    className="rounded-2xl border border-white/15 bg-white/[0.05] px-5 py-5 backdrop-blur-[2px] sm:px-6"
                  >
                    <h3 className="text-lg font-semibold tracking-tightish text-white">
                      {card.title}
                    </h3>
                    {card.description ? (
                      <p className="mt-2 text-sm leading-relaxed text-ivory-100/70 sm:text-[0.9375rem]">
                        {card.description}
                      </p>
                    ) : null}
                  </div>
                ))}
              </div>
            </div>
          </Container>
        </section>

        <Section tone="ivory" className="!bg-[#f6f1e8]">
          <Container>
            <div className="grid gap-12 lg:grid-cols-12 lg:items-center lg:gap-14">
              <div className="lg:col-span-5">
                <Title
                  eyebrow={network.eyebrow}
                  title={network.title}
                  description={network.description}
                />
                <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3 sm:gap-5">
                  {network.stats.map((stat) => (
                    <Stat key={stat.label} label={stat.label} value={stat.value} />
                  ))}
                </div>
              </div>
              <div className="min-w-0 lg:col-span-7">
                <NetworkMapPreview
                  src="/images/network-map.jpg"
                  alt={network.imageAlt}
                  hint={network.clickToEnlarge}
                />
              </div>
            </div>
          </Container>
        </Section>

        <Section tone="navy" className="!bg-[#08121f]">
          <Container>
            <Title
              eyebrow={destinations.eyebrow}
              title={destinations.title}
              description={destinations.description}
              invert
            />
            <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-3 lg:gap-6">
              {destinations.cards.map((card) => (
                <DestinationShowcaseCard
                  key={card.title}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  href={p(card.href)}
                  imageSrc={card.imageSrc}
                  imageAlt={card.imageAlt}
                />
              ))}
            </div>
          </Container>
        </Section>

        <Section tone="ivory" className="!bg-[#f6f1e8] !py-16 sm:!py-20">
          <Container>
            <Title
              eyebrow={products.eyebrow}
              title={products.title}
              description={products.description}
              className="max-w-3xl"
            />
            <div className="mt-14 flex flex-col gap-5 sm:gap-6">
              {products.cards.map((card) => (
                <ProductShowcaseCard
                  key={card.title}
                  title={card.title}
                  subtitle={card.subtitle}
                  description={card.description}
                  href={card.href === "#" ? "#" : p(card.href)}
                  imageSrc={card.imageSrc}
                  imageAlt={card.imageAlt}
                />
              ))}
            </div>
          </Container>
        </Section>
      </main>

      <HomeFinalSection
        locale={locale}
        title={finalCta.title}
        description={finalCta.description}
        labels={finalCta}
        contactHref={p("/contact")}
      />

      <a
        href="#home-final-cta-heading"
        aria-label={hero.getProposal}
        title={hero.getProposal}
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 flex-col items-center justify-center rounded-full border border-gold-300/70 bg-gold-400 text-navy-950 shadow-[0_10px_28px_rgba(0,0,0,0.28)] hover:bg-gold-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold-300 focus-visible:ring-offset-2 focus-visible:ring-offset-navy-950"
      >
        <IconMessage className="h-5 w-5" />
        <span className="mt-0.5 max-w-[3.25rem] truncate text-center text-[9px] font-semibold leading-none tracking-tight">
          {hero.getProposal}
        </span>
      </a>
    </>
  );
}
