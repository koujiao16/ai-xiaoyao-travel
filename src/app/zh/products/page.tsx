import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ProductCard } from "@/components/products/ProductCard";
import { getAllProducts } from "@/data/products";
import { zhProductsOverview } from "@/lib/zh/products";

export const metadata = {
  title: "产品体系",
};

export default function ZhProductsPage() {
  const { eyebrow, title, description, cards } = zhProductsOverview;
  const itineraryProducts = [...getAllProducts()].sort(
    (a, b) => Number(Boolean(b.featured)) - Number(Boolean(a.featured))
  );

  return (
    <main>
      <Section tone="navy" className="border-b border-white/10">
        <Container>
          <div className="py-10 sm:py-14">
            <Title eyebrow={eyebrow} title={title} description={description} invert />
          </div>
        </Container>
      </Section>

      {itineraryProducts.length > 0 ? (
        <Section tone="ivory">
          <Container>
            <Title
              eyebrow="行程产品"
              title="精选线路"
              description="结构化目的地行程产品，支持合作伙伴报价、讲解与 PDF 资料下载。"
            />
            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
              {itineraryProducts.map((product) => (
                <ProductCard key={product.id} product={product} locale="zh" />
              ))}
            </div>
          </Container>
        </Section>
      ) : null}

      <Section tone={itineraryProducts.length > 0 ? "navy" : "ivory"}>
        <Container>
          {itineraryProducts.length > 0 ? (
            <Title
              eyebrow="产品体系"
              title="产品线方向"
              description="覆盖中国经典联线、目的地常规产品、研学、会奖与特殊兴趣等核心方向。"
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
            {cards.map((card) => (
              <FeatureCard
                key={card.slug}
                href={`/zh/products/${card.slug}`}
                tone={itineraryProducts.length > 0 ? "navy" : "ivory"}
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
