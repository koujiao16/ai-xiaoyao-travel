"use client";

import { usePathname } from "next/navigation";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteNav } from "@/components/site/SiteNav";

export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const hideChrome = pathname.startsWith("/admin") || pathname.startsWith("/xingcheng");

  if (hideChrome) {
    return <>{children}</>;
  }

  return (
    <>
      <SiteNav />
      {children}
      <SiteFooter />
    </>
  );
}
