import { ZhProductDetailPage } from "@/components/zh/ZhProductDetailPage";
import { zhProducts } from "@/lib/zh/products";

export const metadata = { title: "中国经典联线" };

export default function ZhClassicChinaRoutesPage() {
  return <ZhProductDetailPage product={zhProducts["classic-china-routes"]} />;
}
