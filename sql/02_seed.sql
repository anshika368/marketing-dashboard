insert into public.campaign_data (company_name, channel, leads) values
  ('Alpha Ltd', 'Google',   500),
  ('Alpha Ltd', 'Meta',     400),
  ('Alpha Ltd', 'LinkedIn', 300),
  ('Alpha Ltd', 'Email',    200),
  ('Alpha Ltd', 'Organic',  100),
  ('Beta Ltd',  'Google',    15),
  ('Beta Ltd',  'Meta',      25),
  ('Beta Ltd',  'LinkedIn',  35),
  ('Beta Ltd',  'Email',     45),
  ('Beta Ltd',  'Organic',   55);

insert into public.profiles (id, company_name) values
  ('PASTE-ALPHA-UUID-HERE', 'Alpha Ltd'),
  ('PASTE-BETA-UUID-HERE',  'Beta Ltd');