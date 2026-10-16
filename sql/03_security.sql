-- ===== GRANTS =====
revoke all on public.profiles      from anon, authenticated;
revoke all on public.campaign_data from anon, authenticated;

grant select on public.profiles      to authenticated;
grant select on public.campaign_data to authenticated;

-- ===== RLS: profiles =====
alter table public.profiles enable row level security;

create policy "Users can read their own profile"
on public.profiles
for select
to authenticated
using ( id = (select auth.uid()) );

-- ===== RLS: campaign_data =====
alter table public.campaign_data enable row level security;

create policy "Users can read their company's campaigns"
on public.campaign_data
for select
to authenticated
using (
  company_name = (
    select company_name
    from public.profiles
    where id = (select auth.uid())
  )
);

select table_name, grantee, privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name in ('profiles', 'campaign_data')
  and grantee in ('anon', 'authenticated')
order by table_name, grantee;

select tablename, policyname, cmd, roles
from pg_policies
where schemaname = 'public'
order by tablename;