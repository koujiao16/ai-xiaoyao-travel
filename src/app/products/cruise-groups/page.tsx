import { CruiseGroupsPageContent } from "@/components/products/CruiseGroupsPageContent";
import { getCruiseGroupsContent } from "@/lib/cruise-groups-content";

export const metadata = {
  title: getCruiseGroupsContent("en").metadataTitle,
};

export default function CruiseGroupsPage() {
  return <CruiseGroupsPageContent locale="en" />;
}
