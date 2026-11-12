"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import "./baojia.css";

type ChargeMode = "perPerson" | "perGroup" | "hotel";

type QuoteLine = {
  id: string;
  category: string;
  name: string;
  note: string;
  mode: ChargeMode;
  unitPrice: number;
  quantity: number;
  nights: number;
};

const createLine = (category: string, mode: ChargeMode = "perPerson"): QuoteLine => ({
  id: `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
  category,
  name: "",
  note: "",
  mode,
  unitPrice: 0,
  quantity: mode === "hotel" ? 1 : 1,
  nights: mode === "hotel" ? 1 : 1,
});

const initialLines: QuoteLine[] = [
  { ...createLine("景区及活动"), name: "景区门票及活动", note: "可逐项填写门票、景交、演出或活动", mode: "perPerson" },
  { ...createLine("讲解及耳机", "perGroup"), name: "讲解服务", note: "例如：兵马俑讲解", mode: "perGroup", unitPrice: 0 },
  { ...createLine("住宿", "hotel"), name: "", note: "例如：双人标准间", mode: "hotel", unitPrice: 0, quantity: 1, nights: 1 },
  { ...createLine("用餐"), name: "用餐", note: "例如：6 正餐", mode: "perPerson", unitPrice: 0, quantity: 1 },
  { ...createLine("用车", "perGroup"), name: "旅游用车", note: "例如：30 座旅游车", mode: "perGroup", unitPrice: 0 },
  { ...createLine("导游", "perGroup"), name: "导游服务", note: "例如：中文导游 4 天", mode: "perGroup", unitPrice: 0 },
  { ...createLine("杂项"), name: "水和保险", note: "可改为按人或按团", mode: "perPerson", unitPrice: 0 },
];

const money = new Intl.NumberFormat("zh-CN", { style: "currency", currency: "CNY", maximumFractionDigits: 2 });

function calculateLine(line: QuoteLine, travelers: number) {
  if (line.mode === "hotel") return line.unitPrice * line.quantity * line.nights;
  if (line.mode === "perGroup") return line.unitPrice * line.quantity;
  return line.unitPrice * travelers * line.quantity;
}

export function QuoteBuilder() {
  const [quoteName, setQuoteName] = useState("西安定制行程报价");
  const [travelers, setTravelers] = useState(20);
  const [profit, setProfit] = useState(0);
  const [lines, setLines] = useState<QuoteLine[]>(initialLines);

  const updateLine = (id: string, patch: Partial<QuoteLine>) => {
    setLines((current) => current.map((line) => (line.id === id ? { ...line, ...patch } : line)));
  };

  const removeLine = (id: string) => setLines((current) => current.filter((line) => line.id !== id));

  const addLine = (category: string, mode: ChargeMode = "perPerson") => {
    setLines((current) => [...current, createLine(category, mode)]);
  };

  const totals = useMemo(() => {
    const cost = lines.reduce((sum, line) => sum + calculateLine(line, travelers), 0);
    const total = cost + profit;
    return { cost, total, perPerson: travelers > 0 ? total / travelers : 0 };
  }, [lines, profit, travelers]);

  const fieldNumber = (value: number, fallback = 0) => (Number.isFinite(value) ? value : fallback);

  return (
    <main className="quote-builder">
      <header className="quote-topbar">
        <Link href="/xingcheng" className="quote-brand" aria-label="返回行程生成器">
          <Image className="quote-brand-mark" src="/images/branding/ai-xiaoyao-mark.png" alt="爱逍遥" width={44} height={44} priority />
          <span><strong>爱逍遥报价工具</strong><small>费用清晰，实时核算</small></span>
        </Link>
        <div className="quote-nav"><Link href="/xingcheng">行程生成器</Link><Link href="/admin">管理后台</Link></div>
      </header>

      <section className="quote-setup">
        <label><span>报价名称</span><input value={quoteName} onChange={(event) => setQuoteName(event.target.value)} placeholder="例如：西安五日定制游" /></label>
        <label><span>核算人数</span><input type="number" min="1" value={travelers} onChange={(event) => setTravelers(Math.max(1, fieldNumber(Number(event.target.value), 1)))} /></label>
        <label><span>利润（团）</span><input type="number" min="0" value={profit || ""} onChange={(event) => setProfit(Math.max(0, fieldNumber(Number(event.target.value))))} placeholder="0" /></label>
      </section>

      <section className="quote-content">
        <div className="quote-heading"><div><span>费用明细</span><h1>逐项核算报价</h1></div><p>每一行均可编辑；修改后团费与人均自动更新。</p></div>
        <div className="quote-lines">
          {lines.map((line) => {
            const total = calculateLine(line, travelers);
            const perPerson = travelers > 0 ? total / travelers : 0;
            return (
              <article className="quote-line" key={line.id}>
                <div className="line-category">{line.category}</div>
                <div className="line-fields">
                  <label className="line-field line-name"><span>{line.mode === "hotel" ? "酒店名称" : "项目名称"}</span><input value={line.name} onChange={(event) => updateLine(line.id, { name: event.target.value })} placeholder={line.mode === "hotel" ? "例如：西安智选假日酒店" : "请输入费用项目"} /></label>
                  <label className="line-field line-note"><span>说明</span><input value={line.note} onChange={(event) => updateLine(line.id, { note: event.target.value })} placeholder="例如：双人标间 / 30 座旅游车" /></label>
                  <label className="line-field"><span>计费方式</span><select value={line.mode} onChange={(event) => updateLine(line.id, { mode: event.target.value as ChargeMode })}><option value="perPerson">按人</option><option value="perGroup">按团</option><option value="hotel">按房晚</option></select></label>
                  <label className="line-field"><span>{line.mode === "hotel" ? "每晚房价" : line.mode === "perGroup" ? "团费单价" : "每人单价"}</span><input type="number" min="0" value={line.unitPrice || ""} onChange={(event) => updateLine(line.id, { unitPrice: Math.max(0, fieldNumber(Number(event.target.value))) })} placeholder="0" /></label>
                  {line.mode === "hotel" ? <><label className="line-field compact"><span>房间数</span><input type="number" min="1" value={line.quantity} onChange={(event) => updateLine(line.id, { quantity: Math.max(1, fieldNumber(Number(event.target.value), 1)) })} /></label><label className="line-field compact"><span>晚数</span><input type="number" min="1" value={line.nights} onChange={(event) => updateLine(line.id, { nights: Math.max(1, fieldNumber(Number(event.target.value), 1)) })} /></label></> : <label className="line-field compact"><span>数量</span><input type="number" min="1" value={line.quantity} onChange={(event) => updateLine(line.id, { quantity: Math.max(1, fieldNumber(Number(event.target.value), 1)) })} /></label>}
                  <div className="line-result"><span>团费 {money.format(total)}</span><strong>{money.format(perPerson)}／人</strong></div>
                  <button type="button" className="line-remove" onClick={() => removeLine(line.id)} aria-label={`删除${line.name || "费用项目"}`}>×</button>
                </div>
              </article>
            );
          })}
        </div>
        <div className="quote-add"><button type="button" onClick={() => addLine("新增费用")}>＋ 新增费用项目</button><button type="button" onClick={() => addLine("住宿", "hotel")}>＋ 新增酒店</button><button type="button" onClick={() => addLine("讲解及耳机", "perGroup")}>＋ 新增按团费用</button></div>
      </section>

      <aside className="quote-total" aria-label="报价汇总">
        <div><span>{quoteName || "未命名报价"}</span><small>{travelers} 人核算 · {lines.length} 项费用</small></div>
        <div className="total-number"><span>团费合计</span><strong>{money.format(totals.total)}</strong></div>
        <div className="total-number emphasize"><span>人均报价</span><strong>{money.format(totals.perPerson)}</strong></div>
      </aside>
    </main>
  );
}
