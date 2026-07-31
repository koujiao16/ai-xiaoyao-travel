import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ButtonLink } from "@/components/ui/Button";
import { CTABox } from "@/components/ui/CTABox";
import { Media } from "@/components/ui/Media";
import { IconMail, IconMessage } from "@/components/ui/Icons";
import {
  CONTACT_EMAIL_MAILTO,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import { cn } from "@/lib/cn";
import { localePath, type SiteLocale } from "@/lib/locale-paths";
import { getDestinationProductsContent } from "@/lib/destination-products-content";
import { ProductCard } from "@/components/products/ProductCard";
import { getProductsByDestination } from "@/data/products";

const quickJumpLinkClass =
  "inline-flex items-center justify-center rounded-full border border-navy-900/12 bg-white px-3.5 py-2 text-sm font-medium text-navy-900/80 transition-colors hover:border-gold-400/40 hover:text-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50";

function ProductFinalCta({
  locale,
  title,
  description,
  contactLabel,
  whatsappLabel,
  emailLabel,
}: {
  locale: SiteLocale;
  title: string;
  description: string;
  contactLabel: string;
  whatsappLabel: string;
  emailLabel: string;
}) {
  const contactHref = localePath("/contact", locale);

  return (
    <Section tone="navy" className="!pb-16 sm:!pb-20">
      <Container>
        <div className="mx-auto max-w-2xl">
          <CTABox
            title={title}
            description={description}
            actions={
              <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                <ButtonLink href={contactHref} variant="primary">
                  {contactLabel}
                </ButtonLink>
                <ButtonLink href={CONTACT_WHATSAPP_URL} variant="secondary" external>
                  <IconMessage className="mr-1.5 h-4 w-4 shrink-0" />
                  {whatsappLabel}
                </ButtonLink>
                <ButtonLink href={CONTACT_EMAIL_MAILTO} variant="secondary">
                  <IconMail className="mr-1.5 h-4 w-4 shrink-0" />
                  {emailLabel}
                </ButtonLink>
              </div>
            }
          />
        </div>
      </Container>
    </Section>
  );
}

export function DestinationProductsPageContent({ locale }: { locale: SiteLocale }) {
  const content = getDestinationProductsContent(locale);
  const northeastProducts = getProductsByDestination("northeast", "Regular Product");

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10">
        <div className="absolute inset-0">
          <Media
            src="/images/hero-xian-wall.svg"
            alt={content.heroTitle}
            priority
            className="h-full w-full object-cover opacity-[0.5]"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-navy-950/85 via-navy-950/75 to-navy-950" />
        </div>
        <Container className="relative py-14 sm:py-18">
          <div className="max-w-3xl py-4 sm:py-8">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold-300/90">
              {content.heroEyebrow}
            </p>
            <h1 className="mt-3 font-[family-name:var(--font-display)] text-4xl tracking-tightish text-ivory-50 sm:text-5xl">
              {content.heroTitle}
            </h1>
            {content.heroSubtitle ? (
              <p className="mt-4 text-lg text-ivory-100/82">{content.heroSubtitle}</p>
            ) : null}
            <p
              className={cn(
                "text-base leading-relaxed text-ivory-100/70 sm:text-[0.9375rem]",
                "mt-4"
              )}
            >
              {content.heroDescription}
            </p>
            {content.quickJump.length > 0 ? (
              <nav
                aria-label={locale === "zh" ? "页面导航" : "Page sections"}
                className="mt-8 flex flex-wrap gap-2"
              >
                {content.quickJump.map((item) => (
                  <a key={item.id} href={`#${item.id}`} className={quickJumpLinkClass}>
                    {item.label}
                  </a>
                ))}
              </nav>
            ) : null}
          </div>
        </Container>
      </section>

      <Section tone="ivory" id="northeast">
        <Container>
          <Title
            title={content.listingTitle}
            description={content.listingDescription}
          />
          {northeastProducts.length > 0 ? (
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {northeastProducts.map((product) => (
                <ProductCard key={product.id} product={product} locale={locale} />
              ))}
            </div>
          ) : (
            <p className="mt-10 text-sm leading-relaxed text-navy-900/55">
              {locale === "zh"
                ? "产品即将上线，敬请期待。"
                : "Products coming soon."}
            </p>
          )}
        </Container>
      </Section>

      <ProductFinalCta
        locale={locale}
        title={content.finalCta.title}
        description={content.finalCta.description}
        contactLabel={content.finalCta.contactLabel}
        whatsappLabel={content.finalCta.whatsappLabel}
        emailLabel={content.finalCta.emailLabel}
      />
    </main>
  );
}
