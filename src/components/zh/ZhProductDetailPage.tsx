import { PageHero } from "@/components/ui/PageHero";
import { Container } from "@/components/ui/Container";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { ButtonLink } from "@/components/ui/Button";
import type { ZhProductDetail } from "@/lib/zh/products";

export function ZhProductDetailPage({ product }: { product: ZhProductDetail }) {
  return (
    <main>
      <PageHero eyebrow="产品体系" title={product.title} description={product.description} />

      <Section tone="ivory">
        <Container>
          <p className="max-w-2xl text-lg font-medium tracking-tightish text-navy-950">
            {product.subtitle}
          </p>

          {product.sections.map((section) => (
            <div key={section.title} className="mt-12">
              <Title
                eyebrow={section.eyebrow}
                title={section.title}
                description={section.description}
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {section.items.map((item) => (
                  <FeatureCard key={item} tone="ivory" title={item} />
                ))}
              </div>
            </div>
          ))}

          <div className="mt-10">
            <ButtonLink href="/zh/contact" variant="secondaryDark">
              {product.cta}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
