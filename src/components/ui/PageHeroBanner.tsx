"use client";

import React from "react";
import { TextReveal } from "@/components/motion/text-reveal";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

interface PageHeroBannerProps {
  badge?: string;
  title: string;
  description?: string;
  className?: string;
  density?: "low" | "medium" | "high";
}

export function PageHeroBanner({
  badge,
  title,
  description,
  className = "",
}: PageHeroBannerProps) {
  return (
    <section className={`relative border-b border-[#34465A] overflow-hidden py-16 sm:py-20 lg:py-24 ${className}`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {badge && (
          <ScrollReveal direction="down" distance={14} duration={0.5}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1D2D40]/80 backdrop-blur-md border border-[#34465A] shadow-subtle mb-4">
              <span className="w-2 h-2 rounded-full bg-[#C8A96B]"></span>
              <span className="text-xs font-mono font-medium text-[#C8A96B]">
                {badge}
              </span>
            </div>
          </ScrollReveal>
        )}

        <TextReveal
          as="h1"
          className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl text-white tracking-tight leading-[1.2]"
          duration={0.8}
        >
          {title}
        </TextReveal>

        {description && (
          <ScrollReveal direction="up" delay={0.15} distance={20} duration={0.7}>
            <p className="mt-6 text-base sm:text-lg text-[#AAB5C2] leading-relaxed font-sans max-w-2xl mx-auto">
              {description}
            </p>
          </ScrollReveal>
        )}
      </div>
    </section>
  );
}
