import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";

export const metadata = {
  title: "Selected Cases",
};

const categories = [
  "Inbound Groups",
  "Study Tours",
  "Corporate Groups",
  "Wellness Travel",
  "Red Culture Programs",
  "Large Series Groups",
];

const cases = [
  {
    meta: "2025 · Malaysia · Inbound Group · 400+ Guests",
    destination: "Beijing + Xi’an + Shanghai",
    scope: "Multi-city operations, transport coordination, guiding and schedule control.",
  },
  {
    meta: "2025 · Singapore · Inbound Group · 90+ Guests",
    destination: "Xi’an + Luoyang",
    scope: "Inbound group reception, attraction coordination, hotel & meal execution.",
  },
  {
    meta: "2024 · Hong Kong · Inbound Group · 70+ Guests",
    destination: "Xi’an",
    scope: "Ground handling, guides, vehicles, and on-site program delivery.",
  },
  {
    meta: "2024 · Beijing · Study Tour · 300+ Students",
    destination: "Beijing + Xi’an",
    scope: "Learning modules, museum coordination, safety planning and group movement.",
  },
];

export default function CasesPage() {
  return (
    <main>
      <PageHero
        eyebrow="Cases"
        title="Selected Cases"
        description="Xiaoyao Travel has experience across inbound groups, study tours, corporate groups, wellness travel, red culture programs and large series groups."
      />

      <Section tone="ivory">
        <Container>
          <Title
            eyebrow="Categories"
            title="Case categories"
            description="A clear way to map past delivery experience to your next program requirements."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {categories.map((x) => (
              <span
                key={x}
                className="rounded-full border border-navy-900/10 bg-white px-4 py-2 text-sm text-navy-900/75 shadow-soft"
              >
                {x}
              </span>
            ))}
          </div>

          <div className="mt-12">
            <Title
              eyebrow="Highlights"
              title="Example case format"
              description="Year · Market / Origin · Group Type · Group Size · Destination · Service Scope"
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {cases.map((c) => (
                <div
                  key={c.meta}
                  className="rounded-xl2 border border-navy-900/10 bg-white p-6 shadow-soft"
                >
                  <div className="text-xs tracking-[0.18em] uppercase text-navy-900/60">
                    {c.meta}
                  </div>
                  <div className="mt-3 text-lg font-semibold tracking-tightish text-navy-950">
                    {c.destination}
                  </div>
                  <p className="mt-2 text-sm leading-relaxed text-navy-900/70">
                    {c.scope}
                  </p>
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm text-navy-900/60">
              More cases can be added after we select which projects are appropriate for public display.
            </p>
          </div>
        </Container>
      </Section>
    </main>
  );
}

