"use client";

import React from "react";
import { motion, useScroll, useSpring } from "framer-motion";

interface ScrollProgressProps {
  className?: string;
}

export function ScrollProgress({ className = "" }: ScrollProgressProps) {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 280,
    damping: 35,
    restDelta: 0.001,
  });

  return (
    <div
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuemin={0}
      aria-valuemax={100}
      className={`fixed top-0 left-0 right-0 h-[2.5px] z-50 pointer-events-none bg-transparent ${className}`}
    >
      <motion.div
        style={{ scaleX }}
        className="w-full h-full bg-[#19B6A4] origin-left shadow-[0_0_8px_rgba(25,182,164,0.6)]"
      />
    </div>
  );
}
