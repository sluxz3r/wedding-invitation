-- Guestbook wishes ("Ucapan & Doa") — source of truth for the table schema.
-- Apply once in Supabase → SQL Editor (or `supabase db push` if you use the
-- Supabase CLI). This script is idempotent, so it is safe to re-run.
--
-- Design:
--   * Visitors submit ONLY through submit_wish() (a SECURITY DEFINER RPC).
--     They have no direct table access, so the per-IP rate limit cannot be
--     bypassed and the wishes cannot be read through the public API.
--   * created_at + a hashed IP power a "one submission per IP per 5 minutes"
--     limit. The raw IP is never stored — only a salted SHA-256 hash sent by
--     the server (app/api/ucapan/route.ts).
--   * Wishes are only visible from the Supabase dashboard (service role,
--     which bypasses RLS). Length limits are also enforced by zod in the app.

create table if not exists public.wishes (
  id         uuid primary key default gen_random_uuid(),
  name       text not null check (char_length(name) between 1 and 120),
  message    text not null check (char_length(message) between 1 and 1000),
  ip_hash    text,
  created_at timestamptz not null default now()
);

-- Fast lookup for the rate-limit check.
create index if not exists wishes_ip_hash_created_idx
  on public.wishes (ip_hash, created_at desc);

alter table public.wishes enable row level security;

create or replace function public.submit_wish(
  p_name    text,
  p_message text,
  p_ip_hash text
)
returns void
language plpgsql
security definer
set search_path = public
as $$
begin
  if char_length(coalesce(btrim(p_name), '')) < 1 or char_length(p_name) > 120 then
    raise exception 'invalid_name';
  end if;
  if char_length(coalesce(btrim(p_message), '')) < 1 or char_length(p_message) > 1000 then
    raise exception 'invalid_message';
  end if;

  -- One submission per IP per 5 minutes.
  if p_ip_hash is not null and exists (
    select 1 from public.wishes
    where ip_hash = p_ip_hash
      and created_at > now() - interval '5 minutes'
  ) then
    raise exception 'rate_limited';
  end if;

  insert into public.wishes (name, message, ip_hash)
  values (btrim(p_name), btrim(p_message), p_ip_hash);
end;
$$;

-- Visitors (publishable key → `anon`) may only execute the RPC.
revoke all on function public.submit_wish(text, text, text) from public;
grant execute on function public.submit_wish(text, text, text) to anon, authenticated;
