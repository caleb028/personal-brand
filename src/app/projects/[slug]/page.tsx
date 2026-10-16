"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { projects } from "@/content/projects";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ScrollReveal,
  TextReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Cpu,
  Database,
  Layers,
  Terminal,
  ShieldCheck,
  AlertCircle,
  ExternalLink,
} from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export default function ProjectDetailPage({ params }: Props) {
  const project = projects.find((p) => p.slug === params.slug);

  if (!project) {
    notFound();
  }

  const { caseStudy } = project;

  return (
    <div className="flex flex-col w-full">
      {/* Top Breadcrumb & Nav Header */}
      <div className="py-6 bg-[#101B2B]/90 backdrop-blur-md border-b border-[#34465A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#AAB5C2] hover:text-white transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Projects</span>
          </Link>
        </div>
      </div>

      {/* Case Study Hero */}
      <section className="py-12 sm:py-16 bg-transparent border-b border-[#34465A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down" distance={12} duration={0.5}>
            <div className="flex flex-wrap items-center gap-2.5 mb-4">
              <Badge variant="gold" size="md">
                {project.status}
              </Badge>
              <span className="text-xs font-mono text-[#AAB5C2]">
                {project.category}
              </span>
              <span className="text-[#34465A]">•</span>
              <span className="text-xs font-mono text-[#C8A96B]">
                Deployment Year: {project.deploymentYear}
              </span>
            </div>
          </ScrollReveal>

          <TextReveal
            as="h1"
            duration={0.8}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.15] mb-4"
          >
            {project.title}
          </TextReveal>

          <ScrollReveal direction="up" delay={0.12} distance={18} duration={0.65}>
            <p className="font-sans text-base sm:text-xl text-[#F7F6F2] font-medium leading-relaxed max-w-3xl mb-6">
              {project.subtitle}
            </p>
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button
                href={project.liveUrl}
                external
                variant="primary"
                size="md"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                View the Site
              </Button>
            </div>
          </ScrollReveal>

          {/* Quick Meta Grid */}
          <ScrollReveal direction="up" delay={0.2} distance={20} duration={0.65}>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-5 rounded-xl bg-[#1D2D40]/85 backdrop-blur-md border border-[#34465A] text-xs">
              <div>
                <span className="font-mono text-[#AAB5C2] uppercase block mb-1">
                  Sector
                </span>
                <span className="font-semibold text-white">
                  {project.clientSector}
                </span>
              </div>
              <div>
                <span className="font-mono text-[#AAB5C2] uppercase block mb-1">
                  Engineering Role
                </span>
                <span className="font-semibold text-white">
                  Full-Stack Architecture
                </span>
              </div>
              <div>
                <span className="font-mono text-[#AAB5C2] uppercase block mb-1">
                  Database Engine
                </span>
                <span className="font-semibold text-white">
                  PostgreSQL (Prisma ORM)
                </span>
              </div>
              <div>
                <span className="font-mono text-[#AAB5C2] uppercase block mb-1">
                  Integrations
                </span>
                <span className="font-semibold text-white">
                  Daraja M-Pesa / SMS
                </span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Deep Case Study Body */}
      <section className="py-12 sm:py-16 bg-transparent border-b border-[#34465A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
          {/* 1. Project Overview */}
          <ScrollReveal direction="up" distance={24} duration={0.65}>
            <div className="p-6 sm:p-8 bg-[#1D2D40]/85 backdrop-blur-md rounded-2xl border border-[#34465A] shadow-xl">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#19B6A4]"></span>
                <span>1. Project Overview</span>
              </h2>
              <p className="font-sans text-base text-[#F7F6F2] leading-relaxed">
                {caseStudy.overview}
              </p>
            </div>
          </ScrollReveal>

          {/* 2. The Problem Being Addressed */}
          <ScrollReveal direction="up" distance={24} duration={0.65}>
            <div className="p-6 sm:p-8 bg-[#1D2D40]/85 backdrop-blur-md rounded-2xl border border-[#34465A] shadow-xl">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8A96B]"></span>
                <span>2. The Operational Problem Addressed</span>
              </h2>
              <div className="space-y-3">
                {caseStudy.problemDetails.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#F7F6F2] leading-relaxed">
                    <span className="font-mono font-bold text-[#C8A96B] bg-[#C8A96B]/15 border border-[#C8A96B]/30 px-2 py-0.5 rounded text-xs mt-0.5">
                      Issue 0{idx + 1}
                    </span>
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 3. The Proposed Solution */}
          <ScrollReveal direction="up" distance={24} duration={0.65}>
            <div className="p-6 sm:p-8 bg-[#1D2D40]/85 backdrop-blur-md rounded-2xl border border-[#34465A] shadow-xl">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#19B6A4]"></span>
                <span>3. The Engineered Solution</span>
              </h2>
              <div className="space-y-3">
                {caseStudy.solutionDetails.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#F7F6F2] leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#19B6A4] flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 4. Key Features Delivered */}
          <ScrollReveal direction="up" distance={24} duration={0.65}>
            <div className="p-6 sm:p-8 bg-[#1D2D40]/85 backdrop-blur-md rounded-2xl border border-[#34465A] shadow-xl">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#19B6A4]"></span>
                <span>4. Core System Features</span>
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {caseStudy.keyFeatures.map((feat) => (
                  <div
                    key={feat.title}
                    className="p-5 rounded-xl bg-[#101B2B]/90 border border-[#34465A]"
                  >
                    <h3 className="font-heading font-bold text-base text-white mb-2">
                      {feat.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-[#AAB5C2] leading-relaxed">
                      {feat.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 5. Architecture & Technology Stack */}
          <ScrollReveal direction="up" distance={24} duration={0.65}>
            <div className="p-6 sm:p-8 bg-[#1D2D40]/85 backdrop-blur-md rounded-2xl border border-[#34465A] shadow-xl">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#19B6A4]"></span>
                <span>5. Architecture & Stack Specification</span>
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
                <div className="p-4 rounded-lg bg-[#101B2B]/90 border border-[#34465A]">
                  <span className="text-[#AAB5C2] uppercase block mb-1">Frontend Layer</span>
                  <span className="text-white font-semibold">{caseStudy.architecture.frontend}</span>
                </div>
                <div className="p-4 rounded-lg bg-[#101B2B]/90 border border-[#34465A]">
                  <span className="text-[#AAB5C2] uppercase block mb-1">Backend & API Layer</span>
                  <span className="text-white font-semibold">{caseStudy.architecture.backend}</span>
                </div>
                <div className="p-4 rounded-lg bg-[#101B2B]/90 border border-[#34465A]">
                  <span className="text-[#AAB5C2] uppercase block mb-1">Database & ORM</span>
                  <span className="text-white font-semibold">{caseStudy.architecture.database}</span>
                </div>
                <div className="p-4 rounded-lg bg-[#101B2B]/90 border border-[#34465A]">
                  <span className="text-[#AAB5C2] uppercase block mb-1">External Integrations</span>
                  <span className="text-white font-semibold">{caseStudy.architecture.integrations}</span>
                </div>
              </div>
            </div>
          </ScrollReveal>

          {/* 6. Engineering Challenges & Design Decisions */}
          <ScrollReveal direction="up" distance={24} duration={0.65}>
            <div className="p-6 sm:p-8 bg-[#1D2D40]/85 backdrop-blur-md rounded-2xl border border-[#34465A] shadow-xl">
              <h2 className="font-heading font-bold text-xl sm:text-2xl text-white mb-6 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#C8A96B]"></span>
                <span>6. Engineering Challenges & Design Decisions</span>
              </h2>
              <div className="space-y-4">
                {caseStudy.engineeringChallenges.map((ec, idx) => (
                  <div key={idx} className="p-5 rounded-xl bg-[#101B2B]/90 border border-[#34465A]">
                    <div className="font-sans font-bold text-sm text-white mb-2 flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                      <span>Challenge: {ec.challenge}</span>
                    </div>
                    <div className="text-xs sm:text-sm text-[#AAB5C2] leading-relaxed font-sans pl-3.5 border-l-2 border-[#19B6A4]/60">
                      <strong className="text-white">Engineering Resolution: </strong>
                      {ec.resolution}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>

          {/* 7. Verified Outcomes */}
          <ScrollReveal direction="up" distance={24} duration={0.65}>
            <div className="p-6 sm:p-8 bg-[#101B2B]/95 backdrop-blur-md border border-[#34465A] text-white rounded-2xl shadow-xl">
              <h2 className="font-heading font-bold text-xl sm:text-2xl mb-4 flex items-center gap-2 text-white">
                <span className="w-2 h-2 rounded-full bg-[#19B6A4]"></span>
                <span>7. Verified Operational Outcomes</span>
              </h2>
              <div className="space-y-3">
                {caseStudy.verifiedOutcomes.map((outcome, idx) => (
                  <div key={idx} className="flex items-start gap-3 text-sm text-[#F7F6F2] leading-relaxed">
                    <CheckCircle2 className="w-5 h-5 text-[#19B6A4] flex-shrink-0 mt-0.5" />
                    <span>{outcome}</span>
                  </div>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* Bottom Navigation CTA */}
      <section className="py-12 bg-transparent border-t border-[#34465A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/projects"
            className="text-sm font-medium text-[#AAB5C2] hover:text-white flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Case Studies</span>
          </Link>

          <div className="flex flex-wrap items-center gap-3">
            <Button
              href={project.liveUrl}
              external
              variant="dark-outline"
              size="md"
              icon={<ArrowUpRight className="w-4 h-4 text-[#19B6A4]" />}
            >
              View the Site
            </Button>
            <Button
              href={`/contact?project=${encodeURIComponent(project.title)}`}
              variant="primary"
              size="md"
              icon={<ArrowRight className="w-4 h-4" />}
            >
              Inquire About a Similar System
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
