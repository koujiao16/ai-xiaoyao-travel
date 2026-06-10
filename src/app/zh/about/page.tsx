import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Stat } from "@/components/ui/Stat";
import { ButtonLink } from "@/components/ui/Button";
import { zhAbout } from "@/lib/zh/about";

export const metadata = { title: "关于我们" };

export default function ZhAboutPage() {
  return (
    <main>
      <PageHero eyebrow={zhAbout.eyebrow} title={zhAbout.title} description={zhAbout.description} />

      <Section tone="ivory">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Title
                eyebrow={zhAbout.profileEyebrow}
                title={zhAbout.profileTitle}
                description={zhAbout.profileDescription}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                {zhAbout.sections.map((section) => (
                  <FeatureCard
                    key={section.title}
                    tone="ivory"
                    title={section.title}
                    description={section.description}
                  />
                ))}
              </div>
            </div>
            <div className="lg:col-span-5">
              <Title
                eyebrow={zhAbout.statsEyebrow}
                title={zhAbout.statsTitle}
                description={zhAbout.statsDescription}
              />
              <div className="mt-8 grid grid-cols-2 gap-4">
                {zhAbout.stats.map((stat) => (
                  <Stat key={stat.label} label={stat.label} value={stat.value} />
                ))}
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <Title
            eyebrow={zhAbout.brandEyebrow}
            title={zhAbout.brandTitle}
            description={zhAbout.brandDescription}
            invert
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {zhAbout.brands.map((brand) => (
              <FeatureCard
                key={brand.title}
                title={brand.title}
                description={brand.description}
              />
            ))}
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <Title
            eyebrow={zhAbout.qualityEyebrow}
            title={zhAbout.qualityTitle}
            description={zhAbout.qualityDescription}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {zhAbout.qualityPoints.map((point) => (
              <span
                key={point}
                className="rounded-full border border-navy-900/10 bg-white px-4 py-2 text-sm text-navy-900/75 shadow-soft"
              >
                {point}
              </span>
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/zh/contact" variant="secondaryDark">
              {zhAbout.cta}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
