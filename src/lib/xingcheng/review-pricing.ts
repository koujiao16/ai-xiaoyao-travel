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
    const options = x.options === undefined ? undefined : validateOptions(x.options);
    return { name: x.name.trim(), price: x.price, group: x.group, mode: x.mode, selected: true,
      ...(x.pricePending === true ? { pricePending: true } : {}), ...(options ? { options } : {}),
      ...(typeof x.includedPeople === "number" && x.includedPeople > 0 ? { includedPeople: x.includedPeople, additionalPersonPrice: Math.max(0, Number(x.additionalPersonPrice) || 0) } : {}) };
  });
}

function validateOptions(value: unknown): NonNullable<QuotePriceItem["options"]> {
  if (!Array.isArray(value) || !value.length || value.length > 15) throw Error("可选票种须为1至15项");
  return value.map(x => {
    if (!x || typeof x.name !== "string" || !x.name.trim() || x.name.length > 100 || typeof x.price !== "number" || !Number.isFinite(x.price) || x.price < 0 || x.price > 1000000 || (x.mode !== undefined && !["perPerson", "perGroup"].includes(x.mode))) throw Error("可选票种无效");
    return { name: x.name.trim(), price: x.price, ...(x.mode ? {mode: x.mode} : {}),
      ...(typeof x.includedPeople === "number" && Number.isFinite(x.includedPeople) && x.includedPeople > 0 ? { includedPeople: x.includedPeople, additionalPersonPrice: Math.max(0, Number(x.additionalPersonPrice) || 0) } : {}) };
  });
}
