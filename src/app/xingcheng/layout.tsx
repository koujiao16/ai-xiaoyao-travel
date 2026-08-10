import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "行程生成器",
  description: "输入景区关键词，快速生成包含用餐、住宿、景点介绍与游览时间的详细行程。",
};

export default function XingchengLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
