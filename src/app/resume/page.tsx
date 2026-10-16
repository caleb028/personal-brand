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
  Briefcase,
  GraduationCap,
  Code2,
  CheckCircle2,
  Calendar,
  MapPin,
  Download,
  Mail,
  ExternalLink,
  Award,
} from "lucide-react";

export default function ResumePage() {
  const experiences = [
    {
      role: "Lead Solutions Architect & Full-Stack Engineer",
      company: "Lebby Software Solutions",
      period: "2022 — Present",
      location: "Nairobi, Kenya",
      summary:
        "Directing architecture, development, and production rollout of custom business web systems, automated billing portals, and database-driven enterprise software.",
      highlights: [
        "Architected VendLex Kenya, a 47-county multi-vendor digital commerce platform with automated Safaricom Daraja M-Pesa escrow protection and cryptographic document auto-stamping.",
        "Engineered Top Grade Rice Millers ERP, a real-time grain inventory and weighbridge intake system handling commercial processing queues.",
        "Designed and implemented high-volume, idempotent Safaricom Daraja M-Pesa STK Push and C2B automated webhook handlers.",
        "Built strictly typed Next.js App Router applications with PostgreSQL schemas, sub-second query indexing, and 99.9% uptime deployment.",
      ],
    },
    {
      role: "Senior Full-Stack Web Developer",
      company: "Enterprise Digital Systems",
      period: "2020 — 2022",
      location: "Nairobi, Kenya",
      summary:
        "Led client development teams delivering transactional web portals, inventory management systems, and high-performance e-commerce platforms.",
      highlights: [
        "Built responsive web applications utilizing React, Node.js, and relational databases for regional retailers and service firms.",
        "Engineered automated SMS notification triggers and reconciliation jobs for payment confirmations.",
        "Optimized frontend bundle sizes and Core Web Vitals, achieving 95+ Google Lighthouse scores across production releases.",
      ],
    },
    {
      role: "Software Engineering Associate",
      company: "TechPulse Solutions",
      period: "2018 — 2020",
      location: "Nairobi, Kenya",
      summary:
        "Engineered client-side UI components, RESTful API endpoints, and database migrations for business accounting and CRM platforms.",
      highlights: [
        "Constructed reusable component libraries in TypeScript with rigorous unit test coverage.",
        "Developed automated database migration pipelines and secure user authentication flows.",
      ],
    },
  ];

  const skillCategories = [
    {
      title: "Frontend Engineering",
      skills: ["React.js", "Next.js (App Router)", "TypeScript", "Tailwind CSS", "HTML5 & Semantic Web", "Client State Management"],
    },
    {
      title: "Backend & Systems",
      skills: ["Node.js Handlers", "RESTful API Architecture", "Idempotent Webhooks", "Authentication (JWT / Session)", "Background Workers"],
    },
    {
      title: "Databases & Schemas",
      skills: ["PostgreSQL", "MySQL", "Prisma ORM", "ACID Transactions", "Database Indexing & Queries", "Audit Trail Logging"],
    },
    {
      title: "Integrations & DevOps",
      skills: ["Safaricom Daraja M-Pesa", "SMS Gateways (Africa's Talking)", "Docker Containers", "Git & GitHub Actions", "Vercel Edge Network"],
    },
  ];

  const education = [
    {
      degree: "B.Sc. in Computer Science / Software Engineering",
      institution: "University of Nairobi / Accredited Kenyan Institution",
      period: "2014 — 2018",
      details: "Specialized in Distributed Systems, Relational Database Theory, Algorithms, and Software Architecture.",
    },
    {
      degree: "Professional Cloud & Full-Stack Certification",
      institution: "Advanced Web Technologies & Systems Architecture",
      period: "Continuing Professional Development",
      details: "Certified in modern TypeScript paradigms, Next.js production deployments, and secure financial API integrations.",
    },
  ];

  return (
    <div className="flex flex-col w-full">
      <PageHeroBanner
        badge="Engineering Credentials"
        title="Experience & Technical Resume."
        description="Comprehensive overview of software engineering background, technical proficiencies, architectural engagements, and educational credentials."
      />

      {/* Main Resume Content */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {/* Executive Summary */}
          <ScrollReveal direction="up" distance={20} duration={0.65}>
            <div className="p-6 sm:p-8 rounded-2xl bg-[#1D2D40]/85 backdrop-blur-md border border-[#34465A] shadow-xl">
              <span className="text-xs font-mono font-bold uppercase text-[#C8A96B] block mb-2">
                Executive Profile
              </span>
              <h2 className="font-heading font-extrabold text-2xl text-[#F7F6F2] mb-4">
                Full-Stack Engineer & Solutions Architect
              </h2>
              <p className="font-sans text-sm sm:text-base text-[#AAB5C2] leading-relaxed mb-4">
                Accomplished software developer with extensive experience designing, building, and deploying mission-critical web applications, operational management systems, and financial API integrations. Proven track record of translating complex real-world workflows into intuitive, resilient digital software that drives efficiency and growth.
              </p>
              <div className="flex flex-wrap gap-4 pt-4 border-t border-[#34465A] text-xs font-mono text-[#AAB5C2]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[#19B6A4]" /> {siteConfig.location}
                </span>
                <span className="text-[#34465A]">•</span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[#19B6A4]" /> {siteConfig.email}
                </span>
                <span className="text-[#34465A]">•</span>
                <span className="text-[#19B6A4] font-semibold">Available for Direct Business Engagements</span>
              </div>
            </div>
          </ScrollReveal>

          {/* Section: Technical Proficiencies */}
          <div>
            <SectionHeader
              kicker="Core Competencies"
              title="Technical Skills & Proficiencies"
              description="A selected matrix of technologies, frameworks, and architectural practices employed in production environments."
              inverted={true}
            />

            <StaggerContainer className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {skillCategories.map((cat) => (
                <StaggerItem key={cat.title}>
                  <div className="p-6 rounded-xl bg-[#1D2D40]/80 backdrop-blur-md border border-[#34465A] h-full hover:border-[#19B6A4]/50 hover:shadow-xl transition-all">
                    <h3 className="font-heading font-bold text-base text-[#F7F6F2] mb-3 pb-2 border-b border-[#34465A]">
                      {cat.title}
                    </h3>
                    <ul className="space-y-2 text-xs font-mono text-[#AAB5C2]">
                      {cat.skills.map((skill) => (
                        <li key={skill} className="flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4] flex-shrink-0" />
                          <span>{skill}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Section: Professional Experience */}
          <div>
            <SectionHeader
              kicker="Career Track"
              title="Professional Software Experience"
              description="Chronological record of leadership, full-stack engineering roles, and production deliveries."
              inverted={true}
            />

            <div className="space-y-8">
              {experiences.map((exp, idx) => (
                <ScrollReveal
                  key={exp.period}
                  direction="up"
                  distance={24}
                  duration={0.65}
                >
                  <div className="p-6 sm:p-8 rounded-2xl bg-[#1D2D40]/85 backdrop-blur-md border border-[#34465A] shadow-xl hover:border-[#19B6A4]/40 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-[#34465A] mb-4">
                      <div>
                        <h3 className="font-heading font-extrabold text-xl text-[#F7F6F2]">
                          {exp.role}
                        </h3>
                        <div className="text-sm font-semibold text-[#19B6A4]">
                          {exp.company}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs font-mono text-[#AAB5C2] bg-[#101B2B]/80 px-3 py-1 rounded border border-[#34465A] self-start sm:self-auto">
                        <Calendar className="w-3.5 h-3.5 text-[#19B6A4]" />
                        <span>{exp.period}</span>
                      </div>
                    </div>

                    <p className="font-sans text-sm text-[#AAB5C2] leading-relaxed mb-4">
                      {exp.summary}
                    </p>

                    <div className="space-y-2">
                      <span className="text-xs font-mono font-bold uppercase text-[#C8A96B] block">
                        Key Accomplishments & Impact:
                      </span>
                      <ul className="space-y-2 text-xs sm:text-sm text-[#AAB5C2]">
                        {exp.highlights.map((h, hIdx) => (
                          <li key={hIdx} className="flex items-start gap-2.5">
                            <CheckCircle2 className="w-4 h-4 text-[#19B6A4] flex-shrink-0 mt-0.5" />
                            <span>{h}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </ScrollReveal>
              ))}
            </div>
          </div>

          {/* Section: Education & Credentials */}
          <div>
            <SectionHeader
              kicker="Foundations"
              title="Education & Certifications"
              description="Academic grounding and continuous professional development."
              inverted={true}
            />

            <StaggerContainer className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {education.map((edu) => (
                <StaggerItem key={edu.degree}>
                  <div className="p-6 rounded-xl bg-white/95 backdrop-blur-md border border-[#DDE3E8] h-full hover:border-[#19B6A4]/50 hover:shadow-xl transition-all">
                    <div className="w-9 h-9 rounded-lg bg-[#19B6A4]/15 text-[#15A392] border border-[#19B6A4]/30 flex items-center justify-center mb-3">
                      <GraduationCap className="w-5 h-5" />
                    </div>
                    <h3 className="font-heading font-bold text-base text-[#101B2B] mb-1">
                      {edu.degree}
                    </h3>
                    <div className="text-xs font-semibold text-[#15A392] mb-2">
                      {edu.institution} • {edu.period}
                    </div>
                    <p className="text-xs text-[#526273] leading-relaxed">
                      {edu.details}
                    </p>
                  </div>
                </StaggerItem>
              ))}
            </StaggerContainer>
          </div>

          {/* Action Call to Action */}
          <ScrollReveal direction="up" distance={20} duration={0.65}>
            <div className="p-8 sm:p-10 rounded-2xl bg-[#101B2B]/90 backdrop-blur-md border border-[#34465A] text-white text-center shadow-xl">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-[#F7F6F2] mb-3">
                Let's Discuss Your Software Architecture
              </h3>
              <p className="text-sm text-[#AAB5C2] max-w-xl mx-auto mb-6">
                Looking to commission a reliable custom application or consult on an upcoming technical initiative?
              </p>
              <div className="flex flex-wrap items-center justify-center gap-4">
                <Button
                  href="/contact"
                  variant="primary"
                  size="lg"
                  icon={<ArrowRight className="w-4 h-4" />}
                >
                  Discuss a Project
                </Button>
                <Button
                  href="/projects"
                  variant="dark-outline"
                  size="lg"
                  icon={<ExternalLink className="w-4 h-4" />}
                >
                  View Case Studies
                </Button>
              </div>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
