import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ButtonLink } from "@/components/ui/Button";
import { CTABox } from "@/components/ui/CTABox";
import { IconArrowRight, IconMail, IconMessage } from "@/components/ui/Icons";
import { ItineraryAccordion } from "@/components/products/ItineraryAccordion";
import {
  getProductCategory,
  getProductDuration,
  getProductGroupSize,
  getProductRoute,
  getProductTags,
  getProductTitle,
  type Product,
} from "@/data/products";
import {
  CONTACT_EMAIL_MAILTO,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import { localePath, type SiteLocale } from "@/lib/locale-paths";

function HeroMeta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <p className="text-xs font-medium tracking-wide text-ivory-100/50">{label}</p>
      <p className="mt-1 text-sm leading-relaxed text-ivory-50/90">{value}</p>
    </div>
  );
}

function copy(locale: SiteLocale) {
  if (locale === "zh") {
    return {
      back: "返回产品列表",
      route: "线路",
      duration: "行程天数",
      groupSize: "团型",
      category: "产品类型",
      highlights: "产品亮点",
      highlightsDesc: "目的地体验、文化活动、小团服务与品质保障。",
      itinerary: "详细行程",
      itineraryDesc: "按天展开行程安排，便于合作伙伴报价与行程讲解。",
      quality: "逍遥品质承诺",
      qualityDesc: "真实产品信息、明确品质承诺、合作伙伴口碑保护。",
      included: "费用包含",
      excluded: "费用不含",
      download: "下载完整行程",
      downloadTitle: "下载行程 PDF",
      downloadDesc: "获取完整行程、包含项目与操作说明，便于合作伙伴存档与转发。",
      contactTitle: "获取报价与落地支持",
      contactDesc: "欢迎联系逍遥旅行，获取目的地产品报价、成团支持与地接执行方案。",
      contactLabel: "联系我们",
      whatsappLabel: "WhatsApp",
      emailLabel: "Email",
    };
  }

  return {
    back: "Back to Products",
    route: "Route",
    duration: "Duration",
    groupSize: "Group Size",
    category: "Category",
    highlights: "Product Highlights",
    highlightsDesc:
      "Destination experience, cultural activities, small-group service and quality guarantee.",
    itinerary: "Itinerary",
    itineraryDesc: "Day-by-day program outline for partner quoting and guest briefings.",
    quality: "Xiaoyao Quality Commitment",
    qualityDesc:
      "Authentic product information, clear quality pledges and partner reputation protection.",
    included: "Included",
    excluded: "Not Included",
    download: "Download Full Itinerary",
    downloadTitle: "Download Itinerary PDF",
    downloadDesc:
      "Access the full itinerary, inclusions and operational notes for partner reference.",
    contactTitle: "Request Pricing & Ground Support",
    contactDesc:
      "Contact Xiaoyao Travel for destination pricing, group operations and ground execution support.",
    contactLabel: "Contact Us",
    whatsappLabel: "WhatsApp",
    emailLabel: "Email",
  };
}

export function ProductDetailPageContent({
  product,
  locale,
}: {
  product: Product;
  locale: SiteLocale;
}) {
  const t = copy(locale);
  const title = getProductTitle(product, locale);
  const subtitle = locale === "zh" ? product.titleEN : product.titleCN;
  const route = getProductRoute(product, locale);
  const duration = getProductDuration(product, locale);
  const groupSize = getProductGroupSize(product, locale);
  const category = getProductCategory(product, locale);
  const tags = getProductTags(product, locale);
  const included = locale === "zh" ? product.included.cn : product.included.en;
  const excluded = locale === "zh" ? product.excluded.cn : product.excluded.en;
  const contactHref = localePath("/contact", locale);
  const productsHref = localePath("/products", locale);

  return (
    <main>
      <section className="relative min-h-[420px] overflow-hidden border-b border-white/10 sm:min-h-[480px]">
        <Image
          src={product.coverImage}
          alt={title}
          fill
          priority
          unoptimized
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-r from-[rgba(6,20,34,0.92)] via-[rgba(6,20,34,0.72)] to-[rgba(6,20,34,0.38)]"
          aria-hidden
        />

        <Container className="relative py-12 sm:py-16 lg:py-20">
          <Link
            href={productsHref}
            className="inline-flex items-center text-sm text-ivory-100/60 transition-colors hover:text-ivory-50"
          >
            <IconArrowRight className="mr-2 h-4 w-4 rotate-180" aria-hidden="true" />
            {t.back}
          </Link>

          <div className="mt-8 max-w-3xl">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold-300/90">
              {category}
            </p>
            <div className="mt-4 h-px w-10 bg-gold-400/45" aria-hidden />
            <h1 className="mt-5 font-[family-name:var(--font-display)] text-3xl tracking-tightish text-white sm:text-4xl lg:text-5xl">
              {title}
            </h1>
            <p className="mt-3 text-base text-ivory-100/70 sm:text-lg">{subtitle}</p>

            {tags.length > 0 ? (
              <div className="mt-5 flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex border border-white/15 bg-white/5 px-2.5 py-1 text-[11px] tracking-wide text-ivory-100/75"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            ) : null}

            <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              <HeroMeta label={t.route} value={route} />
              <HeroMeta label={t.duration} value={duration} />
              <HeroMeta label={t.groupSize} value={groupSize} />
              <HeroMeta label={t.category} value={category} />
            </div>
          </div>
        </Container>
      </section>

      <Section tone="ivory">
        <Container>
          <Title title={t.highlights} description={t.highlightsDesc} />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:gap-5">
            {product.highlights.map((item) => (
              <article
                key={item.titleEN}
                className="rounded-xl2 border border-navy-900/10 bg-white px-5 py-6 shadow-soft sm:px-6"
              >
                <div className="h-px w-8 bg-gold-400/55" aria-hidden />
                <h3 className="mt-4 font-[family-name:var(--font-display)] text-xl tracking-tightish text-navy-950">
                  {locale === "zh" ? item.titleCN : item.titleEN}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-900/70">
                  {locale === "zh" ? item.descriptionCN : item.descriptionEN}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy" className="!bg-[#08121f]">
        <Container>
          <Title title={t.itinerary} description={t.itineraryDesc} invert />
          <div className="mt-10 grid gap-8 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
            <div className="max-w-md">
              <p className="text-sm leading-relaxed text-ivory-100/70">
                {route}
              </p>
              <p className="mt-4 text-sm leading-relaxed text-ivory-100/55">
                {duration} · {groupSize}
              </p>
              <div className="mt-8 hidden lg:block">
                <ButtonLink href={product.pdfFile} variant="primary" external>
                  {t.download}
                </ButtonLink>
              </div>
            </div>
            <ItineraryAccordion days={product.itinerary} locale={locale} />
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <Title title={t.quality} description={t.qualityDesc} />
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {product.qualityCommitment.map((item) => (
              <article
                key={item.titleEN}
                className="rounded-xl2 border border-navy-900/10 bg-white px-5 py-6 shadow-soft sm:px-6"
              >
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-gold-500">
                  Xiaoyao
                </p>
                <h3 className="mt-3 font-[family-name:var(--font-display)] text-xl tracking-tightish text-navy-950">
                  {locale === "zh" ? item.titleCN : item.titleEN}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-navy-900/70">
                  {locale === "zh" ? item.descriptionCN : item.descriptionEN}
                </p>
              </article>
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <div className="grid gap-5 md:grid-cols-2">
            <article className="rounded-xl2 border border-white/10 bg-white/[0.04] p-6 sm:p-7">
              <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tightish text-ivory-50">
                {t.included}
              </h2>
              <ul className="mt-5 space-y-3">
                {included.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-ivory-100/75"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold-400" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>

            <article className="rounded-xl2 border border-white/10 bg-white/[0.04] p-6 sm:p-7">
              <h2 className="font-[family-name:var(--font-display)] text-2xl tracking-tightish text-ivory-50">
                {t.excluded}
              </h2>
              <ul className="mt-5 space-y-3">
                {excluded.map((item) => (
                  <li
                    key={item}
                    className="flex gap-3 text-sm leading-relaxed text-ivory-100/75"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-ivory-100/35" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </article>
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <div className="mx-auto max-w-2xl rounded-xl2 border border-navy-900/10 bg-white px-6 py-10 text-center shadow-soft sm:px-10">
            <Title
              title={t.downloadTitle}
              description={t.downloadDesc}
              className="mx-auto"
            />
            <div className="mt-8 flex justify-center">
              <ButtonLink href={product.pdfFile} variant="primary" external>
                {t.download}
              </ButtonLink>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy" className="!pb-16 sm:!pb-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <CTABox
              title={t.contactTitle}
              description={t.contactDesc}
              actions={
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href={contactHref} variant="primary">
                    {t.contactLabel}
                  </ButtonLink>
                  <ButtonLink href={CONTACT_WHATSAPP_URL} variant="secondary" external>
                    <IconMessage className="mr-1.5 h-4 w-4 shrink-0" />
                    {t.whatsappLabel}
                  </ButtonLink>
                  <ButtonLink href={CONTACT_EMAIL_MAILTO} variant="secondary">
                    <IconMail className="mr-1.5 h-4 w-4 shrink-0" />
                    {t.emailLabel}
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
