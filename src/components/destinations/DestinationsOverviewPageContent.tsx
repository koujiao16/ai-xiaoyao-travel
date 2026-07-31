import Image from "next/image";
import Link from "next/link";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { localePath, type SiteLocale } from "@/lib/locale-paths";
import { cn } from "@/lib/cn";

type DestinationCard = {
  slug: "northeast" | "shaanxi" | "henan";
  title: string;
  subtitle: string;
  description: string;
  imageSrc: string;
};

const contentByLocale = {
  zh: {
    eyebrow: "目的地",
    title: "中国核心目的地网络",
    subtitle:
      "依托陕西、河南、黑龙江、吉林四大运营区域，提供入境团队、研学、企业会奖及定制化旅游服务。",
    stats: [
      { value: "4+", label: "Core Destinations" },
      { value: "30+", label: "Professional Teams" },
      { value: "100+", label: "Local Resources" },
    ],
    viewDestination: "查看目的地",
    regular: "常规产品",
    resources: "特色资源",
    cards: [
      {
        slug: "northeast" as const,
        title: "中国东北",
        subtitle: "Northeast China",
        description: "冰雪旅游、自然风光、边境文化与季节性旅行体验。",
        imageSrc: "/images/northeast-destination-hero.png",
      },
      {
        slug: "shaanxi" as const,
        title: "陕西",
        subtitle: "Shaanxi",
        description: "古都文化、世界遗产、研学资源与高端目的地接待。",
        imageSrc: "/images/shaanxi-destination-hero.png",
      },
      {
        slug: "henan" as const,
        title: "河南",
        subtitle: "Henan",
        description: "中原文化、历史遗产与区域线路联动。",
        imageSrc: "/images/henan-destination-hero.png",
      },
    ] satisfies DestinationCard[],
  },
  en: {
    eyebrow: "Destinations",
    title: "Core China Destination Network",
    subtitle:
      "Supported by four operating regions—Shaanxi, Henan, Heilongjiang and Jilin—we deliver inbound groups, study tours, corporate & MICE and customized travel services.",
    stats: [
      { value: "4+", label: "Core Destinations" },
      { value: "30+", label: "Professional Teams" },
      { value: "100+", label: "Local Resources" },
    ],
    viewDestination: "View Destination",
    regular: "Regular Products",
    resources: "Featured Resources",
    cards: [
      {
        slug: "northeast" as const,
        title: "Northeast China",
        subtitle: "Northeast China",
        description:
          "Ice and snow tourism, natural landscapes, border culture and seasonal travel experiences.",
        imageSrc: "/images/northeast-destination-hero.png",
      },
      {
        slug: "shaanxi" as const,
        title: "Shaanxi",
        subtitle: "Shaanxi",
        description:
          "Ancient capital culture, world heritage, study-tour resources and premium destination reception.",
        imageSrc: "/images/shaanxi-destination-hero.png",
      },
      {
        slug: "henan" as const,
        title: "Henan",
        subtitle: "Henan",
        description:
          "Central China culture, historical heritage and multi-region route connections.",
        imageSrc: "/images/henan-destination-hero.png",
      },
    ] satisfies DestinationCard[],
  },
} as const;

const quickLinkClass =
  "inline-flex items-center justify-center rounded-full border border-navy-900/12 bg-white px-3.5 py-2 text-xs font-medium tracking-wide text-navy-900/80 transition-colors hover:border-gold-400/45 hover:text-navy-950 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/50 sm:text-sm";

function DestinationOverviewCard({
  card,
  locale,
  viewDestination,
  regular,
  resources,
}: {
  card: DestinationCard;
  locale: SiteLocale;
  viewDestination: string;
  regular: string;
  resources: string;
}) {
  const href = localePath(`/destinations/${card.slug}`, locale);
  const resourcesHref = `${href}#destination-featured-resources`;
  const regularHref = `${href}#destination-regular-products`;

  return (
    <article className="flex h-full flex-col">
      <Link
        href={href}
        className="group relative block min-h-[360px] overflow-hidden rounded-xl2 border border-navy-900/10 shadow-[0_10px_36px_rgba(15,23,42,0.12)] transition-transform duration-500 ease-out hover:-translate-y-1 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold-400/60 sm:min-h-[420px]"
      >
        <Image
          src={card.imageSrc}
          alt={card.title}
          fill
          unoptimized
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
          sizes="(max-width: 1024px) 100vw, 33vw"
        />
        <div
          className="absolute inset-0 bg-gradient-to-t from-[rgba(6,20,34,0.92)] via-[rgba(6,20,34,0.45)] to-[rgba(6,20,34,0.15)]"
          aria-hidden
        />
        <div className="absolute inset-x-0 bottom-0 p-6 sm:p-7">
          <h2 className="font-[family-name:var(--font-display)] text-3xl tracking-tightish text-white sm:text-4xl">
            {card.title}
          </h2>
          <p className="mt-2 text-xs font-medium uppercase tracking-[0.18em] text-gold-300/90">
            {card.subtitle}
          </p>
          <p className="mt-4 max-w-md text-sm leading-relaxed text-ivory-100/82 sm:text-[0.9375rem]">
            {card.description}
          </p>
          <span className="mt-6 inline-flex items-center rounded-full border border-gold-400/40 bg-gold-400 px-5 py-2.5 text-sm font-medium text-navy-950 transition-colors group-hover:bg-gold-300">
            {viewDestination}
          </span>
        </div>
      </Link>

      <nav
        aria-label={
          locale === "zh" ? `${card.title}产品入口` : `${card.title} product entry`
        }
        className="mt-4 flex flex-wrap gap-2"
      >
        <Link href={resourcesHref} className={quickLinkClass}>
          {resources}
        </Link>
        <Link href={regularHref} className={quickLinkClass}>
          {regular}
        </Link>
      </nav>
    </article>
  );
}

export function DestinationsOverviewPageContent({ locale }: { locale: SiteLocale }) {
  const content = contentByLocale[locale];

  return (
    <main>
      <section className="relative overflow-hidden border-b border-white/10 bg-navy-950">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,rgba(199,162,78,0.14),transparent_45%),radial-gradient(ellipse_at_bottom_left,rgba(16,26,51,0.9),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold-400/35 to-transparent"
          aria-hidden
        />
        <Container className="relative py-16 sm:py-20 lg:py-24">
          <div className="max-w-3xl">
            <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold-300/90">
              {content.eyebrow}
            </p>
            <h1 className="mt-4 font-[family-name:var(--font-display)] text-4xl tracking-tightish text-white sm:text-5xl lg:text-6xl">
              {content.title}
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-relaxed text-ivory-100/80 sm:text-lg">
              {content.subtitle}
            </p>
          </div>

          <div className="mt-12 grid grid-cols-3 gap-4 border-t border-white/10 pt-8 sm:max-w-xl sm:gap-8">
            {content.stats.map((stat) => (
              <div key={stat.label}>
                <p className="font-[family-name:var(--font-display)] text-2xl tracking-tightish text-gold-300 sm:text-3xl">
                  {stat.value}
                </p>
                <p className="mt-2 text-xs font-medium uppercase tracking-[0.16em] text-ivory-100/55">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <Section tone="ivory" className="!py-14 sm:!py-20">
        <Container>
          <div className={cn("grid gap-10 lg:grid-cols-3 lg:gap-7")}>
            {content.cards.map((card) => (
              <DestinationOverviewCard
                key={card.slug}
                card={card}
                locale={locale}
                viewDestination={content.viewDestination}
                regular={content.regular}
                resources={content.resources}
              />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
