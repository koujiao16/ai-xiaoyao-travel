import assert from "node:assert/strict";
import { northeastPriceItems } from "./northeast-prices-20261124";
import { descriptionSupplements } from "./description-supplements-20261124";
import { parsePrices, validatePrices, PRICE_TAG } from "../src/lib/xingcheng/review-pricing";
import { resolveTravelRegion } from "../src/lib/xingcheng/travel-regions";
const item = (slug:string) => northeastPriceItems.find(x=>x.slug===slug)!;
assert.equal(new Set(northeastPriceItems.map(x=>x.slug)).size,northeastPriceItems.length);
for(const i of northeastPriceItems) {
  assert.ok(i.description.length>25);
  assert.equal(i.replace,false);
  assert.equal(resolveTravelRegion(i),"东北");
  assert.deepEqual(parsePrices([PRICE_TAG+JSON.stringify(i.prices)]),validatePrices(i.prices));
  assert.ok(!/全年适宜|可结合当地行程安排参观/.test(i.description));
}
assert.equal(item("ne-fangchuan").prices[0].name,"防川套票");
assert.equal(item("ne-fangchuan").prices[0].price,62);
assert.equal(item("ne-fangchuan").prices[1].price,0);
assert.equal(item("ne-red-beach").prices[1].pricePending,true);
assert.equal(item("ne-puppet-palace").prices[0].pricePending,true);
assert.deepEqual(item("ne-changbai-north").prices.slice(1).map(x=>x.price),[25,85,80]);
assert.equal(item("ne-benxi-cave").prices.length,1); // Elder-only car15 excluded.
assert.equal(item("ne-moerdaoga-forest").prices[1].price,80); // Agreement, not retail100.
assert.equal(item("ne-manzhouli-gate-package").prices[0].price,105);
assert.ok(!northeastPriceItems.some(i=>/DIY|人参采摘|溯溪捕鱼|惊险车|图们国门/.test(i.name)));
for(const text of Object.values(descriptionSupplements))assert.ok(text.length>25&&!text.includes("可结合当地行程安排参观"));
console.log(`通过：${northeastPriceItems.length}个东北/内蒙古项目、协议空白、套票含交通、范围排除、${Object.keys(descriptionSupplements).length}篇具体介绍。`);
