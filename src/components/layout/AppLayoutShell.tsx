"use client";

import React from "react";
import { usePathname } from "next/navigation";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { BackToTop, PageTransition } from "@/components/motion";
import { AnimatedWorkspaceBackground } from "@/components/ui/AnimatedWorkspaceBackground";
import { FloatingWhatsApp } from "@/components/ui/FloatingWhatsApp";

export function AppLayoutShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdminRoute = pathname?.startsWith("/admin");

  if (isAdminRoute) {
    // Dedicated, independent Admin Dashboard console (no public chrome)
    return (
      <div className="min-h-screen flex flex-col bg-[#090E17] text-[#F7F6F2] font-sans antialiased selection:bg-[#19B6A4] selection:text-[#101B2B]">
        {children}
      </div>
    );
  }

  // Standard public customer-facing website shell
  return (
    <>
      <Navbar />
      <main className="flex-1 flex flex-col relative">
        <AnimatedWorkspaceBackground className="flex-1 flex flex-col">
          <PageTransition>{children}</PageTransition>
        </AnimatedWorkspaceBackground>
      </main>
      <Footer />
      <BackToTop />
      <FloatingWhatsApp />
    </>
  );
}
