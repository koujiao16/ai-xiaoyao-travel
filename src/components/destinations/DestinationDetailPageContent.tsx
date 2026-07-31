import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ButtonLink } from "@/components/ui/Button";
import { CTABox } from "@/components/ui/CTABox";
import { IconMail, IconMessage } from "@/components/ui/Icons";
import {
  CONTACT_EMAIL_MAILTO,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import {
  getDestinationDetail,
  getDestinationDetailLabels,
  type DestinationCapability,
  type DestinationDetailContent,
  type DestinationSlug,
  type FeaturedResource,
} from "@/lib/destination-detail-content";
import { ProductCard } from "@/components/products/ProductCard";
import { getProductsByDestination } from "@/data/products";
import {
  NORTHEAST_PRODUCT_CATEGORIES,
} from "@/data/northeast-products";
import { localePath, type SiteLocale } from "@/lib/locale-paths";
import { publicFileExists } from "@/lib/public-file-exists";
import { cn } from "@/lib/cn";

function DestinationHero({
  eyebrow,
  title,
  positioning,
  heroImageSrc,
}: {
  eyebrow: string;
  title: string;
  positioning: string;
  heroImageSrc?: string;
}) {
  const hasHeroImage = Boolean(heroImageSrc && publicFileExists(heroImageSrc));

  return (
    <section
      className={cn(
        "relative overflow-hidden border-b border-white/10",
        hasHeroImage ? "min-h-[280px] sm:min-h-[320px]" : "bg-navy-950"
      )}
    >
      {hasHeroImage && heroImageSrc ? (
        <>
          <Image
            src={heroImageSrc}
            alt={title}
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-r from-[rgba(6,20,34,0.88)] via-[rgba(6,20,34,0.62)] to-[rgba(6,20,34,0.35)]"
            aria-hidden
          />
        </>
      ) : null}

      <Container className="relative py-10 sm:py-12 lg:py-14">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold-300/90">
            {eyebrow}
          </p>
          <div className="mt-4 h-px w-10 bg-gold-400/45" aria-hidden />
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl tracking-tightish text-white sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory-100/85 sm:text-lg">
            {positioning}
          </p>
        </div>
      </Container>
    </section>
  );
}

function FeaturedResourcesSection({
  title,
  eyebrow,
  resources,
}: {
  title: string;
  eyebrow: string;
  resources: FeaturedResource[];
}) {
  return (
    <section
      id="destination-featured-resources"
      className="relative overflow-hidden border-b border-white/10 bg-[#07111d]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,162,78,0.12),transparent_42%),linear-gradient(180deg,rgba(255,255,255,0.02),transparent_55%)]"
        aria-hidden
      />
      <Container className="relative py-7 sm:py-8">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-300/85">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-tightish text-white sm:text-[1.65rem]">
            {title}
          </h2>
        </div>

        <div
          className={cn(
            "mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:gap-6",
            resources.length >= 4 ? "lg:grid-cols-4" : "lg:grid-cols-3"
          )}
        >
          {resources.map((resource) => (
            <article
              key={`${resource.title}-${resource.imagePath}`}
              className="rounded-lg border border-white/15 bg-white/[0.05] px-4 py-3 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-[12px] sm:py-3.5"
            >
              <div className="h-px w-7 bg-gold-400/50" aria-hidden />
              <h3 className="mt-2.5 font-[family-name:var(--font-display)] text-[0.875rem] leading-snug tracking-tightish text-white sm:text-[0.9rem]">
                {resource.title}
              </h3>
              <p className="mt-1.5 text-[11.5px] leading-relaxed text-white/55">
                {resource.description}
              </p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

function getRegularSectionCopy(slug: DestinationSlug, locale: SiteLocale) {
  if (slug === "northeast") {
    return locale === "zh"
      ? {
          title: "东北常规产品",
          description:
            "精选吉林、黑龙江及东北跨区域精品线路，支持海外团队接待与定制化执行。",
        }
      : {
          title: "Northeast Regular Products",
          description:
            "Curated Jilin, Heilongjiang and cross-region Northeast programs, supporting overseas group reception and customized delivery.",
        };
  }

  if (slug === "shaanxi") {
    return locale === "zh"
      ? {
          title: "陕西常规产品",
          description: "西安精品小团与古都文化线路，支持团队接待与落地执行。",
        }
      : {
          title: "Shaanxi Regular Products",
          description:
            "Boutique Xi'an programs and ancient-capital cultural routes with reliable ground operations.",
        };
  }

  return locale === "zh"
    ? {
        title: "河南常规产品",
        description: "河南目的地常规团队、古都联线与中原文化线路。",
      }
    : {
        title: "Henan Regular Products",
        description:
          "Henan regular groups, ancient-capital connections and Central China cultural routes.",
      };
}

function RegularProductsSection({
  locale,
  slug,
}: {
  locale: SiteLocale;
  slug: DestinationSlug;
}) {
  const copy = getRegularSectionCopy(slug, locale);
  const regularCatalog =
    slug === "shaanxi"
      ? getProductsByDestination("shaanxi", "Regular Product")
      : getProductsByDestination(slug).filter((p) => p.category === "Regular Product");

  const cards = [...regularCatalog].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  );

  if (slug === "northeast") {
    const grouped = NORTHEAST_PRODUCT_CATEGORIES.map((category) => ({
      ...category,
      products: cards.filter((product) => product.categoryCN === category.categoryCN),
    })).filter((group) => group.products.length > 0);

    return (
      <Section tone="navy" className="!bg-[#08121f]" id="destination-regular-products">
        <Container>
          <Title title={copy.title} description={copy.description} invert />
          <div className="mt-10 space-y-12 sm:space-y-14">
            {grouped.map((group) => (
              <div key={group.id} id={`northeast-${group.id}`} className="scroll-mt-24">
                <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tightish text-white sm:text-2xl">
                  {locale === "zh" ? group.categoryCN : group.categoryEN}
                </h3>
                <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
                  {group.products.map((product) => (
                    <ProductCard key={product.id} product={product} locale={locale} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
    );
  }

  return (
    <Section tone="navy" className="!bg-[#08121f]" id="destination-regular-products">
      <Container>
        <Title title={copy.title} description={copy.description} invert />
        {cards.length > 0 ? (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
            {cards.map((product) => (
              <ProductCard key={product.id} product={product} locale={locale} />
            ))}
          </div>
        ) : null}
      </Container>
    </Section>
  );
}

function DestinationCapabilitySection({
  title,
  eyebrow,
  capabilities,
}: {
  title: string;
  eyebrow: string;
  capabilities: DestinationCapability[];
}) {
  return (
    <section
      id="destination-capabilities"
      className="relative overflow-hidden border-b border-white/10 bg-[#07111d]"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,rgba(199,162,78,0.10),transparent_45%)]"
        aria-hidden
      />
      <Container className="relative py-10 sm:py-12">
        <div>
          <p className="text-[11px] font-medium uppercase tracking-[0.2em] text-gold-300/85">
            {eyebrow}
          </p>
          <h2 className="mt-2 font-[family-name:var(--font-display)] text-2xl tracking-tightish text-white sm:text-[1.65rem]">
            {title}
          </h2>
        </div>

        <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {capabilities.map((item) => (
            <article
              key={item.title}
              className="rounded-lg border border-white/15 bg-white/[0.05] px-4 py-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)] backdrop-blur-[12px]"
            >
              <div className="h-px w-7 bg-gold-400/50" aria-hidden />
              <h3 className="mt-3 font-[family-name:var(--font-display)] text-[0.95rem] tracking-tightish text-white">
                {item.title}
              </h3>
              <p className="mt-2 text-[12px] leading-relaxed text-white/55">{item.description}</p>
            </article>
          ))}
        </div>
      </Container>
    </section>
  );
}

export function DestinationDetailPageContent({
  locale,
  content,
}: {
  locale: SiteLocale;
  content: DestinationDetailContent;
}) {
  const labels = getDestinationDetailLabels(locale);
  const contactHref = localePath("/contact", locale);

  return (
    <main>
      <DestinationHero
        eyebrow={labels.heroEyebrow}
        title={content.title}
        positioning={content.positioning}
        heroImageSrc={content.heroImageSrc}
      />

      <FeaturedResourcesSection
        title={labels.featuredTitle}
        eyebrow={labels.featuredEyebrow}
        resources={content.featuredResources}
      />

      <RegularProductsSection locale={locale} slug={content.slug} />

      <DestinationCapabilitySection
        title={labels.capabilityTitle}
        eyebrow={labels.capabilityEyebrow}
        capabilities={content.capabilities}
      />

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

export function getDestinationDetailPageContent(slug: string, locale: SiteLocale) {
  return getDestinationDetail(slug, locale);
}
