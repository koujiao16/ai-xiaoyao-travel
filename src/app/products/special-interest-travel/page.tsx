import { SpecialInterestTravelPageContent } from "@/components/products/SpecialInterestTravelPageContent";
import { getSpecialInterestTravelContent } from "@/lib/special-interest-travel-content";

export const metadata = {
  title: getSpecialInterestTravelContent("en").metadataTitle,
};

export default function SpecialInterestTravelPage() {
  return <SpecialInterestTravelPageContent locale="en" />;
}
