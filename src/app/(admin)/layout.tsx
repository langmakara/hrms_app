import AdminSidebar from "@/components/AdminSidebar";
import HeaderAdmin from "@/components/headerAdmin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex">
      {/* Sidebar សម្រាប់ Admin */}
      <AdminSidebar/> 
      
      <main className="flex-1 min-h-screen md:ml-64">
        <HeaderAdmin />
        <div className="p-2">
          {children}
        </div>
      </main>
    </div>
  );
}