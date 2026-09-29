# 管理后台接入指南（Supabase）

本项目的行程制作页 `/xingcheng` 与管理后台 `/admin` 使用 Supabase 存储景区、住宿、行程模板与图片。  
**未配置或数据库不可用时，前台自动回退到本地静态数据，不会空白或报错。**

## 1. 创建 Supabase 项目

1. 打开 [https://supabase.com](https://supabase.com) 创建项目
2. 进入 **Project Settings → API**
3. 复制：
   - Project URL → `NEXT_PUBLIC_SUPABASE_URL`
   - `anon` `public` key → `NEXT_PUBLIC_SUPABASE_ANON_KEY`
4. **不要**把 `service_role` key 写进前端代码或提交到 Git

## 2. 配置环境变量

复制示例文件：

```bash
cp .env.example .env.local
```

编辑 `.env.local`：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOi...

# 仅种子脚本需要（可选）
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOi...
```

## 3. 执行建表 SQL

1. 打开 Supabase **SQL Editor**
2. 粘贴并运行仓库中的：

`supabase/migrations/001_init.sql`

该脚本会创建：

| 表 | 用途 |
|---|---|
| `attractions` | 景区/服务项目 |
| `accommodations` | 住宿 |
| `itineraries` | 行程模板 |
| `itinerary_days` | 行程每日安排 |
| `itinerary_day_attractions` | 每日景区关联 |
| `media_assets` | 图片资源元数据 |
| `admin_profiles` | 管理员档案 |
| `admin_email_allowlist` | 管理员邮箱白名单 |
| `admin_activity_log` | 后台编辑记录 |

并启用 **Row Level Security**：

- 匿名/公开用户：仅可读 `published = true` 的内容
- 管理员（`admin_profiles` 中存在且 published）：完整读写
- Storage 桶 `media`：公开读；仅管理员可上传/替换/删除

## 4. 创建 Storage Bucket

迁移 SQL 会尝试创建公开桶 `media`。若失败，可手动：

1. **Storage → New bucket**
2. Name: `media`
3. Public bucket: **开启**
4. 允许 MIME：`image/jpeg`, `image/png`, `image/webp`
5. 文件大小建议：≤ 10MB

后台上传时会自动压缩为 **1600×960 WebP（5:3）**。

## 5. 配置管理员邮箱（白名单，不开放注册）

在 SQL Editor 执行（替换为真实邮箱）：

```sql
insert into public.admin_email_allowlist (email)
values ('you@example.com')
on conflict (email) do nothing;
```

然后在 Supabase **Authentication → Users → Add user** 创建同一邮箱账号并设置密码。  
首次创建用户时，触发器会自动写入 `admin_profiles`。

若用户已存在但没有 profile，可手动：

```sql
insert into public.admin_profiles (id, email, display_name)
select id, email, split_part(email, '@', 1)
from auth.users
where lower(email) = lower('you@example.com')
on conflict (id) do nothing;
```

## 6. 导入现有本地数据

```bash
npm run seed:supabase
```

脚本会：

- upsert 全部本地景区到 `attractions`
- upsert 城市住宿兜底项到 `accommodations`
- 上传 `public/images/attractions/*` 到 Storage（若文件存在）
- 创建示例行程模板「西安华山3日游」

## 7. 启动与访问

```bash
npm run dev
```

| 地址 | 说明 |
|---|---|
| `/xingcheng` | 前台行程制作 / Word 导出（读已发布数据） |
| `/admin/login` | 管理员登录 |
| `/admin` | 后台概览 |
| `/admin/attractions` | 景区管理 |
| `/admin/accommodations` | 住宿管理 |
| `/admin/itineraries` | 行程模板管理 |

未登录访问 `/admin/*` 会跳转到 `/admin/login`。

## 8. 权限与安全要点

- 前端只使用 `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- 写入/删除/上传依赖 RLS + `is_admin()`
- 不开放注册；仅白名单邮箱可成为管理员
- 前台用户只能读取已发布内容
- 旧版本地静态数据仍保留作兜底；已生成的旧 Word 文件不受影响

## 9. 常见问题

**登录提示不在白名单**  
确认 `admin_email_allowlist` 与 `admin_profiles` 都有该邮箱，且 Auth 用户邮箱一致。

**前台仍显示「本地」**  
检查环境变量、表是否有数据、记录是否 `published = true`，然后刷新页面。

**图片上传失败**  
确认已登录管理员、`media` 桶存在、Storage RLS 策略已按迁移脚本创建。
