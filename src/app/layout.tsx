import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { SiteChrome } from "@/components/site/SiteChrome";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Xiaoyao Travel — China B2B Destination Management",
    template: "%s — Xiaoyao Travel",
  },
  description:
    "China B2B destination management & travel operations across Shaanxi, Heilongjiang, Henan and Jilin.",
  icons: [{ rel: "icon", url: "/favicon-blue-logo.png", type: "image/png", sizes: "436x436" }],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen bg-navy-950 text-ivory-100 antialiased">
        <div className="grain">
          <SiteChrome>{children}</SiteChrome>
        </div>
      </body>
    </html>
  );
}

