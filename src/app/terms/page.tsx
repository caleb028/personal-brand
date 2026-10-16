"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/siteConfig";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion";

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-transparent border-b border-[#34465A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="down" distance={12} duration={0.5}>
            <Badge variant="teal" size="md" className="mb-4">
              Commercial Standards
            </Badge>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F7F6F2] tracking-tight">
              Terms of Service
            </h1>
            <p className="mt-4 text-sm text-[#AAB5C2] font-sans">
              Last Updated: October 2026 • Instaweb Solutions Ltd
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Terms Body */}
      <section className="py-16 bg-transparent border-b border-[#34465A]">
          <ScrollReveal direction="up" distance={16} duration={0.6}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#1D2D40]/85 backdrop-blur-md p-8 sm:p-12 rounded-2xl border border-[#34465A] shadow-xl text-sm text-[#AAB5C2] leading-relaxed font-sans space-y-8">
              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  1. Engagement Framework
                </h2>
                <p>
                  These Terms of Service govern professional software development, consulting, systems integration, and maintenance services provided by Instaweb Solutions Ltd to clients. Every commercial project begins with an itemized Statement of Work (SOW) defining explicit deliverables, milestones, and costs.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  2. Intellectual Property & Source Code Ownership
                </h2>
                <p>
                  Upon complete payment of all milestone invoices for a custom project, full intellectual property rights, source code, database architectures, and associated design assets transfer exclusively to the client. Pre-existing open-source libraries or general frameworks remain subject to their respective open-source licenses (e.g. MIT, Apache 2.0).
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  3. Scope & Revisions
                </h2>
                <p>
                  To maintain reliable delivery schedules and prevent misunderstandings, project work is executed strictly against the agreed Statement of Work. Each milestone includes dedicated review and adjustment cycles. Feature requests falling outside the agreed scope are quoted separately as phased enhancements.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  4. Payment & Milestone Invoicing
                </h2>
                <p>
                  Projects are structured into milestone disbursements (typically an initial deposit, progress milestones, and final deployment settlement). Invoices are payable via verified bank wire or commercial M-Pesa business accounts within agreed credit terms.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  5. Warranty & Post-Launch Support
                </h2>
                <p>
                  Completed systems include an agreed warranty window (typically 30 days post-launch) during which any bugs or functional deviations from the specification are resolved at no additional charge. Ongoing maintenance, security patches, and cloud monitoring beyond the warranty window are managed via scheduled support agreements.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  6. Limitation of Liability
                </h2>
                <p>
                  Instaweb Solutions Ltd engineers robust, tested systems following industry best practices. In no event shall Instaweb Solutions Ltd be liable for indirect, incidental, or consequential damages resulting from third-party provider outages (e.g. telecom network downtime, external payment gateway maintenance, or cloud hosting interruptions).
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  7. Inquiries & Governance
                </h2>
                <p>
                  For questions regarding contracts, proposals, or service agreements, please contact us at{" "}
                  <a
                    href={`mailto:${siteConfig.email}`}
                    className="text-[#19B6A4] font-semibold underline hover:text-[#15A392] transition-colors"
                  >
                    {siteConfig.email}
                  </a>
                  .
                </p>
              </div>
            </div>
          </ScrollReveal>
        </section>
    </div>
  );
}
