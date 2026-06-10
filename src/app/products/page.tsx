import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";

export const metadata = {
  title: "Product Lines",
};

export default function ProductsOverviewPage() {
  return (
    <main>
      <Section tone="navy" className="border-b border-white/10">
        <Container>
          <div className="py-10 sm:py-14">
            <Title
              eyebrow="Products"
              title="Product Lines"
              description="We provide China travel products for different markets, group types and seasons, including classic routes, destination products, study tours, corporate programs, special interest travel and cruise group services."
              invert
            />
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              href="/products/classic-china-routes"
              tone="ivory"
              title="Classic China Routes"
              description="Multi-city China routes for overseas groups, supported by flight, high-speed rail and multi-region ground operations."
            />
            <FeatureCard
              href="/products/destination-products"
              tone="ivory"
              title="Four Destination Products"
              description="Regular and customized products across Shaanxi, Heilongjiang, Henan and Jilin."
            />
            <FeatureCard
              href="/products/study-tours"
              tone="ivory"
              title="Study Tours"
              description="Educational programs for schools, institutions and youth groups, combining history, museums, cultural workshops, charity activities and nature exploration."
            />
            <FeatureCard
              href="/products/corporate-mice"
              tone="ivory"
              title="Corporate & MICE"
              description="Business reception, meetings, incentive travel, team building and industry visit programs."
            />
            <FeatureCard
              href="/products/special-interest-travel"
              tone="ivory"
              title="Special Interest Travel"
              description="Deep experience programs for small groups and customized clients, built around food, nature, hiking, photography, heritage and local lifestyle."
            />
            <FeatureCard
              href="/products/cruise-groups"
              tone="ivory"
              title="Cruise Groups"
              description="Cruise shore excursions, pre/post-cruise China extensions and local ground operation support."
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}

