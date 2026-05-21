"use client";

import { usePathname } from "next/navigation";
import { motion, useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

/** Offsets fixed navbar + keeps page content above the global background. */
export function AppPageContent({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isLanding = pathname === "/";
  const reduced = useReducedMotion();

  if (isLanding) {
    return <div className="relative z-[2]">{children}</div>;
  }

  return (
    <motion.div
      className={cn("relative z-[2] pt-20 md:pt-24")}
      initial={reduced ? false : { opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}
