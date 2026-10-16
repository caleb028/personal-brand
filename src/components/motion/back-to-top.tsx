"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ArrowUp } from "lucide-react";
import { MOTION_EASING } from "./motion-config";

interface BackToTopProps {
  threshold?: number;
  className?: string;
}

export function BackToTop({ threshold = 400, className = "" }: BackToTopProps) {
  const [isVisible, setIsVisible] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          setIsVisible(window.scrollY > threshold);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, [threshold]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: shouldReduceMotion ? "auto" : "smooth",
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          aria-label="Back to top of page"
          initial={{ opacity: 0, scale: 0.85, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.85, y: 10 }}
          transition={{ duration: 0.25, ease: MOTION_EASING }}
          className={`fixed bottom-6 right-6 z-40 p-3 rounded-full bg-[#101B2B]/90 text-white shadow-elevated border border-[#34465A] backdrop-blur-md hover:bg-[#19B6A4] hover:text-[#101B2B] hover:border-[#19B6A4] focus:outline-none focus:ring-2 focus:ring-[#19B6A4] focus:ring-offset-2 transition-colors ${className}`}
        >
          <ArrowUp className="w-5 h-5" aria-hidden="true" />
        </motion.button>
      )}
    </AnimatePresence>
  );
}
