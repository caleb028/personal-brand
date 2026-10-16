"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MOTION_EASING,
  MOTION_DURATIONS,
  MOTION_DISTANCES,
} from "./motion-config";

interface StaggerItemProps {
  children: React.ReactNode;
  distance?: number;
  duration?: number;
  className?: string;
  as?: "div" | "li" | "article" | "section" | "span";
}

export function StaggerItem({
  children,
  distance = MOTION_DISTANCES.base,
  duration = MOTION_DURATIONS.base,
  className = "",
  as = "div",
}: StaggerItemProps) {
  const shouldReduceMotion = useReducedMotion();

  const itemVariants = {
    hidden: {
      opacity: 0,
      y: shouldReduceMotion ? 0 : distance,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : duration,
        ease: MOTION_EASING,
      },
    },
  };

  const Component = motion[as] || motion.div;

  return (
    <Component variants={itemVariants} className={className}>
      {children}
    </Component>
  );
}
