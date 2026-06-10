import { InboundGroupsPageContent } from "@/components/products/InboundGroupsPageContent";
import { getInboundGroupsContent } from "@/lib/inbound-groups-content";

export const metadata = {
  title: getInboundGroupsContent("en").metadataTitle,
};

export default function InboundGroupsPage() {
  return <InboundGroupsPageContent locale="en" />;
}
