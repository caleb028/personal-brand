"use client";

import React from "react";
import Link from "next/link";
import { insightArticles } from "@/content/insights";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { PageHeroBanner } from "@/components/ui/PageHeroBanner";
import {
  ScrollReveal,
  StaggerContainer,
  StaggerItem,
} from "@/components/motion";
import {
  ArrowRight,
  Clock,
  BookOpen,
  Calendar,
  Tag,
  Search,
} from "lucide-react";

export default function InsightsPage() {
  return (
    <div className="flex flex-col w-full">
      <PageHeroBanner
        badge="Technical Perspectives"
        title="Engineering & Business Insights."
        description="Practical articles on software architecture, payment integrations, system maintainability, and business digital transformation by Lebby Software Solutions."
      />

      {/* Articles Directory */}
      <section className="py-16 sm:py-24 bg-transparent border-b border-[#34465A]">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <StaggerContainer className="space-y-8">
            {insightArticles.map((article) => (
              <StaggerItem key={article.slug}>
                <article className="p-6 sm:p-8 rounded-2xl bg-white/95 backdrop-blur-md border border-[#DDE3E8] hover:border-[#19B6A4]/50 hover:shadow-xl transition-all duration-200">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <Badge variant="teal" size="sm">
                        {article.category}
                      </Badge>
                      <span className="text-[#DDE3E8]">•</span>
                      <span className="text-xs font-mono text-[#526273]">
                        {article.publishedAt}
                      </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-xs font-mono text-[#526273]">
                      <Clock className="w-3.5 h-3.5 text-[#19B6A4]" />
                      <span>{article.readTime}</span>
                    </div>
                  </div>

                  <h2 className="font-heading font-extrabold text-xl sm:text-2xl text-[#101B2B] mb-3">
                    <Link
                      href={`/insights/${article.slug}`}
                      className="hover:text-[#19B6A4] transition-colors"
                    >
                      {article.title}
                    </Link>
                  </h2>

                  <p className="text-sm sm:text-base text-[#526273] leading-relaxed font-sans mb-6">
                    {article.excerpt}
                  </p>

                  <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[#DDE3E8]">
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[11px] font-mono px-2 py-0.5 bg-[#F7F6F2] border border-[#DDE3E8] text-[#526273] rounded"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/insights/${article.slug}`}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#15A392] hover:text-[#19B6A4] transition-colors"
                    >
                      <span>Read Full Article</span>
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </div>
      </section>
    </div>
  );
}
