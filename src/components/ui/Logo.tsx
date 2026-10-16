import React from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface LogoProps {
  variant?: "light" | "dark" | "auto";
  iconOnly?: boolean;
  className?: string;
  size?: "sm" | "md" | "lg";
}

export function Logo({
  variant = "auto",
  iconOnly = false,
  className,
  size = "md",
}: LogoProps) {
  // Proportional sizing based on the master 1058x249 aspect ratio (approx 4.25 : 1)
  const dimensions = {
    sm: { height: 32, width: 136, iconSize: 32 },
    md: { height: 42, width: 178, iconSize: 42 },
    lg: { height: 54, width: 230, iconSize: 54 },
  }[size];

  return (
    <Link
      href="/"
      aria-label="INSTAWEB SOFTWARES INTL Home"
      className={cn(
        "group inline-flex items-center transition-all duration-200 hover:opacity-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00F2FE] focus-visible:ring-offset-2 rounded-sm select-none",
        className
      )}
    >
      {iconOnly ? (
        <div
          className="relative flex items-center justify-center flex-shrink-0"
          style={{ width: dimensions.iconSize, height: dimensions.iconSize }}
        >
          <Image
            src="/images/instaweb-icon-transparent.png"
            alt="INSTAWEB Icon"
            width={dimensions.iconSize}
            height={dimensions.iconSize}
            className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-105 drop-shadow-[0_0_12px_rgba(0,242,254,0.35)]"
            priority
          />
        </div>
      ) : (
        <div
          className="relative flex items-center justify-start flex-shrink-0"
          style={{ height: dimensions.height, width: dimensions.width }}
        >
          <Image
            src="/images/instaweb-horizontal-transparent.png"
            alt="INSTAWEB SOFTWARES INTL"
            width={dimensions.width}
            height={dimensions.height}
            className="w-full h-auto object-contain transition-transform duration-200 group-hover:scale-[1.02] drop-shadow-[0_2px_10px_rgba(0,242,254,0.2)]"
            priority
          />
        </div>
      )}
    </Link>
  );
}
