import { CompactQuoteBuilder } from "./CompactQuoteBuilder";
import { fetchPublishedLibrary } from "@/lib/xingcheng/data";

export default async function BaojiaPage() {
  const library = await fetchPublishedLibrary();
  return <CompactQuoteBuilder library={library} />;
}
