"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import { MOTION_EASING, MOTION_DURATIONS, VIEWPORT_CONFIG } from "./motion-config";

interface ImageRevealProps {
  children: React.ReactNode;
  delay?: number;
  duration?: number;
  className?: string;
  imageClassName?: string;
  threshold?: number;
  once?: boolean;
}

export function ImageReveal({
  children,
  delay = 0,
  duration = MOTION_DURATIONS.image,
  className = "",
  imageClassName = "",
  threshold = VIEWPORT_CONFIG.amount,
  once = VIEWPORT_CONFIG.once,
}: ImageRevealProps) {
  const shouldReduceMotion = useReducedMotion();

  if (shouldReduceMotion) {
    return <div className={className}>{children}</div>;
  }

  const containerVariants = {
    hidden: {
      clipPath: "inset(6% 0% 6% 0% round 8px)",
      opacity: 0,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      clipPath: "inset(0% 0% 0% 0% round 8px)",
      opacity: 1,
      transition: {
        duration,
        delay,
        ease: MOTION_EASING,
      },
    },
  };

  const imageVariants = {
    hidden: {
      scale: 1.04,
      transition: {
        duration: 0.2,
      },
    },
    visible: {
      scale: 1,
      transition: {
        duration: duration * 1.1,
        delay,
        ease: MOTION_EASING,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: VIEWPORT_CONFIG.margin }}
      className={`overflow-hidden relative ${className}`}
    >
      <motion.div variants={imageVariants} className={`w-full h-full ${imageClassName}`}>
        {children}
      </motion.div>
    </motion.div>
  );
}
