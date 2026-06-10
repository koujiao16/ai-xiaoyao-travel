import { InboundGroupsPageContent } from "@/components/products/InboundGroupsPageContent";
import { getInboundGroupsContent } from "@/lib/inbound-groups-content";

export const metadata = {
  title: getInboundGroupsContent("zh").metadataTitle,
};

export default function ZhInboundGroupsPage() {
  return <InboundGroupsPageContent locale="zh" />;
}
