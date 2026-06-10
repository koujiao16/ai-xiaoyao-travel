import { Container } from "@/components/ui/Container";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";

export const metadata = {
  title: "Destination Capabilities",
};

export default function DestinationsOverviewPage() {
  return (
    <main>
      <Section tone="navy" className="border-b border-white/10">
        <Container>
          <div className="py-10 sm:py-14">
            <Title
              eyebrow="Destinations"
              title="Destination Capabilities"
              description="Xiaoyao Travel focuses on four key destination regions: Shaanxi, Heilongjiang, Henan and Jilin. These regions support classic routes, inbound groups, study tours, corporate programs and customized China travel operations."
              invert
            />
          </div>
        </Container>
      </Section>

      <Section tone="ivory">
        <Container>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <FeatureCard
              href="/destinations/shaanxi"
              tone="ivory"
              title="Shaanxi"
              description="Ancient capital culture, Xi’an ground services, study tour resources and Qinling routes."
            />
            <FeatureCard
              href="/destinations/heilongjiang"
              tone="ivory"
              title="Heilongjiang"
              description="Ice and snow travel, border culture, wellness travel and seasonal group products."
            />
            <FeatureCard
              href="/destinations/henan"
              tone="ivory"
              title="Henan"
              description="Central China culture, provincial resources and multi-city route connections."
            />
            <FeatureCard
              href="/destinations/jilin"
              tone="ivory"
              title="Jilin"
              description="Changbai Mountain, winter resources, natural scenery and regional group reception."
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}

