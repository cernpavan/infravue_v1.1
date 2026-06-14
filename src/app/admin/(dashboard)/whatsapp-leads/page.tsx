import { prisma } from "@/lib/prisma";
import WhatsAppLeadsTable from "@/components/admin/WhatsAppLeadsTable";

export const dynamic = "force-dynamic";
export const metadata = { title: "WhatsApp Leads - Admin - Infravue" };

interface SerializedWhatsAppLead {
  id: string;
  requestId: string;
  source: string;
  clickCount: number;
  lastClickedAt: string;
  createdAt: string;
}

export default async function WhatsAppLeadsPage() {
  const leads = await prisma.whatsAppLead.findMany({
    orderBy: { lastClickedAt: "desc" },
  });

  // Serialize dates
  const serializedLeads: SerializedWhatsAppLead[] = leads.map((lead) => ({
    id: lead.id,
    requestId: lead.requestId,
    source: lead.source,
    clickCount: lead.clickCount,
    lastClickedAt: lead.lastClickedAt.toISOString(),
    createdAt: lead.createdAt.toISOString(),
  }));

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-black mb-2">WhatsApp Leads</h1>
        <p className="text-gray-600">Leads from WhatsApp conversations.</p>
      </div>

      {/* Table */}
      <WhatsAppLeadsTable initialLeads={serializedLeads} />
    </div>
  );
}
