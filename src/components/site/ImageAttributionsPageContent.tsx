import Image from "next/image";
import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { attractionImageAttributions } from "@/lib/image-attributions";
import type { SiteLocale } from "@/lib/locale-paths";

const copy = {
  en: {
    eyebrow: "Credits",
    title: "Image attributions",
    description:
      "The first 12 featured attraction photos in the itinerary builder come from Wikimedia Commons. Files are stored locally as 1600×960 WebP (5:3), cropped with cover and converted from the original. Long credits are listed here rather than overlaid on cards.",
    author: "Author",
    license: "License",
    source: "Source",
    credit: "Credit",
    modification: "Modifications",
    file: "Local file",
  },
  zh: {
    eyebrow: "图片来源",
    title: "景区图片授权说明",
    description:
      "行程生成器首批 12 个热门景区照片来自 Wikimedia Commons。本地保存为 1600×960 的 WebP（5:3），使用 cover 居中裁切并转换格式。长署名集中展示于此，不压在景区卡片上。",
    author: "作者",
    license: "许可",
    source: "来源页",
    credit: "署名",
    modification: "修改说明",
    file: "本地文件",
  },
} as const;

export function ImageAttributionsPageContent({ locale }: { locale: SiteLocale }) {
  const t = copy[locale];

  return (
    <main>
      <PageHero eyebrow={t.eyebrow} title={t.title} description={t.description} />
      <Section tone="ivory">
        <Container>
          <Title eyebrow={t.eyebrow} title={locale === "zh" ? "授权清单" : "Attribution list"} />
          <div className="mt-10 grid gap-6 sm:grid-cols-2">
            {attractionImageAttributions.map((item, index) => (
              <article
                key={item.id}
                className="overflow-hidden rounded-xl2 border border-navy-900/10 bg-white shadow-soft"
              >
                <div className="relative aspect-[5/3] bg-ivory-200">
                  <Image
                    src={item.imageSrc}
                    alt={locale === "zh" ? item.nameZh : item.nameEn}
                    fill
                    unoptimized
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, 50vw"
                    loading={index < 2 ? "eager" : "lazy"}
                    priority={index < 2}
                  />
                </div>
                <div className="space-y-3 p-5 sm:p-6">
                  <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tightish text-navy-950">
                    {locale === "zh" ? item.nameZh : item.nameEn}
                  </h3>
                  <dl className="grid gap-2 text-sm leading-relaxed text-navy-900/75">
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-navy-900/45">{t.author}</dt>
                      <dd>{item.author}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-navy-900/45">{t.license}</dt>
                      <dd>
                        <a
                          className="text-navy-950 underline decoration-navy-900/20 underline-offset-4 hover:decoration-gold-500"
                          href={item.licenseUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.license}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-navy-900/45">{t.source}</dt>
                      <dd>
                        <a
                          className="break-all text-navy-950 underline decoration-navy-900/20 underline-offset-4 hover:decoration-gold-500"
                          href={item.sourcePage}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {item.sourcePageLabel}
                        </a>
                      </dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-navy-900/45">{t.credit}</dt>
                      <dd>{item.credit}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-navy-900/45">{t.modification}</dt>
                      <dd>{item.modification}</dd>
                    </div>
                    <div>
                      <dt className="text-xs uppercase tracking-[0.14em] text-navy-900/45">{t.file}</dt>
                      <dd>
                        <code className="text-xs">{item.file}</code>
                      </dd>
                    </div>
                  </dl>
                </div>
              </article>
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
