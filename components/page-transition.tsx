"use client";

import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";

export function PageTransition({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const reduced = useReducedMotion();

  return (
    <motion.div
      key={pathname}
      initial={
        reduced ? { opacity: 0 } : { opacity: 0, y: 12, scale: 0.99 }
      }
      animate={
        reduced ? { opacity: 1 } : { opacity: 1, y: 0, scale: 1 }
      }
      transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
