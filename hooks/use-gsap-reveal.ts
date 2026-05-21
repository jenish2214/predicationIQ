"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

let registered = false;

function ensureGsap() {
  if (!registered && typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
}

interface RevealOptions {
  y?: number;
  scale?: number;
  duration?: number;
  delay?: number;
  start?: string;
  scrub?: boolean | number;
  pin?: boolean;
}

export function useGsapReveal<T extends HTMLElement>(
  ref: React.RefObject<T | null>,
  options: RevealOptions = {}
) {
  const reduced = useReducedMotion();
  const {
    y = 48,
    scale = 0.96,
    duration = 1,
    delay = 0,
    start = "top 85%",
    scrub = false,
    pin = false,
  } = options;

  React.useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;

    ensureGsap();

    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { opacity: 0, y, scale },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration,
          delay,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start,
            scrub: scrub || false,
            pin,
            toggleActions: scrub ? undefined : "play none none reverse",
          },
        }
      );
    }, el);

    return () => ctx.revert();
  }, [ref, reduced, y, scale, duration, delay, start, scrub, pin]);
}
