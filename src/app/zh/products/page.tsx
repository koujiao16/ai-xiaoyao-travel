import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { zhProductsOverview } from "@/lib/zh/products";

export const metadata = {
  title: "产品体系",
};

export default function ZhProductsPage() {
  const { eyebrow, title, description, cards } = zhProductsOverview;

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
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {cards.map((card) => (
              <FeatureCard
                key={card.slug}
                href={`/zh/products/${card.slug}`}
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
