import assert from "node:assert/strict";
import { effectiveQuotePrice, quotePriceCatalog } from "../src/lib/xingcheng/quote-pricing";
import { baseLibrary } from "../src/data/xingcheng/library";

const museum = quotePriceCatalog["秦始皇兵马俑博物馆"];
assert.equal(museum.find(x => x.group === "ticket")?.price, 120);
assert.equal(museum.length, 4);
assert.ok(museum.every(x => !/DIY|制作/.test(x.name)));
assert.equal(quotePriceCatalog["兵马俑DIY"][0].price, 20);
assert.equal(baseLibrary.filter(x => x.name === "兵马俑DIY").length, 1);
for (const rows of Object.values(quotePriceCatalog)) {
  for (const item of rows) {
    assert.ok(Number.isFinite(item.price) && item.price > 0);
    if (item.group === "extra") assert.equal(item.selected, false);
  }
}
for (const name of ["杨家岭革命旧址", "枣园革命旧址", "延安革命纪念馆", "宝塔山", "梁家河"]) {
  const guide = quotePriceCatalog[name].find(x => x.mode === "perGroup")!;
  assert.equal(effectiveQuotePrice(guide, 20), 150);
  assert.equal(effectiveQuotePrice(guide, 30), 150);
  assert.equal(effectiveQuotePrice(guide, 33), 165);
  assert.equal(effectiveQuotePrice(guide, 50), 250);
  assert.equal(effectiveQuotePrice({ ...guide, price: 200 }, 33), 215);
}
assert.equal(quotePriceCatalog["龙门石窟"].find(x => /耳机/.test(x.name))?.price, 10);
assert.equal(quotePriceCatalog["陕西历史博物馆"], undefined);
assert.equal(quotePriceCatalog["西安碑林博物馆"].length, 1);
console.log("报价配置检查通过：" + Object.keys(quotePriceCatalog).length + "组，成人门票、DIY隔离、配套勾选和超员计费正常。");
