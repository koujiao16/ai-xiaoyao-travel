import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "逍遥旅游 — 中国 B2B 目的地管理与旅游运营",
  description:
    "逍遥旅游提供地接接待、入境团队、研学旅行、企业会奖、邮轮团队及中国目的地运营服务。",
};

export default function ZhLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
