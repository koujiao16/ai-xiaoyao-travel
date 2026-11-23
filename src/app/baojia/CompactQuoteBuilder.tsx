"use client";

import Image from "next/image";
import { DEFAULT_TRAVEL_REGION, TRAVEL_REGIONS, resolveTravelRegion, type TravelRegionFilter } from "@/lib/xingcheng/travel-regions";
import { fallbackLodgingLabels } from "@/data/xingcheng/accommodations";
import { ReviewDot } from "@/components/admin/ReviewDot";
import { LodgingSearch } from "@/components/ui/LodgingSearch";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { effectiveQuotePrice, getProjectQuotePrices, isKnownFreeTicket, type QuotePriceItem, type QuotePriceGroup, type QuotePriceMode } from "@/lib/xingcheng/quote-pricing";
import type { LibraryItem } from "@/lib/xingcheng/types";
import { createCustomProject, isCustomProject } from "@/lib/xingcheng/custom-project";
import "./compact-quote.css";
import "./compact-itinerary.css";
import "./quote-controls.css";

type DraftItem = { id: string; name: string; kind: string; province: string; city: string; day: number; quoteKey: string };
type Draft = { details?: Record<number, DayDetails>; tripName?: string; items?: DraftItem[]; lodgings?: Array<{ name: string; day: number }> };
type PriceItem = QuotePriceItem & { id: string; locked: boolean; sourceKey?: string };
type Hotel = { id: string; name: string; roomRate: number; rooms: number; nights: number };
type Meal = { id: string; name: string; price: number; count: number };
type GroupCost = { id: string; name: string; price: number; count: number; mode: QuotePriceMode };
type DayDetails = { meals: string[]; lodging: string };

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const money = new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 2 });
const excludedFromCost = /(机场|接机|送机|接站|送站|高铁)/;
const asNumber = (value: number, fallback = 0) => Number.isFinite(value) ? Math.max(0, value) : fallback;
const vehicleLabel = (item: DraftItem) => {
  const area = (item.province || "").trim().replace(/(?:壮族自治区|回族自治区|维吾尔自治区|自治区|特别行政区|省|市)$/, "");
  return area ? (area === "陕西" ? "西安车" : area + "车") : "";
};

function sectionTotal(items: PriceItem[], travelers: number) {
  return items.reduce((sum, item) => sum + effectiveQuotePrice(item, travelers) * (item.mode === "perGroup" ? 1 : travelers), 0);
}

// Keep the row component stable: declaring it inside the builder remounts
// every input on each keystroke, losing focus while entering multi-digit prices.
const CostRow = ({ title: rowTitle, children, total, travelers }: { title: React.ReactNode; children: React.ReactNode; total: number; travelers: number }) => <section className="compact-row"><h2>{rowTitle}</h2><div className="compact-row-body">{children}</div><strong className="compact-row-total">{money.format(total)}<small>／人 {money.format(total / Math.max(1, travelers))}</small></strong></section>;

export function CompactQuoteBuilder({ library }: { library: LibraryItem[] }) {
  const [selectedRegion, setSelectedRegion] = useState<TravelRegionFilter>(DEFAULT_TRAVEL_REGION);
  const [title, setTitle] = useState("定制行程报价");
  const [travelers, setTravelers] = useState(20);
  const [itinerary, setItinerary] = useState<DraftItem[]>([]);
  const [dayCount, setDayCount] = useState(3);
  const [queries, setQueries] = useState<Record<number, string>>({});
  const [dayDetails, setDayDetails] = useState<Record<number, DayDetails>>({});
  const [remarks, setRemarks] = useState("此报价按实际人数核算，人数不同价格不同。\n以上报价为预估报价，实际成团前请再次核对相关费用。\n建议至少提前 15 天确定行程，以便预订酒店、车辆、导游及相关资源。\n报价不含行程以外的个人消费及自费项目。\n如产生单人入住，须按实际酒店价格补单房差。\n景区、演出、酒店等如遇官方价格政策调整，按实际产生费用为准。\n具体行程安排、酒店、车辆及导游，以最终确认单为准。");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const [copyFallback, setCopyFallback] = useState("");
  const [priceReviewRetry, setPriceReviewRetry] = useState(false);
  const [priceReviewBusy, setPriceReviewBusy] = useState(false);
  const [tickets, setTickets] = useState<PriceItem[]>([]);
  const [extras, setExtras] = useState<PriceItem[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [meals, setMeals] = useState<Meal[]>([{ id: uid(), name: "团餐", price: 0, count: 1 }]);
  const [vehicles, setVehicles] = useState<GroupCost[]>([]);
  const [guides, setGuides] = useState<GroupCost[]>([{ id: uid(), name: "中文导游", price: 0, count: 1, mode: "perGroup" }]);
  const [leaderTitle, setLeaderTitle] = useState("领队费用");
  const [leaderCosts, setLeaderCosts] = useState<GroupCost[]>([]);
  const [misc, setMisc] = useState<GroupCost[]>([
    { id: uid(), name: "水和保险", price: 0, count: 1, mode: "perPerson" },
    { id: uid(), name: "按团杂项", price: 0, count: 1, mode: "perGroup" },
  ]);

  useEffect(() => {
    const raw = localStorage.getItem("ai-xiaoyao-quote-draft");
    if (!raw) return;
    try {
      const draft = JSON.parse(raw) as Draft;
      const sourceItems = (draft.items || []).map((item, index) => ({ ...item, quoteKey: `${item.id}-${item.day}-${index}` }));
      setItinerary(sourceItems);
      const firstRegion = sourceItems.map(item => resolveTravelRegion(item)).find(Boolean);
      if (firstRegion) setSelectedRegion(firstRegion);
      setDayCount(Math.max(1, ...sourceItems.map((item) => item.day), ...Object.keys(draft.details || {}).map(Number)));
      setTitle(draft.tripName ? `${draft.tripName}报价` : "行程报价");
      const prices = sourceItems.filter((item) => isCustomProject(item) || !excludedFromCost.test(item.name)).flatMap((item) => {
        const known = getProjectQuotePrices({ ...item, quotePrices: library.find(x => x.id === item.id)?.quotePrices });
        return known.map((entry) => ({ id: uid(), ...entry, locked: true, sourceKey: item.quoteKey }));
      });
      setTickets(prices.filter((item) => item.group === "ticket"));
      setExtras(prices.filter((item) => item.group === "extra").map(item => ({ ...item, selected: true })));
      const hotelNights = new Map<string, number>();
      (draft.lodgings || []).forEach(({ name }) => hotelNights.set(name, (hotelNights.get(name) || 0) + 1));
      const importedDetails: Record<number, DayDetails> = {};
      (draft.lodgings || []).forEach(({ name, day }) => { importedDetails[day] = { meals: [], lodging: name }; });
      setDayDetails(draft.details || importedDetails);
      setHotels([...hotelNights.entries()].map(([name, nights]) => ({ id: uid(), name, roomRate: 0, rooms: Math.ceil(20 / 2), nights })));
      setVehicles([...new Set(sourceItems.filter((item) => item.kind !== "服务" ).map(vehicleLabel).filter(Boolean))].map((name) => ({ id: uid(), name, price: 0, count: 1, mode: "perGroup" })));
    } catch {
      // The blank version stays usable when a browser draft is incomplete.
    } finally {
      localStorage.removeItem("ai-xiaoyao-quote-draft");
    }
  }, [library]);

  const updatePrice = (set: React.Dispatch<React.SetStateAction<PriceItem[]>>, id: string, patch: Partial<PriceItem>) => set((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));
  const updateHotel = (id: string, patch: Partial<Hotel>) => setHotels((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));
  const updateMeal = (id: string, patch: Partial<Meal>) => setMeals((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));
  const updateGroupCost = (set: React.Dispatch<React.SetStateAction<GroupCost[]>>, id: string, patch: Partial<GroupCost>) => set((items) => items.map((item) => item.id === id ? { ...item, ...patch } : item));

  const addProject = (day: number, candidate: LibraryItem) => {
    const item: DraftItem = {
      id: candidate.id,
      name: candidate.name,
      kind: candidate.kind,
      province: candidate.province || "",
      city: candidate.city || "",
      day,
      quoteKey: uid(),
    };
    setItinerary((current) => [...current, item]);
    setQueries((current) => ({ ...current, [day]: "" }));
    if (isCustomProject(item) || !excludedFromCost.test(item.name)) {
      const charges = getProjectQuotePrices({ ...item, quotePrices: candidate.quotePrices });
      const mapped = charges.map((entry) => ({ id: uid(), ...entry, locked: true, sourceKey: item.quoteKey }));
      setTickets((current) => [...current, ...mapped.filter((entry) => entry.group === "ticket")]);
      setExtras((current) => [...current, ...mapped.filter((entry) => entry.group === "extra").map(entry => ({ ...entry, selected: true }))]);
    }
    if (item.kind !== "服务" && vehicleLabel(item)) {
      const name = vehicleLabel(item);
      setVehicles((current) => current.some((vehicle) => vehicle.name === name) ? current : [...current, { id: uid(), name, price: 0, count: 1, mode: "perGroup" }]);
    }
  };

  const addCustomProject = (day: number) => {
    const candidate = createCustomProject(queries[day] || "");
    if (candidate) addProject(day, candidate);
  };

  const removeProject = (quoteKey: string) => {
    setItinerary((current) => current.filter((item) => item.quoteKey !== quoteKey));
    setTickets((current) => current.filter((item) => item.sourceKey !== quoteKey));
    setExtras((current) => current.filter((item) => item.sourceKey !== quoteKey));
  };

  const suggestionsFor = (day: number) => {
    const query = (queries[day] || "").trim().toLowerCase();
    if (!query) return [];
    return library.filter(item => item.kind === "服务" || resolveTravelRegion(item) === selectedRegion).filter((item) => [item.name, ...item.keywords].some((word) => word.toLowerCase().includes(query))).slice(0, 6);
  };

  const cities = useMemo(() => Array.from(new Set([...library.filter(item => resolveTravelRegion(item) === selectedRegion).map(item => item.city), ...fallbackLodgingLabels.filter(name => resolveTravelRegion({ name }) === selectedRegion)])).filter(Boolean).sort(), [library, selectedRegion]);
  const toggleMeal = (day: number, meal: string) => {
    setDayDetails((current) => {
      const detail = current[day] || { meals: [], lodging: "" };
      const meals = detail.meals.includes(meal) ? detail.meals.filter((value) => value !== meal) : [...detail.meals, meal];
      return { ...current, [day]: { ...detail, meals } };
    });
  };
  const setLodging = (day: number, lodging: string) => {
    setDayDetails((current) => ({ ...current, [day]: { ...(current[day] || { meals: [] }), lodging } }));
  };

  const submitPriceReviews = async () => {
    const items = tickets.filter(ticket => !ticket.pricePending && (
      itinerary.some(item => item.quoteKey === ticket.sourceKey && isCustomProject(item)) ||
      (!ticket.sourceKey && !ticket.locked && ticket.name !== "新增门票" && !library.some(item => item.name === ticket.name))
    )).map(ticket => ({ name: ticket.name, price: ticket.price, mode: ticket.mode }));
    if (!items.length) return;
    setPriceReviewBusy(true);
    try {
      const response = await fetch("/api/attraction-submissions", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ items }), signal: AbortSignal.timeout(15000) });
      const result = await response.json();
      if (!response.ok) throw Error(result.error);
      setPriceReviewRetry(false);
      window.dispatchEvent(new Event("reviews-changed"));
      setMessage(current => current + `；门票提交审核${result.submitted}项，已提交过${result.duplicates}项`);
    } catch {
      setPriceReviewRetry(true); setMessage(current => current + "；门票审核提交未完成，可点击重试");
    } finally { setPriceReviewBusy(false); }
  };
  const exportQuote = async () => {
    setExporting(true);
    setMessage("");
    try {
      const { AlignmentType, BorderStyle, Document, Packer, Paragraph, Table, TableCell, TableRow, TextRun, WidthType } = await import("docx");
      const border = { style: BorderStyle.SINGLE, size: 8, color: "D9D0C7" };
      const cell = (text: string, width: number, bold = false) => new TableCell({ width: { size: width, type: WidthType.DXA }, borders: { top: border, bottom: border, left: border, right: border }, margins: { top: 110, bottom: 110, left: 130, right: 130 }, children: [new Paragraph({ children: [new TextRun({ text: text || "-", bold })] })] });
      const itineraryRows = Array.from({ length: dayCount }, (_, index) => {
        const day = index + 1;
        const detail = dayDetails[day] || { meals: [], lodging: "" };
        return new TableRow({ children: [cell(`D${day}`, 850, true), cell(itinerary.filter((item) => item.day === day).map((item) => item.name).join(" · "), 5100), cell(["早餐","中餐","晚餐"].filter(m => detail.meals.includes(m)).map(m => m[0]).join("、"), 1800), cell(detail.lodging, 2250)] });
      });
      const perPersonText = (amount: number) => `${money.format(amount / Math.max(1, travelers))}/人`;
      const selected = (items: PriceItem[]) => items.filter((item) => !isKnownFreeTicket(item)).map((item) => item.pricePending ? `${item.name} 待填价` : `${item.name} ${effectiveQuotePrice(item, travelers)}${item.mode === "perGroup" ? "/团" : "/人"}`).join("  ·  ");
      const costs: Array<[string, string, string]> = [
        ["门票", selected(tickets), perPersonText(totals.ticket)],
        ["讲解及配套", selected(extras.map(item => ({ ...item, selected: true }))), perPersonText(totals.extra)],
        ["住宿", hotels.map((item) => `${item.name} ${item.roomRate}/间/晚 × ${item.rooms}间 × ${item.nights}晚`).join("  ·  "), perPersonText(totals.hotel)],
        ["餐", meals.map((item) => `${item.name} ${item.price}/人 × ${item.count}餐`).join("  ·  "), perPersonText(totals.meal)],
        ["用车", vehicles.map((item) => `${item.name} ${item.price}/团 × ${item.count}`).join("  ·  "), perPersonText(totals.vehicle)],
        ["导游", guides.map((item) => `${item.name} ${item.price}${item.mode === "perGroup" ? "/团" : "/人"} × ${item.count}`).join("  ·  "), perPersonText(totals.guide)],
        ["杂项", misc.map((item) => `${item.name} ${item.price}${item.mode === "perGroup" ? "/团" : "/人"} × ${item.count}`).join("  ·  "), perPersonText(totals.other)],
        [leaderTitle || "领队费用", leaderCosts.map(item => `${item.name} ${item.price}${item.mode === "perGroup" ? "/团" : "/人"} × ${item.count}`).join(" · "), perPersonText(totals.leader)],
        ["共计", `${travelers} 人核算`, `${money.format(totals.perPerson)}/人`],
      ];
      const doc = new Document({ sections: [{ properties: { page: { margin: { top: 850, bottom: 850, left: 850, right: 850 } } }, children: [
        new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 200 }, children: [new TextRun({ text: title || "定制行程报价", bold: true, size: 34 })] }),
        new Paragraph({ spacing: { after: 120 }, children: [new TextRun({ text: `核算人数：${travelers} 人`, color: "625A52" })] }),
        new Paragraph({ spacing: { after: 90 }, children: [new TextRun({ text: "简版行程", bold: true, color: "8B3E2F" })] }),
        new Table({ width: { size: 10000, type: WidthType.DXA }, rows: [new TableRow({ children: [cell("日期", 850, true), cell("行程安排", 5100, true), cell("用餐", 1800, true), cell("酒店", 2250, true)] }), ...itineraryRows] }),
        new Paragraph({ spacing: { before: 220, after: 90 }, children: [new TextRun({ text: "费用核算", bold: true, color: "8B3E2F" })] }),
        new Table({ width: { size: 10000, type: WidthType.DXA }, rows: [new TableRow({ children: [cell("项目", 1500, true), cell("核算", 6500, true), cell("人均", 2000, true)] }), ...costs.map(([name, detail, amount]) => new TableRow({ children: [cell(name, 1500, name === "共计"), cell(detail, 6500), cell(amount, 2000, name === "共计")] }))] }),
        new Paragraph({ spacing: { before: 220, after: 80 }, children: [new TextRun({ text: "备注", bold: true, color: "8B3E2F" })] }),
        ...remarks.split("\n").map((line) => new Paragraph({ spacing: { after: 70 }, children: [new TextRun({ text: line || " " })] })),
      ] }] });
      const blob = await Packer.toBlob(doc);
      const url = URL.createObjectURL(blob);
      const anchor = document.createElement("a");
      anchor.href = url;
      anchor.download = `${(title || "报价").replace(/[\\/:*?\"<>|]/g, "-")}.docx`;
      anchor.click();
      URL.revokeObjectURL(url);
      setMessage("报价 Word 已生成");
      await submitPriceReviews();
    } catch {
      setMessage("报价 Word 生成失败，请重试");
    } finally {
      setExporting(false);
    }
  };

  const copySimpleQuote = async () => {
    setMessage("");
    setCopyFallback("");
      const names = (items: PriceItem[]) => items.filter(item => !isKnownFreeTicket(item)).map(item => item.name).join("、") || "无特别列明项目";
      const noticeLines = remarks.split("\n").filter(Boolean);
      const simpleRows: Array<[string, string]> = [
        ["门票", names(tickets)],
        ["讲解及配套", names(extras.map(item => ({ ...item, selected: true })))],
        ["住宿", hotels.map(item => `${item.name || "参考酒店"}（${item.nights}晚）`).join("、") || "按最终确认安排"],
        ["餐食", meals.map(item => item.name).join("、") || "不含，客人自理"],
        ["用车", vehicles.map(item => item.name).join("、") || "按行程安排"],
        ["导游", guides.map(item => item.name).join("、") || "按行程安排"],
        ["杂项", misc.map(item => item.name).join("、") || "按报价备注执行"],
        ...(leaderCosts.length ? [[leaderTitle || "领队费用", leaderCosts.map(item => item.name).join("、")] as [string, string]] : []),
      ];

    const today = new Intl.DateTimeFormat("zh-CN", { timeZone: "Asia/Shanghai", year: "2-digit", month: "numeric", day: "numeric" }).format(new Date()).split("/");
    const itineraryText = Array.from({ length: dayCount }, (_, index) => {
      const day = index + 1;
      const detail = dayDetails[day] || { meals: [], lodging: "" };
      const route = itinerary.filter(item => item.day === day).map(item => item.name).join(" · ") || "待填写";
      return `D${day}　${route}\n用餐：${detail.meals.length ? detail.meals.map(m => m[0]).join("、") : "不含"}　住宿：${detail.lodging || "-"}`;
    });
    const text = [
      `${today[0]}.${today[1]}月${today[2]}日预估报价，此报价不含法定节假日。确定前请二次确认价格。`,
      title || "定制行程报价", "", "简版行程", ...itineraryText, "",
      `按${travelers}人核算`,
      `单地接：${money.format(totals.perPerson)}／人`,
      `团队总费用：${money.format(totals.total)}／团`, "",
      ...simpleRows.map(([label, value]) => `${label}：${value}`),
      "", "服务标准及备注", ...noticeLines,
    ].join("\n");
    try {
      await navigator.clipboard.writeText(text);
      setMessage("简版报价已复制，可按 Command＋V / Ctrl＋V 粘贴");
      await submitPriceReviews();
    } catch {
      setCopyFallback(text);
      setMessage("浏览器未允许自动复制，请选中下方文字后按 Command＋C / Ctrl＋C");
      await submitPriceReviews();
    }
  };

  const totals = useMemo(() => {
    const ticket = sectionTotal(tickets, travelers);
    const extra = sectionTotal(extras.map(item => ({ ...item, selected: true })), travelers);
    const hotel = hotels.reduce((sum, item) => sum + item.roomRate * item.rooms * item.nights, 0);
    const meal = meals.reduce((sum, item) => sum + item.price * item.count * travelers, 0);
    const groupTotal = (items: GroupCost[]) => items.reduce((sum, item) => sum + item.price * item.count * (item.mode === "perPerson" ? travelers : 1), 0);
    const vehicle = groupTotal(vehicles);
    const guide = groupTotal(guides);
    const other = groupTotal(misc);
    const leader = groupTotal(leaderCosts);
    const total = ticket + extra + hotel + meal + vehicle + guide + other + leader;
    return { ticket, extra, hotel, meal, vehicle, guide, other, leader, total, perPerson: total / Math.max(1, travelers) };
  }, [tickets, extras, hotels, meals, vehicles, guides, misc, leaderCosts, travelers]);

  const pricePills = (items: PriceItem[], set: React.Dispatch<React.SetStateAction<PriceItem[]>>, group: QuotePriceGroup) => <>
    {items.map((item) => <div className="price-pill" key={item.id}>
      <input aria-label="项目名称" tabIndex={item.locked ? -1 : undefined} readOnly={item.locked} value={item.name} onChange={(event) => updatePrice(set, item.id, { name: event.target.value })} />
      <input aria-label="价格" type="number" min="0" value={item.pricePending ? "" : item.price} placeholder="待填价" onChange={(event) => updatePrice(set, item.id, { price: asNumber(Number(event.target.value)), pricePending: event.target.value === "" })} onBlur={(event) => {
        if (item.group === "ticket" && event.target.value.trim() !== "" && Number(event.target.value) === 0) {
          set((current) => current.filter((line) => line.id !== item.id));
          setMessage(`${item.name}门票已确认0元，不列入门票；行程与配套保留。`);
        }
      }} />
      <button type="button" className="billing-mode" title="点击切换按人或按团计费" onClick={() => updatePrice(set, item.id, { mode: item.mode === "perGroup" ? "perPerson" : "perGroup", includedPeople: undefined, additionalPersonPrice: undefined })}>{item.mode === "perGroup" ? "／团" : "／人"}</button>
      {item.includedPeople ? <span>含{item.includedPeople}人，超员＋{item.additionalPersonPrice}/人；现{effectiveQuotePrice(item, travelers)}元</span> : null}
      <button className="remove" type="button" aria-label={`删除费用：${item.name}`} onClick={() => set((current) => current.filter((line) => line.id !== item.id))}>×</button>
    </div>)}
    <button className="add-inline" type="button" onClick={() => set((current) => [...current, { id: uid(), name: group === "ticket" ? "新增门票" : "新增配套", price: 0, pricePending: true, mode: "perPerson", group, selected: true, locked: false }])}>＋</button>
  </>;
  const groupFields = (items: GroupCost[], set: React.Dispatch<React.SetStateAction<GroupCost[]>>, defaultName: string, switchable = true) => <>{items.map((item) => <div className="cost-inline" key={item.id}><input value={item.name} onChange={(event) => updateGroupCost(set, item.id, { name: event.target.value })} /><input type="number" min="0" value={item.price || ""} placeholder="0" onChange={(event) => updateGroupCost(set, item.id, { price: asNumber(Number(event.target.value)) })} />{switchable ? <button type="button" className="billing-mode" title="点击切换按人或按团计费" onClick={() => updateGroupCost(set, item.id, { mode: item.mode === "perGroup" ? "perPerson" : "perGroup" })}>{item.mode === "perGroup" ? "／团" : "／人"}</button> : <span>／团</span>}<input className="count" type="number" min="1" value={item.count} onChange={(event) => updateGroupCost(set, item.id, { count: Math.max(1, asNumber(Number(event.target.value), 1)) })} /><span>{item.mode === "perGroup" ? "份" : "项"}</span><button type="button" className="remove" onClick={() => set((current) => current.filter((line) => line.id !== item.id))}>×</button></div>)}<button className="add-inline" type="button" onClick={() => set((current) => [...current, { id: uid(), name: defaultName, price: 0, count: 1, mode: "perGroup" }])}>＋</button></>;

  return <main className="compact-quote">
    <header className="compact-topbar"><Link href="/xingcheng" className="compact-brand"><Image src="/images/branding/ai-xiaoyao-mark.png" alt="爱逍遥" width={40} height={40} /><span><strong>爱逍遥报价工具</strong><small>单团报价核算</small></span></Link><div style={{ display: "flex", alignItems: "center", gap: 12 }}><Link href="/xingcheng">返回行程生成器</Link><Link href="/admin" className="quote-admin-entry">管理后台<ReviewDot /></Link></div></header>
    <section className="itinerary-summary">
      <div><span>简版行程</span><input className="itinerary-title" value={title} onChange={(event) => setTitle(event.target.value)} /><label className="day-count">天数<input type="number" min="1" max="15" value={dayCount} onChange={(event) => setDayCount(Math.max(1, Math.min(15, asNumber(Number(event.target.value), 1))))} /></label><label className="day-count">核算人数<input type="number" min="1" value={travelers} onChange={(event) => setTravelers(Math.max(1, asNumber(Number(event.target.value), 1)))} /></label></div>
      <nav className="quote-region-picker" aria-label="出行区域">{TRAVEL_REGIONS.map(region => <button type="button" key={region.id} aria-pressed={selectedRegion === region.id} onClick={() => setSelectedRegion(region.id)}>{region.id}</button>)}</nav>
      <p className="quote-help">先输入景区名称，再选择搜索结果；未收录的项目，输入名称后点击「＋自定义项目」。</p>
      {Array.from({ length: dayCount }, (_, index) => index + 1).map((day) => {
        const suggestions = suggestionsFor(day);
        return <div className="itinerary-day" key={day}><b>D{day}</b><div className="itinerary-editor"><div className="itinerary-tags">{itinerary.filter((item) => item.day === day).map((item) => <span key={item.quoteKey}>{item.name}<button type="button" onClick={() => removeProject(item.quoteKey)}>×</button></span>)}</div><input value={queries[day] || ""} aria-label={`D${day}项目名称或关键词`} placeholder="输入关键词，或填写自定义项目名称" onChange={(event) => setQueries((current) => ({ ...current, [day]: event.target.value }))} /><button className="custom-project-add" type="button" disabled={!(queries[day] || "").trim()} onClick={() => addCustomProject(day)}>＋自定义项目</button>{suggestions.length ? <div className="itinerary-suggestions">{suggestions.map((item) => <button type="button" key={item.id} onClick={() => addProject(day, item)}>{item.name}</button>)}</div> : null}</div><section className="daily-options">{["早餐","中餐","晚餐"].map(m => <button type="button" key={m} aria-pressed={dayDetails[day]?.meals.includes(m) || false} onClick={() => toggleMeal(day,m)}>{m[0]}</button>)}<label>住宿 <LodgingSearch value={dayDetails[day]?.lodging || ""} options={cities} onChange={value => setLodging(day, value)} /></label></section></div>;
      })}
    </section>
    <section className="quote-sheet">
      <CostRow travelers={travelers} title="门票" total={totals.ticket}><div className="pills">{pricePills(tickets, setTickets, "ticket")}</div></CostRow>
      <CostRow travelers={travelers} title="讲解及配套" total={totals.extra}><div className="cost-help-wrap"><div className="pills">{pricePills(extras, setExtras, "extra")}</div></div></CostRow>
      <CostRow travelers={travelers} title="住宿" total={totals.hotel}><div className="multi-lines">{hotels.map((hotel) => <div className="hotel-inline" key={hotel.id}><input value={hotel.name} placeholder="酒店名称" onChange={(event) => updateHotel(hotel.id, { name: event.target.value })} /><input type="number" min="0" value={hotel.roomRate || ""} placeholder="房价" onChange={(event) => updateHotel(hotel.id, { roomRate: asNumber(Number(event.target.value)) })} /><span>／间／晚 ×</span><input type="number" min="1" value={hotel.rooms} onChange={(event) => updateHotel(hotel.id, { rooms: Math.max(1, asNumber(Number(event.target.value), 1)) })} /><span>间 ×</span><input type="number" min="1" value={hotel.nights} onChange={(event) => updateHotel(hotel.id, { nights: Math.max(1, asNumber(Number(event.target.value), 1)) })} /><span>晚</span><button className="remove" type="button" onClick={() => setHotels((current) => current.filter((item) => item.id !== hotel.id))}>×</button></div>)}<button className="add-inline" type="button" onClick={() => setHotels((current) => [...current, { id: uid(), name: "", roomRate: 0, rooms: Math.ceil(travelers / 2), nights: 1 }])}>＋</button></div></CostRow>
      <CostRow travelers={travelers} title="餐" total={totals.meal}><div className="multi-lines">{meals.map((meal) => <div className="meal-inline" key={meal.id}><input value={meal.name} onChange={(event) => updateMeal(meal.id, { name: event.target.value })} /><input type="number" min="0" value={meal.price || ""} placeholder="餐标" onChange={(event) => updateMeal(meal.id, { price: asNumber(Number(event.target.value)) })} /><span>／人 ×</span><input type="number" min="1" value={meal.count} onChange={(event) => updateMeal(meal.id, { count: Math.max(1, asNumber(Number(event.target.value), 1)) })} /><span>餐</span><button className="remove" type="button" onClick={() => setMeals((current) => current.filter((item) => item.id !== meal.id))}>×</button></div>)}<button className="add-inline" type="button" onClick={() => setMeals((current) => [...current, { id: uid(), name: "特色餐", price: 0, count: 1 }])}>＋</button></div></CostRow>
      <CostRow travelers={travelers} title="用车" total={totals.vehicle}><div className="multi-lines">{groupFields(vehicles, setVehicles, "新增用车", false)}</div></CostRow>
      <CostRow travelers={travelers} title="导游" total={totals.guide}><div className="multi-lines">{groupFields(guides, setGuides, "导游服务", false)}</div></CostRow>
      <CostRow travelers={travelers} title="杂项" total={totals.other}><div className="cost-help-wrap"><div className="multi-lines">{groupFields(misc, setMisc, "新增杂项")}</div></div></CostRow>
      <CostRow travelers={travelers} title={<input className="cost-category-title" aria-label="费用栏目名称" value={leaderTitle} onChange={event => setLeaderTitle(event.target.value)} />} total={totals.leader}><div className="cost-help-wrap"><div className="multi-lines">{groupFields(leaderCosts, setLeaderCosts, "领队费用")}</div></div></CostRow>
    </section>
    <section className="itinerary-summary"><label>报价备注<textarea rows={8} style={{display:"block",width:"100%",padding:12}} value={remarks} onChange={e=>setRemarks(e.target.value)}/></label></section>
    {priceReviewRetry && <section className="itinerary-summary"><button type="button" disabled={priceReviewBusy} onClick={submitPriceReviews}>{priceReviewBusy ? "正在提交…" : "重试提交门票审核"}</button></section>}
    {copyFallback && <section className="itinerary-summary"><label>简版报价（点击文字框后全选复制）<textarea aria-label="待复制的简版报价" readOnly rows={12} style={{ display: "block", width: "100%", padding: 12, background: "#fffdf9", color: "#302a25" }} value={copyFallback} onFocus={event => event.target.select()} /></label><button type="button" onClick={() => setCopyFallback("")}>关闭</button></section>}
    <footer className="quote-result"><div><strong>{title || "未命名报价"}</strong><span>{travelers} 人核算</span></div><div className="quote-export-actions"><button type="button" disabled={exporting} onClick={exportQuote}>详细报价 Word</button><button type="button" disabled={exporting} onClick={copySimpleQuote}>复制简版报价</button></div><small role="status">{message}</small><div><span>团费合计</span><strong>{money.format(totals.total)}</strong></div><div className="highlight"><span>人均报价</span><strong>{money.format(totals.perPerson)}</strong></div></footer>
  </main>;
}
