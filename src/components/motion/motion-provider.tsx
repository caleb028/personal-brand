"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { MotionConfig } from "framer-motion";

interface MotionContextValue {
  isReducedMotion: boolean;
  isMobile: boolean;
  scrollDirection: "up" | "down";
}

const MotionContext = createContext<MotionContextValue>({
  isReducedMotion: false,
  isMobile: false,
  scrollDirection: "down",
});

export function useMotionContext() {
  return useContext(MotionContext);
}

export function MotionProvider({ children }: { children: React.ReactNode }) {
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollDirection, setScrollDirection] = useState<"up" | "down">("down");

  useEffect(() => {
    // Check reduced motion preference
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setIsReducedMotion(motionQuery.matches);

    const handleMotionChange = (e: MediaQueryListEvent) => {
      setIsReducedMotion(e.matches);
    };
    motionQuery.addEventListener("change", handleMotionChange);

    // Check viewport width for mobile optimizations
    const mobileQuery = window.matchMedia("(max-width: 768px)");
    setIsMobile(mobileQuery.matches);

    const handleMobileChange = (e: MediaQueryListEvent) => {
      setIsMobile(e.matches);
    };
    mobileQuery.addEventListener("change", handleMobileChange);

    // Track scroll direction with RAF throttling
    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateDirection = () => {
      const currentScrollY = window.scrollY;
      const diff = currentScrollY - lastScrollY;
      if (Math.abs(diff) > 6) {
        setScrollDirection(diff > 0 ? "down" : "up");
        lastScrollY = currentScrollY > 0 ? currentScrollY : 0;
      }
      ticking = false;
    };

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateDirection);
        ticking = true;
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      motionQuery.removeEventListener("change", handleMotionChange);
      mobileQuery.removeEventListener("change", handleMobileChange);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <MotionContext.Provider value={{ isReducedMotion, isMobile, scrollDirection }}>
      <MotionConfig reducedMotion="user">
        {children}
      </MotionConfig>
    </MotionContext.Provider>
  );
}
