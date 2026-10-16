"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/siteConfig";
import { Logo } from "@/components/ui/Logo";
import { ScrollReveal } from "@/components/motion";
import { Mail, MessageSquare, Phone, ArrowUpRight, ShieldCheck, MapPin, ExternalLink, Github, Linkedin } from "lucide-react";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20 bg-[#101B2B] text-[#F7F6F2] pt-16 pb-12 border-t border-[#34465A] shadow-[0_-24px_48px_rgba(16,27,43,1)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal direction="up" distance={16} duration={0.6} threshold={0.05}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-12 border-b border-[#1D2D40]">
            {/* Col 1 & 2: Brand Identity & Positioning */}
            <div className="lg:col-span-2 space-y-4">
              <Logo variant="light" size="lg" />
              <p className="text-[#F7F6F2] font-sans text-sm sm:text-base leading-relaxed max-w-sm mt-3">
                "{siteConfig.tagline}"
              </p>
              <p className="text-xs text-[#AAB5C2] max-w-sm leading-relaxed">
                Engineering reliable, maintainable software applications, business platforms, and digital solutions for SMEs, institutions, and growing enterprises.
              </p>

              <div className="pt-2 flex items-center gap-3 text-xs text-[#AAB5C2]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#C8A96B]" />
                  {siteConfig.location}
                </span>
                <span className="text-[#34465A]">•</span>
                <span className="text-[#AAB5C2]">Serving Clients Locally & Globally</span>
              </div>
            </div>

            {/* Col 3: Quick Navigation */}
            <div>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#F7F6F2] mb-4">
                Navigation
              </h3>
              <ul className="space-y-2.5 text-sm text-[#F7F6F2]">
                {siteConfig.navLinks.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className="hover:text-[#19B6A4] transition-colors inline-flex items-center gap-1"
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 4: Services */}
            <div>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#F7F6F2] mb-4">
                Services
              </h3>
              <ul className="space-y-2.5 text-sm text-[#F7F6F2]">
                {siteConfig.servicesSummary.map((service) => (
                  <li key={service.id}>
                    <Link
                      href={`/services#${service.slug}`}
                      className="hover:text-[#19B6A4] transition-colors line-clamp-1"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 5: Direct Engagement */}
            <div>
              <h3 className="font-heading font-semibold text-sm uppercase tracking-wider text-[#F7F6F2] mb-4">
                Direct Contact
              </h3>
              <div className="space-y-3 text-sm text-[#AAB5C2]">
                <a
                  href={`mailto:${siteConfig.recipientEmail}?subject=Project%20Inquiry%20-%20Instaweb%20Solutions`}
                  className="group flex items-center gap-2 hover:text-[#19B6A4] transition-colors"
                >
                  <Mail className="w-4 h-4 text-[#19B6A4] flex-shrink-0" />
                  <span className="break-all text-[#F7F6F2] group-hover:text-[#19B6A4] transition-colors">{siteConfig.email}</span>
                </a>

                <a
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    siteConfig.whatsappText
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-2 hover:text-[#19B6A4] transition-colors"
                >
                  <MessageSquare className="w-4 h-4 text-[#19B6A4] flex-shrink-0" />
                  <span className="text-[#F7F6F2] group-hover:text-[#19B6A4] transition-colors">WhatsApp Business Chat</span>
                  <ArrowUpRight className="w-3 h-3 opacity-60 group-hover:opacity-100 text-[#19B6A4]" />
                </a>

                <div className="pt-2 flex items-center gap-3 text-[#AAB5C2]">
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="GitHub"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1D2D40] border border-[#34465A] text-[#F7F6F2] hover:text-[#19B6A4] hover:border-[#19B6A4]/60 hover:bg-[#1D2D40]/80 transition-all duration-200 group text-xs font-medium"
                  >
                    <Github className="w-4 h-4 text-[#F7F6F2] group-hover:text-[#19B6A4] transition-colors" />
                    <span>GitHub</span>
                  </a>
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="LinkedIn"
                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-[#1D2D40] border border-[#34465A] text-[#F7F6F2] hover:text-[#19B6A4] hover:border-[#19B6A4]/60 hover:bg-[#1D2D40]/80 transition-all duration-200 group text-xs font-medium"
                  >
                    <Linkedin className="w-4 h-4 text-[#F7F6F2] group-hover:text-[#19B6A4] transition-colors" />
                    <span>LinkedIn</span>
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom Copyright & Legal Links */}
          <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-[#AAB5C2] font-sans">
            <div>
              © {currentYear} {siteConfig.name}. All rights reserved.
            </div>

            <div className="flex items-center gap-6">
              <Link href="/privacy" className="hover:text-[#F7F6F2] transition-colors">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-[#F7F6F2] transition-colors">
                Terms of Service
              </Link>
              <Link
                href="/admin"
                className="hover:text-[#19B6A4] transition-colors text-[11px] font-mono text-[#526273] hover:underline"
              >
                Admin Console
              </Link>
              <a
                href="#top"
                className="hover:text-[#19B6A4] transition-colors text-[#C8A96B] font-medium"
              >
                Back to Top ↑
              </a>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </footer>
  );
}
