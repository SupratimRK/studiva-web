-- Support Tickets
-- Run this in Supabase SQL Editor to create the table.
-- RLS is intentionally disabled for this table.

CREATE TABLE IF NOT EXISTS support_tickets (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name     TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  subject       TEXT        NOT NULL,
  message       TEXT        NOT NULL,
  category      TEXT        NOT NULL DEFAULT 'General', -- Technical | Account | Billing | Feature Request | General
  status        TEXT        NOT NULL DEFAULT 'open',    -- open | in_progress | resolved | closed
  priority      TEXT        NOT NULL DEFAULT 'medium',  -- low | medium | high
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index on email for tracking user tickets
CREATE INDEX IF NOT EXISTS idx_st_email ON support_tickets (email);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_update_st_updated_at ON support_tickets;
CREATE TRIGGER tr_update_st_updated_at
BEFORE UPDATE ON support_tickets
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
