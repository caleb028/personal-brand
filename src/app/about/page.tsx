"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/siteConfig";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TextReveal,
} from "@/components/motion";
import {
  ArrowRight,
  Code2,
  CheckCircle2,
  ShieldCheck,
  Search,
  Cpu,
  Layers,
  HeartHandshake,
  MessageSquare,
  FileCheck,
} from "lucide-react";

export default function AboutPage() {
  const principles = [
    {
      number: "01",
      title: "Understanding the problem before writing code",
      description:
        "We spend time upfront interviewing stakeholders, analyzing existing workflows, and auditing current bottlenecks. Writing software without deep domain understanding leads to wasted effort.",
    },
    {
      number: "02",
      title: "Designing around actual user needs",
      description:
        "Software must serve the people using it daily—whether that is a school bursar reconciling tuition fees, a weighbridge operator logging grain intake, or a property manager tracking tenant arrears. We prioritize speed, clarity, and ergonomic data entry over flashy distractions.",
    },
    {
      number: "03",
      title: "Choosing appropriate technologies",
      description:
        "We choose boring, battle-tested tools over passing framework trends. Proven technologies like TypeScript, PostgreSQL, and Next.js ensure your system remains stable, secure, and easy to maintain over five to ten years.",
    },
    {
      number: "04",
      title: "Building for performance and maintainability",
      description:
        "Every database query is indexed, every form input is strictly typed with Zod, and UI components are lightweight. The application must perform reliably on standard mobile devices and cellular connections.",
    },
    {
      number: "05",
      title: "Testing before deployment",
      description:
        "We rigorously validate calculations, payment webhooks, and permissions before systems go live. Financial ledgers and grading algorithms are tested with realistic boundary conditions to prevent operational surprises.",
    },
    {
      number: "06",
      title: "Improving systems through feedback",
      description:
        "Software deployment is the beginning of the relationship, not the end. We observe how teams interact with the live system, listen to their feedback, and iterate to remove friction.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHeroBanner
        badge="About Lebby Software Solutions"
        title="Technology Should Solve Problems, Not Create Complexity."
        description="Lebby Software Solutions is a developer-led software development business dedicated to helping organizations, SMEs, and founders turn practical operational needs into dependable digital software."
      />

      {/* The Story & Background */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-10 items-start">
            <div className="md:col-span-4">
              <ScrollReveal direction="right" distance={24} duration={0.65}>
                <div className="flex flex-col items-start p-6 bg-[#1D2D40]/85 backdrop-blur-md rounded-xl border border-[#34465A] shadow-xl">
                  <span className="text-xs font-mono font-bold uppercase text-[#C8A96B] mb-2">
                    Developer Profile
                  </span>
                  <h3 className="font-heading font-bold text-xl text-white mb-1">
                    Lebby
                  </h3>
                  <p className="text-xs text-[#AAB5C2] font-sans mb-4">
                    Lead Software Engineer & Solutions Architect
                  </p>
                  <div className="space-y-2 text-xs font-mono text-[#AAB5C2] w-full pt-4 border-t border-[#34465A]">
                    <div className="flex justify-between">
                      <span className="text-[#AAB5C2]">Location:</span>
                      <span className="font-semibold text-white">Nairobi, Kenya</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#AAB5C2]">Focus:</span>
                      <span className="font-semibold text-white">Full-Stack Web & APIs</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-[#AAB5C2]">Practice:</span>
                      <span className="font-semibold text-white">Direct Engineering</span>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            </div>

            <div className="md:col-span-8">
              <ScrollReveal direction="left" distance={24} duration={0.65}>
                <div className="space-y-6 text-base text-[#AAB5C2] leading-relaxed font-sans">
                  <h2 className="font-heading font-bold text-2xl text-white">
                    The Story Behind the Business
                  </h2>
                  <p>
                    Too often, organizations seeking custom software are caught between two frustrating extremes: large digital agencies with excessive overhead and layers of account managers, or template-builders who deliver generic websites that break down under real business demands.
                  </p>
                  <p>
                    I established <strong className="text-white">Lebby Software Solutions</strong> to offer a direct, highly competent alternative: a software practice where business owners work directly with the engineer designing and building their system.
                  </p>
                  <p>
                    Whether architecting an operations management system for a Kenyan school implementing Competency-Based Education (CBE), developing automated M-Pesa payment ledgers, or creating real-time inventory systems for commercial agricultural millers, my objective is always the same: <em className="text-[#19B6A4] not-italic font-medium">building digital solutions that solve real problems.</em>
                  </p>
                  <p>
                    I do not sell unnecessary bells and whistles or pretend to have an army of distant offshore contractors. When you collaborate with Lebby Software Solutions, you receive clear communication, disciplined project scoping, and clean, maintainable code engineered to stand the test of time.
                  </p>
                </div>
              </ScrollReveal>
            </div>
          </div>
        </div>
      </section>

      {/* How I Approach Software Development - Refined Ivory / Clean Light Surfaces */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            inverted
            kicker="Our Engineering Philosophy"
            title="How I Approach Software Development"
            description="Software development is not simply writing code—it is translating real-world human processes into reliable, intuitive digital workflows."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {principles.map((p) => (
              <StaggerItem key={p.number}>
                <div className="flex flex-col p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all duration-200 h-full text-[#172331]">
                  <span className="font-mono text-xl font-extrabold text-[#19B6A4] mb-3">
                    {p.number}
                  </span>
                  <h3 className="font-heading font-bold text-lg text-[#101B2B] mb-2.5">
                    {p.title}
                  </h3>
                  <p className="text-sm text-[#526273] leading-relaxed">
                    {p.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* Engagement Standards & Client Collaboration */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            inverted
            kicker="Collaboration Standards"
            title="What Working Together Looks Like"
            description="We believe transparent expectations and consistent communication are just as vital as clean code."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StaggerItem>
              <div className="p-6 rounded-xl bg-white/95 backdrop-blur-md border border-[#DDE3E8] h-full hover:border-[#19B6A4]/60 hover:shadow-elevated shadow-card transition-all text-[#172331]">
                <FileCheck className="w-6 h-6 text-[#19B6A4] mb-3" />
                <h4 className="font-heading font-bold text-base text-[#101B2B] mb-1.5">
                  Defined Scope & Transparent Estimates
                </h4>
                <p className="text-xs text-[#526273] leading-relaxed">
                  Before commencing, we agree upon exact deliverables, timelines, and fixed quotations. No surprise charges or vague scope changes.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 rounded-xl bg-white/95 backdrop-blur-md border border-[#DDE3E8] h-full hover:border-[#19B6A4]/60 hover:shadow-elevated shadow-card transition-all text-[#172331]">
                <MessageSquare className="w-6 h-6 text-[#19B6A4] mb-3" />
                <h4 className="font-heading font-bold text-base text-[#101B2B] mb-1.5">
                  Direct Technical Communication
                </h4>
                <p className="text-xs text-[#526273] leading-relaxed">
                  You communicate directly with the engineer building your platform, preventing the misunderstandings common in layered agencies.
                </p>
              </div>
            </StaggerItem>

            <StaggerItem>
              <div className="p-6 rounded-xl bg-white/95 backdrop-blur-md border border-[#DDE3E8] h-full hover:border-[#19B6A4]/60 hover:shadow-elevated shadow-card transition-all text-[#172331]">
                <ShieldCheck className="w-6 h-6 text-[#19B6A4] mb-3" />
                <h4 className="font-heading font-bold text-base text-[#101B2B] mb-1.5">
                  Full Ownership & Post-Launch Care
                </h4>
                <p className="text-xs text-[#526273] leading-relaxed">
                  You own 100% of your software, data, and source repository. We provide post-launch support and training to ensure smooth handover.
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
                Discuss Your Software Requirements
              </Button>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
