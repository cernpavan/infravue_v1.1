import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const { requestId } = await request.json();

    if (!requestId) {
      return NextResponse.json({ error: "Request ID is required" }, { status: 400 });
    }

    const lead = await prisma.whatsAppLead.upsert({
      where: { requestId },
      update: {},
      create: {
        requestId,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error("WhatsApp lead error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
