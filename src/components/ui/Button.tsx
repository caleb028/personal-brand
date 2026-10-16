import React from "react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "dark-outline";
  size?: "sm" | "md" | "lg";
  href?: string;
  external?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  children: React.ReactNode;
}

export function Button({
  variant = "primary",
  size = "md",
  href,
  external = false,
  icon,
  iconPosition = "right",
  children,
  className,
  disabled,
  ...props
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-sans font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#19B6A4] focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md select-none";

  const sizeStyles = {
    sm: "text-xs px-3.5 py-1.5 gap-1.5",
    md: "text-sm px-4.5 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-[#19B6A4] text-[#101B2B] font-semibold hover:bg-[#15A392] shadow-sm active:translate-y-px",
    secondary:
      "bg-[#101B2B] text-[#F7F6F2] hover:bg-[#1D2D40] border border-[#34465A] shadow-sm active:translate-y-px",
    outline:
      "border border-[#34465A] bg-[#1D2D40]/80 text-[#F7F6F2] hover:bg-[#1D2D40] hover:border-[#19B6A4]/60 active:translate-y-px",
    ghost:
      "text-[#AAB5C2] hover:text-[#F7F6F2] hover:bg-white/10 active:bg-white/15",
    "dark-outline":
      "border border-white/55 bg-transparent text-white hover:bg-white/10 hover:border-white active:translate-y-px",
  };

  const combinedClasses = cn(
    baseStyles,
    sizeStyles[size],
    variantStyles[variant],
    className
  );

  const content = (
    <>
      {icon && iconPosition === "left" && (
        <span className="flex-shrink-0">{icon}</span>
      )}
      <span>{children}</span>
      {icon && iconPosition === "right" && (
        <span className="flex-shrink-0 transition-transform group-hover:translate-x-0.5">
          {icon}
        </span>
      )}
    </>
  );

  if (href) {
    if (external) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={combinedClasses}
        >
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={combinedClasses}>
        {content}
      </Link>
    );
  }

  return (
    <button className={combinedClasses} disabled={disabled} {...props}>
      {content}
    </button>
  );
}
