export type SiteLocale = "en" | "zh";

export function isZhPath(pathname: string): boolean {
  return pathname === "/zh" || pathname.startsWith("/zh/");
}

export function getSiteLocale(pathname: string): SiteLocale {
  return isZhPath(pathname) ? "zh" : "en";
}

/** English path → corresponding Chinese path */
export function toZhPath(pathname: string): string {
  if (isZhPath(pathname)) return pathname;
  if (pathname === "/") return "/zh";
  return `/zh${pathname}`;
}

/** Chinese path → corresponding English path */
export function toEnPath(pathname: string): string {
  if (!isZhPath(pathname)) return pathname;
  if (pathname === "/zh") return "/";
  const en = pathname.slice(3);
  return en === "" ? "/" : en;
}

/** Prefix internal paths when rendering Chinese pages */
export function localePath(path: string, locale: SiteLocale): string {
  if (locale === "en") return path;
  if (path === "/") return "/zh";
  return `/zh${path}`;
}
