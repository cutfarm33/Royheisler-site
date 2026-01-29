"use client";

import { cn } from "@/lib/utils";
import { type ReactNode } from "react";

interface ButtonProps {
  variant?: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
  className?: string;
  children?: ReactNode;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  href?: string;
  target?: string;
  rel?: string;
  onClick?: () => void;
}

export function Button({
  className,
  variant = "primary",
  size = "md",
  children,
  disabled,
  type = "button",
  href,
  target,
  rel,
  onClick,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-all duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50 active:scale-[0.98] hover:scale-[1.02]";

  const variants = {
    primary: "bg-foreground text-background hover:bg-foreground/90",
    secondary:
      "border border-border bg-transparent text-foreground hover:bg-card hover:border-muted",
    ghost: "text-muted hover:text-foreground hover:bg-card",
  };

  const sizes = {
    sm: "h-9 px-4 text-sm rounded-md",
    md: "h-11 px-6 text-sm rounded-lg",
    lg: "h-12 px-8 text-base rounded-lg",
  };

  const classes = cn(baseStyles, variants[variant], sizes[size], className);

  if (href) {
    return (
      <a href={href} target={target} rel={rel} className={classes}>
        {children}
      </a>
    );
  }

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={classes}
    >
      {children}
    </button>
  );
}
