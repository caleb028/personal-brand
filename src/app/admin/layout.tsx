"use client";

import React from "react";
import { AdminAuthProvider } from "@/context/AdminAuthContext";
import { AdminUIProvider, useAdminUI } from "@/context/AdminUIContext";
import { AdminAuthGate } from "@/components/admin/AdminAuthGate";
import { AdminSidebar } from "@/components/admin/AdminSidebar";
import { X } from "lucide-react";

function AdminLayoutInner({ children }: { children: React.ReactNode }) {
  const { mobileMenuOpen, closeMobileMenu } = useAdminUI();

  return (
    <div className="min-h-screen bg-[#090E17] text-[#F7F6F2] flex">
      {/* Desktop Sidebar */}
      <div className="hidden md:block">
        <AdminSidebar />
      </div>

      {/* Mobile Sidebar Overlay Drawer */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 md:hidden flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-sm"
            onClick={closeMobileMenu}
          />
          <div className="relative w-64 bg-[#0A101D] z-10 flex flex-col h-full shadow-2xl">
            <div className="absolute top-3.5 right-3.5 z-20">
              <button
                onClick={closeMobileMenu}
                className="p-1.5 rounded-lg bg-[#101B2B] text-[#AAB5C2] hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <AdminSidebar onCloseMobile={closeMobileMenu} />
          </div>
        </div>
      )}

      {/* Main Area */}
      <div className="flex-1 flex flex-col min-w-0 overflow-y-auto">
        {children}
      </div>
    </div>
  );
}

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AdminAuthProvider>
      <AdminUIProvider>
        <AdminAuthGate>
          <AdminLayoutInner>{children}</AdminLayoutInner>
        </AdminAuthGate>
      </AdminUIProvider>
    </AdminAuthProvider>
  );
}
