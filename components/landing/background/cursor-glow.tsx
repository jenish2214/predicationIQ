"use client";

import { motion, useSpring } from "framer-motion";
import { useMousePosition } from "@/hooks/use-mouse-position";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function CursorGlow() {
  const reduced = useReducedMotion();
  const { position } = useMousePosition();

  const x = useSpring(position.x, { stiffness: 120, damping: 20, mass: 0.3 });
  const y = useSpring(position.y, { stiffness: 120, damping: 20, mass: 0.3 });

  if (reduced) return null;

  return (
    <motion.div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-[1] hidden md:block"
      style={{ x, y }}
    >
      <motion.div
        className="absolute -left-40 -top-40 h-80 w-80 rounded-full opacity-40"
        style={{
          background:
            "radial-gradient(circle, rgba(139,92,246,0.35) 0%, transparent 70%)",
        }}
      />
    </motion.div>
  );
}
