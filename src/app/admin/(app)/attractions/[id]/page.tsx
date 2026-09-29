import { notFound } from "next/navigation";
import { AdminPageHeader } from "@/components/admin/AdminUI";
import { AttractionForm } from "@/components/admin/AttractionForm";
import { tryCreateServerSupabaseClient } from "@/lib/supabase/server";
import type { AttractionRecord } from "@/lib/xingcheng/types";

type Props = { params: Promise<{ id: string }> };

export default async function EditAttractionPage({ params }: Props) {
  const { id } = await params;
  const supabase = await tryCreateServerSupabaseClient();
  if (!supabase) notFound();
  const { data, error } = await supabase.from("attractions").select("*").eq("id", id).maybeSingle();
  if (error || !data) notFound();

  return (
    <div>
      <AdminPageHeader title="编辑景区" description={(data as AttractionRecord).name} />
      <AttractionForm initial={data as AttractionRecord} />
    </div>
  );
}
