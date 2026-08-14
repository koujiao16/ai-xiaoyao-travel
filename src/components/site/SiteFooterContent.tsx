import Link from "next/link";
import {
  CONTACT_EMAIL,
  CONTACT_EMAIL_MAILTO,
  CONTACT_WHATSAPP_DISPLAY,
  CONTACT_WHATSAPP_URL,
} from "@/lib/contact";
import { cn } from "@/lib/cn";
import type { SiteLocale } from "@/lib/locale-paths";
import { zhFooter } from "@/lib/zh/nav";

const footerEnLinks = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/products", label: "Products" },
  { href: "/cases", label: "Cases" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export function SiteFooterContent({
  locale,
  integrated = false,
}: {
  locale: SiteLocale;
  integrated?: boolean;
}) {
  const isZh = locale === "zh";
  const tagline = isZh
    ? zhFooter.tagline
    : "China B2B DMC & Operations · Four Self-operated Destinations";
  const copyright = isZh
    ? `© ${new Date().getFullYear()} Xiaoyao Travel 逍遥旅游。保留所有权利。`
    : `© ${new Date().getFullYear()} Xiaoyao Travel. All rights reserved.`;

  const destinationOfficesLabel = isZh ? "自营目的地办公室：" : "Destination Offices:";
  const destinationOffices = isZh
    ? "西安 · 郑州 · 哈尔滨 · 长春"
    : "Xi'an · Zhengzhou · Harbin · Changchun";
  const salesOfficeLabel = isZh ? "外办公司：" : "Sales Office:";
  const salesOffice = isZh ? "杭州" : "Hangzhou";

  return (
    <footer className={cn(integrated && "relative bg-gradient-to-b from-white/[0.03] to-transparent")}>
      {integrated ? (
        <div
          className="pointer-events-none absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent sm:inset-x-10"
          aria-hidden
        />
      ) : null}

      <div
        className={cn(
          integrated ? "px-6 pb-5 pt-7 sm:px-10 sm:pb-6 sm:pt-8" : undefined
        )}
      >
        <div
          className={cn(
            "grid items-start gap-7",
            integrated
              ? "sm:grid-cols-[1.15fr_0.7fr_1.15fr] sm:gap-12"
              : "gap-8 sm:grid-cols-2 lg:grid-cols-12 lg:gap-10"
          )}
        >
          <div className={cn(!integrated && "lg:col-span-5")}>
            <div className="text-sm font-semibold tracking-tightish text-ivory-50">
              {isZh ? zhFooter.brand : "Xiaoyao Travel"}
            </div>
            <p
              className={cn(
                "mt-3 text-sm leading-relaxed text-ivory-100/62",
                integrated ? "max-w-xs" : "max-w-md"
              )}
            >
              {tagline}
            </p>
            <p className="mt-3 text-xs leading-relaxed text-ivory-100/48">
              {isZh
                ? "由黑龙江逍遥国际旅行社运营｜源自民间旅游集团"
                : "Operated by Heilongjiang Xiaoyao International Travel Agency · Originated from Minjian Travel Group"}
            </p>
            <div className="mt-4 space-y-2 text-xs leading-relaxed text-ivory-100/55">
              <p>
                <span className="text-ivory-100/48">{destinationOfficesLabel}</span>
                {destinationOffices}
              </p>
              <p>
                <span className="text-ivory-100/48">{salesOfficeLabel}</span>
                {salesOffice}
              </p>
            </div>
          </div>

          <div className={cn(!integrated && "lg:col-span-3")}>
            <div className="text-xs tracking-[0.18em] uppercase text-ivory-100/48">
              {isZh ? "导航" : "Navigation"}
            </div>
            <nav className="mt-3 grid gap-1.5 text-sm">
              {isZh
                ? zhFooter.links.map((link) => (
                    <Link
                      key={link.href}
                      className="text-ivory-100/62 transition hover:text-ivory-50"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))
                : footerEnLinks.map((link) => (
                    <Link
                      key={link.href}
                      className="text-ivory-100/62 transition hover:text-ivory-50"
                      href={link.href}
                    >
                      {link.label}
                    </Link>
                  ))}
            </nav>
          </div>

          <div className={cn(!integrated && "lg:col-span-4")}>
            <div className="text-xs tracking-[0.18em] uppercase text-ivory-100/48">
              {isZh ? "联系" : "Contact"}
            </div>
            <div className="mt-3 grid gap-1.5 text-sm">
              <a
                className="inline-flex min-h-11 items-center text-ivory-100/62 transition hover:text-ivory-50 sm:min-h-0"
                href={CONTACT_EMAIL_MAILTO}
              >
                {isZh ? `${zhFooter.emailLabel}：${CONTACT_EMAIL}` : CONTACT_EMAIL}
              </a>
              <a
                className="inline-flex min-h-11 items-center text-ivory-100/62 transition hover:text-ivory-50 sm:min-h-0"
                href={CONTACT_WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                {isZh
                  ? `${zhFooter.whatsappLabel}：${CONTACT_WHATSAPP_DISPLAY}`
                  : `WhatsApp · ${CONTACT_WHATSAPP_DISPLAY}`}
              </a>
            </div>
          </div>
        </div>

        <div
          className={cn(
            "flex flex-col gap-2 text-xs text-ivory-100/42 sm:flex-row sm:items-center sm:justify-between",
            integrated
              ? "mt-6 border-t border-white/[0.06] pt-4 text-center sm:mt-7 sm:text-left"
              : "mt-6 border-t border-white/[0.08] pt-4"
          )}
        >
          <span>{copyright}</span>
          <Link
            className="text-ivory-100/55 transition hover:text-ivory-50"
            href={isZh ? "/zh/image-attributions" : "/image-attributions"}
          >
            {isZh ? "图片来源" : "Image credits"}
          </Link>
        </div>
      </div>
    </footer>
  );
}
