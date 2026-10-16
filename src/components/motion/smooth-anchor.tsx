"use client";

import React from "react";

interface SmoothAnchorProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  href: string;
  headerOffset?: number;
  children: React.ReactNode;
}

export function SmoothAnchor({
  href,
  headerOffset = 80,
  children,
  onClick,
  className = "",
  ...props
}: SmoothAnchorProps) {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) {
      onClick(e);
    }

    // Only intercept local in-page anchors
    if (href.startsWith("#") && href.length > 1) {
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);

      if (element) {
        e.preventDefault();
        const prefersReducedMotion = window.matchMedia(
          "(prefers-reduced-motion: reduce)"
        ).matches;

        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition =
          elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: prefersReducedMotion ? "auto" : "smooth",
        });

        // Update URL hash without jumping
        if (window.history.pushState) {
          window.history.pushState(null, "", href);
        }
      }
    }
  };

  return (
    <a href={href} onClick={handleClick} className={className} {...props}>
      {children}
    </a>
  );
}
