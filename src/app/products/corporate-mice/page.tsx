import { CorporateMicePageContent } from "@/components/products/CorporateMicePageContent";
import { getCorporateMiceContent } from "@/lib/corporate-mice-content";

export const metadata = {
  title: getCorporateMiceContent("en").metadataTitle,
};

export default function CorporateMicePage() {
  return <CorporateMicePageContent locale="en" />;
}
