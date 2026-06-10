import { HomePageContent } from "@/components/home/HomePageContent";
import { homeContentZh } from "@/lib/home-content";

export default function ChineseHomePage() {
  return <HomePageContent content={homeContentZh} locale="zh" />;
}
