"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform, useReducedMotion } from "framer-motion";
import { useMotionContext } from "./motion-provider";

interface ParallaxSectionProps {
  children: React.ReactNode;
  speed?: number; // e.g. 0.2 means subtle drift (approx 20-35px)
  direction?: "up" | "down";
  className?: string;
  disabledOnMobile?: boolean;
}

export function ParallaxSection({
  children,
  speed = 0.15,
  direction = "up",
  className = "",
  disabledOnMobile = true,
}: ParallaxSectionProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();
  const { isMobile } = useMotionContext();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const range = Math.round(speed * 120); // typical range 18px to 36px
  const outputRange =
    direction === "up" ? [range, -range] : [-range, range];

  const y = useTransform(scrollYProgress, [0, 1], outputRange);

  if (shouldReduceMotion || (disabledOnMobile && isMobile)) {
    return (
      <div ref={containerRef} className={className}>
        {children}
      </div>
    );
  }

  return (
    <div ref={containerRef} className={`overflow-visible ${className}`}>
      <motion.div style={{ y }} className="w-full h-full will-change-transform">
        {children}
      </motion.div>
    </div>
  );
}
