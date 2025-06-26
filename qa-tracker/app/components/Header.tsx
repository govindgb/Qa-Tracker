import Link from "next/link";
import { UserCircle } from "lucide-react";

export default function Header() {
  return (
    <header className="h-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md flex items-center px-6 justify-between fixed top-0 left-64 right-0 z-20">
      {/* Brand Title */}
      <div className="text-xl font-semibold tracking-wide">QA Monitor Dashboard</div>

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
