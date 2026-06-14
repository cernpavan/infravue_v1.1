import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// Sources we accept. Extend this list when you add a new WhatsApp entry point
// so the dashboard breakdown stays clean. Anything unrecognized falls back to
// "whatsapp" so we never lose a click to an enum mismatch.
const KNOWN_SOURCES = new Set([
  "whatsapp",
  "floating-button",
  "cta-banner",
  "contact-page",
  "thank-you",
  "hero",
  "footer",
]);

export async function POST(request: Request) {
  let body: { requestId?: unknown; source?: unknown };
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const requestId =
    typeof body.requestId === "string" && body.requestId.trim().length > 0
      ? body.requestId.trim()
      : null;

  if (!requestId) {
    return NextResponse.json(
      { error: "Request ID is required" },
      { status: 400 }
    );
  }

  const rawSource =
    typeof body.source === "string" && body.source.trim().length > 0
      ? body.source.trim().toLowerCase()
      : "whatsapp";
  const source = KNOWN_SOURCES.has(rawSource) ? rawSource : "whatsapp";

  try {
    // One row per session (requestId). Each additional click from the same
    // session increments `clickCount` and bumps `lastClickedAt` — so the
    // dashboard can report both "leads" (rows) and "clicks" (sum of counts).
    const now = new Date();
    const lead = await prisma.whatsAppLead.upsert({
      where: { requestId },
      update: {
        clickCount: { increment: 1 },
        lastClickedAt: now,
        // Don't overwrite the first source — keep the original entry point.
      },
      create: {
        requestId,
        source,
        clickCount: 1,
        lastClickedAt: now,
      },
    });
    return NextResponse.json(
      { ok: true, id: lead.id, clickCount: lead.clickCount },
      { status: 201 }
    );
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("[api/leads/whatsapp] DB write failed", {
      message,
      stack,
      requestId,
      source,
    });

    if (
      err instanceof Prisma.PrismaClientInitializationError ||
      (err instanceof Error &&
        (err as Error & { code?: string }).code === "MISSING_DATABASE_URL")
    ) {
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again shortly." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Could not record submission." },
      { status: 500 }
    );
  }
}
