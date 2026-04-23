-- Campus Representative Program Applications
-- Run this in Supabase SQL Editor to create the table.
-- RLS is intentionally disabled for this table.

CREATE TABLE IF NOT EXISTS campus_representative_applications (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name     TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  phone         TEXT        NOT NULL,
  college_name  TEXT        NOT NULL,
  year_of_study TEXT        NOT NULL,
  why_join      TEXT        NOT NULL,
  status        TEXT        NOT NULL DEFAULT 'pending',  -- pending | approved | rejected
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index on email for quick duplicate lookups
CREATE INDEX IF NOT EXISTS idx_cra_email ON campus_representative_applications (email);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_update_cra_updated_at ON campus_representative_applications;
CREATE TRIGGER tr_update_cra_updated_at
BEFORE UPDATE ON campus_representative_applications
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
