"use client";

import React from "react";
import Link from "next/link";
import { siteConfig } from "@/content/siteConfig";
import { projects } from "@/content/projects";
import { insightArticles } from "@/content/insights";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { SectionHeader } from "@/components/ui/SectionHeader";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
  TextReveal,
  ImageReveal,
  ParallaxSection,
} from "@/components/motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Code2,
  Database,
  Globe,
  Layers,
  Cpu,
  Shield,
  Smartphone,
  Workflow,
  Sparkles,
  ExternalLink,
  MessageSquare,
  Clock,
  Terminal,
} from "lucide-react";

export default function HomePage() {
  const featuredProjects = projects.filter((p) => p.featured);
  const recentArticles = insightArticles.slice(0, 3);

  return (
    <div className="flex flex-col w-full overflow-hidden">
      {/* =========================================================================
          SECTION A & B: HERO SECTION WITH ANIMATED NETWORK BACKGROUND & MOTION
         ========================================================================= */}
      <section className="relative border-b border-[#34465A] overflow-hidden pt-16 pb-20 sm:pt-24 sm:pb-28 lg:pt-32 lg:pb-36 bg-transparent">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">
          {/* Credibility Line */}
          <ScrollReveal direction="down" distance={12} duration={0.5}>
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#1D2D40]/80 backdrop-blur-md border border-[#34465A] shadow-subtle mb-6">
              <span className="w-2 h-2 rounded-full bg-[#C8A96B] animate-pulse"></span>
              <span className="text-xs font-mono font-medium text-[#C8A96B]">
                Web Development • Business Systems • Digital Platforms
              </span>
            </div>
          </ScrollReveal>

          {/* Main Headline with Masked Reveal */}
          <TextReveal
            as="h1"
            duration={0.8}
            className="font-heading font-extrabold text-3xl sm:text-5xl lg:text-[3.5rem] text-white tracking-tight leading-[1.15]"
          >
            Software Solutions Built Around Real Business Needs.
          </TextReveal>

          {/* Supporting Description */}
          <ScrollReveal direction="up" delay={0.12} distance={20} duration={0.65}>
            <p className="mt-6 text-base sm:text-lg text-[#AAB5C2] leading-relaxed max-w-2xl font-sans">
              {siteConfig.description}
            </p>
          </ScrollReveal>

          {/* Primary & Secondary Call to Actions */}
          <ScrollReveal direction="up" delay={0.2} distance={20} duration={0.65}>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Discuss Your Project
              </Button>
              <Button
                href="/projects"
                variant="dark-outline"
                size="lg"
                icon={<ArrowUpRight className="w-4 h-4" />}
              >
                Explore Our Work
              </Button>
            </div>
          </ScrollReveal>

          {/* Credibility reassurance indicators */}
          <ScrollReveal direction="up" delay={0.28} distance={16} duration={0.65} className="w-full">
            <div className="mt-12 pt-8 border-t border-[#34465A] w-full flex flex-wrap items-center justify-center gap-6 sm:gap-8 text-xs font-sans text-[#F7F6F2]">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#19B6A4] flex-shrink-0" />
                <span>Custom Engineering</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#19B6A4] flex-shrink-0" />
                <span>M-Pesa API Integration</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#19B6A4] flex-shrink-0" />
                <span>Production-Grade Code</span>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>

      {/* =========================================================================
          SECTION C: TRUST & CREDIBILITY (CORE COMMITMENTS)
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            inverted
            kicker="Our Engineering Standard"
            title="Thoughtful Technology. Practical Business Results."
            description="Instaweb Solutions Ltd focuses on understanding business challenges and delivering software that is maintainable, useful and designed for real-world operations."
          />

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {siteConfig.commitments.map((item, index) => (
              <StaggerItem key={item.title}>
                <div className="relative flex flex-col p-6 rounded-xl bg-[#1D2D40]/80 backdrop-blur-md border border-[#34465A] hover:border-[#19B6A4]/60 hover:bg-[#1D2D40]/95 hover:shadow-glow transition-all duration-200 h-full">
                  <div className="text-xs font-mono font-bold text-[#19B6A4] mb-3">
                    0{index + 1}
                  </div>
                  <h3 className="font-heading font-bold text-lg text-[#F7F6F2] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-sm text-[#AAB5C2] leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          SECTION D: SERVICES SECTION (6 CORE SERVICES)
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <SectionHeader
              inverted
              kicker="What We Build"
              title="What We Can Build for You."
              description="From a professional online presence to complete business applications, we develop digital solutions tailored to your goals."
              className="mb-0"
            />
            <ScrollReveal direction="left" distance={16} duration={0.5}>
              <Button
                href="/services"
                variant="dark-outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="self-start md:self-end flex-shrink-0"
              >
                View All Services
              </Button>
            </ScrollReveal>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {siteConfig.servicesSummary.map((service) => (
              <StaggerItem key={service.id}>
                <div className="group flex flex-col justify-between p-6 sm:p-7 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all duration-200 h-full text-[#172331]">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <span className="font-mono text-xs font-bold text-[#19B6A4] px-2 py-0.5 bg-[#19B6A4]/10 border border-[#19B6A4]/25 rounded">
                        {service.id}
                      </span>
                      <span className="text-[11px] font-mono text-[#526273] uppercase tracking-wide">
                        Enterprise Grade
                      </span>
                    </div>

                    <h3 className="font-heading font-bold text-xl text-[#101B2B] group-hover:text-[#19B6A4] transition-colors mb-2.5">
                      {service.title}
                    </h3>

                    <p className="text-sm text-[#526273] leading-relaxed mb-6 font-sans">
                      {service.description}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#DDE3E8]">
                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {service.technologies.map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 bg-[#EEF1F3] text-[#526273] border border-[#DDE3E8] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/services#${service.slug}`}
                      className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#19B6A4] hover:text-[#15A392] transition-colors"
                    >
                      <span>Explore Specifications</span>
                      <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </div>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          SECTION E: FEATURED PROJECTS — SELECTED WORK
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <SectionHeader
              inverted
              kicker="Real Portfolio"
              title="Selected Work."
              description="A closer look at the digital products, websites and systems we've developed."
              className="mb-0"
            />
            <ScrollReveal direction="left" distance={16} duration={0.5}>
              <Button
                href="/projects"
                variant="dark-outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="self-start md:self-end flex-shrink-0"
              >
                Browse Full Portfolio
              </Button>
            </ScrollReveal>
          </div>

          {/* Project List with Image Reveals */}
          <div className="space-y-12 sm:space-y-16">
            {featuredProjects.map((project, index) => (
              <ScrollReveal
                key={project.slug}
                direction="up"
                distance={28}
                duration={0.7}
                className="w-full"
              >
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center p-6 sm:p-8 md:p-10 rounded-2xl bg-[#101B2B]/90 backdrop-blur-md border border-[#34465A] shadow-xl hover:border-[#19B6A4]/60 transition-all duration-200">
                  {/* Project Info Column */}
                  <div className="lg:col-span-6 flex flex-col items-start order-2 lg:order-1">
                    <div className="flex flex-wrap items-center gap-2 mb-3">
                      <Badge variant="gold" size="sm">
                        {project.status}
                      </Badge>
                      <span className="text-xs font-mono text-[#AAB5C2]">
                        {project.category}
                      </span>
                    </div>

                    <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
                      {project.title}
                    </h3>

                    <p className="font-sans font-medium text-sm text-[#F7F6F2] mb-4">
                      {project.subtitle}
                    </p>

                    <div className="space-y-3 mb-6 text-sm w-full">
                      <div className="p-3.5 rounded bg-[#1D2D40]/80 border border-[#34465A]">
                        <strong className="text-xs uppercase font-mono text-[#AAB5C2] block mb-1">
                          Problem Addressed
                        </strong>
                        <p className="text-[#F7F6F2] text-xs sm:text-sm leading-relaxed">
                          {project.problemSummary}
                        </p>
                      </div>

                      <div className="p-3.5 rounded bg-[#1D2D40]/80 border border-[#34465A]">
                        <strong className="text-xs uppercase font-mono text-[#19B6A4] block mb-1">
                          Solution Delivered
                        </strong>
                        <p className="text-[#F7F6F2] text-xs sm:text-sm leading-relaxed">
                          {project.solutionSummary}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.technologies.slice(0, 5).map((tech) => (
                        <span
                          key={tech}
                          className="text-[11px] font-mono px-2 py-0.5 bg-[#1D2D40] border border-[#34465A] text-[#AAB5C2] rounded"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>

                    <div className="flex flex-wrap items-center gap-3">
                      <Button
                        href={`/projects/${project.slug}`}
                        variant="primary"
                        size="md"
                        icon={<ArrowRight className="w-4 h-4" />}
                      >
                        View Full Case Study
                      </Button>
                      <Button
                        href={project.liveUrl}
                        external
                        variant="dark-outline"
                        size="md"
                        icon={<ArrowUpRight className="w-4 h-4 text-[#19B6A4]" />}
                      >
                        View the Site
                      </Button>
                    </div>
                  </div>

                  {/* Project Architectural Blueprint Column with ImageReveal */}
                  <div className="lg:col-span-6 order-1 lg:order-2 w-full">
                    <ImageReveal duration={0.85}>
                      <div className="rounded-xl border border-[#34465A] bg-[#101B2B]/95 backdrop-blur-md p-5 sm:p-6 shadow-xl">
                        <div className="flex items-center justify-between pb-4 border-b border-[#34465A] mb-4">
                          <div>
                            <span className="text-[10px] uppercase font-mono text-[#AAB5C2]">
                              Sector / Deployment
                            </span>
                            <div className="font-heading font-bold text-sm text-white">
                              {project.clientSector}
                            </div>
                          </div>
                          <span className="font-mono text-xs text-[#C8A96B] bg-[#C8A96B]/15 border border-[#C8A96B]/30 px-2 py-1 rounded">
                            Year {project.deploymentYear}
                          </span>
                        </div>

                        {/* Key Technical Highlights */}
                        <div className="space-y-3">
                          <div className="text-xs font-mono font-semibold text-[#AAB5C2] uppercase">
                            Core System Capabilities:
                          </div>
                          {project.caseStudy.keyFeatures.slice(0, 3).map((feat) => (
                            <div
                              key={feat.title}
                              className="flex items-start gap-2.5 text-xs text-[#F7F6F2]"
                            >
                              <CheckCircle2 className="w-4 h-4 text-[#19B6A4] flex-shrink-0 mt-0.5" />
                              <div>
                                <span className="font-bold text-white">{feat.title}: </span>
                                <span className="text-[#AAB5C2]">{feat.description}</span>
                              </div>
                            </div>
                          ))}
                        </div>

                        {/* Architecture footer badge */}
                        <div className="mt-5 pt-4 border-t border-[#34465A] flex items-center justify-between text-[11px] font-mono text-[#AAB5C2]">
                          <span>Verified Architecture</span>
                          <span className="text-[#F7F6F2] font-semibold">PostgreSQL Relational DB</span>
                        </div>
                      </div>
                    </ImageReveal>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION F: DEVELOPMENT PROCESS OVERVIEW
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            inverted
            kicker="Our Methodology"
            title="A Clear Process. From Idea to Launch."
            description="We follow a disciplined, five-stage engineering process designed to eliminate uncertainty, ensure transparent milestones, and deliver dependable software."
          />

          {/* 5-Stage Process Staggered */}
          <StaggerContainer className="grid grid-cols-1 md:grid-cols-5 gap-6 relative">
            {[
              {
                step: "01",
                name: "Discovery",
                description: "Understand the client's business, workflows, requirements, goals, and operational constraints.",
              },
              {
                step: "02",
                name: "Planning",
                description: "Define precise scope, database schemas, deliverables, milestones, and technical approach.",
              },
              {
                step: "03",
                name: "Design",
                description: "Develop intuitive, accessible user interfaces and wireframes centered around actual staff needs.",
              },
              {
                step: "04",
                name: "Development & Testing",
                description: "Build clean, typed software, validate edge cases, and run rigorous integration tests.",
              },
              {
                step: "05",
                name: "Launch & Support",
                description: "Deploy to production, configure monitoring, train key personnel, and provide post-launch support.",
              },
            ].map((stage) => (
              <StaggerItem key={stage.step}>
                <div className="relative flex flex-col p-5 bg-[#1D2D40]/85 backdrop-blur-md rounded-xl border border-[#34465A] shadow-lg hover:border-[#19B6A4]/60 hover:bg-[#1D2D40] transition-all duration-200 h-full">
                  <div className="font-mono text-2xl font-extrabold text-[#19B6A4] mb-3">
                    {stage.step}
                  </div>
                  <h3 className="font-heading font-bold text-base text-[#F7F6F2] mb-2">
                    {stage.name}
                  </h3>
                  <p className="text-xs text-[#AAB5C2] leading-relaxed">
                    {stage.description}
                  </p>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>

          <div className="mt-10 text-center">
            <ScrollReveal direction="up" distance={14} duration={0.5}>
              <Link
                href="/process"
                className="inline-flex items-center gap-2 text-sm font-semibold text-[#19B6A4] hover:text-[#15A392] transition-colors"
              >
                <span>Read the Full Engagement & Milestone Guide</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </ScrollReveal>
          </div>
        </div>
      </section>

      {/* =========================================================================
          SECTION G: TECHNOLOGY EXPERTISE
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            inverted
            kicker="Technical Competence"
            title="The Technologies Behind the Solutions."
            description="We select proven, mature technologies with strong ecosystems to ensure your system is fast, secure, and maintainable for years to come."
          />

          <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Frontend */}
            <StaggerItem>
              <div className="p-6 rounded-xl border border-[#34465A] bg-[#1D2D40]/85 backdrop-blur-md hover:border-[#19B6A4]/60 hover:bg-[#1D2D40] hover:shadow-glow transition-all duration-200 h-full">
                <div className="w-9 h-9 rounded-lg bg-[#19B6A4]/15 text-[#19B6A4] border border-[#19B6A4]/30 flex items-center justify-center mb-4">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-white mb-2">
                  Frontend
                </h3>
                <p className="text-xs text-[#AAB5C2] mb-4">
                  Fast, responsive, and accessible client interfaces.
                </p>
                <ul className="space-y-1.5 text-xs font-mono text-[#F7F6F2]">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    React & Next.js (App Router)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    TypeScript (Strict Typing)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    Tailwind CSS Design System
                  </li>
                </ul>
              </div>
            </StaggerItem>

            {/* Backend */}
            <StaggerItem>
              <div className="p-6 rounded-xl border border-[#34465A] bg-[#1D2D40]/85 backdrop-blur-md hover:border-[#19B6A4]/60 hover:bg-[#1D2D40] hover:shadow-glow transition-all duration-200 h-full">
                <div className="w-9 h-9 rounded-lg bg-[#19B6A4]/15 text-[#19B6A4] border border-[#19B6A4]/30 flex items-center justify-center mb-4">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-white mb-2">
                  Backend & APIs
                </h3>
                <p className="text-xs text-[#AAB5C2] mb-4">
                  Secure, idempotent server logic and integrations.
                </p>
                <ul className="space-y-1.5 text-xs font-mono text-[#F7F6F2]">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    Node.js Server Handlers
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    RESTful Architecture & Webhooks
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    Daraja M-Pesa & SMS APIs
                  </li>
                </ul>
              </div>
            </StaggerItem>

            {/* Databases */}
            <StaggerItem>
              <div className="p-6 rounded-xl border border-[#34465A] bg-[#1D2D40]/85 backdrop-blur-md hover:border-[#19B6A4]/60 hover:bg-[#1D2D40] hover:shadow-glow transition-all duration-200 h-full">
                <div className="w-9 h-9 rounded-lg bg-[#19B6A4]/15 text-[#19B6A4] border border-[#19B6A4]/30 flex items-center justify-center mb-4">
                  <Database className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-white mb-2">
                  Databases & Integrity
                </h3>
                <p className="text-xs text-[#AAB5C2] mb-4">
                  ACID compliance and structured relational schemas.
                </p>
                <ul className="space-y-1.5 text-xs font-mono text-[#F7F6F2]">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    PostgreSQL & MySQL
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    Prisma ORM (Schema Safety)
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    Immutable Transaction Ledgers
                  </li>
                </ul>
              </div>
            </StaggerItem>

            {/* Deployment */}
            <StaggerItem>
              <div className="p-6 rounded-xl border border-[#34465A] bg-[#1D2D40]/85 backdrop-blur-md hover:border-[#19B6A4]/60 hover:bg-[#1D2D40] hover:shadow-glow transition-all duration-200 h-full">
                <div className="w-9 h-9 rounded-lg bg-[#19B6A4]/15 text-[#19B6A4] border border-[#19B6A4]/30 flex items-center justify-center mb-4">
                  <Layers className="w-5 h-5" />
                </div>
                <h3 className="font-heading font-bold text-base text-white mb-2">
                  Deployment & DevOps
                </h3>
                <p className="text-xs text-[#AAB5C2] mb-4">
                  Automated continuous integration and monitoring.
                </p>
                <ul className="space-y-1.5 text-xs font-mono text-[#F7F6F2]">
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    Git & GitHub Workflows
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    Vercel Edge Network & Cloud
                  </li>
                  <li className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4]"></span>
                    Docker Containerization
                  </li>
                </ul>
              </div>
            </StaggerItem>
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          SECTION H: RECENT INSIGHTS / BLOG PREVIEW
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
            <SectionHeader
              inverted
              kicker="Technical Insights"
              title="Engineering & Business Perspectives."
              description="Practical articles on software architecture, payment integrations, and digital operations."
              className="mb-0"
            />
            <ScrollReveal direction="left" distance={16} duration={0.5}>
              <Button
                href="/insights"
                variant="dark-outline"
                size="md"
                icon={<ArrowRight className="w-4 h-4" />}
                className="self-start md:self-end flex-shrink-0"
              >
                Browse All Articles
              </Button>
            </ScrollReveal>
          </div>

          <StaggerContainer className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {recentArticles.map((article) => (
              <StaggerItem key={article.slug}>
                <article className="flex flex-col justify-between p-6 bg-white/95 backdrop-blur-md rounded-xl border border-[#DDE3E8] shadow-card hover:border-[#19B6A4]/60 hover:shadow-elevated transition-all duration-200 h-full text-[#172331]">
                  <div>
                    <div className="flex items-center justify-between text-xs font-mono text-[#526273] mb-3">
                      <span className="text-[#19B6A4] font-semibold">
                        {article.category}
                      </span>
                      <span>{article.readTime}</span>
                    </div>

                    <h3 className="font-heading font-bold text-lg text-[#101B2B] hover:text-[#19B6A4] transition-colors mb-2 line-clamp-2">
                      <Link href={`/insights/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    <p className="text-xs sm:text-sm text-[#526273] leading-relaxed mb-6 line-clamp-3">
                      {article.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#DDE3E8] flex items-center justify-between text-xs">
                    <span className="text-[#526273]">{article.publishedAt}</span>
                    <Link
                      href={`/insights/${article.slug}`}
                      className="font-semibold text-[#19B6A4] hover:text-[#15A392] inline-flex items-center gap-1 transition-colors"
                    >
                      <span>Read Article</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>

      {/* =========================================================================
          SECTION I: PRIMARY ENGAGEMENT BANNER (CALL TO ACTION)
         ========================================================================= */}
      <section className="py-16 sm:py-24 bg-transparent border-t border-[#34465A] text-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="p-8 sm:p-12 rounded-2xl bg-[#101B2B]/90 backdrop-blur-md border border-[#34465A] shadow-2xl">
            <ScrollReveal direction="down" distance={12} duration={0.5}>
              <span className="text-xs font-mono font-semibold text-[#C8A96B] uppercase tracking-widest inline-block mb-3">
                Start Your Software Initiative
              </span>
            </ScrollReveal>

            <TextReveal
              as="h2"
              duration={0.8}
              className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-tight mb-6"
            >
              Have a Project in Mind? Let's Discuss It.
            </TextReveal>

            <ScrollReveal direction="up" delay={0.12} distance={20} duration={0.65}>
              <p className="font-sans text-base sm:text-lg text-[#AAB5C2] max-w-2xl mx-auto leading-relaxed mb-10">
                Tell us what you're planning, the challenge you're trying to solve, or the software you need. We'll explore how Instaweb Solutions Ltd can help.
              </p>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2} distance={20} duration={0.65}>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Send Project Inquiry
                </Button>
                <Button
                  href={`https://wa.me/${siteConfig.whatsapp}?text=${encodeURIComponent(
                    siteConfig.whatsappText
                  )}`}
                  external
                  variant="dark-outline"
                  size="lg"
                  icon={<MessageSquare className="w-4 h-4 text-[#19B6A4]" />}
                >
                  Chat on WhatsApp
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.26} distance={12} duration={0.6}>
              <p className="text-xs text-[#AAB5C2] mt-6 font-mono">
                Direct Developer Communication • Transparent Milestone Estimates • No Sales Pressure
              </p>
            </ScrollReveal>
          </div>
        </div>
      </section>
    </div>
  );
}
