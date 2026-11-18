"use client";
import { useCallback, useEffect, useState } from "react";
type Review = { id: string; name: string; description: string; province: string; city: string; keywords: string[]; created_at: string; published: boolean };
export function AttractionReviews() {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [existing, setExisting] = useState<Review[]>([]);
  const [status, setStatus] = useState("pending");
  const [message, setMessage] = useState("正在读取…");
  const [busy, setBusy] = useState(false);
  const load = useCallback(async () => {
    try { const r = await fetch("/api/admin/reviews", { cache: "no-store" }); const d = await r.json(); if (!r.ok) throw Error(d.error); setReviews(d.reviews); setExisting(d.existing); setMessage(""); }
    catch (e) { setMessage(e instanceof Error ? e.message : "读取失败"); }
  }, []);
  useEffect(() => { void load(); }, [load]);
  const edit = (id: string, patch: Partial<Review>) => setReviews(rows => rows.map(row => row.id === id ? { ...row, ...patch } : row));
  const decide = async (row: Review, action: string) => {
    setBusy(true);
    try { const r = await fetch("/api/admin/reviews", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ ...row, action }) }); const d = await r.json(); if (!r.ok) throw Error(d.error); await load(); setMessage(action === "approve" ? "已通过并发布，前台刷新即可搜索" : "已拒绝"); }
    catch (e) { setMessage(e instanceof Error ? e.message : "保存失败"); }
    finally { setBusy(false); }
  };
  return <div><h1 className="text-xl font-semibold">景区审核</h1><p className="my-3 text-sm">补齐省市并通过后，行程页和报价页均可搜索。未审核内容不公开。</p>
    <div className="flex gap-3 my-4">{[["pending", "待审核"], ["approved", "已通过"], ["rejected", "已拒绝"]].map(([value, label]) => <button type="button" key={value} onClick={() => setStatus(value)} aria-pressed={status === value} className={status === value ? "rounded px-3 py-2 bg-[#8b3e2f] text-white" : "rounded px-3 py-2 bg-white"}>{label}</button>)}<button type="button" onClick={load}>刷新</button></div>
    <p role="status">{message}</p>
    {reviews.filter(row => row.keywords.includes("review-status:" + status)).map(row => {
      const norm = (s: string) => s.normalize("NFKC").replace(/\s+/g, "").toLowerCase();
      const matches = row.name.trim() ? existing.filter(x => x.id !== row.id && (norm(x.name).includes(norm(row.name)) || norm(row.name).includes(norm(x.name)))).slice(0, 5) : [];
      return <article key={row.id} className="panel my-4 p-5 border rounded-xl bg-white">
        <p className="text-xs mb-3">{new Date(row.created_at).toLocaleString("zh-CN")}</p>
        {matches.length > 0 && <p className="text-sm text-[#ad5a22] mb-3">可能已有同名景区，请核对：{matches.map(x => x.name + "（" + x.province + x.city + "）").join("、")}</p>}
        <label className="block mb-3">景区名称<input className="block w-full border rounded p-2" maxLength={100} disabled={status !== "pending" || busy} value={row.name} onChange={e => edit(row.id, { name: e.target.value })} /></label>
        <label className="block mb-3">描述<textarea style={{ background: "white", color: "#302a25" }} className="block w-full border rounded p-2" rows={4} maxLength={5000} disabled={status !== "pending" || busy} value={row.description} onChange={e => edit(row.id, { description: e.target.value })} /></label>
        <div className="flex flex-wrap gap-3 mb-4">{(["province", "city"] as const).map(field => <label key={field}>{field === "province" ? "省份" : "城市"}<input className="block border rounded p-2" maxLength={50} disabled={status !== "pending" || busy} value={row[field]} onChange={e => edit(row.id, { [field]: e.target.value })} /></label>)}</div>
        {status === "pending" && <div className="flex gap-3"><button type="button" disabled={busy || !row.name.trim() || !row.description.trim() || !row.province.trim() || !row.city.trim()} className="rounded px-4 py-2 bg-[#54745e] text-white disabled:opacity-50" onClick={() => decide(row, "approve")}>同意并入库</button><button type="button" disabled={busy} className="rounded border px-4 py-2" onClick={() => { if (window.confirm("确认拒绝？")) void decide(row, "reject"); }}>拒绝</button></div>}
      </article>;
    })}
    {!reviews.some(row => row.keywords.includes("review-status:" + status)) && <p className="my-6">暂无此类申请</p>}
  </div>;
}
