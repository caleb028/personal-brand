"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/content/siteConfig";
import { Logo } from "@/components/ui/Logo";
import { Button } from "@/components/ui/Button";
import { Menu, X, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let ticking = false;
    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsScrolled(window.scrollY > 25);
          ticking = false;
        });
        ticking = true;
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  const isDarkHeader = !isScrolled;

  return (
    <>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-300 backdrop-blur-md",
          isScrolled
            ? "bg-[#101B2B]/95 border-b border-[#34465A] shadow-lg py-3"
            : "bg-[#101B2B]/80 border-b border-[#34465A]/40 py-4"
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Left: Brand Logo */}
            <div className="flex-shrink-0">
              <Logo variant="light" />
            </div>

            {/* Center: Main Navigation */}
            <nav className="hidden md:flex items-center gap-1 lg:gap-2 xl:gap-3" aria-label="Main Navigation">
              {siteConfig.navLinks.map((link) => {
                const isActive =
                  link.href === "/"
                    ? pathname === "/"
                    : pathname.startsWith(link.href);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={cn(
                      "text-xs lg:text-sm font-sans font-medium transition-all duration-150 relative px-2.5 lg:px-3 py-1.5 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19B6A4]",
                      isActive
                        ? "text-[#19B6A4] font-semibold bg-[#1D2D40]/80"
                        : "text-[#F7F6F2] hover:text-[#19B6A4] hover:bg-white/5"
                    )}
                  >
                    {link.label}
                    {isActive && (
                      <span className="absolute bottom-0 left-2.5 right-2.5 h-[2px] bg-[#19B6A4] rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right: Primary CTA and Mobile Menu Toggle */}
            <div className="flex items-center gap-3">
              <div className="hidden sm:block">
                <Button
                  href="/contact"
                  variant="primary"
                  size="md"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Start a Project
                </Button>
              </div>

              {/* Mobile menu button */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden inline-flex items-center justify-center p-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19B6A4] transition-colors text-white hover:bg-white/10"
                aria-expanded={mobileMenuOpen}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? (
                  <X className="w-6 h-6" />
                ) : (
                  <Menu className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Menu Drawer */}
      {mobileMenuOpen && (
        <div
          className="md:hidden fixed inset-0 z-30 bg-black/60 backdrop-blur-sm"
          onClick={() => setMobileMenuOpen(false)}
        >
          <div
            className="fixed inset-y-0 right-0 z-40 w-full max-w-xs bg-[#101B2B] border-l border-[#34465A] shadow-2xl p-6 flex flex-col justify-between"
            onClick={(e) => e.stopPropagation()}
          >
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-[#34465A]">
                <Logo variant="light" />
                <button
                  type="button"
                  onClick={() => setMobileMenuOpen(false)}
                  className="p-1.5 rounded-md text-[#AAB5C2] hover:text-[#F7F6F2] hover:bg-white/10"
                  aria-label="Close menu"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <nav className="mt-6 flex flex-col space-y-3" aria-label="Mobile Navigation">
                {siteConfig.navLinks.map((link) => {
                  const isActive =
                    link.href === "/"
                      ? pathname === "/"
                      : pathname.startsWith(link.href);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className={cn(
                        "text-base font-sans font-medium px-3 py-2.5 rounded-md transition-colors",
                        isActive
                          ? "bg-[#1D2D40] text-[#19B6A4] font-semibold border-l-4 border-[#19B6A4]"
                          : "text-[#F7F6F2] hover:text-[#19B6A4] hover:bg-white/5"
                      )}
                    >
                      {link.label}
                    </Link>
                  );
                })}
              </nav>
            </div>

            <div className="pt-6 border-t border-[#34465A] space-y-4">
              <div className="text-xs text-[#AAB5C2]">
                <p className="font-semibold text-white">{siteConfig.name}</p>
                <p>Nairobi, Kenya • Delivering Worldwide</p>
              </div>
              <Button
                href="/contact"
                variant="primary"
                size="md"
                className="w-full"
                onClick={() => setMobileMenuOpen(false)}
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start a Project
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
