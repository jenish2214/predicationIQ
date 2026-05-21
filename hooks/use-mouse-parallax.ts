"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

export function useMouseParallax(intensity = 20) {
  const reduced = useReducedMotion();
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      const x = ((e.clientX / window.innerWidth) - 0.5) * intensity;
      const y = ((e.clientY / window.innerHeight) - 0.5) * intensity;
      setOffset({ x, y });
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [intensity, reduced]);

  return offset;
}
