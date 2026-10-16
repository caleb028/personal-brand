"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import { MOTION_EASING, MOTION_DURATIONS } from "./motion-config";

interface PageTransitionProps {
  children: React.ReactNode;
  className?: string;
}

export function PageTransition({ children, className = "" }: PageTransitionProps) {
  const pathname = usePathname();
  const shouldReduceMotion = useReducedMotion();

  const transitionVariants = {
    initial: {
      opacity: shouldReduceMotion ? 1 : 0,
      y: shouldReduceMotion ? 0 : 8,
    },
    animate: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.1 : MOTION_DURATIONS.page,
        ease: MOTION_EASING,
      },
    },
  };

  return (
    <motion.div
      key={pathname}
      variants={transitionVariants}
      initial="initial"
      animate="animate"
      className={`w-full flex-1 flex flex-col ${className}`}
    >
      {children}
    </motion.div>
  );
}
