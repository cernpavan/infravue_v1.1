import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  let body: { requestId?: unknown };
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

  try {
    const lead = await prisma.whatsAppLead.upsert({
      where: { requestId },
      update: {},
      create: { requestId },
    });
    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("[api/leads/whatsapp] DB write failed", {
      message,
      stack,
      requestId,
    });

    if (err instanceof Prisma.PrismaClientInitializationError) {
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
