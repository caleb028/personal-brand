"use client";

import React from "react";
import { motion, useReducedMotion } from "framer-motion";
import {
  MOTION_EASING,
  MOTION_DURATIONS,
  MOTION_DISTANCES,
  VIEWPORT_CONFIG,
} from "./motion-config";
import { useMotionContext } from "./motion-provider";

interface ScrollRevealProps {
  children: React.ReactNode;
  direction?: "up" | "down" | "left" | "right" | "none";
  delay?: number;
  duration?: number;
  distance?: number;
  className?: string;
  once?: boolean;
  threshold?: number;
  as?: "div" | "section" | "article" | "aside" | "header" | "footer" | "span";
}

export function ScrollReveal({
  children,
  direction = "up",
  delay = 0,
  duration = MOTION_DURATIONS.base,
  distance,
  className = "",
  once = VIEWPORT_CONFIG.once,
  threshold = VIEWPORT_CONFIG.amount,
  as = "div",
}: ScrollRevealProps) {
  const shouldReduceMotion = useReducedMotion();
  const { isMobile } = useMotionContext();

  const effectiveDistance =
    distance !== undefined
      ? distance
      : isMobile
      ? MOTION_DISTANCES.mobile
      : MOTION_DISTANCES.base;

  const getInitialPosition = () => {
    if (shouldReduceMotion || direction === "none") {
      return { x: 0, y: 0 };
    }
    switch (direction) {
      case "up":
        return { x: 0, y: effectiveDistance };
      case "down":
        return { x: 0, y: -effectiveDistance };
      case "left":
        return { x: effectiveDistance, y: 0 };
      case "right":
        return { x: -effectiveDistance, y: 0 };
      default:
        return { x: 0, y: 0 };
    }
  };

  const initialPos = getInitialPosition();

  const variants = {
    hidden: {
      opacity: 0,
      x: initialPos.x,
      y: initialPos.y,
      transition: {
        duration: 0.2,
        ease: "easeOut",
      },
    },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.2 : duration,
        delay,
        ease: MOTION_EASING,
      },
    },
  };

  const Component = motion[as] || motion.div;

  return (
    <Component
      variants={variants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount: threshold, margin: VIEWPORT_CONFIG.margin }}
      className={className}
    >
      {children}
    </Component>
  );
}
