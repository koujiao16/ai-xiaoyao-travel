"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { quotePriceCatalog, type QuotePriceGroup, type QuotePriceMode } from "@/lib/xingcheng/quote-pricing";
import type { LibraryItem } from "@/lib/xingcheng/types";
import "./compact-quote.css";
import "./compact-itinerary.css";
import "./quote-controls.css";

type DraftItem = { id: string; name: string; kind: string; province: string; city: string; day: number; quoteKey: string };
type Draft = { details?: Record<number, DayDetails>; tripName?: string; items?: DraftItem[]; lodgings?: Array<{ name: string; day: number }> };
type PriceItem = { id: string; name: string; price: number; mode: QuotePriceMode; group: QuotePriceGroup; selected: boolean; locked: boolean; sourceKey?: string };
type Hotel = { id: string; name: string; roomRate: number; rooms: number; nights: number };
type Meal = { id: string; name: string; price: number; count: number };
type GroupCost = { id: string; name: string; price: number; count: number; mode: QuotePriceMode };
type DayDetails = { meals: string[]; lodging: string };

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
const money = new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 2 });
const excludedFromCost = /(机场|接机|送机|接站|送站|高铁)/;
const asNumber = (value: number, fallback = 0) => Number.isFinite(value) ? Math.max(0, value) : fallback;
const vehicleLabel = (item: DraftItem) => item.province === "河南" ? "河南用车" : `${item.city || item.province || "当地"}用车`;

function sectionTotal(items: PriceItem[], travelers: number) {
  return items.filter((item) => item.selected).reduce((sum, item) => sum + item.price * (item.mode === "perGroup" ? 1 : travelers), 0);
}

export function CompactQuoteBuilder({ library }: { library: LibraryItem[] }) {
  const [title, setTitle] = useState("定制行程报价");
  const [travelers, setTravelers] = useState(20);
  const [itinerary, setItinerary] = useState<DraftItem[]>([]);
  const [dayCount, setDayCount] = useState(3);
  const [queries, setQueries] = useState<Record<number, string>>({});
  const [dayDetails, setDayDetails] = useState<Record<number, DayDetails>>({});
  const [lodgingQueries, setLodgingQueries] = useState<Record<number, string>>({});
  const [remarks, setRemarks] = useState("此报价按实际人数核算，人数不同价格不同。\n\n以上报价为预估报价，实际成团前请再次核对相关费用。\n\n建议至少提前 15 天确定行程，以便预订酒店、车辆、导游及相关资源。\n\n报价不含行程以外的个人消费及自费项目。\n\n如产生单人入住，须按实际酒店价格补单房差。\n\n景区、演出、酒店等如遇官方价格政策调整，按实际产生费用为准。\n\n具体行程安排、酒店、车辆及导游，以最终确认单为准。");
  const [exporting, setExporting] = useState(false);
  const [message, setMessage] = useState("");
  const [tickets, setTickets] = useState<PriceItem[]>([]);
  const [extras, setExtras] = useState<PriceItem[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [meals, setMeals] = useState<Meal[]>([{ id: uid(), name: "团餐", price: 0, count: 1 }]);
  const [vehicles, setVehicles] = useState<GroupCost[]>([]);
  const [guides, setGuides] = useState<GroupCost[]>([{ id: uid(), name: "中文导游", price: 0, count: 1, mode: "perGroup" }]);
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
      setDayCount(Math.max(1, ...sourceItems.map((item) => item.day), ...Object.keys(draft.details || {}).map(Number)));
      setTitle(draft.tripName ? `${draft.tripName}报价` : "行程报价");
      const prices = sourceItems.filter((item) => !excludedFromCost.test(item.name)).flatMap((item) => {
        const known = quotePriceCatalog[item.name] || [{ name: item.name, price: 0, group: "ticket" as const, mode: "perPerson" as const, selected: true }];
        return known.map((entry) => ({ id: uid(), ...entry, locked: true, sourceKey: item.quoteKey }));
      });
      setTickets(prices.filter((item) => item.group === "ticket"));
      setExtras(prices.filter((item) => item.group === "extra"));
      const hotelNights = new Map<string, number>();
      (draft.lodgings || []).forEach(({ name }) => hotelNights.set(name, (hotelNights.get(name) || 0) + 1));
      const importedDetails: Record<number, DayDetails> = {};
      (draft.lodgings || []).forEach(({ name, day }) => { importedDetails[day] = { meals: [], lodging: name }; });
      setDayDetails(draft.details || importedDetails);
      setHotels([...hotelNights.entries()].map(([name, nights]) => ({ id: uid(), name, roomRate: 0, rooms: Math.ceil(20 / 2), nights })));
      setVehicles([...new Set(sourceItems.filter((item) => item.kind !== "服务" && item.city).map(vehicleLabel))].map((name) => ({ id: uid(), name, price: 0, count: 1, mode: "perGroup" })));
    } catch {
      // The blank version stays usable when a browser draft is incomplete.
    } finally {
      localStorage.removeItem("ai-xiaoyao-quote-draft");
    }
  }, []);

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
    if (!excludedFromCost.test(item.name)) {
      const charges = quotePriceCatalog[item.name] || [{ name: item.name, price: 0, group: "ticket" as const, mode: "perPerson" as const, selected: true }];
      const mapped = charges.map((entry) => ({ id: uid(), ...entry, locked: true, sourceKey: item.quoteKey }));
      setTickets((current) => [...current, ...mapped.filter((entry) => entry.group === "ticket")]);
      setExtras((current) => [...current, ...mapped.filter((entry) => entry.group === "extra")]);
    }
    if (item.kind !== "服务" && item.city) {
      const name = vehicleLabel(item);
      setVehicles((current) => current.some((vehicle) => vehicle.name === name) ? current : [...current, { id: uid(), name, price: 0, count: 1, mode: "perGroup" }]);
    }
  };

  const removeProject = (quoteKey: string) => {
    setItinerary((current) => current.filter((item) => item.quoteKey !== quoteKey));
    setTickets((current) => current.filter((item) => item.sourceKey !== quoteKey));
    setExtras((current) => current.filter((item) => item.sourceKey !== quoteKey));
  };

  const suggestionsFor = (day: number) => {
    const query = (queries[day] || "").trim().toLowerCase();
    if (!query) return [];
    return library.filter((item) => [item.name, ...item.keywords].some((word) => word.toLowerCase().includes(query))).slice(0, 6);
  };

  const cities = useMemo(() => Array.from(new Set(library.map((item) => item.city).filter(Boolean))).sort(), [library]);
  const toggleMeal = (day: number, meal: string) => {
    setDayDetails((current) => {
      const detail = current[day] || { meals: [], lodging: "" };
      const meals = detail.meals.includes(meal) ? detail.meals.filter((value) => value !== meal) : [...detail.meals, meal];
      return { ...current, [day]: { ...detail, meals } };
    });
  };
  const setLodging = (day: number, lodging: string) => {
    setDayDetails((current) => ({ ...current, [day]: { ...(current[day] || { meals: [] }), lodging } }));
    setLodgingQueries((current) => ({ ...current, [day]: "" }));
  };
  const lodgingSuggestions = (day: number) => {
    const query = (lodgingQueries[day] || "").trim().toLowerCase();
    if (!query) return [];
    return cities.filter((city) => city?.toLowerCase().includes(query)).slice(0, 6);
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
        return new TableRow({ children: [cell(`D${day}`, 850, true), cell(itinerary.filter((item) => item.day === day).map((item) => item.name).join(" · "), 5100), cell(detail.meals.join("、"), 1800), cell(detail.lodging, 2250)] });
      });
      const perPersonText = (amount: number) => `${money.format(amount / Math.max(1, travelers))}/人`;
      const selected = (items: PriceItem[]) => items.filter((item) => item.selected).map((item) => `${item.name} ${item.price}${item.mode === "perGroup" ? "/团" : "/人"}`).join("  ·  ");
      const costs: Array<[string, string, string]> = [
        ["门票", selected(tickets), perPersonText(totals.ticket)],
        ["讲解及配套", selected(extras), perPersonText(totals.extra)],
        ["住宿", hotels.map((item) => `${item.name} ${item.roomRate}/间/晚 × ${item.rooms}间 × ${item.nights}晚`).join("  ·  "), perPersonText(totals.hotel)],
        ["餐", meals.map((item) => `${item.name} ${item.price}/人 × ${item.count}餐`).join("  ·  "), perPersonText(totals.meal)],
        ["用车", vehicles.map((item) => `${item.name} ${item.price}/团 × ${item.count}`).join("  ·  "), perPersonText(totals.vehicle)],
        ["导游", guides.map((item) => `${item.name} ${item.price}${item.mode === "perGroup" ? "/团" : "/人"} × ${item.count}`).join("  ·  "), perPersonText(totals.guide)],
        ["杂项", misc.map((item) => `${item.name} ${item.price}${item.mode === "perGroup" ? "/团" : "/人"} × ${item.count}`).join("  ·  "), perPersonText(totals.other)],
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
    } catch {
      setMessage("报价 Word 生成失败，请重试");
    } finally {
      setExporting(false);
    }
  };

  const totals = useMemo(() => {
    const ticket = sectionTotal(tickets, travelers);
    const extra = sectionTotal(extras, travelers);
    const hotel = hotels.reduce((sum, item) => sum + item.roomRate * item.rooms * item.nights, 0);
    const meal = meals.reduce((sum, item) => sum + item.price * item.count * travelers, 0);
    const groupTotal = (items: GroupCost[]) => items.reduce((sum, item) => sum + item.price * item.count * (item.mode === "perPerson" ? travelers : 1), 0);
    const vehicle = groupTotal(vehicles);
    const guide = groupTotal(guides);
    const other = groupTotal(misc);
    const total = ticket + extra + hotel + meal + vehicle + guide + other;
    return { ticket, extra, hotel, meal, vehicle, guide, other, total, perPerson: total / Math.max(1, travelers) };
  }, [tickets, extras, hotels, meals, vehicles, guides, misc, travelers]);

  const CostRow = ({ title: rowTitle, children, total }: { title: string; children: React.ReactNode; total: number }) => <section className="compact-row"><h2>{rowTitle}</h2><div className="compact-row-body">{children}</div><strong className="compact-row-total">{money.format(total)}<small>／人 {money.format(total / Math.max(1, travelers))}</small></strong></section>;
  const pricePills = (items: PriceItem[], set: React.Dispatch<React.SetStateAction<PriceItem[]>>, group: QuotePriceGroup) => <>{items.map((item) => <div className={`price-pill ${item.selected ? "selected" : ""}`} key={item.id}><button type="button" onClick={() => updatePrice(set, item.id, { selected: !item.selected })}>{item.selected ? "✓" : ""}</button><input aria-label="项目名称" readOnly={item.locked} value={item.name} onChange={(event) => updatePrice(set, item.id, { name: event.target.value })} /><input aria-label="价格" type="number" min="0" value={item.price || ""} placeholder="0" onChange={(event) => updatePrice(set, item.id, { price: asNumber(Number(event.target.value)) })} /><span>{item.mode === "perGroup" ? "／团" : "／人"}</span><button className="remove" type="button" onClick={() => set((current) => current.filter((line) => line.id !== item.id))}>×</button></div>)}<button className="add-inline" type="button" onClick={() => set((current) => [...current, { id: uid(), name: group === "ticket" ? "新增门票" : "新增配套", price: 0, mode: "perPerson", group, selected: true, locked: false }])}>＋</button></>;
  const groupFields = (items: GroupCost[], set: React.Dispatch<React.SetStateAction<GroupCost[]>>, defaultName: string) => <>{items.map((item) => <div className="cost-inline" key={item.id}><input value={item.name} onChange={(event) => updateGroupCost(set, item.id, { name: event.target.value })} /><input type="number" min="0" value={item.price || ""} placeholder="0" onChange={(event) => updateGroupCost(set, item.id, { price: asNumber(Number(event.target.value)) })} /><span>{item.mode === "perGroup" ? "／团" : "／人"}</span><input className="count" type="number" min="1" value={item.count} onChange={(event) => updateGroupCost(set, item.id, { count: Math.max(1, asNumber(Number(event.target.value), 1)) })} /><span>{item.mode === "perGroup" ? "份" : "项"}</span><button type="button" className="remove" onClick={() => set((current) => current.filter((line) => line.id !== item.id))}>×</button></div>)}<button className="add-inline" type="button" onClick={() => set((current) => [...current, { id: uid(), name: defaultName, price: 0, count: 1, mode: "perGroup" }])}>＋</button></>;

  return <main className="compact-quote">
    <header className="compact-topbar"><Link href="/xingcheng" className="compact-brand"><Image src="/images/branding/ai-xiaoyao-mark.png" alt="爱逍遥" width={40} height={40} /><span><strong>爱逍遥报价工具</strong><small>单团报价核算</small></span></Link><Link href="/xingcheng">返回行程生成器</Link></header>
    <section className="itinerary-summary">
      <div><span>简版行程</span><input className="itinerary-title" value={title} onChange={(event) => setTitle(event.target.value)} /><label className="day-count">天数<input type="number" min="1" max="15" value={dayCount} onChange={(event) => setDayCount(Math.max(1, Math.min(15, asNumber(Number(event.target.value), 1))))} /></label><label className="day-count">核算人数<input type="number" min="1" value={travelers} onChange={(event) => setTravelers(Math.max(1, asNumber(Number(event.target.value), 1)))} /></label></div>
      {Array.from({ length: dayCount }, (_, index) => index + 1).map((day) => {
        const suggestions = suggestionsFor(day);
        return <div className="itinerary-day" key={day}><b>D{day}</b><div className="itinerary-editor"><div className="itinerary-tags">{itinerary.filter((item) => item.day === day).map((item) => <span key={item.quoteKey}>{item.name}<button type="button" onClick={() => removeProject(item.quoteKey)}>×</button></span>)}</div><input value={queries[day] || ""} placeholder="输入景区或服务关键词" onChange={(event) => setQueries((current) => ({ ...current, [day]: event.target.value }))} />{suggestions.length ? <div className="itinerary-suggestions">{suggestions.map((item) => <button type="button" key={item.id} onClick={() => addProject(day, item)}>{item.name}</button>)}</div> : null}</div><section className="daily-options">{["早餐","中餐","晚餐"].map(m => <button type="button" key={m} aria-pressed={dayDetails[day]?.meals.includes(m) || false} onClick={() => toggleMeal(day,m)}>{m}</button>)}<label>住宿 <input list={`cities-${day}`} placeholder="城市或酒店" value={dayDetails[day]?.lodging || ""} onChange={e => { setLodging(day,e.target.value); setLodgingQueries(q => ({...q,[day]:e.target.value})); }} /></label><datalist id={`cities-${day}`}>{(lodgingQueries[day] ? lodgingSuggestions(day) : cities).map(c => <option key={c} value={c}/>)}</datalist></section></div>;
      })}
    </section>
    <section className="quote-sheet">
      <CostRow title="门票" total={totals.ticket}><div className="pills">{pricePills(tickets, setTickets, "ticket")}</div></CostRow>
      <CostRow title="讲解及配套" total={totals.extra}><div className="pills">{pricePills(extras, setExtras, "extra")}</div></CostRow>
      <CostRow title="住宿" total={totals.hotel}><div className="multi-lines">{hotels.map((hotel) => <div className="hotel-inline" key={hotel.id}><input value={hotel.name} placeholder="酒店名称" onChange={(event) => updateHotel(hotel.id, { name: event.target.value })} /><input type="number" min="0" value={hotel.roomRate || ""} placeholder="房价" onChange={(event) => updateHotel(hotel.id, { roomRate: asNumber(Number(event.target.value)) })} /><span>／间／晚 ×</span><input type="number" min="1" value={hotel.rooms} onChange={(event) => updateHotel(hotel.id, { rooms: Math.max(1, asNumber(Number(event.target.value), 1)) })} /><span>间 ×</span><input type="number" min="1" value={hotel.nights} onChange={(event) => updateHotel(hotel.id, { nights: Math.max(1, asNumber(Number(event.target.value), 1)) })} /><span>晚</span><button className="remove" type="button" onClick={() => setHotels((current) => current.filter((item) => item.id !== hotel.id))}>×</button></div>)}<button className="add-inline" type="button" onClick={() => setHotels((current) => [...current, { id: uid(), name: "", roomRate: 0, rooms: Math.ceil(travelers / 2), nights: 1 }])}>＋</button></div></CostRow>
      <CostRow title="餐" total={totals.meal}><div className="multi-lines">{meals.map((meal) => <div className="meal-inline" key={meal.id}><input value={meal.name} onChange={(event) => updateMeal(meal.id, { name: event.target.value })} /><input type="number" min="0" value={meal.price || ""} placeholder="餐标" onChange={(event) => updateMeal(meal.id, { price: asNumber(Number(event.target.value)) })} /><span>／人 ×</span><input type="number" min="1" value={meal.count} onChange={(event) => updateMeal(meal.id, { count: Math.max(1, asNumber(Number(event.target.value), 1)) })} /><span>餐</span><button className="remove" type="button" onClick={() => setMeals((current) => current.filter((item) => item.id !== meal.id))}>×</button></div>)}<button className="add-inline" type="button" onClick={() => setMeals((current) => [...current, { id: uid(), name: "特色餐", price: 0, count: 1 }])}>＋</button></div></CostRow>
      <CostRow title="用车" total={totals.vehicle}><div className="multi-lines">{groupFields(vehicles, setVehicles, "新增用车")}</div></CostRow>
      <CostRow title="导游" total={totals.guide}><div className="multi-lines">{groupFields(guides, setGuides, "导游服务")}</div></CostRow>
      <CostRow title="杂项" total={totals.other}><div className="multi-lines">{groupFields(misc, setMisc, "新增杂项")}</div></CostRow>
    </section>
    <section className="itinerary-summary"><label>报价备注<textarea rows={8} style={{display:"block",width:"100%",padding:12}} value={remarks} onChange={e=>setRemarks(e.target.value)}/></label></section>
    <footer className="quote-result"><div><strong>{title || "未命名报价"}</strong><span>{travelers} 人核算</span></div><button type="button" disabled={exporting} onClick={exportQuote}>{exporting ? "正在生成…" : "生成报价 Word"}</button><small role="status">{message}</small><div><span>团费合计</span><strong>{money.format(totals.total)}</strong></div><div className="highlight"><span>人均报价</span><strong>{money.format(totals.perPerson)}</strong></div></footer>
  </main>;
}
