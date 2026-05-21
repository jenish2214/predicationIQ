"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { useMagnetic } from "@/hooks/use-magnetic";

interface MagneticButtonProps {
  href: string;
  children: React.ReactNode;
  variant?: "primary" | "outline";
  className?: string;
}

export function MagneticButton({
  href,
  children,
  variant = "primary",
  className,
}: MagneticButtonProps) {
  const ref = React.useRef<HTMLAnchorElement>(null);
  const offset = useMagnetic(ref, { strength: 0.25 });

  return (
    <motion.div style={{ x: offset.x, y: offset.y }} className="inline-block">
      <Link
        ref={ref}
        href={href}
        className={cn(
          "group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 gpu-layer",
          variant === "primary" &&
            "bg-gradient-to-r from-neon-purple via-neon-blue to-neon-pink text-white shadow-neon hover:shadow-neon-blue hover:scale-[1.02]",
          variant === "outline" &&
            "border border-white/15 bg-white/5 text-foreground backdrop-blur-md hover:border-white/25 hover:bg-white/10",
          className
        )}
      >
        <span className="relative z-10 flex items-center gap-2">{children}</span>
        {variant === "primary" ? (
          <span
            aria-hidden
            className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full"
          />
        ) : null}
      </Link>
    </motion.div>
  );
}
