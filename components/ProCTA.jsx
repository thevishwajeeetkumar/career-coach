"use client";

import Link from "next/link";
import { Crown } from "lucide-react";
import { Button } from "@/components/ui/button";

/**
 * ProCTA
 * Uniform CTA for all Pro-related buttons.
 *
 * Props:
 *  - href (string, required)
 *  - children (label text)
 *  - tone: "solid" | "outline" | "ghost"
 *  - full: boolean (full width)
 *  - size: "sm" | "default" | "lg"
 *  - icon: ReactNode (optional, defaults to Crown)
 */
export default function ProCTA({
  href,
  children = "Get Pro",
  tone = "solid",
  full = false,
  size = "lg",
  icon,
  className = "",
  ...rest
}) {
  const base =
    "inline-flex items-center gap-2 rounded-full transition shadow-md " +
    "ring-1 ring-transparent hover:ring-2 hover:ring-amber-400/50 " +
    "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-amber-400/70";
  const solid =
    "bg-foreground text-background hover:opacity-95 active:opacity-90";
  const outline =
    "bg-transparent border border-input hover:bg-muted/60 text-foreground";
  const ghost =
    "bg-transparent hover:bg-muted/60 text-foreground";

  const toneClass = tone === "outline" ? outline : tone === "ghost" ? ghost : solid;
  const width = full ? "w-full" : "";

  return (
    <Link href={href} prefetch={false}>
      <Button size={size} className={`${base} ${toneClass} ${width} ${className}`} {...rest}>
        {icon ?? <Crown className="h-4 w-4 text-amber-400" />}
        {children}
      </Button>
    </Link>
  );
}
