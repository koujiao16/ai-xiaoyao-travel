import { CustomChinaRoutesPageContent } from "@/components/products/CustomChinaRoutesPageContent";
import { getCustomChinaRoutesContent } from "@/lib/custom-china-routes-content";

export const metadata = {
  title: getCustomChinaRoutesContent("zh").metadataTitle,
};

export default function ZhCustomChinaRoutesPage() {
  return <CustomChinaRoutesPageContent locale="zh" />;
}
