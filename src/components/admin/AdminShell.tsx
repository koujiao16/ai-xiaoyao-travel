"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

const NAV = [
  { href: "/admin", label: "概览", exact: true },
  { href: "/admin/attractions", label: "景区" },
  { href: "/admin/accommodations", label: "住宿" },
  { href: "/admin/itineraries", label: "行程模板" },
];

export function AdminShell({
  children,
  email,
}: {
  children: React.ReactNode;
  email?: string | null;
}) {
  const pathname = usePathname();
  const router = useRouter();

  const logout = async () => {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.replace("/admin/login");
    router.refresh();
  };

  return (
    <div className="min-h-screen">
      <header className="sticky top-0 z-40 border-b border-[#e2d6c6] bg-[#faf6f0]/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <div className="flex items-center gap-3">
            <Link href="/admin" className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#8b3e2f] text-sm font-bold text-white">
              管
            </Link>
            <div>
              <p className="text-sm font-semibold">行程内容管理后台</p>
              <p className="text-xs text-[#7a7168]">{email || "管理员"}</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/xingcheng" className="hidden text-xs text-[#8b3e2f] underline sm:inline" target="_blank">
              打开前台
            </Link>
            <button
              type="button"
              onClick={logout}
              className="rounded-md border border-[#d9cbb8] bg-white px-3 py-1.5 text-xs font-medium"
            >
              退出
            </button>
          </div>
        </div>
        <nav className="mx-auto flex max-w-6xl gap-1 overflow-x-auto px-4 pb-2">
          {NAV.map((item) => {
            const active = item.exact ? pathname === item.href : pathname.startsWith(item.href);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`whitespace-nowrap rounded-full px-3 py-1.5 text-sm ${
                  active ? "bg-[#8b3e2f] text-white" : "bg-transparent text-[#5f5851] hover:bg-[#efe6da]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-6">{children}</main>
    </div>
  );
}
