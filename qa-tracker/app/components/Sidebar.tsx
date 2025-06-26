"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import {
  LayoutDashboard,
  Settings,
  LogOut,
  Users,
  Bug,
  ClipboardList,
  Menu,
  ChevronLeft,
} from "lucide-react";
import clsx from "clsx";

export default function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
}: {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (val: boolean) => void;
}) {
  const pathname = usePathname();
  const router = useRouter();

  // ✅ Logout handler
  const handleLogout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      if (res.ok) {
        toast.success("Logged out successfully");
        router.push("/login");
      } else {
        toast.error("Logout failed");
      }
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }
  };

  return (
    <aside
      className={clsx(
        "h-screen bg-white border-r border-gray-200 shadow-xl fixed top-0 left-0 z-30 flex flex-col justify-between transition-all duration-300",
        isSidebarOpen ? "w-64" : "w-20"
      )}
    >
      {/* Top */}
      <div>
        {/* Toggle Button */}
        <div className="flex items-center justify-between px-4 pt-4">
          <button
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
            className="text-gray-500 hover:text-indigo-600 focus:outline-none"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <Menu className="w-5 h-5" />
            )}
          </button>
        </div>

        {/* Logo */}
        <div className="flex items-center gap-3 mb-8 mt-4 px-4">
          <div className="p-2 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 shadow-md">
            <Bug className="w-6 h-6 text-white" />
          </div>
          {isSidebarOpen && (
            <h2 className="text-xl font-bold text-gray-800">QA Monitor</h2>
          )}
        </div>

        {/* Navigation */}
        <nav className="space-y-2 px-2">
          <SidebarLink
            href="/dashboard"
            icon={<LayoutDashboard className="w-5 h-5" />}
            label="Dashboard"
            isSidebarOpen={isSidebarOpen}
            active={pathname === "/dashboard"}
          />
          <SidebarLink
            href="/dashboard/users"
            icon={<Users className="w-5 h-5" />}
            label="Users"
            isSidebarOpen={isSidebarOpen}
            active={pathname === "/dashboard/users"}
          />
          <SidebarLink
            href="/dashboard/settings"
            icon={<Settings className="w-5 h-5" />}
            label="Settings"
            isSidebarOpen={isSidebarOpen}
            active={pathname === "/dashboard/settings"}
          />
          <SidebarLink
            href="/dashboard/check-project-status"
            icon={<ClipboardList className="w-5 h-5" />}
            label="Project Status"
            isSidebarOpen={isSidebarOpen}
            active={pathname === "/dashboard/check-project-status"}
          />
        </nav>
      </div>

      {/* Logout */}
      <div className="pt-6 border-t border-gray-100 px-4 mb-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 text-gray-500 hover:text-red-500 transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          {isSidebarOpen && <span className="text-sm font-medium">Logout</span>}
        </button>
      </div>
    </aside>
  );
}

// Sidebar Link Component
function SidebarLink({
  href,
  icon,
  label,
  isSidebarOpen,
  active,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
  isSidebarOpen: boolean;
  active: boolean;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        "flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-all",
        isSidebarOpen ? "justify-start" : "justify-center",
        active
          ? "bg-indigo-100 text-indigo-700"
          : "text-gray-700 hover:bg-indigo-50 hover:text-indigo-600"
      )}
    >
      <div className={clsx("text-indigo-500", active && "text-indigo-700")}>
        {icon}
      </div>
      {isSidebarOpen && <span>{label}</span>}
    </Link>
  );
}
