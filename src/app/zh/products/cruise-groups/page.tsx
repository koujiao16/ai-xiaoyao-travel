import { CruiseGroupsPageContent } from "@/components/products/CruiseGroupsPageContent";
import { getCruiseGroupsContent } from "@/lib/cruise-groups-content";

export const metadata = {
  title: getCruiseGroupsContent("zh").metadataTitle,
};

export default function ZhCruiseGroupsPage() {
  return <CruiseGroupsPageContent locale="zh" />;
}
