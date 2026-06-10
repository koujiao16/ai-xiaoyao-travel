import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ButtonLink } from "@/components/ui/Button";
import { CTABox } from "@/components/ui/CTABox";
import { Media } from "@/components/ui/Media";
import { IconArrowRight, IconMail, IconMessage } from "@/components/ui/Icons";
import {
  CONTACT_EMAIL_MAILTO,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import { localePath, type SiteLocale } from "@/lib/locale-paths";
import {
  getCruiseGroupsContent,
  type CruiseGroupProgramPlaceholder,
} from "@/lib/cruise-groups-content";

function ProgramPlaceholderCard({ program }: { program: CruiseGroupProgramPlaceholder }) {
  // Future image: program.imagePath
  // e.g. /images/cruise/shore-excursion.jpg, pre-cruise-route.jpg, etc.
  return (
    <article className="overflow-hidden rounded-xl2 border border-white/10 bg-white/[0.04] shadow-card">
      <div className="relative aspect-[4/3] overflow-hidden bg-gradient-to-br from-navy-900/80 via-navy-950 to-navy-900">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,106,0.1),transparent_68%)]" />
      </div>
      <div className="p-4 sm:p-5">
        <h3 className="text-sm font-semibold tracking-tightish text-ivory-100/82">
          {program.title}
        </h3>
      </div>
    </article>
  );
}

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

export function CruiseGroupsPageContent({ locale }: { locale: SiteLocale }) {
  const content = getCruiseGroupsContent(locale);

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
          <div className="mt-8 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
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
          <Title title={content.programPlaceholders.title} />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {content.programPlaceholders.programs.map((program) => (
              <ProgramPlaceholderCard key={program.imagePath} program={program} />
            ))}
          </div>
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
