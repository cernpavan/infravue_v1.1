import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    const adminSecret = request.headers.get("x-admin-secret");
    const expectedSecret = process.env.ADMIN_SECRET;

    if (!expectedSecret || adminSecret !== expectedSecret) {
      return NextResponse.json(
        { success: false, error: "Unauthorized" },
        { status: 401 }
      );
    }

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const [formLeads, whatsappLeads, formLeadsToday, whatsappLeadsToday] =
      await Promise.all([
        prisma.formLead.findMany({
          orderBy: { createdAt: "desc" },
          take: 200,
        }),
        prisma.whatsAppLead.findMany({
          orderBy: { createdAt: "desc" },
          take: 200,
        }),
        prisma.formLead.count({
          where: {
            createdAt: {
              gte: today,
            },
          },
        }),
        prisma.whatsAppLead.count({
          where: {
            createdAt: {
              gte: today,
            },
          },
        }),
      ]);

    const totalForm = await prisma.formLead.count();
    const totalWhatsapp = await prisma.whatsAppLead.count();

    return NextResponse.json({
      success: true,
      data: {
        formLeads,
        whatsappLeads,
        stats: {
          totalForm,
          totalWhatsapp,
          todayForm: formLeadsToday,
          todayWhatsapp: whatsappLeadsToday,
        },
      },
    });
  } catch (error) {
    console.error("Admin leads fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to fetch leads" },
      { status: 500 }
    );
  }
}
