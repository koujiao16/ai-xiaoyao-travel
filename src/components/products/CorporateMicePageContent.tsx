import fs from "fs";
import path from "path";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ButtonLink } from "@/components/ui/Button";
import { CTABox } from "@/components/ui/CTABox";
import { Media } from "@/components/ui/Media";
import { IconMail, IconMessage } from "@/components/ui/Icons";
import {
  CONTACT_EMAIL_MAILTO,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import { localePath, type SiteLocale } from "@/lib/locale-paths";
import {
  getCorporateMiceContent,
  type CorporateMiceResource,
  type CorporateMiceVideoStory,
} from "@/lib/corporate-mice-content";
import { cn } from "@/lib/cn";

function isResourcePdfAvailable(pdfPath: string) {
  const filePath = path.join(process.cwd(), "public", pdfPath.replace(/^\//, ""));
  return fs.existsSync(filePath);
}

function VideoStoryCard({ story }: { story: CorporateMiceVideoStory }) {
  // Future cover image: story.coverImagePath
  // e.g. /images/videos/video-malaysia-incentive.jpg
  return (
    <article className="overflow-hidden rounded-xl2 border border-white/10 bg-white/[0.04] shadow-card">
      <div className="relative aspect-video overflow-hidden border-b border-white/10 bg-gradient-to-br from-navy-900/80 via-navy-950 to-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,106,0.12),transparent_70%)]" />
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="rounded-full border border-white/15 bg-white/[0.06] px-3 py-1 text-[10px] tracking-[0.16em] uppercase text-ivory-100/45">
            16:9
          </span>
        </div>
      </div>

      <div className="p-5 sm:p-6">
        <p className="text-[10px] font-medium tracking-[0.18em] uppercase text-gold-300/80">
          {story.category}
        </p>
        <h3 className="mt-2 font-[family-name:var(--font-display)] text-xl tracking-tightish text-ivory-50">
          {story.title}
        </h3>
        <p className="mt-2 text-xs text-ivory-100/50">{story.meta}</p>
        <p className="mt-3 text-sm leading-relaxed text-ivory-100/70">{story.description}</p>
        <div className="mt-5">
          <ButtonLink href={story.videoUrl} variant="secondary" external className="w-full sm:w-auto">
            {story.watchLabel}
          </ButtonLink>
        </div>
      </div>
    </article>
  );
}

function ResourceCard({
  resource,
  available,
}: {
  resource: CorporateMiceResource;
  available: boolean;
}) {
  // Future PDF download: resource.pdfPath
  // e.g. /resources/corporate-reception-program.pdf or /resources/incentive-travel-program.pdf
  return (
    <div className="rounded-xl2 border border-navy-900/10 bg-white p-6 shadow-soft sm:p-7">
      <h3 className="text-base font-semibold tracking-tightish text-navy-950">
        {resource.title}
      </h3>
      <div className="mt-5">
        {available ? (
          <ButtonLink href={resource.pdfPath} variant="secondaryDark" external>
            Download PDF
          </ButtonLink>
        ) : (
          <span
            className={cn(
              "inline-flex cursor-not-allowed items-center justify-center rounded-full border border-navy-900/10 bg-navy-950/5 px-5 py-3 text-sm font-medium text-navy-900/45"
            )}
            aria-disabled="true"
          >
            {resource.comingSoonLabel}
          </span>
        )}
      </div>
    </div>
  );
}

export function CorporateMicePageContent({ locale }: { locale: SiteLocale }) {
  const content = getCorporateMiceContent(locale);
  const contactHref = localePath("/contact", locale);
  const pdfAvailability = Object.fromEntries(
    content.resources.items.map((item) => [item.pdfPath, isResourcePdfAvailable(item.pdfPath)])
  );

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
            <p className="mt-4 text-lg text-ivory-100/82">{content.heroSubtitle}</p>
            <p className="mt-4 text-base leading-relaxed text-ivory-100/70 sm:text-[0.9375rem]">
              {content.heroDescription}
            </p>
          </div>
        </Container>
      </section>

      <Section tone="ivory">
        <Container>
          <Title title={content.whatWeProvide.title} />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.whatWeProvide.items.map((item) => (
              <FeatureCard key={item} tone="ivory" title={item} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <Title title={content.bestFor.title} invert />
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {content.bestFor.items.map((item) => (
              <FeatureCard key={item} title={item} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <Title title={content.featuredPrograms.title} />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {content.featuredPrograms.programs.map((program) => (
              <FeatureCard
                key={program.title}
                tone="ivory"
                title={program.title}
                description={program.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <Title title={content.videoStories.title} invert />
          <div className="mt-8 grid gap-5 lg:max-w-2xl lg:grid-cols-1">
            {content.videoStories.stories.map((story) => (
              <VideoStoryCard key={story.videoUrl} story={story} />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <Title title={content.resources.title} />
          <div className="mt-8 grid gap-4 lg:grid-cols-2">
            {content.resources.items.map((resource) => (
              <ResourceCard
                key={resource.pdfPath}
                resource={resource}
                available={pdfAvailability[resource.pdfPath] ?? false}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="navy" className="!pb-16 sm:!pb-20">
        <Container>
          <div className="mx-auto max-w-2xl">
            <CTABox
              title={content.finalCta.title}
              description={content.finalCta.description}
              actions={
                <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
                  <ButtonLink href={contactHref} variant="primary">
                    {content.finalCta.contactLabel}
                  </ButtonLink>
                  <ButtonLink href={CONTACT_WHATSAPP_URL} variant="secondary" external>
                    <IconMessage className="mr-1.5 h-4 w-4 shrink-0" />
                    {content.finalCta.whatsappLabel}
                  </ButtonLink>
                  <ButtonLink href={CONTACT_EMAIL_MAILTO} variant="secondary">
                    <IconMail className="mr-1.5 h-4 w-4 shrink-0" />
                    {content.finalCta.emailLabel}
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
