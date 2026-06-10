import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ButtonLink } from "@/components/ui/Button";

export const metadata = {
  title: "Classic China Routes",
};

const examples = [
  "Beijing + Xi’an + Shanghai",
  "Beijing + Xi’an + Luoyang",
  "Shanghai + Xi’an + Chengdu",
  "Xi’an + Zhengzhou + Luoyang",
  "Harbin + Beijing + Xi’an",
];

export default function ClassicChinaRoutesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Products"
        title="Classic China Routes"
        description="Multi-city China routes for overseas groups, supported by flight, high-speed rail and multi-region ground operations."
      />

      <Section tone="ivory">
        <Container>
          <Title
            eyebrow="Examples"
            title="Representative routes"
            description="Route structures can be adjusted by market preference, season, pace and group profile."
          />
          <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {examples.map((x) => (
              <FeatureCard key={x} tone="ivory" title={x} description="Inbound group-ready structure with clear pacing and logistics." />
            ))}
          </div>
          <div className="mt-10">
            <ButtonLink href="/contact" variant="secondaryDark">
              Get a Proposal
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}

