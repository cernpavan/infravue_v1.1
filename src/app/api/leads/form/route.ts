import { NextResponse } from "next/server";
import { z } from "zod";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/prisma";

// Server-side schema mirrors the client one. Optional fields accept
// null/empty/undefined so legitimate forms don't get rejected on shape.
const formLeadSchema = z.object({
  requestId: z
    .string()
    .min(4)
    .max(64)
    .optional()
    .nullable(),
  name: z.string().trim().min(2).max(120),
  phone: z
    .string()
    .trim()
    .regex(/^[6-9]\d{9}$/, "Invalid 10-digit Indian mobile number"),
  email: z
    .string()
    .trim()
    .max(200)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null))
    .refine(
      (v) => v === null || /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v),
      "Invalid email"
    ),
  serviceType: z.enum([
    "Residential",
    "Commercial",
    "Hospitality",
    "Design & Planning",
    "Finishing & Decor",
  ]),
  city: z
    .string()
    .trim()
    .max(120)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null)),
  message: z
    .string()
    .trim()
    .max(4000)
    .optional()
    .nullable()
    .transform((v) => (v && v.length > 0 ? v : null)),
});

export async function POST(request: Request) {
  // 1. Parse body — malformed JSON gets a clean 400 rather than a 500.
  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { error: "Invalid JSON body" },
      { status: 400 }
    );
  }

  // 2. Validate shape — surface field errors so the client can highlight them.
  const parsed = formLeadSchema.safeParse(raw);
  if (!parsed.success) {
    return NextResponse.json(
      {
        error: "Validation failed",
        issues: parsed.error.issues.map((i) => ({
          path: i.path.join("."),
          message: i.message,
        })),
      },
      { status: 422 }
    );
  }

  const data = parsed.data;

  // 3. Persist — handle known DB error classes with appropriate status codes.
  try {
    const lead = await prisma.formLead.create({
      data: {
        name: data.name,
        phone: data.phone,
        email: data.email,
        serviceType: data.serviceType,
        city: data.city,
        message: data.message,
        requestId: data.requestId ?? null,
      },
    });

    return NextResponse.json({ ok: true, id: lead.id }, { status: 201 });
  } catch (err) {
    // Detailed server-side log — visible via `wrangler tail` on Cloudflare
    // or the deployment platform's log viewer. The client never sees this.
    const message = err instanceof Error ? err.message : String(err);
    const stack = err instanceof Error ? err.stack : undefined;
    console.error("[api/leads/form] DB write failed", { message, stack, data });

    // Known Prisma errors
    if (err instanceof Prisma.PrismaClientKnownRequestError) {
      // Unique constraint, FK violation, etc. — treat as a client problem.
      return NextResponse.json(
        { error: "Could not save submission. Please verify your details." },
        { status: 409 }
      );
    }
    if (err instanceof Prisma.PrismaClientInitializationError) {
      // DB unreachable / DATABASE_URL missing / migrations not applied.
      return NextResponse.json(
        { error: "Service temporarily unavailable. Please try again shortly." },
        { status: 503 }
      );
    }

    return NextResponse.json(
      { error: "Could not save submission. Please try again." },
      { status: 500 }
    );
  }
}
