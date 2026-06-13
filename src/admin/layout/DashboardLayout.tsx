"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  LayoutDashboard,
  FileText,
  Users,
  Settings,
  LogOut,
  Search,
  Bell,
  ChevronRight,
  Menu,
  X,
} from "lucide-react";
import { useAuth } from "@/hooks/use-auth";

const navItems = [
  { label: "Overview", icon: LayoutDashboard, path: "/admin/dashboard" },
  { label: "Leads", icon: FileText, path: "/admin/leads" },
  { label: "Users", icon: Users, path: "/admin/users" },
  { label: "Settings", icon: Settings, path: "/admin/settings" },
];

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Don't block login page - always render it
  const isLoginPage = pathname === "/admin/login";

  // Show loading spinner only on protected pages
  if (loading && !isLoginPage) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-[#06B6D4] border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  // On protected pages, if no user, show access denied instead of blank
  if (!user && !isLoginPage) {
    return (
      <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center">
        <div className="text-center">
          <p className="text-[#0F172A]/60 mb-4">Please sign in to access the dashboard.</p>
          <a
            href="/admin/login"
            className="inline-flex items-center gap-2 bg-[#06B6D4] text-white px-6 py-3 rounded-xl font-semibold"
          >
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  // Login page renders without dashboard chrome
  if (isLoginPage) {
    return <>{children}</>;
  }

  // Protected dashboard pages
  const currentPage =
    navItems.find((n) => n.path === pathname)?.label || "Dashboard";

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed left-0 top-0 bottom-0 w-[280px] bg-[#0F172A] z-50 transition-transform duration-300 ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full lg:translate-x-0"
        }`}
      >
        <div className="h-16 flex items-center px-6 border-b border-white/5">
          <Link
            href="/"
            className="text-xl font-extrabold text-white tracking-tight"
          >
            QuickFix<span className="text-[#06B6D4]">.</span>
          </Link>
          <button
            onClick={() => setSidebarOpen(false)}
            className="ml-auto lg:hidden text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="p-4 space-y-1">
          {navItems.map((item) => {
            const isActive = pathname === item.path;
            return (
              <Link
                key={item.path}
                href={item.path}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? "bg-[#06B6D4]/10 text-[#06B6D4] border-l-2 border-l-[#06B6D4]"
                    : "text-white/60 hover:text-white hover:bg-white/5"
                }`}
              >
                <item.icon className="w-5 h-5" />
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-[#06B6D4]/20 flex items-center justify-center">
              <span className="text-sm font-bold text-[#06B6D4]">
                {user?.name?.[0] || "?"}
              </span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-white truncate">
                {user?.name || "User"}
              </p>
              <p className="text-xs text-white/40 capitalize">
                {user?.role || "guest"}
              </p>
            </div>
            <button
              onClick={logout}
              className="text-white/40 hover:text-[#EF4444] transition-colors"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="lg:ml-[280px]">
        <header className="h-16 bg-white border-b border-[rgba(15,23,42,0.06)] flex items-center justify-between px-4 md:px-8 sticky top-0 z-30">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 text-[#0F172A]/60 hover:text-[#0F172A]"
            >
              <Menu className="w-5 h-5" />
            </button>
            <nav className="flex items-center text-sm text-[#0F172A]/40">
              <span>Dashboard</span>
              <ChevronRight className="w-4 h-4 mx-1" />
              <span className="text-[#0F172A] font-medium">{currentPage}</span>
            </nav>
          </div>

          <div className="flex items-center gap-3">
            <button className="p-2 text-[#0F172A]/40 hover:text-[#0F172A] transition-colors relative">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-[#0F172A]/40 hover:text-[#0F172A] transition-colors relative">
              <Bell className="w-5 h-5" />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-[#EF4444] rounded-full" />
            </button>
            <div className="flex items-center gap-2 ml-2">
              <div className="w-8 h-8 rounded-full bg-[#06B6D4]/20 flex items-center justify-center">
                <span className="text-xs font-bold text-[#06B6D4]">
                  {user?.name?.[0] || "?"}
                </span>
              </div>
              <span className="text-sm font-medium text-[#0F172A] hidden md:block">
                {user?.name || "User"}
              </span>
            </div>
          </div>
        </header>

        <main className="p-4 md:p-8">{children}</main>
      </div>
    </div>
  );
}
