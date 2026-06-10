"use client";

import { usePathname } from "next/navigation";
import { SiteFooterContent } from "@/components/site/SiteFooterContent";
import { Container } from "@/components/ui/Container";
import { getSiteLocale } from "@/lib/locale-paths";

/**
 * Site footer for non-home pages. Homepage uses HomeFinalSection instead.
 */
export function SiteFinalSection() {
  const pathname = usePathname();
  const isHome = pathname === "/" || pathname === "/zh";

  if (isHome) return null;

  const locale = getSiteLocale(pathname);

  return (
    <section
      className="relative overflow-hidden border-t border-white/[0.12] text-ivory-100"
      style={{
        background: "linear-gradient(180deg, #07101c 0%, #0b1320 55%, #05070d 100%)",
      }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold-400/40 to-transparent"
        aria-hidden
      />
      <Container className="relative py-8 sm:py-10">
        <SiteFooterContent locale={locale} />
      </Container>
    </section>
  );
}
