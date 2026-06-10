import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { zhDestinationsOverview } from "@/lib/zh/destinations";

export const metadata = {
  title: "目的地能力",
};

export default function ZhDestinationsPage() {
  const { eyebrow, title, description, cards } = zhDestinationsOverview;

  return (
    <main>
      <Section tone="navy" className="border-b border-white/10">
        <Container>
          <div className="py-10 sm:py-14">
            <Title eyebrow={eyebrow} title={title} description={description} invert />
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {cards.map((card) => (
              <FeatureCard
                key={card.slug}
                href={`/zh/destinations/${card.slug}`}
                tone="ivory"
                title={card.title}
                description={card.description}
              />
            ))}
          </div>
        </Container>
      </Section>
    </main>
  );
}
