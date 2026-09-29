import { fetchLodgingLabels, fetchPublishedLibrary } from "@/lib/xingcheng/data";
import { isSupabaseConfigured } from "@/lib/supabase/client";
import { XingchengBuilder } from "./XingchengBuilder";

export default async function XingchengPage() {
  const [library, lodgingOptions] = await Promise.all([
    fetchPublishedLibrary(),
    fetchLodgingLabels(),
  ]);

  const dataSource =
    isSupabaseConfigured() && library.some((item) => item.source === "supabase")
      ? "supabase"
      : "local";

  return (
    <XingchengBuilder
      library={library}
      lodgingOptions={lodgingOptions}
      dataSource={dataSource}
    />
  );
}
