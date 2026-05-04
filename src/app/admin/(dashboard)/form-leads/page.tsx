import { prisma } from "@/lib/prisma";
import FormLeadsTable from "@/components/admin/FormLeadsTable";

export const dynamic = "force-dynamic";
export const metadata = { title: "Form Leads - Admin - Infravue" };

interface SerializedFormLead {
  id: string;
  requestId: string | null;
  name: string;
  phone: string;
  email: string | null;
  serviceType: string;
  city: string | null;
  message: string | null;
  source: string;
  createdAt: string;
  updatedAt: string;
}

export default async function FormLeadsPage() {
  const leads = await prisma.formLead.findMany({
    orderBy: { createdAt: "desc" },
  });

  // Serialize dates
  const serializedLeads: SerializedFormLead[] = leads.map((lead) => ({
    ...lead,
    createdAt: lead.createdAt.toISOString(),
    updatedAt: lead.updatedAt.toISOString(),
  }));

  return (
    <div className="p-8 space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-4xl font-bold text-black mb-2">Form Submissions</h1>
        <p className="text-gray-600">All leads from booking form submissions.</p>
      </div>

      {/* Table */}
      <FormLeadsTable initialLeads={serializedLeads} />
    </div>
  );
}
