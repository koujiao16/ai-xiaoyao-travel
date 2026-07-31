import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ProductCard } from "@/components/products/ProductCard";
import { getAllProducts } from "@/data/products";

export const metadata = {
  title: "Product Lines",
};

export default function ProductsOverviewPage() {
  const itineraryProducts = [...getAllProducts()].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  );

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

      {itineraryProducts.length > 0 ? (
        <Section tone="ivory">
          <Container>
            <Title
              eyebrow="Itineraries"
              title="Featured Programs"
              description="Structured destination programs ready for partner quoting, with day-by-day itineraries and downloadable PDF packs."
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {itineraryProducts.map((product) => (
                <ProductCard key={product.id} product={product} locale="en" />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone={itineraryProducts.length > 0 ? "navy" : "ivory"}>
        <Container>
          {itineraryProducts.length > 0 ? (
            <Title
              eyebrow="Product System"
              title="Product Lines"
              description="Browse our core B2B product directions across China."
              invert
            />
          ) : null}
          <div
            className={
              itineraryProducts.length > 0
                ? "mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
                : "grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
            }
          >
            <FeatureCard
              href="/products/classic-china-routes"
              tone={itineraryProducts.length > 0 ? "navy" : "ivory"}
              title="Classic China Routes"
              description="Multi-city China routes for overseas groups, supported by flight, high-speed rail and multi-region ground operations."
            />
            <FeatureCard
              href="/products/destination-products"
              tone={itineraryProducts.length > 0 ? "navy" : "ivory"}
              title="Four Destination Products"
              description="Regular and customized products across Shaanxi, Heilongjiang, Henan and Jilin."
            />
            <FeatureCard
              href="/products/study-tours"
              tone={itineraryProducts.length > 0 ? "navy" : "ivory"}
              title="Study Tours"
              description="Educational programs for schools, institutions and youth groups, combining history, museums, cultural workshops, charity activities and nature exploration."
            />
            <FeatureCard
              href="/products/corporate-mice"
              tone={itineraryProducts.length > 0 ? "navy" : "ivory"}
              title="Corporate & MICE"
              description="Business reception, meetings, incentive travel, team building and industry visit programs."
            />
            <FeatureCard
              href="/products/special-interest-travel"
              tone={itineraryProducts.length > 0 ? "navy" : "ivory"}
              title="Special Interest Travel"
              description="Deep experience programs for small groups and customized clients, built around food, nature, hiking, photography, heritage and local lifestyle."
            />
            <FeatureCard
              href="/products/cruise-groups"
              tone={itineraryProducts.length > 0 ? "navy" : "ivory"}
              title="Cruise Groups"
              description="Cruise shore excursions, pre/post-cruise China extensions and local ground operation support."
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}
