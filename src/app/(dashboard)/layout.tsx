
import Sidebar from "../../components/sidebar";
import Header from "../../components/header";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 min-h-screen md:ml-64">
        <Header />
        <div className="p-2">
          {children}
        </div>
      </main>
    </div>
  );
}