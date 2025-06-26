import { AuthProvider } from "@/context/AuthContext";
import { ReportProvider } from "@/context/ReportContext";
import "./globals.css";
import { Toaster } from "sonner"; 

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Toaster richColors position="top-center" /> 
        <AuthProvider>
          <ReportProvider>{children}</ReportProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
