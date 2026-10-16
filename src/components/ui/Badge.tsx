import React from "react";
import { cn } from "@/lib/utils";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "emerald" | "teal" | "gold" | "navy" | "slate" | "outline" | "subtle" | "ivory";
  size?: "sm" | "md";
  className?: string;
}

export function Badge({
  children,
  variant = "subtle",
  size = "md",
  className,
}: BadgeProps) {
  const base =
    "inline-flex items-center font-sans font-medium rounded-full transition-colors select-none";

  const sizeClasses = {
    sm: "text-[11px] px-2.5 py-0.5 tracking-tight",
    md: "text-xs px-3 py-1 tracking-tight",
  };

  const variantClasses = {
    emerald: "bg-[#19B6A4]/15 text-[#19B6A4] border border-[#19B6A4]/35",
    teal: "bg-[#19B6A4]/15 text-[#19B6A4] border border-[#19B6A4]/35",
    gold: "bg-[#C8A96B]/15 text-[#C8A96B] border border-[#C8A96B]/35",
    navy: "bg-[#101B2B] text-[#F7F6F2] border border-[#34465A]",
    slate: "bg-[#1D2D40] text-[#AAB5C2] border border-[#34465A]",
    outline: "border border-[#34465A] text-[#AAB5C2] bg-[#101B2B]/70",
    subtle: "bg-[#1D2D40]/80 text-[#AAB5C2] border border-[#34465A]",
    ivory: "bg-white text-[#172331] border border-[#DDE3E8]",
  };

  return (
    <span
      className={cn(base, sizeClasses[size], variantClasses[variant], className)}
    >
      {children}
    </span>
  );
}
