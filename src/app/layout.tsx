import Sidebar from "../components/sidebar";
import Header from "../components/header";
import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="flex">
        {/* Sidebar បោះទីតាំងនៅខាងឆ្វេងជាប់រហូត */}
        <Sidebar />
        {/* Content ត្រូវមាន Margin-Left (ml-64) ដើម្បីកុំឱ្យ Sidebar បាំង */}
        <main className="flex-1 min-h-screen md:ml-64">
          <Header />
          {children}
        </main>
      </body>
    </html> 
  );
}