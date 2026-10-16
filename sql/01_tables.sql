-- 1. profiles: links each login to one company
create table public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  company_name text not null
);

-- 2. campaign_data: marketing results for each company
create table public.campaign_data (
  id bigint generated always as identity primary key,
  company_name text not null,
  channel text not null,
  leads integer not null check (leads >= 0)
);