"use client";

import * as React from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface MagneticOptions {
  strength?: number;
}

export function useMagnetic<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  { strength = 0.35 }: MagneticOptions = {}
) {
  const reduced = useReducedMotion();
  const [offset, setOffset] = React.useState({ x: 0, y: 0 });

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) * strength;
      const dy = (e.clientY - cy) * strength;
      setOffset({ x: dx, y: dy });
    };

    const onLeave = () => setOffset({ x: 0, y: 0 });

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, [ref, strength, reduced]);

  return offset;
}
