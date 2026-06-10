import { Container } from "@/components/ui/Container";
import { PageHero } from "@/components/ui/PageHero";
import { Section } from "@/components/ui/Section";
import { Title } from "@/components/ui/Title";
import { ButtonLink } from "@/components/ui/Button";
import { zhCases } from "@/lib/zh/cases";

export const metadata = { title: "精选接待案例" };

export default function ZhCasesPage() {
  return (
    <main>
      <PageHero eyebrow={zhCases.eyebrow} title={zhCases.title} description={zhCases.description} />

      <Section tone="ivory">
        <Container>
          <Title
            eyebrow={zhCases.categoriesEyebrow}
            title={zhCases.categoriesTitle}
            description={zhCases.categoriesDescription}
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {zhCases.categories.map((x) => (
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
              eyebrow={zhCases.examplesEyebrow}
              title={zhCases.examplesTitle}
              description={zhCases.examplesDescription}
            />
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {zhCases.examples.map((example) => (
                <div
                  key={example}
                  className="rounded-xl2 border border-navy-900/10 bg-white p-6 shadow-soft"
                >
                  <div className="text-base font-semibold tracking-tightish text-navy-950">
                    {example}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-10">
            <ButtonLink href="/zh/contact" variant="secondaryDark">
              {zhCases.cta}
            </ButtonLink>
          </div>
        </Container>
      </Section>
    </main>
  );
}
