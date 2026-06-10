import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { FeatureCard } from "@/components/ui/FeatureCard";
import { Stat } from "@/components/ui/Stat";

export const metadata = {
  title: "About Xiaoyao Travel",
};

export default function AboutPage() {
  return (
    <main>
      <PageHero
        eyebrow="About"
        title="About Xiaoyao Travel"
        description="Xiaoyao Travel is operated by Heilongjiang Xiaoyao International Travel Agency and originated from the quality travel service philosophy of Minjian Travel Group. We focus on B2B destination reception, quality travel products, study tours and multi-type group operations."
      />

      <Section tone="ivory">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Title
                eyebrow="Profile"
                title="Company profile"
                description="A China-focused B2B destination management and operations brand built for overseas partners and institutional clients."
              />
              <div className="mt-8 grid gap-4 sm:grid-cols-2">
                <FeatureCard
                  tone="ivory"
                  title="Development history"
                  description="Originated from Minjian Travel Group’s quality travel philosophy and refined through long-term group operations."
                />
                <FeatureCard
                  tone="ivory"
                  title="Group network"
                  description="Multi-region operations across Shaanxi, Heilongjiang, Henan and Jilin — supporting cross-city programs."
                />
                <FeatureCard
                  tone="ivory"
                  title="Quality philosophy"
                  description="Honest reception, transparent communication, and execution reliability for partner brand safety."
                />
                <FeatureCard
                  tone="ivory"
                  title="Service data"
                  description="Scale and experience built through long-term partner cooperation and repeat operations."
                />
              </div>
            </div>
            <div className="lg:col-span-5">
              <Title
                eyebrow="Scale"
                title="Operations at a glance"
                description="A stable base for group operations and partner delivery."
              />
              <div className="mt-8 grid grid-cols-2 gap-4">
                <Stat label="Sales Offices" value="30+" />
                <Stat label="Partner Agencies" value="3000+" />
                <Stat label="Travelers Served" value="100000+" />
                <Stat label="Key Regions" value="4" />
              </div>
            </div>
          </div>
        </Container>
      </Section>

      <Section tone="navy">
        <Container>
          <Title
            eyebrow="Brand Matrix"
            title="Brand matrix"
            description="A clear structure for different traveler types and partner needs."
            invert
          />
          <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            <FeatureCard
              title="Minjian Travel Group"
              description="The origin of our quality travel service philosophy."
            />
            <FeatureCard
              title="Ai Xiaoyao Travel"
              description="Quality travel products focused on honest reception, transparent communication and guest satisfaction."
            />
            <FeatureCard
              title="Adventure Hat Study Tours"
              description="Educational travel brand for study tours and cultural learning programs."
            />
          </div>
        </Container>
      </Section>
    </main>
  );
}

