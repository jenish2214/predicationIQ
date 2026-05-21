"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  tilt?: boolean;
  glow?: "purple" | "blue" | "pink" | "none";
}

export function GlassCard({
  children,
  className,
  tilt = true,
  glow = "purple",
}: GlassCardProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);
  const mx = useMotionValue(50);
  const my = useMotionValue(50);
  const rawRotateX = useMotionValue(0);
  const rawRotateY = useMotionValue(0);
  const rotateX = useSpring(rawRotateX, { stiffness: 300, damping: 30 });
  const rotateY = useSpring(rawRotateY, { stiffness: 300, damping: 30 });

  const glowColor =
    glow === "blue"
      ? "rgba(59,130,246,0.22)"
      : glow === "pink"
        ? "rgba(236,72,153,0.22)"
        : "rgba(139,92,246,0.22)";

  const spotlight = useMotionTemplate`radial-gradient(280px circle at ${mx}% ${my}%, ${glowColor}, transparent 65%)`;

  const onMove = (e: React.PointerEvent) => {
    if (!tilt || reduced || !ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = ((e.clientX - rect.left) / rect.width) * 100;
    const py = ((e.clientY - rect.top) / rect.height) * 100;
    mx.set(px);
    my.set(py);
    rawRotateX.set(((e.clientY - rect.top) / rect.height - 0.5) * -10);
    rawRotateY.set(((e.clientX - rect.left) / rect.width - 0.5) * 10);
  };

  const onLeave = () => {
    mx.set(50);
    my.set(50);
    rawRotateX.set(0);
    rawRotateY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        tilt && !reduced
          ? { rotateX, rotateY, transformPerspective: 1000 }
          : undefined
      }
      whileHover={reduced ? {} : { y: -6 }}
      transition={{ duration: 0.25 }}
      className={cn(
        "group relative rounded-2xl gradient-border glass-premium transition-shadow duration-300",
        glow === "purple" && "hover:shadow-neon",
        glow === "blue" && "hover:shadow-neon-blue",
        glow === "pink" && "hover:shadow-neon-pink",
        className
      )}
    >
      {!reduced && glow !== "none" ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 rounded-2xl opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{ background: spotlight }}
        />
      ) : null}
      <div className="relative z-10">{children}</div>
    </motion.div>
  );
}
