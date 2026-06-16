import { createClient } from '@supabase/supabase-js';

/*
  Supabase Setup — run this SQL in your Supabase dashboard (SQL Editor):

  create table likes (
    id uuid default gen_random_uuid() primary key,
    project_id text not null,
    created_at timestamp with time zone default now()
  );

  create table comments (
    id uuid default gen_random_uuid() primary key,
    project_id text not null,
    author text not null default 'Anonymous',
    body text not null,
    created_at timestamp with time zone default now()
  );

  alter table likes enable row level security;
  alter table comments enable row level security;

  create policy "read likes" on likes for select using (true);
  create policy "insert likes" on likes for insert with check (true);
  create policy "read comments" on comments for select using (true);
  create policy "insert comments" on comments for insert with check (true);

  Then add to your .env:
    REACT_APP_SUPABASE_URL=https://your-project.supabase.co
    REACT_APP_SUPABASE_ANON_KEY=your-anon-key
*/

export const supabase = createClient(
  process.env.REACT_APP_SUPABASE_URL,
  process.env.REACT_APP_SUPABASE_ANON_KEY
);

export const toSlug = (title) =>
  title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '');
