"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Inbox,
  Layers,
  Send,
  Settings,
  ExternalLink,
  LogOut,
  Shield,
  Activity,
  UserCheck,
  ChevronRight,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { Logo } from "@/components/ui/Logo";

interface AdminSidebarProps {
  onCloseMobile?: () => void;
}

export function AdminSidebar({ onCloseMobile }: AdminSidebarProps) {
  const pathname = usePathname();
  const { logout } = useAdminAuth();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch("/api/admin/stats");
        if (res.ok) {
          const data = await res.json();
          setUnreadCount(data.stats?.unread || 0);
        }
      } catch {
        // silent fallback
      }
    };
    fetchUnread();
    const interval = setInterval(fetchUnread, 3500);

    const handleFocus = () => fetchUnread();
    window.addEventListener("focus", handleFocus);
    document.addEventListener("visibilitychange", handleFocus);

    return () => {
      clearInterval(interval);
      window.removeEventListener("focus", handleFocus);
      document.removeEventListener("visibilitychange", handleFocus);
    };
  }, []);

  const navItems = [
    {
      label: "Overview",
      href: "/admin",
      icon: LayoutDashboard,
      exact: true,
    },
    {
      label: "Enquiries Manager",
      href: "/admin/enquiries",
      icon: Inbox,
      badge: unreadCount > 0 ? unreadCount : undefined,
    },
    {
      label: "Services & Capabilities",
      href: "/admin/services",
      icon: Layers,
    },
    {
      label: "Direct Comms & WhatsApp",
      href: "/admin/comms",
      icon: Send,
    },
    {
      label: "Console Settings",
      href: "/admin/settings",
      icon: Settings,
    },
  ];

  return (
    <aside className="w-64 bg-[#0A101D] border-r border-[#1D2D40] flex flex-col justify-between h-screen sticky top-0 z-30 select-none">
      {/* Top Brand Section */}
      <div>
        <div className="p-5 border-b border-[#1D2D40] flex items-center justify-between">
          <div>
            <Logo variant="light" size="sm" />
            <div className="mt-1.5 flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-wider text-[#19B6A4]">
              <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4] animate-pulse"></span>
              <span>Operations Console</span>
            </div>
          </div>
        </div>

        {/* Navigation Items */}
        <div className="px-3 py-4 space-y-1">
          <div className="px-3 pb-2 text-[10px] font-mono uppercase tracking-wider text-[#526273]">
            Core Operations
          </div>
          {navItems.map((item) => {
            const isActive = item.exact
              ? pathname === item.href
              : pathname.startsWith(item.href);

            const Icon = item.icon;

            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onCloseMobile}
                className={`flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-[#19B6A4] text-[#101B2B] font-semibold shadow-glow"
                    : "text-[#AAB5C2] hover:text-white hover:bg-[#1D2D40]/60"
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon
                    className={`w-4 h-4 ${
                      isActive ? "text-[#101B2B]" : "text-[#AAB5C2]"
                    }`}
                  />
                  <span>{item.label}</span>
                </div>

                {item.badge !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold ${
                      isActive
                        ? "bg-[#101B2B] text-[#19B6A4]"
                        : "bg-[#FF2A4D] text-white animate-pulse"
                    }`}
                  >
                    {item.badge}
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {/* Bottom Footer Section */}
      <div className="p-3 border-t border-[#1D2D40] space-y-2 bg-[#080D17]">
        {/* Public Website Preview Link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center justify-between px-3 py-2 rounded-lg text-xs font-mono text-[#AAB5C2] hover:text-[#19B6A4] hover:bg-[#1D2D40]/50 transition-colors"
        >
          <div className="flex items-center gap-2">
            <ExternalLink className="w-3.5 h-3.5" />
            <span>Open Public Site</span>
          </div>
          <ChevronRight className="w-3.5 h-3.5 opacity-60" />
        </Link>

        {/* Admin Profile & Lock Button */}
        <div className="flex items-center justify-between p-2.5 rounded-xl bg-[#101B2B] border border-[#1D2D40]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#19B6A4]/20 border border-[#19B6A4]/40 flex items-center justify-center text-[#19B6A4] font-bold text-xs">
              AD
            </div>
            <div>
              <div className="text-xs font-bold text-white flex items-center gap-1.5">
                <span>Master Admin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
              </div>
              <div className="text-[10px] font-mono text-[#AAB5C2]">
                Superuser Role
              </div>
            </div>
          </div>

          <button
            onClick={logout}
            title="Lock Console / Sign Out"
            className="p-1.5 rounded-lg text-[#AAB5C2] hover:text-red-400 hover:bg-red-950/40 transition-colors"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
