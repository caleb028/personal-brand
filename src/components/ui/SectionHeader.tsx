"use client";

import React from "react";
import { cn } from "@/lib/utils";
import { TextReveal } from "@/components/motion/text-reveal";
import { ScrollReveal } from "@/components/motion/scroll-reveal";

interface SectionHeaderProps {
  kicker?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  inverted?: boolean;
  className?: string;
}

export function SectionHeader({
  kicker,
  title,
  description,
  align = "left",
  inverted = false,
  className,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "flex flex-col mb-12 sm:mb-16",
        align === "center" ? "items-center text-center mx-auto" : "text-left",
        className
      )}
    >
      {kicker && (
        <ScrollReveal direction="down" distance={12} duration={0.5} threshold={0.1}>
          <span
            className={cn(
              "text-xs font-mono font-semibold tracking-wider uppercase mb-3 inline-flex items-center gap-2",
              inverted ? "text-[#C8A96B]" : "text-[#101B2B]"
            )}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current"></span>
            {kicker}
          </span>
        </ScrollReveal>
      )}

      <TextReveal
        as="h2"
        className={cn(
          "font-heading font-extrabold text-2xl sm:text-3xl md:text-4xl tracking-tight leading-[1.2] max-w-3xl",
          inverted ? "text-white" : "text-[#101B2B]"
        )}
      >
        {title}
      </TextReveal>

      {description && (
        <ScrollReveal direction="up" delay={0.12} distance={18} duration={0.65} threshold={0.1}>
          <p
            className={cn(
              "mt-4 font-sans text-base sm:text-lg leading-relaxed max-w-2xl",
              inverted ? "text-[#AAB5C2]" : "text-[#526273]"
            )}
          >
            {description}
          </p>
        </ScrollReveal>
      )}
    </div>
  );
}
