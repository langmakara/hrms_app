import AdminSidebar from "@/components/AdminSidebar";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen">
      {/* Sidebar សម្រាប់ Admin */}
      <AdminSidebar/> 
      
      <main className="flex-1 p-6 bg-gray-50">
        {children}
      </main>
    </div>
  );
}