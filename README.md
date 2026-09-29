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

See [ADMIN_SETUP.md](./ADMIN_SETUP.md). Use new Supabase API keys only:
`NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`, and local `SUPABASE_SECRET_KEY`.
Run `supabase/INIT_ALL.sql` once in the SQL Editor, then `npm run seed:supabase` / `npm run bootstrap:admin`.

## Assets

Placeholder images live in `public/images` and can be replaced with real low-saturation photography later.

