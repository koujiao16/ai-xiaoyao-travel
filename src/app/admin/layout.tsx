import type { Metadata } from "next";
import "./admin.css";

export const metadata: Metadata = {
  title: {
    default: "管理后台",
    template: "%s — 管理后台",
  },
  description: "景区、住宿与行程模板内容管理",
};

export default function AdminRootLayout({ children }: { children: React.ReactNode }) {
  return <div className="admin-shell min-h-screen bg-[#f4efe6] text-[#2e2924]">{children}</div>;
}
