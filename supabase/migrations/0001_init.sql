-- =============================================================================
-- Reach — initial Supabase schema
-- Run this in your Supabase project's SQL editor:
--   Dashboard → SQL Editor → New query → paste → Run
--
-- "Allow all users" mode: RLS is enabled and anon (publishable key) may INSERT
-- into all three tables and SELECT from reports/submissions (needed for public
-- preview + report pages and the marketplace strip). Lead SELECT is also open
-- for now per current requirements — tighten before production.
-- =============================================================================

-- ---------- leads -----------------------------------------------------------
create table if not exists public.leads (
  id                  uuid primary key default gen_random_uuid(),
  created_at          timestamptz not null default now(),
  name                text not null,
  email               text not null,
  phone               text,
  company             text,
  industry            text,
  monthly_budget_cents integer,
  channels            text[],
  goals               text[],
  challenge           text,
  source              text
);

alter table public.leads enable row level security;

drop policy if exists "leads anon insert" on public.leads;
create policy "leads anon insert" on public.leads
  for insert to anon, authenticated with check (true);

drop policy if exists "leads anon select" on public.leads;
create policy "leads anon select" on public.leads
  for select to anon, authenticated using (true);

-- ---------- site_reports ----------------------------------------------------
create table if not exists public.site_reports (
  id                text primary key,
  created_at        timestamptz not null default now(),
  business_name     text not null,
  address           text not null,
  phone             text not null,
  email             text,
  url               text not null,
  social_links      text[],
  focus_prompt      text,
  requested_by_role text,
  overall           integer not null,
  scores            jsonb not null default '[]'::jsonb,
  findings          jsonb not null default '[]'::jsonb,
  signals           jsonb not null default '{}'::jsonb,
  summary           text,
  ai_powered        boolean not null default false
);

alter table public.site_reports enable row level security;

drop policy if exists "reports anon insert" on public.site_reports;
create policy "reports anon insert" on public.site_reports
  for insert to anon, authenticated with check (true);

drop policy if exists "reports anon select" on public.site_reports;
create policy "reports anon select" on public.site_reports
  for select to anon, authenticated using (true);

-- ---------- submissions -----------------------------------------------------
create table if not exists public.submissions (
  id            text primary key,
  created_at    timestamptz not null default now(),
  updated_at    timestamptz not null default now(),
  vendor_id     text not null default 'anonymous',
  title         text not null,
  description   text,
  framework     text not null,
  repo_url      text,
  files         jsonb not null default '[]'::jsonb,
  thumbnail     text,
  category      text,
  status        text not null default 'queued',
  analysis      jsonb,
  preview_slug  text not null unique
);

alter table public.submissions enable row level security;

drop policy if exists "submissions anon insert" on public.submissions;
create policy "submissions anon insert" on public.submissions
  for insert to anon, authenticated with check (true);

drop policy if exists "submissions anon select" on public.submissions;
create policy "submissions anon select" on public.submissions
  for select to anon, authenticated using (true);

-- Helpful indexes
create index if not exists leads_created_idx        on public.leads (created_at desc);
create index if not exists site_reports_created_idx on public.site_reports (created_at desc);
create index if not exists submissions_created_idx  on public.submissions (created_at desc);
create index if not exists submissions_status_idx   on public.submissions (status);
