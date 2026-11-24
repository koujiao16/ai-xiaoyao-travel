import assert from "node:assert/strict";
import { regionalPriceItems } from "./regional-prices-20261124";
import { mergePrices } from "./import-regional-prices-20261124";
import { validatePrices, parsePrices, PRICE_TAG } from "../src/lib/xingcheng/review-pricing";
import { chooseQuotePriceOption, getProjectQuotePrices, isKnownFreeTicket, type QuotePriceItem } from "../src/lib/xingcheng/quote-pricing";
import { DEFAULT_TRAVEL_REGION, resolveTravelRegion } from "../src/lib/xingcheng/travel-regions";

assert.equal(new Set(regionalPriceItems.map(x=>x.slug)).size,regionalPriceItems.length);
for (const item of regionalPriceItems) assert.deepEqual(parsePrices([PRICE_TAG+JSON.stringify(item.prices)]),validatePrices(item.prices));
const item = (slug: string) => regionalPriceItems.find(x=>x.slug===slug)!;
const blank = validatePrices(item("xian-botanical").prices)[0];
assert.equal(blank.pricePending,true);
assert.equal(isKnownFreeTicket(blank),false);
assert.equal(isKnownFreeTicket(item("daming-palace").prices[0]),true);
const huashan = item("huashan");
const choices = validatePrices(huashan.prices)[1];
assert.equal(choices.pricePending,true);
assert.equal(choices.options!.length,3);
assert.equal(chooseQuotePriceOption(choices,2).price,280);
assert.equal(chooseQuotePriceOption(choices,2).pricePending,false);
assert.equal(huashan.prices.length,2); // One admission + ONE route, never three fares.
assert.deepEqual(item("daci-en-temple").prices.map(x=>x.name),["大慈恩寺"]); // User deleted tower/guide.
assert.equal(item("huaqing").prices.find(x=>x.name.includes("骊山"))!.price,60);
assert.equal(item("hancheng-dafengge-package").prices[1].price,0);
assert.equal(item("henan-laojieling-package").prices[1].price,0);
assert.equal(item("henan-laojieling").prices[0].price,30);
assert.equal(item("yuntai-mountain").prices[0].price,100);
assert.equal(item("shanxi-hukou-shanxi").prices[0].price,80);
assert.equal(item("hukou").prices[0].price,60);
assert.equal(item("shanxi-ningwu-ice-cave").prices[0].price,120);
assert.equal(item("shanxi-yunqiu-ice-caves").prices[0].price,80);
const old: QuotePriceItem[] = [{name:"龙门石窟",price:90,group:"ticket",mode:"perPerson",selected:true},{name:"龙门景交",price:20,group:"extra",mode:"perPerson",selected:false},{name:"龙门耳机",price:10,group:"extra",mode:"perPerson",selected:false}];
const result = mergePrices(old,item("henan-longmen-grottoes").prices);
assert.equal(result.length,3);
assert.equal(result.find(x=>x.name.includes("耳机"))!.price,10); // Sheet20 never overwrites existing10.
assert.equal(result.find(x=>x.name.includes("景交"))!.price,20);
const reviewed = getProjectQuotePrices({id:"daci-en-temple",name:"大慈恩寺",quotePrices:validatePrices(item("daci-en-temple").prices)});
assert.equal(reviewed.length,1); // Deleted defaults cannot leak back through fallback.
assert.equal(DEFAULT_TRAVEL_REGION,"陕豫晋");
for(const province of ["陕西","河南","山西","山西省"])assert.equal(resolveTravelRegion({province}),"陕豫晋");
for(const name of ["太原","运城","大同","济源","巩义"])assert.equal(resolveTravelRegion({name}),"陕豫晋");
assert.equal(resolveTravelRegion({region:"陕西＋河南"}),"陕豫晋");
assert.equal(resolveTravelRegion({province:"吉林"}),"东北");
console.log("通过：204项价格结构、留空与0元、删除不恢复、旧价优先、同名分省、互斥路线、陕豫晋兼容。");
