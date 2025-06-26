import Sidebar from "@/app/components/Sidebar";
import Header from "@/app/components/Header";
import Footer from "@/app/components/Footer";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen">
      <Sidebar />
      <div className="ml-64 pt-16 pb-12"> 
        <Header />
        <main className="p-6">{children}</main>
        <Footer />
      </div>
    </div>
  );
}
