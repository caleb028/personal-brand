"use client";

import React from "react";
import Link from "next/link";
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
  Clock,
  ShieldCheck,
  FileText,
  Workflow,
  Search,
  PenTool,
  Code2,
  Rocket,
  Headphones,
} from "lucide-react";

export default function ProcessPage() {
  const stages = [
    {
      number: "01",
      name: "Discovery",
      subtitle: "Understanding your business, objectives, and constraints",
      icon: Search,
      duration: "1 to 2 Weeks",
      details: [
        "In-depth discussions to understand your operational workflows and business objectives.",
        "Auditing existing tools, spreadsheets, or legacy systems to identify points of friction.",
        "Mapping user personas: Who will operate the system daily? What are their technical skills?",
        "Documenting regulatory, payment, or institutional requirements (e.g. CBC grading or Daraja M-Pesa specs).",
      ],
      deliverable: "Project Discovery Summary & Functional Requirements Document",
    },
    {
      number: "02",
      name: "Planning",
      subtitle: "Defining scope, milestones, and architectural approach",
      icon: FileText,
      duration: "3 to 5 Days",
      details: [
        "Drafting entity-relationship database schemas and technical architecture.",
        "Establishing an explicit, itemized scope of work to prevent scope creep.",
        "Structuring realistic milestone schedules with clearly defined verification dates.",
        "Providing a transparent, fixed-price quotation with no hidden costs.",
      ],
      deliverable: "Technical Specification Document & Milestone Agreement",
    },
    {
      number: "03",
      name: "Design",
      subtitle: "Developing intuitive interfaces and clear user experiences",
      icon: PenTool,
      duration: "1 to 2 Weeks",
      details: [
        "Wireframing ergonomic application workflows prioritizing operator efficiency.",
        "Selecting clear typography, accessible contrast, and high-visibility status indicators.",
        "Designing responsive layouts optimized for both mobile devices and wide desktop monitors.",
        "Reviewing clickable interactive prototypes with your team before writing production code.",
      ],
      deliverable: "UI Component System & Validated Prototype Screens",
    },
    {
      number: "04",
      name: "Development & Testing",
      subtitle: "Building the software, validating edge cases, and resolving issues",
      icon: Code2,
      duration: "2 to 6 Weeks (Milestone-based)",
      details: [
        "Writing clean, strictly typed TypeScript code and Next.js / Node.js handlers.",
        "Implementing ACID-compliant PostgreSQL schemas with Prisma ORM.",
        "Building idempotent payment webhooks and asynchronous background workers.",
        "Conducting integration testing for calculations, permissions, and network dropouts.",
        "Weekly progress previews where you interact with live milestone builds.",
      ],
      deliverable: "Tested Staging Environment & Weekly Milestone Demos",
    },
    {
      number: "05",
      name: "Launch & Support",
      subtitle: "Production deployment, staff onboarding, and post-launch stewardship",
      icon: Rocket,
      duration: "Agreed Post-Launch Window",
      details: [
        "Deploying production infrastructure to secure cloud environments with SSL and backups.",
        "Conducting staff training sessions and providing operational manuals.",
        "Monitoring real-world transactions and system telemetry during early adoption.",
        "Providing agreed warranty support for bug fixes and technical adjustments.",
      ],
      deliverable: "Live Production System, Full Source Code Ownership & Admin Training",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHeroBanner
        badge="Structured Engineering"
        title="A Clear Process. From Idea to Launch."
        description="We follow a disciplined, five-stage engineering process designed to eliminate uncertainty, ensure transparent communication, and deliver dependable software."
      />

      {/* 5-Stage Timeline Sequence */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-12 sm:space-y-16">
            {stages.map((stage, idx) => {
              const Icon = stage.icon;
              return (
                <ScrollReveal
                  key={stage.number}
                  direction="up"
                  distance={28}
                  duration={0.65}
                  className="w-full"
                >
                  <div className="p-6 sm:p-10 rounded-2xl bg-[#1D2D40]/85 backdrop-blur-md border border-[#34465A] hover:border-[#19B6A4]/60 hover:shadow-xl transition-all duration-200 relative">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-[#34465A] mb-6">
                      <div className="flex items-center gap-3">
                        <span className="font-mono text-xl font-extrabold text-[#19B6A4] bg-[#19B6A4]/15 px-3 py-1 rounded border border-[#19B6A4]/30">
                          {stage.number}
                        </span>
                        <div>
                          <h2 className="font-heading font-extrabold text-2xl text-[#F7F6F2]">
                            {stage.name}
                          </h2>
                          <p className="text-xs text-[#AAB5C2] font-sans mt-0.5">
                            {stage.subtitle}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#AAB5C2] bg-[#101B2B]/90 px-3 py-1 rounded border border-[#34465A] self-start sm:self-auto">
                        <Clock className="w-3.5 h-3.5 text-[#C8A96B]" />
                        <span>Typical Timeframe: {stage.duration}</span>
                      </div>
                    </div>

                    {/* Stage Activities */}
                    <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                      <div className="md:col-span-8">
                        <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#AAB5C2] mb-3">
                          Key Activities & Engineering Focus:
                        </h3>
                        <ul className="space-y-2.5 text-xs sm:text-sm text-[#F7F6F2]">
                          {stage.details.map((detail, dIdx) => (
                            <li key={dIdx} className="flex items-start gap-2.5">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4] mt-2 flex-shrink-0" />
                              <span className="leading-relaxed">{detail}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="md:col-span-4 p-4 rounded-xl bg-[#101B2B]/90 border border-[#34465A] text-xs">
                        <span className="font-mono text-[#C8A96B] uppercase block mb-1">
                          Phase Deliverable:
                        </span>
                        <p className="font-bold text-white leading-relaxed">
                          {stage.deliverable}
                        </p>
                      </div>
                    </div>
                  </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Client Engagement Framework - Refined Ivory / Clean Light Surfaces */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            inverted
            kicker="Engagement Standards"
            title="Built Through Clear Communication."
            description="Our engagement framework guarantees complete transparency at every stage of the project."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <StaggerItem>
              <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all h-full text-[#172331]">
                <span className="text-xs font-mono font-bold text-[#19B6A4] block mb-2">Step 1</span>
                <h3 className="font-heading font-bold text-base text-[#101B2B] mb-1.5">
                  Initial Consultation
                </h3>
                <p className="text-xs text-[#526273] leading-relaxed">
                  A 30-minute discovery discussion to evaluate your requirements and assess whether we are the right technical fit for your project.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all h-full text-[#172331]">
                <span className="text-xs font-mono font-bold text-[#19B6A4] block mb-2">Step 2</span>
                <h3 className="font-heading font-bold text-base text-[#101B2B] mb-1.5">
                  Scope & Quotation
                </h3>
                <p className="text-xs text-[#526273] leading-relaxed">
                  You receive a clear, binding proposal itemizing deliverables, technical architecture, timeline milestones, and fixed costs.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all h-full text-[#172331]">
                <span className="text-xs font-mono font-bold text-[#19B6A4] block mb-2">Step 3</span>
                <h3 className="font-heading font-bold text-base text-[#101B2B] mb-1.5">
                  Milestone Invoicing
                </h3>
                <p className="text-xs text-[#526273] leading-relaxed">
                  Payments are linked strictly to completed, verifiable milestones rather than arbitrary calendar dates.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all h-full text-[#172331]">
                <span className="text-xs font-mono font-bold text-[#19B6A4] block mb-2">Step 4</span>
                <h3 className="font-heading font-bold text-base text-[#101B2B] mb-1.5">
                  Weekly Demos
                </h3>
                <p className="text-xs text-[#526273] leading-relaxed">
                  Regular staging demonstrations ensure you see progress as it happens, allowing for early feedback before finalization.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all h-full text-[#172331]">
                <span className="text-xs font-mono font-bold text-[#19B6A4] block mb-2">Step 5</span>
                <h3 className="font-heading font-bold text-base text-[#101B2B] mb-1.5">
                  Acceptance & Handover
                </h3>
                <p className="text-xs text-[#526273] leading-relaxed">
                  Rigorous testing against agreed specifications, full deployment to your domains, and transfer of all code repositories.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all h-full text-[#172331]">
                <span className="text-xs font-mono font-bold text-[#19B6A4] block mb-2">Step 6</span>
                <h3 className="font-heading font-bold text-base text-[#101B2B] mb-1.5">
                  Post-Launch Support
                </h3>
                <p className="text-xs text-[#526273] leading-relaxed">
                  Agreed warranty window for immediate bug resolution plus optional monthly maintenance agreements for ongoing peace of mind.
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
                Discuss Your Project Timeline
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
