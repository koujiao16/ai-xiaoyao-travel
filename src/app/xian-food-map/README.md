# Xi’an Food Map

Route: `/xian-food-map`. Map-first full-viewport page below the existing site header. The top bar has four category filters and restaurant names; selection opens a desktop floating panel or a mobile bottom sheet. No other pages modified.

## Local configuration

The ignored `.env.local` contains `NEXT_PUBLIC_AMAP_KEY` and `NEXT_PUBLIC_AMAP_SECURITY_CODE`. Do not commit its contents. Current local development uses Amap's direct security-code mode; before production deployment, move the security code behind Amap's recommended server proxy and configure permitted domains in the console.

## Map locations

`locations.ts` holds GCJ-02 coordinates from Amap PlaceSearch, checked against the confirmed addresses on 2026-09-27. All 15 entries match their named branches. Entry 12 was replaced at the user’s request with 子午路张记肉夹馍（翠华路店）, Amap POI B001D07BBR, 翠华南路229号挚友大厦一楼. Source: https://www.amap.com/place/B001D07BBR . Its description now focuses on traditional baiji bread roujiamo.

The page renders stored, verified positions without repeating ambiguous keyword searches on every visit. Conditional area markers have an asterisk and an explanatory notice in both the map and restaurant details. Chinese addresses and original restaurant content remain unchanged.

## Files

- `page.tsx`: route and metadata.
- `data.ts`: 15 restaurant descriptions and navigation URL helper.
- `locations.ts`: Amap POI references, coordinates and verification status.
- `FoodGuide.tsx`: top bar, category filters, name selector and details.
- `FoodMap.tsx`: SDK loading, markers, fit/zoom controls, selection and cleanup.
- `food-map.module.css`: isolated responsive styling.

Halal includes the conditional 'Halal shops only' BBQ entry. Full Meal includes entries 1, 5, 9, 10, 11, 14, 15. No ratings, reviews, large hero, quick-choice section or Useful Food Tips. The original restaurant details and navigation links are retained.

## Added places

13: 陕拾参（北院门创始店）, Not Halal confirmed by the user; Amap B0FFK6HDJK matches 北院门270号. Brand is listed as 陕拾叁 in Amap; navigation uses the official spelling. Budget is an estimate based on published ¥32–33 averages.
14: 清真老贾家馄饨, Amap B0FFF64X3D, 大麦市街96号. Current prices unavailable, so the card asks guests to check the menu instead of reusing an old price.
15: 西安饭庄（东大街店）, Amap B0H2P7SMEN matches 东大街298号; estimated budget ¥100–150.
7 and 8 retain verified coordinates; branch names and addresses updated per the user. For 8 the requested displayed spelling is 燎, while navigation uses Amap’s 嫽 spelling.
Sources: https://www.amap.com/place/B0FFK6HDJK ; https://www.amap.com/place/B0H2P7SMEN ; https://www.dianping.com/shop/13780387/photos/album ; https://www.tang.org.cn/5839.html ; https://www.sohu.com/a/232364000_348920 .
