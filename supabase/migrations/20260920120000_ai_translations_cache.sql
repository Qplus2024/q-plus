-- Cache for automatic content translation (EN/ES language switch).
--
-- The `translate` edge function writes here with the service role key, so each
-- distinct piece of text is only sent to the AI gateway once. Visitors never
-- read or write this table directly.

create table if not exists public.ai_translations (
  hash text primary key,
  source_lang text not null,
  target_lang text not null,
  source_text text not null,
  translated_text text not null,
  created_at timestamptz not null default now()
);

create index if not exists ai_translations_target_lang_idx
  on public.ai_translations (target_lang);

alter table public.ai_translations enable row level security;

-- No policies on purpose: only the service role (which bypasses RLS) may read
-- or write this table. The edge function is the single point of access.
