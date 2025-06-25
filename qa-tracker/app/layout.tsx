import { AuthProvider } from "@/context/AuthContext";
import { ReportProvider } from "@/context/ReportContext";
import "./globals.css";
export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html>
      <body>
        <AuthProvider>{
          <ReportProvider>{children}
          </ReportProvider>}
        </AuthProvider>
      </body>
    </html>
  );
}
