import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const { name, phone, email, serviceType, city, message, requestId } = data;

    if (!name || !phone || !serviceType) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const lead = await prisma.formLead.create({
      data: {
        name,
        phone,
        email: email || null,
        serviceType,
        city: city || null,
        message: message || null,
        requestId: requestId || null,
      },
    });

    return NextResponse.json(lead);
  } catch (error) {
    console.error("Form lead error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
