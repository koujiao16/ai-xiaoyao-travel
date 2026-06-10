import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { IconArrowRight } from "@/components/ui/Icons";
import { BrandCard } from "@/components/home/BrandCard";
import { NetworkMapPreview } from "@/components/home/NetworkMapPreview";
import { HomeFinalSection } from "@/components/home/HomeFinalSection";
import { ProductLineCard } from "@/components/home/ProductLineCard";
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
  const { hero, network, destinations, products, quality, brands, finalCta } = content;
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

          <Container className="relative py-16 sm:py-24 lg:py-32">
            <div className="max-w-3xl">
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
                  "text-lg text-ivory-100/80 sm:text-xl",
                  hero.brandLine ? "mt-4" : "mt-5"
                )}
              >
                {hero.subtitle}
              </p>
              <p className="mt-6 max-w-2xl text-base leading-relaxed text-ivory-100/75">
                {hero.description}
              </p>

              <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
                <ButtonLink href={p("/products")} variant="secondary">
                  {hero.exploreServices} <IconArrowRight className="ml-2 h-4 w-4" />
                </ButtonLink>
                <ButtonLink href={p("/contact")} variant="primary">
                  {hero.getProposal}
                </ButtonLink>
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
            <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {destinations.cards.map((card) => (
                <FeatureCard
                  key={card.title}
                  href={p(card.href)}
                  tone="navy"
                  hover="subtle"
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
            <div className="mt-10">
              <ButtonLink href={p("/destinations")} variant="secondary">
                {destinations.cta} <IconArrowRight className="ml-2 h-4 w-4" />
              </ButtonLink>
            </div>
          </Container>
        </Section>

        <Section tone="ivory" className="!bg-[#f6f1e8] !py-16 sm:!py-24">
          <Container>
            <Title
              eyebrow={products.eyebrow}
              title={products.title}
              description={products.description}
              className="max-w-3xl"
            />
            <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {products.cards.map((card) => (
                <ProductLineCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  href={p(card.href)}
                  exploreLabel={products.exploreLabel}
                />
              ))}
            </div>
            <div className="mt-12">
              <ButtonLink href={p("/products")} variant="primary">
                {products.cta}
              </ButtonLink>
            </div>
          </Container>
        </Section>

        <Section tone="navy" className="!bg-[#08121f]">
          <Container>
            <div className="mx-auto max-w-3xl text-center">
              <Title
                eyebrow={quality.eyebrow}
                title={quality.title}
                description={quality.description}
                invert
                className="mx-auto"
              />
            </div>
            <div className="mx-auto mt-14 grid max-w-5xl gap-5 lg:grid-cols-3">
              {quality.cards.map((card) => (
                <FeatureCard
                  key={card.title}
                  tone="navy"
                  title={card.title}
                  description={card.description}
                />
              ))}
            </div>
            <p className="mx-auto mt-8 max-w-3xl text-center text-sm text-white/[0.55]">
              {quality.note}
            </p>
          </Container>
        </Section>

        <Section tone="ivory" className="!bg-[#f6f1e8] !pb-8 sm:!pb-10">
          <Container>
            <Title
              eyebrow={brands.eyebrow}
              title={brands.title}
              description={brands.description}
            />
            <div className="mt-10 grid gap-4 lg:grid-cols-3 lg:items-stretch">
              {brands.cards.map((card) => (
                <BrandCard
                  key={card.title}
                  title={card.title}
                  description={card.description}
                  logoSrc={card.logoSrc}
                  logoAlt={card.logoAlt}
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
    </>
  );
}
