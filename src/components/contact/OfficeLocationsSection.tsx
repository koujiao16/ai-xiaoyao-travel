import { Title } from "@/components/ui/Title";
import {
  OFFICE_LOCATIONS,
  officeLocationsSectionCopy,
} from "@/lib/office-locations";
import type { SiteLocale } from "@/lib/locale-paths";

export function OfficeLocationsSection({ locale }: { locale: SiteLocale }) {
  const copy = officeLocationsSectionCopy[locale];

  return (
    <div className="mt-16 border-t border-navy-900/10 pt-16">
      <Title title={copy.title} description={copy.description} />

      <div className="mt-10 grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {OFFICE_LOCATIONS.map((office) => {
          const content = locale === "zh" ? office.zh : office.en;

          return (
            <article
              key={office.slug}
              className="flex h-full flex-col rounded-xl2 border border-navy-900/10 bg-[#fffaf0] p-6 shadow-soft"
            >
              <p className="text-[10px] font-medium tracking-[0.16em] uppercase text-navy-900/50">
                {content.typeLabel}
              </p>
              <h3 className="mt-3 text-base font-semibold tracking-tightish text-navy-950">
                {content.name}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-navy-900/70">
                {content.address}
              </p>
            </article>
          );
        })}
      </div>
    </div>
  );
}
