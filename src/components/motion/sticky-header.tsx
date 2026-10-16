"use client";

import React, { useState, useEffect } from "react";
import { cn } from "@/lib/utils";

interface StickyHeaderProps {
  children: React.ReactNode;
  className?: string;
  scrolledClassName?: string;
  topClassName?: string;
  threshold?: number;
}

export function StickyHeader({
  children,
  className = "",
  scrolledClassName = "bg-[#101B2B]/95 backdrop-blur-md border-b border-[#34465A] shadow-xl py-3",
  topClassName = "bg-[#101B2B]/90 backdrop-blur-md border-b border-[#34465A] py-4.5",
  threshold = 20,
}: StickyHeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    let ticking = false;

    const updateScrollState = () => {
      const scrollY = window.scrollY;
      if (scrollY > threshold) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(updateScrollState);
        ticking = true;
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    updateScrollState();

    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 w-full transition-all duration-300 ease-out",
        isScrolled ? scrolledClassName : topClassName,
        className
      )}
    >
      {children}
    </header>
  );
}
