"use client";

import React from "react";
import Link from "next/link";
import {
  Menu,
  Bell,
  PlusCircle,
  ExternalLink,
  ShieldCheck,
  Lock,
} from "lucide-react";
import { useAdminAuth } from "@/context/AdminAuthContext";
import { useAdminUI } from "@/context/AdminUIContext";

interface AdminHeaderProps {
  title: string;
  subtitle?: string;
  onOpenNewInquiry?: () => void;
}

export function AdminHeader({
  title,
  subtitle,
  onOpenNewInquiry,
}: AdminHeaderProps) {
  const { logout } = useAdminAuth();
  const { openMobileMenu } = useAdminUI();

  return (
    <header className="sticky top-0 z-20 bg-[#0A101D]/90 backdrop-blur-md border-b border-[#1D2D40] px-4 sm:px-6 lg:px-8 py-3.5 flex items-center justify-between">
      {/* Left: Mobile hamburger & Page Title */}
      <div className="flex items-center gap-3">
        <button
          onClick={openMobileMenu}
          className="md:hidden p-2 rounded-lg bg-[#101B2B] border border-[#1D2D40] text-[#AAB5C2] hover:text-white"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div>
          <h1 className="text-base sm:text-lg font-heading font-bold text-white tracking-tight flex items-center gap-2">
            <span>{title}</span>
          </h1>
          {subtitle && (
            <p className="text-xs text-[#AAB5C2] hidden sm:block">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right: Quick actions & status */}
      <div className="flex items-center gap-2.5 sm:gap-4">
        {/* Live System Operational Indicator */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-1 rounded-full bg-[#101B2B] border border-[#1D2D40] text-[11px] font-mono text-[#AAB5C2]">
          <span className="w-2 h-2 rounded-full bg-[#19B6A4] animate-pulse"></span>
          <span>Engine: Operational</span>
        </div>

        {/* Log New Inquiry Button */}
        {onOpenNewInquiry && (
          <button
            onClick={onOpenNewInquiry}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#19B6A4] hover:bg-[#15A392] text-[#101B2B] font-heading font-bold text-xs shadow-glow transition-all duration-150"
          >
            <PlusCircle className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Log New Inquiry</span>
            <span className="sm:hidden">New</span>
          </button>
        )}

        {/* Public site link */}
        <Link
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#101B2B] hover:bg-[#1D2D40] border border-[#1D2D40] text-[#AAB5C2] hover:text-white text-xs transition-colors"
          title="Open live website in new tab"
        >
          <ExternalLink className="w-3.5 h-3.5 text-[#19B6A4]" />
          <span>Live Site</span>
        </Link>

        {/* Lock Console Button */}
        <button
          onClick={logout}
          title="Lock Console"
          className="p-2 rounded-lg bg-[#101B2B] hover:bg-red-950/40 border border-[#1D2D40] text-[#AAB5C2] hover:text-red-400 text-xs transition-colors"
        >
          <Lock className="w-4 h-4" />
        </button>
      </div>
    </header>
  );
}
