"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION_DELAYS, VIEWPORT_CONFIG } from "./motion-config";

interface StaggerContainerProps {
  children: React.ReactNode;
  staggerDelay?: number;
  initialDelay?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  as?: "div" | "ul" | "ol" | "section" | "article";
}

export function StaggerContainer({
  children,
  staggerDelay = MOTION_DELAYS.stagger,
  initialDelay = 0.05,
  className = "",
  once = VIEWPORT_CONFIG.once,
  threshold = VIEWPORT_CONFIG.amount,
  as = "div",
}: StaggerContainerProps) {
  const shouldReduceMotion = useReducedMotion();

  const containerVariants = {
    hidden: {
      opacity: 0,
      transition: { duration: 0.2 },
    },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: shouldReduceMotion ? 0 : staggerDelay,
        delayChildren: shouldReduceMotion ? 0 : initialDelay,
      },
    },
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: VIEWPORT_CONFIG.margin }}
      className={className}
    >
      {children}
    </Component>
  );
}
