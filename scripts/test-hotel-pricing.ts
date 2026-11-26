import assert from "node:assert/strict";
import { calculateHotelCosts } from "../src/lib/xingcheng/hotel-pricing";
const hotels = [{roomRate:220,nights:3},{roomRate:450,nights:1}];
assert.deepEqual(calculateHotelCosts(hotels,5),{perPerson:555,total:2775,singleSupplement:555});
assert.equal(calculateHotelCosts(hotels,6).perPerson,555);
assert.equal(calculateHotelCosts(hotels,20).total,11100);
assert.deepEqual(calculateHotelCosts([],5),{perPerson:0,total:0,singleSupplement:0});
assert.equal(calculateHotelCosts([{roomRate:550,nights:1}],5).perPerson,275);
console.log("住宿核算通过：奇偶人数人均一致、555元示例、单房差独立、不自动多算房间。");
