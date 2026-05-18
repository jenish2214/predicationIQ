"use client";

import * as React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
  useTransform,
  useReducedMotion,
} from "framer-motion";

import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  /** Max rotation in degrees on each axis. */
  intensity?: number;
  /** Show the soft mouse-following spotlight. */
  glow?: boolean;
}

/**
 * Magnetic 3D-tilt card — the surface rotates slightly toward the cursor and
 * a soft single-color glow follows it. Use the `group/tilt` class on the
 * wrapper so the glow only appears on hover.
 */
export function TiltCard({
  children,
  className,
  intensity = 6,
  glow = true,
}: TiltCardProps) {
  const reduced = useReducedMotion();
  const ref = React.useRef<HTMLDivElement>(null);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);

  const xSpring = useSpring(mx, { stiffness: 220, damping: 22, mass: 0.4 });
  const ySpring = useSpring(my, { stiffness: 220, damping: 22, mass: 0.4 });

  const rotateX = useTransform(ySpring, [-0.5, 0.5], [intensity, -intensity]);
  const rotateY = useTransform(xSpring, [-0.5, 0.5], [-intensity, intensity]);

  const glowX = useTransform(xSpring, [-0.5, 0.5], ["0%", "100%"]);
  const glowY = useTransform(ySpring, [-0.5, 0.5], ["0%", "100%"]);

  const glowStyle = useMotionTemplate`radial-gradient(220px circle at ${glowX} ${glowY}, hsl(var(--primary) / 0.18), transparent 70%)`;

  const onMove = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      if (reduced) return;
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      mx.set(x);
      my.set(y);
    },
    [mx, my, reduced]
  );

  const onLeave = React.useCallback(() => {
    mx.set(0);
    my.set(0);
  }, [mx, my]);

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      style={
        reduced
          ? undefined
          : {
              rotateX,
              rotateY,
              transformPerspective: 900,
              transformStyle: "preserve-3d",
            }
      }
      className={cn("group/tilt relative", className)}
    >
      {glow && !reduced ? (
        <motion.div
          aria-hidden
          className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-200 group-hover/tilt:opacity-100"
          style={{ background: glowStyle }}
        />
      ) : null}
      <div
        className="rounded-[inherit]"
        style={reduced ? undefined : { transform: "translateZ(20px)" }}
      >
        {children}
      </div>
    </motion.div>
  );
}
