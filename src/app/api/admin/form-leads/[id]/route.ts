import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";

async function validateAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get("admin_token")?.value;
  return token === process.env.ADMIN_SECRET;
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await validateAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const data = await request.json();
    const { id } = await params;

    const lead = await prisma.formLead.update({
      where: { id },
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email || null,
        serviceType: data.serviceType,
        city: data.city || null,
        message: data.message || null,
      },
    });

    return NextResponse.json({
      id: lead.id,
      requestId: lead.requestId,
      name: lead.name,
      phone: lead.phone,
      email: lead.email,
      serviceType: lead.serviceType,
      city: lead.city,
      message: lead.message,
      source: lead.source,
      createdAt: lead.createdAt.toISOString(),
      updatedAt: lead.updatedAt.toISOString(),
    });
  } catch (error) {
    console.error("Form lead update error:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to update lead" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    if (!(await validateAuth())) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { id } = await params;

    await prisma.formLead.delete({
      where: { id },
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Form lead delete error:", error);
    if (error instanceof Error && error.message.includes("not found")) {
      return NextResponse.json({ error: "Lead not found" }, { status: 404 });
    }
    return NextResponse.json(
      { error: "Failed to delete lead" },
      { status: 500 }
    );
  }
}
