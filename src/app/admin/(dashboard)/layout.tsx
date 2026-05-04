import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Sidebar from "@/components/admin/Sidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const adminToken = cookieStore.get("admin_token");

  if (!adminToken) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-white">
      <Sidebar />
      <main className="flex-1 min-h-screen ml-60 overflow-y-auto bg-gray-50">
        {children}
      </main>
    </div>
  );
}
