"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION_EASING, MOTION_DURATIONS, VIEWPORT_CONFIG } from "./motion-config";

interface TextRevealProps {
  children: React.ReactNode;
  as?: "h1" | "h2" | "h3" | "h4" | "p" | "span" | "div";
  delay?: number;
  duration?: number;
  className?: string;
  innerClassName?: string;
  threshold?: number;
  once?: boolean;
}

export function TextReveal({
  children,
  as: Component = "h2",
  delay = 0,
  duration = MOTION_DURATIONS.smooth,
  className = "",
  innerClassName = "",
  threshold = VIEWPORT_CONFIG.amount,
  once = VIEWPORT_CONFIG.once,
}: TextRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <Component className={className}>{children}</Component>;
  }

  const maskVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.04,
        delayChildren: delay,
      },
    },
  };

  const textVariants = {
    hidden: {
      y: "100%",
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      y: "0%",
      opacity: 1,
      transition: {
        duration,
        ease: MOTION_EASING,
      },
    },
  };

  return (
    <Component className={`overflow-hidden ${className}`}>
      <motion.span
        variants={maskVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once, amount: threshold, margin: VIEWPORT_CONFIG.margin }}
        className={`inline-block w-full overflow-hidden leading-tight ${innerClassName}`}
      >
        <motion.span variants={textVariants} className="inline-block w-full">
          {children}
        </motion.span>
      </motion.span>
    </Component>
  );
}
