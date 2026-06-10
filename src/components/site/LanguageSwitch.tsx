"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";
import { isZhPath, toEnPath, toZhPath } from "@/lib/locale-paths";

export function LanguageSwitch() {
  const pathname = usePathname();
  const isZh = isZhPath(pathname);
  const enHref = toEnPath(pathname);
  const zhHref = toZhPath(pathname);

  const linkClass = (active: boolean) =>
    cn(
      "text-xs tracking-wide transition-colors",
      active ? "font-medium text-ivory-50" : "text-ivory-100/55 hover:text-ivory-100/85"
    );

  return (
    <div
      className="inline-flex items-center gap-1.5 rounded-full border border-white/10 bg-white/5 px-2.5 py-1"
      aria-label="Language"
    >
      {isZh ? (
        <>
          <span className={linkClass(true)} aria-current="page">
            中文
          </span>
          <span className="text-ivory-100/35" aria-hidden>
            |
          </span>
          <Link href={enHref} className={linkClass(false)}>
            EN
          </Link>
        </>
      ) : (
        <>
          <span className={linkClass(true)} aria-current="page">
            EN
          </span>
          <span className="text-ivory-100/35" aria-hidden>
            |
          </span>
          <Link href={zhHref} className={linkClass(false)}>
            中文
          </Link>
        </>
      )}
    </div>
  );
}
