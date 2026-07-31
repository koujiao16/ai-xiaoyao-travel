"use client";

import { useState } from "react";
import type { ProductItineraryDay } from "@/data/products";
import type { SiteLocale } from "@/lib/locale-paths";
import { cn } from "@/lib/cn";

function dayTitle(day: ProductItineraryDay, locale: SiteLocale) {
  return locale === "zh" ? day.titleCN : day.titleEN;
}

function dayDescription(day: ProductItineraryDay, locale: SiteLocale) {
  return locale === "zh" ? day.descriptionCN : day.descriptionEN;
}

function dayMeals(day: ProductItineraryDay, locale: SiteLocale) {
  return locale === "zh" ? day.mealsCN : day.mealsEN;
}

function dayLodging(day: ProductItineraryDay, locale: SiteLocale) {
  return locale === "zh" ? day.lodgingCN : day.lodgingEN;
}

export function ItineraryAccordion({
  days,
  locale,
}: {
  days: ProductItineraryDay[];
  locale: SiteLocale;
}) {
  const [openDay, setOpenDay] = useState<number | null>(days[0]?.day ?? null);
  const dayLabel = locale === "zh" ? "第" : "Day";
  const daySuffix = locale === "zh" ? "天" : "";
  const mealsLabel = locale === "zh" ? "用餐" : "Meals";
  const lodgingLabel = locale === "zh" ? "住宿" : "Lodging";

  return (
    <div className="space-y-3">
      {days.map((day) => {
        const isOpen = openDay === day.day;
        const panelId = `itinerary-day-${day.day}`;
        const meals = dayMeals(day, locale);
        const lodging = dayLodging(day, locale);

        return (
          <div
            key={day.day}
            className="overflow-hidden rounded-xl2 border border-navy-900/10 bg-white shadow-soft"
          >
            <button
              type="button"
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => setOpenDay(isOpen ? null : day.day)}
              className="flex w-full items-start justify-between gap-4 px-5 py-4 text-left transition-colors hover:bg-ivory-50/80 sm:px-6 sm:py-5"
            >
              <div className="min-w-0">
                <p className="text-xs font-medium tracking-[0.18em] uppercase text-gold-500">
                  {dayLabel}
                  {locale === "zh" ? day.day : ` ${day.day}`}
                  {daySuffix}
                </p>
                <h3 className="mt-1.5 font-[family-name:var(--font-display)] text-lg tracking-tightish text-navy-950 sm:text-xl">
                  {dayTitle(day, locale)}
                </h3>
              </div>
              <span
                className={cn(
                  "mt-1 inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-navy-900/10 text-navy-950 transition-transform duration-300",
                  isOpen && "rotate-45"
                )}
                aria-hidden
              >
                <svg viewBox="0 0 16 16" className="h-3.5 w-3.5" fill="none">
                  <path
                    d="M8 3v10M3 8h10"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </span>
            </button>

            <div
              id={panelId}
              className={cn(
                "grid transition-[grid-template-rows] duration-300 ease-out",
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              )}
            >
              <div className="overflow-hidden">
                <div className="border-t border-navy-900/8 px-5 pb-5 pt-4 sm:px-6 sm:pb-6">
                  <p className="text-sm leading-relaxed text-navy-900/75">
                    {dayDescription(day, locale)}
                  </p>
                  {(meals || lodging) && (
                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      {meals ? (
                        <div className="rounded-lg bg-ivory-50 px-3.5 py-3">
                          <p className="text-xs tracking-wide text-navy-900/45">
                            {mealsLabel}
                          </p>
                          <p className="mt-1 text-sm text-navy-950/85">{meals}</p>
                        </div>
                      ) : null}
                      {lodging ? (
                        <div className="rounded-lg bg-ivory-50 px-3.5 py-3">
                          <p className="text-xs tracking-wide text-navy-900/45">
                            {lodgingLabel}
                          </p>
                          <p className="mt-1 text-sm text-navy-950/85">{lodging}</p>
                        </div>
                      ) : null}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
