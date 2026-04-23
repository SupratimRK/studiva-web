-- Feature Suggestions
-- Run this in Supabase SQL Editor to create the table.
-- RLS is intentionally disabled for this table.

CREATE TABLE IF NOT EXISTS feature_suggestions (
  id            UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  full_name     TEXT        NOT NULL,
  email         TEXT        NOT NULL,
  feature_title TEXT        NOT NULL,
  description   TEXT        NOT NULL,
  category      TEXT        NOT NULL, -- UI/UX | New Feature | Performance | Bug | Other
  priority      TEXT        NOT NULL DEFAULT 'medium', -- low | medium | high
  status        TEXT        NOT NULL DEFAULT 'under_review', -- under_review | planned | in_progress | completed | declined
  created_at    TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at    TIMESTAMPTZ NOT NULL DEFAULT now()
);

-- Index on email for tracking suggestions by user
CREATE INDEX IF NOT EXISTS idx_fs_email ON feature_suggestions (email);

-- Auto-update updated_at on row changes
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS tr_update_fs_updated_at ON feature_suggestions;
CREATE TRIGGER tr_update_fs_updated_at
BEFORE UPDATE ON feature_suggestions
FOR EACH ROW
EXECUTE FUNCTION update_updated_at_column();
