"use client";

import React from "react";
import Link from "next/link";
import { servicesData } from "@/content/services";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import {
  ArrowRight,
  CheckCircle2,
  Layers,
  Code2,
  ExternalLink,
  MessageSquare,
  HelpCircle,
} from "lucide-react";

export default function ServicesPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeroBanner
        badge="Our Core Capabilities"
        title="What We Can Build for You."
        description="From a professional online presence to complete business applications, Lebby Software Solutions develops digital solutions tailored to your operational goals."
      />

      {/* Services Detailed List - Refined Ivory / Crisp White Surfaces */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 sm:space-y-24">
            {servicesData.map((service, index) => (
              <ScrollReveal
                key={service.slug}
                direction="up"
                distance={28}
                duration={0.7}
                className="w-full"
              >
                <div
                  id={service.slug}
                  className="scroll-mt-24 p-6 sm:p-10 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DDE3E8] shadow-card transition-all duration-200 hover:border-[#19B6A4]/60 hover:shadow-elevated text-[#172331]"
                >
                  <div className="flex flex-col lg:grid lg:grid-cols-12 gap-8 lg:gap-12">
                    {/* Left Column: Number, Title, Overview */}
                    <div className="lg:col-span-5 flex flex-col justify-between">
                      <div>
                        <div className="flex items-center gap-3 mb-4">
                          <span className="font-mono text-base font-extrabold text-[#19B6A4] bg-[#19B6A4]/10 px-3 py-1 rounded border border-[#19B6A4]/30">
                            {service.id}
                          </span>
                          <span className="text-xs font-mono text-[#526273] uppercase tracking-wider">
                            Service Specification
                          </span>
                        </div>

                        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#101B2B] mb-4">
                          {service.title}
                        </h2>

                        <p className="text-sm sm:text-base text-[#526273] leading-relaxed font-sans mb-6">
                          {service.fullDescription}
                        </p>

                        <div className="p-4 rounded-lg bg-[#EEF1F3] border border-[#DDE3E8] mb-6">
                          <span className="text-xs font-mono font-bold uppercase text-[#101B2B] block mb-1">
                            Ideal For:
                          </span>
                          <p className="text-xs text-[#526273] leading-relaxed">
                            {service.targetAudience}
                          </p>
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#DDE3E8]">
                        <Button
                          href={`/contact?service=${encodeURIComponent(service.title)}`}
                          variant="primary"
                          size="md"
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          Inquire About This Service
                        </Button>
                      </div>
                    </div>

                    {/* Right Column: Deliverables, Key Benefits, Tech */}
                    <div className="lg:col-span-7 space-y-6">
                      {/* Deliverables */}
                      <div className="p-5 sm:p-6 rounded-xl bg-[#F7F6F2] border border-[#DDE3E8] shadow-subtle">
                        <h3 className="font-heading font-bold text-sm text-[#101B2B] uppercase tracking-wider mb-4 flex items-center gap-2">
                          <CheckCircle2 className="w-4 h-4 text-[#19B6A4]" />
                          <span>Included Deliverables</span>
                        </h3>
                        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs text-[#526273]">
                          {service.deliverables.map((item) => (
                            <li key={item} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4] mt-1.5 flex-shrink-0" />
                              <span>{item}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Key Benefits */}
                      <div className="p-5 sm:p-6 rounded-xl bg-[#F7F6F2] border border-[#DDE3E8] shadow-subtle">
                        <h3 className="font-heading font-bold text-sm text-[#101B2B] uppercase tracking-wider mb-3">
                          Key Business Value
                        </h3>
                        <div className="space-y-2 text-xs text-[#526273]">
                          {service.keyBenefits.map((benefit) => (
                            <div key={benefit} className="flex items-center gap-2">
                              <span className="text-[#19B6A4] font-bold font-mono">✓</span>
                              <span>{benefit}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Technologies */}
                      <div className="p-4 rounded-lg bg-[#F7F6F2] border border-[#DDE3E8] flex flex-wrap items-center gap-2">
                        <span className="text-xs font-mono font-semibold text-[#526273] mr-2">
                          Tech Stack:
                        </span>
                        {service.technologiesUsed.map((t) => (
                          <span
                            key={t}
                            className="text-[11px] font-mono px-2 py-0.5 bg-white border border-[#DDE3E8] rounded text-[#526273]"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* Services FAQ / How We Work */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            inverted
            kicker="Common Questions"
            title="Service Engagement FAQs"
            description="Clear answers regarding our development timelines, pricing models, and ongoing technical support."
            align="center"
          />

          <StaggerContainer className="space-y-4">
            <StaggerItem>
              <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all text-[#172331]">
                <h3 className="font-heading font-bold text-base text-[#101B2B] mb-2">
                  How do you determine project pricing?
                </h3>
                <p className="text-sm text-[#526273] leading-relaxed font-sans">
                  We believe in transparent, fixed-price milestone quotations. After reviewing your project requirements during our initial discovery call, we prepare a detailed scope document outlining all deliverables, milestones, and a clear budget. You never receive surprise invoices.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all text-[#172331]">
                <h3 className="font-heading font-bold text-base text-[#101B2B] mb-2">
                  How long does an average custom software project take?
                </h3>
                <p className="text-sm text-[#526273] leading-relaxed font-sans">
                  Timelines depend strictly on project scope. A modern business website typically takes 2 to 3 weeks. A focused custom web application or operational system (such as an inventory or fee management portal) generally takes 4 to 8 weeks, delivered in verified weekly milestones.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all text-[#172331]">
                <h3 className="font-heading font-bold text-base text-[#101B2B] mb-2">
                  Can you integrate Safaricom Daraja M-Pesa into my existing platform?
                </h3>
                <p className="text-sm text-[#526273] leading-relaxed font-sans">
                  Yes. We specialize in robust, idempotent Daraja API integrations (STK Push, C2B Paybill, B2C disbursements) with automated webhook verification, duplicate transaction protection, and immediate customer receipt SMS.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all text-[#172331]">
                <h3 className="font-heading font-bold text-base text-[#101B2B] mb-2">
                  Who owns the code and intellectual property once finished?
                </h3>
                <p className="text-sm text-[#526273] leading-relaxed font-sans">
                  You own 100% of the custom code, database, and system assets created for your project upon final milestone settlement. We hand over full GitHub repository access and deployment documentation.
                </p>
              </div>
            </StaggerItem>
          </StaggerContainer>

          <div className="mt-12 text-center">
            <ScrollReveal direction="up" distance={16} duration={0.5}>
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Start Your Service Inquiry
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
