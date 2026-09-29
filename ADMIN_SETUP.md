# 管理后台接入指南（Supabase 新版 API Keys）

本项目的行程制作页 `/xingcheng` 与管理后台 `/admin` 使用 Supabase。  
**未配置或数据库不可用时，前台自动回退到本地静态数据。**

> 请只使用 **新版 API Keys**（Publishable / Secret）。  
> 不要使用已泄露的 Legacy `anon` / `service_role`（JWT）密钥。

## 1. 在 Supabase 后台复制三个值

打开项目 → **Project Settings → API Keys**（或 **API**）：

| 复制什么 | 写入 `.env.local` 的变量名 |
|---|---|
| Project URL | `NEXT_PUBLIC_SUPABASE_URL` |
| Publishable key（`sb_publishable_…`） | `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` |
| Secret key（`sb_secret_…`） | `SUPABASE_SECRET_KEY` |

说明：
- 前两个会进前端构建（可公开）
- `SUPABASE_SECRET_KEY` **只放本机** `.env.local`，用于种子脚本 / 创建管理员，**不要**加 `NEXT_PUBLIC_`，不要提交 Git，不要配到前端

示例（占位符，勿填真实值进文档）：

```env
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=sb_publishable_...
SUPABASE_SECRET_KEY=sb_secret_...
```

## 2. 一次性执行建表 SQL

1. 打开 Supabase **SQL Editor**
2. 打开本仓库文件 **`supabase/INIT_ALL.sql`**
3. 全选复制 → 粘贴到 SQL Editor → **Run**

该文件会创建表、RLS、Storage 桶 `media`、管理员白名单触发器等，无需再改代码。

## 3. 导入本地景区/住宿数据 + 创建管理员

确认 `.env.local` 已配置上述三个变量后：

```bash
npm run seed:supabase
npm run bootstrap:admin
```

`bootstrap:admin` 会为白名单邮箱创建已验证的 Auth 用户，并写入 `admin_profiles`。  
初始密码通过本机临时环境变量传入（不写进仓库）；首次登录后请立刻修改密码。

## 4. 启动与访问

```bash
npm run dev
```

| 地址 | 说明 |
|---|---|
| `/xingcheng` | 前台行程制作 / Word 导出 |
| `/admin/login` | 管理员登录 |
| `/admin` | 后台概览 |

生产环境请在托管平台配置 `NEXT_PUBLIC_SUPABASE_URL` 与 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` 后重新部署。  
`SUPABASE_SECRET_KEY` 不要部署到前端。

## 5. 停用 Legacy Keys

新版密钥与后台都工作正常后，在 Supabase → **API Keys** 中停用 Legacy JWT `anon` / `service_role` 密钥。

## 常见问题

**登录提示未配置环境变量**  
检查本机 / 生产是否已设置 `NEXT_PUBLIC_SUPABASE_URL` 与 `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY`，生产需重新构建。

**登录提示不在白名单**  
确认已跑过 `bootstrap:admin`，或手动在 `admin_email_allowlist` / `admin_profiles` 中有该邮箱。
