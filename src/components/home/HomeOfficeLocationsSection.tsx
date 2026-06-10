import { getHomeOfficeLocations } from "@/lib/office-locations";
import type { SiteLocale } from "@/lib/locale-paths";
import { cn } from "@/lib/cn";

function OfficeCard({
  city,
  address,
  compact = false,
}: {
  city: string;
  address: string;
  compact?: boolean;
}) {
  return (
    <div
      className={cn(
        "rounded-lg border border-white/[0.06] bg-white/[0.02]",
        compact ? "px-3 py-2.5" : "px-3.5 py-3"
      )}
    >
      <div
        className={cn(
          "font-medium text-ivory-100/84",
          compact ? "text-[0.8125rem]" : "text-sm"
        )}
      >
        {city}
      </div>
      <p
        className={cn(
          "leading-relaxed text-ivory-100/42",
          compact ? "mt-1 text-[0.6875rem]" : "mt-1.5 text-xs"
        )}
      >
        {address}
      </p>
    </div>
  );
}

export function HomeOfficeLocationsSection({ locale }: { locale: SiteLocale }) {
  const { title, categories } = getHomeOfficeLocations(locale);
  const [destinationCategory, salesCategory] = categories;

  return (
    <div className="mt-8 border-t border-white/[0.06] pt-7 sm:mt-9 sm:pt-8">
      <h3 className="text-xs tracking-[0.18em] uppercase text-ivory-100/48">{title}</h3>

      <div className="mt-5">
        <p className="text-xs text-ivory-100/52">{destinationCategory.label}</p>
        <div className="mt-2.5 grid grid-cols-1 gap-2 sm:grid-cols-2 lg:grid-cols-4">
          {destinationCategory.offices.map((office) => (
            <OfficeCard key={office.city} city={office.city} address={office.address} />
          ))}
        </div>
      </div>

      <div className="mt-5 sm:mt-6">
        <p className="text-xs text-ivory-100/52">{salesCategory.label}</p>
        <div className="mt-2.5 grid grid-cols-1 gap-2 sm:max-w-md sm:grid-cols-1">
          {salesCategory.offices.map((office) => (
            <OfficeCard
              key={office.city}
              city={office.city}
              address={office.address}
              compact
            />
          ))}
        </div>
      </div>
    </div>
  );
}
