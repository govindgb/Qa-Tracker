import Link from "next/link";
import { UserCircle } from "lucide-react";

export default function Header({ isSidebarOpen }: { isSidebarOpen: boolean }) {
  return (
    <header
      className={`h-16 bg-white border-b border-gray-200 shadow-md flex items-center px-6 justify-between fixed top-0 z-20 right-0 transition-all duration-300 ${
        isSidebarOpen ? "left-64" : "left-20"
      }`}
    >
      <div className="text-xl font-bold text-gray-800 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
        QA Monitor Dashboard
      </div>

      {/* ✅ Wrap this block with Link */}
      <Link href="/profile">
        <div className="flex items-center gap-2 text-sm cursor-pointer hover:underline">
          <span className="hidden sm:inline">Welcome, Tester!</span>
          <UserCircle className="w-6 h-6" />
        </div>
      </Link>
    </header>
  );
}
