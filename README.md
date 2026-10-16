# Marketing Dashboard (Multi-Tenant with Supabase RLS)

A small marketing dashboard where two companies, Alpha Ltd and Beta Ltd, share one app and one database. Each user can only see their own company's campaign data. The restriction is enforced **inside PostgreSQL** with Row-Level Security, not in the frontend.

**Live demo:** https://marketing-dashboard-gamma.vercel.app/
**Test logins:** provided in the submission message.

## Features

- Email/password login with Supabase Auth
- Campaign table for the logged-in user's company
- Bar chart of leads by marketing channel (Recharts)
- Logout

## Tech stack

React (Vite) · Supabase (PostgreSQL + Auth) · Row-Level Security · Recharts · Plain CSS · Vercel

## How data isolation works

1. The user logs in. Supabase Auth returns a signed JWT.
2. Every database request carries that JWT. Inside Postgres, `auth.uid()` returns the user's ID from it.
3. The `profiles` table maps each user ID to a company. Users can read only their own profile and cannot change it.
4. The RLS policy on `campaign_data` returns a row only if its `company_name` matches the company in the user's profile.
5. The React app sends the **same query for every user**, with no company filter. The database decides which rows come back.

Access rules:

| Role | profiles | campaign_data |
|---|---|---|
| Not logged in (`anon`) | no access | no access |
| Logged in (`authenticated`) | SELECT own row only | SELECT own company's rows only |

No insert, update, or delete access is granted to app users. The frontend uses only the public publishable key; no secret key is used anywhere in this app.

## Database setup

Run the files in `sql/` in order in the Supabase SQL Editor:

1. `01_tables.sql` – tables and constraints
2. `02_seed.sql` – sample campaign data and profile links (create the two Auth users first)
3. `03_security.sql` – grants and RLS policies
4. `04_rls_tests.sql` – manual tests that impersonate each user

## Run locally

```bash
npm install
```

Create `.env.local` in the project root:

```
VITE_SUPABASE_URL=your-project-url
VITE_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Then:

```bash
npm run dev
```

## Project structure

```
sql/                  Database schema, seed data, security, tests
src/
  App.jsx             Shows Login or Dashboard based on the session
  Login.jsx           Email/password form
  Dashboard.jsx       Loads data, shows table, handles logout
  LeadsChart.jsx      Leads-by-channel bar chart
  supabaseClient.js   Supabase client (publishable key only)
```