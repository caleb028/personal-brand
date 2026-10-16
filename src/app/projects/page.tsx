"use client";

import React from "react";
import Link from "next/link";
import { projects } from "@/content/projects";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import {
  ScrollReveal,
  ImageReveal,
  TextReveal,
} from "@/components/motion";
import {
  ArrowRight,
  ArrowUpRight,
  CheckCircle2,
  Database,
  Layers,
  Terminal,
  ExternalLink,
} from "lucide-react";

export default function ProjectsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeroBanner
        badge="Production Portfolio"
        title="Selected Work."
        description="A closer look at the digital products, websites, and business management systems Lebby Software Solutions has engineered to solve concrete operational challenges."
      />

      {/* Projects Showcase */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-16 sm:space-y-20">
            {projects.map((project, idx) => (
              <ScrollReveal
                key={project.slug}
                direction="up"
                distance={30}
                duration={0.7}
                className="w-full"
              >
                <div className="p-6 sm:p-10 rounded-2xl bg-[#101B2B]/90 backdrop-blur-md border border-[#34465A] shadow-xl hover:border-[#19B6A4]/60 transition-all duration-200">
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
                    {/* Left Column: Metadata, Problem & Solution */}
                    <div className="lg:col-span-7 flex flex-col justify-between">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge variant="gold" size="sm">
                            {project.status}
                          </Badge>
                          <span className="text-xs font-mono text-[#AAB5C2]">
                            {project.category}
                          </span>
                          <span className="text-[#34465A]">•</span>
                          <span className="text-xs font-mono text-[#C8A96B]">
                            Year {project.deploymentYear}
                          </span>
                        </div>

                        <h2 className="font-heading font-extrabold text-2xl sm:text-3xl text-white mb-2">
                          {project.title}
                        </h2>

                        <p className="font-sans font-medium text-sm text-[#F7F6F2] mb-6">
                          {project.subtitle}
                        </p>

                        <div className="space-y-4 mb-6">
                          <div className="p-4 rounded-lg bg-[#1D2D40]/80 border border-[#34465A]">
                            <span className="text-[11px] uppercase font-mono font-bold text-[#AAB5C2] block mb-1">
                              The Problem Statement
                            </span>
                            <p className="text-xs sm:text-sm text-[#F7F6F2] leading-relaxed">
                              {project.problemSummary}
                            </p>
                          </div>

                          <div className="p-4 rounded-lg bg-[#1D2D40]/80 border border-[#34465A]">
                            <span className="text-[11px] uppercase font-mono font-bold text-[#19B6A4] block mb-1">
                              The Engineered Solution
                            </span>
                            <p className="text-xs sm:text-sm text-[#F7F6F2] leading-relaxed">
                              {project.solutionSummary}
                            </p>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-1.5 mb-6">
                          {project.technologies.map((tech) => (
                            <span
                              key={tech}
                              className="text-[11px] font-mono px-2 py-0.5 bg-[#1D2D40] border border-[#34465A] rounded text-[#AAB5C2]"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="pt-4 border-t border-[#34465A] flex flex-wrap items-center gap-3">
                        <Button
                          href={`/projects/${project.slug}`}
                          variant="primary"
                          size="md"
                          icon={<ArrowRight className="w-4 h-4" />}
                        >
                          Read Complete Case Study
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

                    {/* Right Column: Architectural Highlights with ImageReveal Masking */}
                    <div className="lg:col-span-5 space-y-4 w-full">
                      <ImageReveal duration={0.85}>
                        <div className="p-5 sm:p-6 rounded-xl bg-[#1D2D40]/80 border border-[#34465A] shadow-lg mb-4">
                          <span className="text-[11px] uppercase font-mono font-bold text-white block mb-3">
                            Key Features Delivered
                          </span>
                          <div className="space-y-3">
                            {project.caseStudy.keyFeatures.map((feat) => (
                              <div key={feat.title} className="text-xs">
                                <span className="font-bold text-white block">
                                  {feat.title}
                                </span>
                                <span className="text-[#AAB5C2] leading-relaxed">
                                  {feat.description}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </ImageReveal>

                      <div className="p-5 rounded-xl bg-[#1D2D40]/80 border border-[#34465A] shadow-lg">
                        <span className="text-[11px] uppercase font-mono font-bold text-[#19B6A4] block mb-2">
                          Verified Operational Outcomes
                        </span>
                        <ul className="space-y-2 text-xs text-[#F7F6F2]">
                          {project.caseStudy.verifiedOutcomes.map((outcome, oIdx) => (
                            <li key={oIdx} className="flex items-start gap-2">
                              <CheckCircle2 className="w-3.5 h-3.5 text-[#19B6A4] flex-shrink-0 mt-0.5" />
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>

          {/* CTA Banner */}
          <ScrollReveal direction="up" distance={24} duration={0.65} className="mt-16">
            <div className="p-8 sm:p-10 rounded-2xl bg-[#101B2B]/95 backdrop-blur-md border border-[#34465A] text-white text-center shadow-2xl">
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl mb-3">
                Need a Custom Platform Built for Your Organization?
              </h3>
              <p className="text-sm text-[#AAB5C2] max-w-xl mx-auto mb-6">
                We design and engineer bespoke software systems that match your exact operational rules and workflows.
              </p>
              <Button
                href="/contact"
                variant="primary"
                size="lg"
                icon={<ArrowRight className="w-4 h-4" />}
              >
                Discuss Your Project Requirements
              </Button>
            </div>
          </ScrollReveal>
        </div>
      </section>
    </div>
  );
}
