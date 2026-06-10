"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Container } from "@/components/ui/Container";
import { ButtonLink } from "@/components/ui/Button";
import { LanguageSwitch } from "@/components/site/LanguageSwitch";
import { isZhPath } from "@/lib/locale-paths";
import { zhCta, zhNav } from "@/lib/zh/nav";
import { cn } from "@/lib/cn";

const navEn = [
  { href: "/", label: "Home" },
  { href: "/destinations", label: "Destinations" },
  { href: "/products", label: "Products" },
  { href: "/cases", label: "Cases" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
];

function MenuIcon({ open }: { open: boolean }) {
  return (
    <svg
      aria-hidden
      className="h-5 w-5 text-ivory-50"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      strokeWidth={1.5}
    >
      {open ? (
        <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
      ) : (
        <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
      )}
    </svg>
  );
}

export function SiteNav() {
  const pathname = usePathname();
  const isZh = isZhPath(pathname);
  const nav = isZh ? zhNav : navEn;
  const contactHref = isZh ? "/zh/contact" : "/contact";
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-navy-950/80 backdrop-blur">
      <Container className="flex h-14 items-center justify-between gap-3 md:h-16">
        <Link
          href={isZh ? "/zh" : "/"}
          className="group inline-flex min-w-0 items-center gap-2.5"
          onClick={() => setMenuOpen(false)}
        >
          <span className="relative inline-flex h-8 w-8 shrink-0 items-center justify-center md:h-9 md:w-9">
            <Image
              src="/images/logo-aixiaoyao.png"
              alt="Ai Xiaoyao"
              fill
              unoptimized
              className="object-contain object-center"
              sizes="36px"
            />
          </span>
          <span className="truncate text-sm font-medium tracking-tightish text-ivory-50">
            Ai Xiaoyao
          </span>
        </Link>

        <nav className="hidden items-center gap-6 md:flex">
          {nav.map((i) => (
            <Link
              key={i.href}
              href={i.href}
              className={cn(
                "text-sm text-ivory-100/70 transition-colors hover:text-ivory-50",
                i.href.includes("/contact") ? "hidden" : ""
              )}
            >
              {i.label}
            </Link>
          ))}
        </nav>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <LanguageSwitch />
          <ButtonLink
            href={contactHref}
            variant="primary"
            className="hidden px-4 py-2.5 text-sm md:inline-flex"
          >
            {isZh ? zhCta : "Get a Proposal"}
          </ButtonLink>

          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-white/10 bg-white/5 transition-colors hover:bg-white/10 md:hidden"
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? "关闭菜单" : "打开菜单"}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <MenuIcon open={menuOpen} />
          </button>
        </div>
      </Container>

      <div
        id="mobile-nav"
        className={cn(
          "border-t border-white/10 bg-navy-950/95 backdrop-blur md:hidden",
          menuOpen ? "block" : "hidden"
        )}
      >
        <Container className="py-4">
          <nav className="flex flex-col gap-1">
            {nav.map((i) => (
              <Link
                key={i.href}
                href={i.href}
                className="rounded-lg px-3 py-2.5 text-sm text-ivory-100/80 transition-colors hover:bg-white/5 hover:text-ivory-50"
                onClick={() => setMenuOpen(false)}
              >
                {i.label}
              </Link>
            ))}
            <div className="mt-3 flex items-center justify-between border-t border-white/10 pt-3">
              <LanguageSwitch />
              <ButtonLink
                href={contactHref}
                variant="primary"
                className="px-4 py-2.5 text-sm"
                onClick={() => setMenuOpen(false)}
              >
                {isZh ? zhCta : "Get a Proposal"}
              </ButtonLink>
            </div>
          </nav>
        </Container>
      </div>
    </header>
  );
}
