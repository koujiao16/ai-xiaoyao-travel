import { SpecialInterestTravelPageContent } from "@/components/products/SpecialInterestTravelPageContent";
import { getSpecialInterestTravelContent } from "@/lib/special-interest-travel-content";

export const metadata = {
  title: getSpecialInterestTravelContent("zh").metadataTitle,
};

export default function ZhSpecialInterestTravelPage() {
  return <SpecialInterestTravelPageContent locale="zh" />;
}
