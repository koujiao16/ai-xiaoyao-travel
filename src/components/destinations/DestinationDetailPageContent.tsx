import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ButtonLink } from "@/components/ui/Button";
import { CTABox } from "@/components/ui/CTABox";
import { IconMail, IconMessage } from "@/components/ui/Icons";
import { DestinationProductEntryNav } from "@/components/destinations/DestinationProductEntryNav";
import { DestinationMedia } from "@/components/destinations/DestinationMedia";
import {
  CONTACT_EMAIL_MAILTO,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import {
  getDestinationDetail,
  getDestinationDetailLabels,
  type DestinationDetailContent,
  type FeaturedResource,
} from "@/lib/destination-detail-content";
import { localePath, type SiteLocale } from "@/lib/locale-paths";
import { publicFileExists } from "@/lib/public-file-exists";

function FeaturedResourceCard({
  resource,
  imageAvailable,
  imageComingSoonLabel,
}: {
  resource: FeaturedResource;
  imageAvailable: boolean;
  imageComingSoonLabel: string;
}) {
  return (
    <article className="group overflow-hidden rounded-xl2 border border-navy-900/10 bg-white shadow-soft transition-[border-color,box-shadow] duration-300 hover:border-gold-400/25 hover:shadow-[0_4px_28px_rgba(15,23,42,0.08)]">
      <DestinationMedia
        src={resource.imagePath}
        alt={resource.title}
        available={imageAvailable}
        placeholderLabel={imageComingSoonLabel}
        aspectClassName="aspect-[5/3] border-b border-navy-900/8"
      />
      <div className="p-5 sm:p-6">
        <h3 className="font-[family-name:var(--font-display)] text-xl tracking-tightish text-navy-950">
          {resource.title}
        </h3>
        <p className="mt-2 text-sm leading-relaxed text-navy-900/70">{resource.description}</p>
      </div>
    </article>
  );
}

function GuidePlaceholderCard({
  imagePath,
  index,
  imageAvailable,
  nickname,
  specialty,
  imageComingSoonLabel,
}: {
  imagePath: string;
  index: number;
  imageAvailable: boolean;
  nickname: string;
  specialty: string;
  imageComingSoonLabel: string;
}) {
  // Real guide data: nickname, specialty, and imagePath per slot — insert when assets are ready.
  return (
    <article className="overflow-hidden rounded-xl2 border border-navy-900/10 bg-white/80 shadow-soft">
      <DestinationMedia
        src={imagePath}
        alt=""
        available={imageAvailable}
        placeholderLabel={imageComingSoonLabel}
        aspectClassName="aspect-[4/5]"
      />
      <div className="border-t border-navy-900/8 px-4 py-4 sm:px-5 sm:py-5">
        <p className="text-sm font-medium text-navy-950/90">{nickname}</p>
        <p className="mt-1.5 text-xs leading-relaxed text-navy-900/60">{specialty}</p>
        {/* Guide slot {index + 1}: replace placeholder copy with verified nickname and specialty. */}
      </div>
    </article>
  );
}

function DestinationHero({
  eyebrow,
  title,
  positioning,
}: {
  eyebrow: string;
  title: string;
  positioning: string;
}) {
  return (
    <section className="border-b border-white/10 bg-navy-950">
      <Container className="py-14 sm:py-18">
        <div className="max-w-3xl">
          <p className="text-xs font-medium tracking-[0.22em] uppercase text-gold-300/90">
            {eyebrow}
          </p>
          <div className="mt-4 h-px w-10 bg-gold-400/45" aria-hidden />
          <h1 className="mt-5 font-[family-name:var(--font-display)] text-4xl tracking-tightish text-ivory-50 sm:text-5xl">
            {title}
          </h1>
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory-100/78 sm:text-lg">
            {positioning}
          </p>
        </div>
      </Container>
    </section>
  );
}

function buildImageAvailability(content: DestinationDetailContent) {
  const paths = [
    ...content.featuredResources.map((r) => r.imagePath),
    ...content.guideImagePaths,
  ];
  return Object.fromEntries(paths.map((p) => [p, publicFileExists(p)])) as Record<string, boolean>;
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
  const imageAvailability = buildImageAvailability(content);

  return (
    <main>
      <DestinationHero
        eyebrow={labels.heroEyebrow}
        title={content.title}
        positioning={content.positioning}
      />

      <DestinationProductEntryNav locale={locale} destinationSlug={content.slug} />

      <Section tone="ivory">
        <Container>
          <Title title={labels.featuredTitle} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 sm:gap-6">
            {content.featuredResources.map((resource) => (
              <FeaturedResourceCard
                key={resource.imagePath}
                resource={resource}
                imageAvailable={imageAvailability[resource.imagePath] ?? false}
                imageComingSoonLabel={labels.imageComingSoon}
              />
            ))}
          </div>
        </Container>
      </Section>

      <section className="border-t border-navy-900/8 bg-ivory-100 py-14 text-navy-950 sm:py-20">
        <Container>
          <Title title={labels.guidesTitle} description={labels.guidesDescription} />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4 lg:gap-6">
            {content.guideImagePaths.map((imagePath, index) => (
              <GuidePlaceholderCard
                key={imagePath}
                imagePath={imagePath}
                index={index}
                imageAvailable={imageAvailability[imagePath] ?? false}
                nickname={labels.guideNickname}
                specialty={labels.guideSpecialty}
                imageComingSoonLabel={labels.imageComingSoon}
              />
            ))}
          </div>
        </Container>
      </section>

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
