-- Xiaoyao Travel itinerary CMS schema
-- Run in Supabase SQL Editor (or via supabase db push)

create extension if not exists "pgcrypto";

-- ---------------------------------------------------------------------------
-- Helper: updated_at trigger
-- ---------------------------------------------------------------------------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------------------------------------------------------------------------
-- admin_profiles
-- ---------------------------------------------------------------------------
create table if not exists public.admin_profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  display_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published boolean not null default true,
  sort_order integer not null default 0
);

create trigger admin_profiles_updated_at
  before update on public.admin_profiles
  for each row execute function public.set_updated_at();

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.admin_profiles
    where id = auth.uid()
      and published = true
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated, anon;

-- ---------------------------------------------------------------------------
-- media_assets
-- ---------------------------------------------------------------------------
create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published boolean not null default true,
  sort_order integer not null default 0,
  bucket text not null default 'media',
  path text not null,
  public_url text not null,
  mime_type text,
  width integer,
  height integer,
  alt_text text,
  credit text,
  license_source text,
  entity_type text,
  entity_id uuid
);

create unique index if not exists media_assets_bucket_path_idx
  on public.media_assets (bucket, path);

create trigger media_assets_updated_at
  before update on public.media_assets
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- attractions
-- ---------------------------------------------------------------------------
create table if not exists public.attractions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published boolean not null default true,
  sort_order integer not null default 0,
  slug text not null unique,
  name text not null,
  province text not null default '陕西',
  city text not null default '西安',
  region text,
  category text not null default '其他'
    check (category in (
      '自然风光', '历史文化', '博物馆', '红色教育',
      '古镇', '演出', '研学', '其他', '服务'
    )),
  kind text not null default '景点' check (kind in ('景点', '服务')),
  description text not null default '',
  duration text not null default '',
  open_hours_note text not null default '',
  seasonal_note text not null default '',
  keywords text[] not null default '{}',
  image_url text,
  image_credit text not null default '',
  image_license_source text not null default '',
  media_asset_id uuid references public.media_assets (id) on delete set null
);

create index if not exists attractions_published_sort_idx
  on public.attractions (published, sort_order, name);

create index if not exists attractions_name_idx
  on public.attractions using gin (to_tsvector('simple', coalesce(name, '') || ' ' || coalesce(city, '') || ' ' || coalesce(region, '')));

create trigger attractions_updated_at
  before update on public.attractions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- accommodations
-- ---------------------------------------------------------------------------
create table if not exists public.accommodations (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published boolean not null default true,
  sort_order integer not null default 0,
  slug text not null unique,
  name text not null,
  city text not null default '',
  district text not null default '',
  star_or_type text not null default '',
  address text not null default '',
  contact text not null default '',
  room_notes text not null default '',
  description text not null default '',
  image_url text,
  media_asset_id uuid references public.media_assets (id) on delete set null
);

create index if not exists accommodations_published_sort_idx
  on public.accommodations (published, sort_order, name);

create trigger accommodations_updated_at
  before update on public.accommodations
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- itineraries
-- ---------------------------------------------------------------------------
create table if not exists public.itineraries (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published boolean not null default true,
  sort_order integer not null default 0,
  slug text not null unique,
  name text not null,
  days_count integer not null default 1 check (days_count >= 1),
  cities text not null default '',
  cover_image_url text,
  summary text not null default '',
  fee_included text not null default '',
  fee_excluded text not null default '',
  cover_media_asset_id uuid references public.media_assets (id) on delete set null
);

create index if not exists itineraries_published_sort_idx
  on public.itineraries (published, sort_order, name);

create trigger itineraries_updated_at
  before update on public.itineraries
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- itinerary_days
-- ---------------------------------------------------------------------------
create table if not exists public.itinerary_days (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published boolean not null default true,
  sort_order integer not null default 0,
  itinerary_id uuid not null references public.itineraries (id) on delete cascade,
  day_number integer not null,
  title text not null default '',
  breakfast boolean not null default false,
  lunch boolean not null default false,
  dinner boolean not null default false,
  accommodation_id uuid references public.accommodations (id) on delete set null,
  lodging_label text not null default '不住宿',
  transport text not null default '',
  activities text not null default '',
  notes text not null default ''
);

create unique index if not exists itinerary_days_unique_day
  on public.itinerary_days (itinerary_id, day_number);

create trigger itinerary_days_updated_at
  before update on public.itinerary_days
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- itinerary_day_attractions
-- ---------------------------------------------------------------------------
create table if not exists public.itinerary_day_attractions (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published boolean not null default true,
  sort_order integer not null default 0,
  itinerary_day_id uuid not null references public.itinerary_days (id) on delete cascade,
  attraction_id uuid references public.attractions (id) on delete set null,
  custom_text text,
  show_photo boolean not null default false
);

create index if not exists itinerary_day_attractions_day_sort_idx
  on public.itinerary_day_attractions (itinerary_day_id, sort_order);

create trigger itinerary_day_attractions_updated_at
  before update on public.itinerary_day_attractions
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- activity log (recent edits for admin dashboard)
-- ---------------------------------------------------------------------------
create table if not exists public.admin_activity_log (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published boolean not null default true,
  sort_order integer not null default 0,
  actor_email text,
  entity_type text not null,
  entity_id text,
  entity_name text,
  action text not null,
  summary text not null default ''
);

create trigger admin_activity_log_updated_at
  before update on public.admin_activity_log
  for each row execute function public.set_updated_at();

-- ---------------------------------------------------------------------------
-- Auto-create admin_profiles when allowlisted user signs up / first login
-- Configure allowlist via app_settings or insert manually. See ADMIN_SETUP.md
-- ---------------------------------------------------------------------------
create table if not exists public.admin_email_allowlist (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  published boolean not null default true,
  sort_order integer not null default 0,
  email text not null unique
);

create trigger admin_email_allowlist_updated_at
  before update on public.admin_email_allowlist
  for each row execute function public.set_updated_at();

create or replace function public.handle_new_user_admin()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if exists (
    select 1 from public.admin_email_allowlist
    where lower(email) = lower(new.email)
      and published = true
  ) then
    insert into public.admin_profiles (id, email, display_name)
    values (new.id, new.email, coalesce(new.raw_user_meta_data->>'display_name', split_part(new.email, '@', 1)))
    on conflict (id) do update set email = excluded.email, updated_at = now();
  end if;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created_admin on auth.users;
create trigger on_auth_user_created_admin
  after insert on auth.users
  for each row execute function public.handle_new_user_admin();

-- ---------------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------------
alter table public.admin_profiles enable row level security;
alter table public.admin_email_allowlist enable row level security;
alter table public.media_assets enable row level security;
alter table public.attractions enable row level security;
alter table public.accommodations enable row level security;
alter table public.itineraries enable row level security;
alter table public.itinerary_days enable row level security;
alter table public.itinerary_day_attractions enable row level security;
alter table public.admin_activity_log enable row level security;

-- admin_profiles
drop policy if exists "admin_profiles_select_own_or_admin" on public.admin_profiles;
create policy "admin_profiles_select_own_or_admin"
  on public.admin_profiles for select
  using (id = auth.uid() or public.is_admin());

drop policy if exists "admin_profiles_admin_write" on public.admin_profiles;
create policy "admin_profiles_admin_write"
  on public.admin_profiles for all
  using (public.is_admin())
  with check (public.is_admin());

-- allowlist: only admins
drop policy if exists "allowlist_admin_all" on public.admin_email_allowlist;
create policy "allowlist_admin_all"
  on public.admin_email_allowlist for all
  using (public.is_admin())
  with check (public.is_admin());

-- Public read published content; admin full access
do $$
declare
  t text;
begin
  foreach t in array array[
    'media_assets',
    'attractions',
    'accommodations',
    'itineraries',
    'itinerary_days',
    'itinerary_day_attractions'
  ]
  loop
    execute format('drop policy if exists %I on public.%I', t || '_public_read', t);
    execute format(
      'create policy %I on public.%I for select using (published = true or public.is_admin())',
      t || '_public_read', t
    );
    execute format('drop policy if exists %I on public.%I', t || '_admin_insert', t);
    execute format(
      'create policy %I on public.%I for insert with check (public.is_admin())',
      t || '_admin_insert', t
    );
    execute format('drop policy if exists %I on public.%I', t || '_admin_update', t);
    execute format(
      'create policy %I on public.%I for update using (public.is_admin()) with check (public.is_admin())',
      t || '_admin_update', t
    );
    execute format('drop policy if exists %I on public.%I', t || '_admin_delete', t);
    execute format(
      'create policy %I on public.%I for delete using (public.is_admin())',
      t || '_admin_delete', t
    );
  end loop;
end $$;

drop policy if exists "activity_admin_all" on public.admin_activity_log;
create policy "activity_admin_all"
  on public.admin_activity_log for all
  using (public.is_admin())
  with check (public.is_admin());

-- ---------------------------------------------------------------------------
-- Storage bucket: media (public read, admin write)
-- ---------------------------------------------------------------------------
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values (
  'media',
  'media',
  true,
  10485760,
  array['image/jpeg', 'image/png', 'image/webp']
)
on conflict (id) do update set
  public = true,
  file_size_limit = 10485760,
  allowed_mime_types = array['image/jpeg', 'image/png', 'image/webp'];

drop policy if exists "media_public_read" on storage.objects;
create policy "media_public_read"
  on storage.objects for select
  using (bucket_id = 'media');

drop policy if exists "media_admin_insert" on storage.objects;
create policy "media_admin_insert"
  on storage.objects for insert
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_admin_update" on storage.objects;
create policy "media_admin_update"
  on storage.objects for update
  using (bucket_id = 'media' and public.is_admin())
  with check (bucket_id = 'media' and public.is_admin());

drop policy if exists "media_admin_delete" on storage.objects;
create policy "media_admin_delete"
  on storage.objects for delete
  using (bucket_id = 'media' and public.is_admin());
