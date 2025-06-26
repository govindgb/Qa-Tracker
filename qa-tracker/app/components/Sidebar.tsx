import Link from "next/link";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Users,
  Bug,
  ClipboardList,
} from "lucide-react";

export default function Sidebar() {
  return (
    <aside className="w-64 h-screen bg-gradient-to-b from-blue-600 to-purple-700 text-white fixed top-0 left-0 shadow-xl flex flex-col justify-between py-8 px-6 z-30">
      {/* Logo */}
      <div>
        <div className="flex items-center gap-3 mb-10 px-2">
          <Bug className="w-7 h-7 text-white" />
          <h2 className="text-2xl font-bold tracking-wide">QA Monitor</h2>
        </div>

        {/* Navigation */}
        <nav className="space-y-6">
          <SidebarLink href="/dashboard" icon={<LayoutDashboard />} label="Dashboard" />
          <SidebarLink href="/dashboard/users" icon={<Users />} label="Users" />
          <SidebarLink href="/dashboard/settings" icon={<Settings />} label="Settings" />
          <SidebarLink
            href="/dashboard/check-project-status"
            icon={<ClipboardList />}
            label="Project Status"
          />
        </nav>
      </div>

      {/* Logout */}
      <div>
        <Link
          href="/logout"
          className="flex items-center gap-3 text-white/80 hover:text-red-300 transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm font-medium">Logout</span>
        </Link>
      </div>
    </aside>
  );
}

// Reusable Sidebar Link Component
function SidebarLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <Link
      href={href}
      className="flex items-center gap-3 text-white/90 hover:text-yellow-300 transition-all"
    >
      <div className="w-5 h-5">{icon}</div>
      <span className="text-sm font-medium">{label}</span>
    </Link>
  );
}
