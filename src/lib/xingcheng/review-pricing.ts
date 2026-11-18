import type { QuotePriceItem } from "./quote-pricing";
export const PRICE_TAG = "quote-prices:";
export function parsePrices(keywords: string[]): QuotePriceItem[] | undefined {
  const tag = keywords.find(x => x.startsWith(PRICE_TAG));
  if (!tag) return undefined;
  try { return validatePrices(JSON.parse(tag.slice(PRICE_TAG.length))); } catch { return undefined; }
}
export function validatePrices(value: unknown): QuotePriceItem[] {
  if (!Array.isArray(value) || value.length > 30) throw Error("配套最多30项");
  return value.map(x => {
    if (!x || typeof x.name !== "string" || !x.name.trim() || x.name.length > 100 || typeof x.price !== "number" || !Number.isFinite(x.price) || x.price < 0 || x.price > 1000000 || !["ticket","extra"].includes(x.group) || !["perPerson","perGroup"].includes(x.mode)) throw Error("费用信息无效");
    return { name: x.name.trim(), price: x.price, group: x.group, mode: x.mode, selected: true, ...(typeof x.includedPeople === "number" && x.includedPeople > 0 ? { includedPeople: x.includedPeople, additionalPersonPrice: Math.max(0, Number(x.additionalPersonPrice) || 0) } : {}) };
  });
}
