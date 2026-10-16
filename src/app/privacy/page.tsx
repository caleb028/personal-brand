"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/siteConfig";
import { Badge } from "@/components/ui/Badge";
import { ScrollReveal } from "@/components/motion";

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col w-full">
      {/* Header */}
      <section className="py-16 sm:py-20 bg-transparent border-b border-[#34465A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <ScrollReveal direction="down" distance={12} duration={0.5}>
            <Badge variant="teal" size="md" className="mb-4">
              Legal & Data Stewardship
            </Badge>
            <h1 className="font-heading font-extrabold text-3xl sm:text-4xl text-[#F7F6F2] tracking-tight">
              Privacy Policy
            </h1>
            <p className="mt-4 text-sm text-[#AAB5C2] font-sans">
              Last Updated: October 2026 • Instaweb Solutions Ltd
            </p>
          </ScrollReveal>
        </div>
      </section>

      {/* Policy Body */}
      <section className="py-16 bg-transparent border-b border-[#34465A]">
          <ScrollReveal direction="up" distance={16} duration={0.6}>
            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 bg-[#1D2D40]/85 backdrop-blur-md p-8 sm:p-12 rounded-2xl border border-[#34465A] shadow-xl text-sm text-[#AAB5C2] leading-relaxed font-sans space-y-8">
              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  1. Overview
                </h2>
                <p>
                  Instaweb Solutions Ltd ("we", "us", or "our") respects the privacy of visitors and clients engaging with our website and software development services. This Privacy Policy outlines what information we collect, how it is used, and the measures we take to protect your confidential business data.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  2. Information We Collect
                </h2>
                <p className="mb-2">
                  We collect information that you explicitly submit through our contact forms or direct communications:
                </p>
                <ul className="list-disc pl-5 space-y-1 text-[#AAB5C2]">
                  <li>Full name, email address, phone number, and organization name.</li>
                  <li>Project descriptions, technical requirements, and estimated budgets.</li>
                  <li>Standard technical server logs (browser user-agent, IP address) for security monitoring and spam prevention.</li>
                </ul>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  3. How We Use Your Information
                </h2>
                <p className="mb-2">The information collected is used solely to:</p>
                <ul className="list-disc pl-5 space-y-1 text-[#AAB5C2]">
                  <li>Respond to your project inquiries and provide tailored architectural proposals.</li>
                  <li>Communicate project milestones, deliverables, and service updates.</li>
                  <li>Ensure the security and reliability of our web services.</li>
                </ul>
                <p className="mt-2 font-semibold text-[#19B6A4]">
                  We never sell, rent, or trade your personal or business contact details to any third-party marketing brokers.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  4. Client Confidentiality & Non-Disclosure
                </h2>
                <p>
                  We treat all client business processes, data structures, proprietary algorithms, and trade secrets disclosed during consultations or active engagements with strict confidentiality. Standard Non-Disclosure Agreements (NDAs) are available upon request prior to detailed architectural discovery.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  5. Cookies and Analytics
                </h2>
                <p>
                  Our website uses minimal, privacy-friendly cookies strictly necessary for navigation state and spam protection. We do not use intrusive third-party cross-site trackers.
                </p>
              </div>

              <div>
                <h2 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                  6. Contact & Data Inquiries
                </h2>
                <p>
                  If you have any questions about this Privacy Policy or wish to request the removal of your submitted contact information, please email us directly at{" "}
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
