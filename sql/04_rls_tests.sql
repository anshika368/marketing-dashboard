set local role authenticated;
set local request.jwt.claims to '{"sub":"2e720f5-599a-45ef-bbb0-793aa5996a58","role":"authenticated"}';

select company_name, channel, leads
from public.campaign_data
order by leads desc;

set local role authenticated;
set local request.jwt.claims to '{"sub":"BETA-UUID","role":"authenticated"}';

select company_name, channel, leads
from public.campaign_data
order by leads desc;

set local role authenticated;
set local request.jwt.claims to '{"sub":"2e720f5-599a-45ef-bbb0-793aa5996a58","role":"authenticated"}';

select * from public.campaign_data
where company_name = 'Beta Ltd';

set local role anon;

select * from public.campaign_data;

set local role authenticated;
set local request.jwt.claims to '{"sub":"2e720f5-599a-45ef-bbb0-793aa5996a58","role":"authenticated"}';

update public.profiles
set company_name = 'Beta Ltd'
where id = '2e720f5-599a-45ef-bbb0-793aa5996a58';

set local role authenticated;
set local request.jwt.claims to '{"sub":"00000000-0000-0000-0000-000000000000","role":"authenticated"}';

select * from public.campaign_data;

set local role authenticated;
set local request.jwt.claims to '{"sub":"2e720f5-599a-45ef-bbb0-793aa5996a58","role":"authenticated"}';

select * from public.profiles;