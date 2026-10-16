"use client";

import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { insightArticles } from "@/content/insights";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import {
  ScrollReveal,
  TextReveal,
  SmoothAnchor,
} from "@/components/motion";
import {
  ArrowLeft,
  ArrowRight,
  Clock,
  Calendar,
  Share2,
  Tag,
  BookOpen,
} from "lucide-react";

interface Props {
  params: {
    slug: string;
  };
}

export default function ArticleDetailPage({ params }: Props) {
  const article = insightArticles.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  return (
    <div className="flex flex-col w-full">
      {/* Top Breadcrumb Nav */}
      <div className="py-6 bg-[#101B2B]/90 backdrop-blur-md border-b border-[#34465A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/insights"
            className="inline-flex items-center gap-2 text-xs font-mono font-medium text-[#AAB5C2] hover:text-[#F7F6F2] transition-colors"
          >
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Back to All Articles</span>
          </Link>
        </div>
      </div>

      {/* Article Header */}
      <article className="py-12 sm:py-16 bg-transparent border-b border-[#34465A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <ScrollReveal direction="down" distance={12} duration={0.5}>
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <Badge variant="teal" size="md">
                {article.category}
              </Badge>
              <span className="text-[#34465A]">•</span>
              <span className="text-xs font-mono text-[#AAB5C2]">
                {article.publishedAt}
              </span>
              <span className="text-[#34465A]">•</span>
              <span className="text-xs font-mono text-[#AAB5C2] flex items-center gap-1">
                <Clock className="w-3.5 h-3.5 text-[#19B6A4]" /> {article.readTime}
              </span>
            </div>
          </ScrollReveal>

          <TextReveal
            as="h1"
            duration={0.8}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-[#F7F6F2] tracking-tight leading-[1.2] mb-6"
          >
            {article.title}
          </TextReveal>

          <ScrollReveal direction="up" delay={0.12} distance={18} duration={0.65}>
            <p className="font-sans text-lg sm:text-xl text-[#F7F6F2] font-medium leading-relaxed mb-8 border-l-4 border-[#19B6A4] pl-4 py-2 bg-[#1D2D40]/80 rounded-r">
              {article.excerpt}
            </p>
          </ScrollReveal>

          {/* Author Badge */}
          <ScrollReveal direction="up" delay={0.2} distance={14} duration={0.6}>
            <div className="flex items-center justify-between py-4 border-y border-[#34465A] text-xs">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#19B6A4] text-[#101B2B] font-heading font-bold text-xs flex items-center justify-center">
                  L
                </div>
                <div>
                  <div className="font-heading font-bold text-[#F7F6F2]">
                    Written by {article.author}
                  </div>
                  <div className="text-[#AAB5C2]">
                    Solutions Engineering Team, Instaweb Solutions Ltd
                  </div>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-1.5">
                {article.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-mono px-2 py-0.5 bg-[#101B2B] border border-[#34465A] rounded text-[#AAB5C2]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </article>

      {/* Article Content & Table of Contents */}
      <section className="py-12 sm:py-16 bg-transparent border-b border-[#34465A]">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              {/* Table of Contents (Sticky on desktop) */}
              <div className="lg:col-span-4 order-2 lg:order-1">
                <div className="sticky top-24 p-5 rounded-xl bg-[#1D2D40]/85 backdrop-blur-md border border-[#34465A] shadow-xl">
                  <h3 className="font-heading font-bold text-xs uppercase tracking-wider text-[#C8A96B] mb-3 flex items-center gap-2">
                    <BookOpen className="w-3.5 h-3.5 text-[#19B6A4]" />
                    <span>Article Outline</span>
                  </h3>
                  <nav className="space-y-2 text-xs">
                    {article.tableOfContents.map((item) => (
                      <SmoothAnchor
                        key={item.id}
                        href={`#${item.id}`}
                        headerOffset={90}
                        className="block text-[#AAB5C2] hover:text-[#19B6A4] transition-colors py-1 leading-snug"
                      >
                        • {item.title}
                      </SmoothAnchor>
                    ))}
                  </nav>

                  <div className="mt-6 pt-4 border-t border-[#34465A] text-xs">
                    <span className="font-mono text-[#AAB5C2] block mb-2">
                      Need technical consultation?
                    </span>
                    <Link
                      href="/contact"
                      className="font-semibold text-[#19B6A4] hover:text-[#15A392] inline-flex items-center gap-1"
                    >
                      <span>Discuss with Developer</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Main Text Content */}
              <div className="lg:col-span-8 order-1 lg:order-2 bg-[#1D2D40]/85 backdrop-blur-md p-6 sm:p-10 rounded-2xl border border-[#34465A] shadow-xl">
                <div className="prose prose-invert max-w-none text-[#AAB5C2] text-base leading-relaxed space-y-6">
                  {article.content.split("\n\n").map((block, idx) => {
                    const trimmed = block.trim();
                    if (!trimmed) return null;

                    if (trimmed.startsWith("### ")) {
                      const headingText = trimmed.replace("### ", "");
                      const id = headingText
                        .toLowerCase()
                        .replace(/[^a-z0-9]+/g, "-");
                      return (
                        <h3
                          key={idx}
                          id={id}
                          className="font-heading font-bold text-xl sm:text-2xl text-[#F7F6F2] mt-8 mb-3 scroll-mt-28"
                        >
                          {headingText}
                        </h3>
                      );
                    }

                    if (trimmed.startsWith("```")) {
                      const lines = trimmed.split("\n");
                      const lang = lines[0].replace("```", "");
                      const code = lines.slice(1, -1).join("\n");
                      return (
                        <div
                          key={idx}
                          className="my-6 rounded-lg bg-[#101B2B] text-[#F7F6F2] p-4 font-mono text-xs overflow-x-auto border border-[#34465A] shadow-subtle"
                        >
                          <div className="flex justify-between items-center pb-2 mb-2 border-b border-[#34465A] text-[10px] text-[#AAB5C2]">
                            <span>{lang || "code"}</span>
                            <span className="text-[#C8A96B]">Production Pattern</span>
                          </div>
                          <pre>
                            <code>{code}</code>
                          </pre>
                        </div>
                      );
                    }

                    if (trimmed.startsWith("> ")) {
                      return (
                        <blockquote
                          key={idx}
                          className="p-4 my-4 bg-[#101B2B]/70 border-l-4 border-[#19B6A4] italic text-[#F7F6F2] rounded-r text-sm leading-relaxed"
                        >
                          {trimmed.replace(/^>\s*/gm, "")}
                        </blockquote>
                      );
                    }

                    if (trimmed.startsWith("- ")) {
                      const items = trimmed.split("\n").map((li) => li.replace("- ", ""));
                      return (
                        <ul key={idx} className="space-y-2 text-sm text-[#AAB5C2] my-4">
                          {items.map((li, lIdx) => (
                            <li key={lIdx} className="flex items-start gap-2">
                              <span className="w-1.5 h-1.5 rounded-full bg-[#19B6A4] mt-2 flex-shrink-0" />
                              <span>{li}</span>
                            </li>
                          ))}
                        </ul>
                      );
                    }

                    if (/^\d+\.\s/.test(trimmed)) {
                      const items = trimmed
                        .split("\n")
                        .map((li) => li.replace(/^\d+\.\s*/, ""));
                      return (
                        <ol key={idx} className="space-y-2 text-sm text-[#AAB5C2] my-4 list-decimal pl-5">
                          {items.map((li, lIdx) => (
                            <li key={lIdx} className="leading-relaxed">
                              {li}
                            </li>
                          ))}
                        </ol>
                      );
                    }

                    return (
                      <p key={idx} className="text-sm sm:text-base leading-relaxed text-[#AAB5C2]">
                        {trimmed}
                      </p>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>
        </section>

      {/* Bottom Navigation */}
      <section className="py-12 bg-transparent border-t border-[#34465A]">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <Link
            href="/insights"
            className="text-sm font-medium text-[#AAB5C2] hover:text-[#F7F6F2] flex items-center gap-1.5 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to All Articles</span>
          </Link>

          <Button
            href="/contact"
            variant="primary"
            size="md"
            icon={<ArrowRight className="w-4 h-4" />}
          >
            Discuss With The Engineering Team
          </Button>
        </div>
      </section>
    </div>
  );
}
