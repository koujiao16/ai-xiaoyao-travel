# Xiaoyao Travel (Xiaoyao Travel)

Premium B2B destination management & travel operations website.

## Local dev

From this folder:

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Pages

- `/` Home
- `/destinations` overview + `/destinations/[slug]` (Shaanxi / Heilongjiang / Zhengzhou / Jilin)
- `/products` overview + product pages
- `/cases`
- `/about`
- `/contact`
- `/xingcheng` 行程制作 / Word 导出
- `/admin` 内容管理后台（需 Supabase，见 `ADMIN_SETUP.md`）

## Admin CMS

See [ADMIN_SETUP.md](./ADMIN_SETUP.md) for Supabase schema, Storage, admin whitelist, env vars, and seed script (`npm run seed:supabase`).

## Assets

Placeholder images live in `public/images` and can be replaced with real low-saturation photography later.

