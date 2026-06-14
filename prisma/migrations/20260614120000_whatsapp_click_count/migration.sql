-- Add click counting + source-aware indexing to WhatsAppLead so the dashboard
-- can finally report per-click and per-source numbers instead of one-row-per-
-- session.

ALTER TABLE "WhatsAppLead"
  ADD COLUMN "clickCount"    INTEGER       NOT NULL DEFAULT 1,
  ADD COLUMN "lastClickedAt" TIMESTAMP(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- Backfill: existing rows are single-click sessions whose last click matches
-- their createdAt.
UPDATE "WhatsAppLead"
SET "lastClickedAt" = "createdAt"
WHERE "lastClickedAt" = CURRENT_TIMESTAMP;

CREATE INDEX "WhatsAppLead_createdAt_idx" ON "WhatsAppLead"("createdAt");
CREATE INDEX "WhatsAppLead_source_idx"    ON "WhatsAppLead"("source");
