import { CorporateMicePageContent } from "@/components/products/CorporateMicePageContent";
import { getCorporateMiceContent } from "@/lib/corporate-mice-content";

export const metadata = {
  title: getCorporateMiceContent("zh").metadataTitle,
};

export default function ZhCorporateMicePage() {
  return <CorporateMicePageContent locale="zh" />;
}
