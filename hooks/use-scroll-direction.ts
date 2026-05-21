"use client";

import * as React from "react";

export function useScrollDirection(threshold = 12) {
  const [direction, setDirection] = React.useState<"up" | "down">("up");
  const [scrolled, setScrolled] = React.useState(false);
  const lastY = React.useRef(0);

  React.useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 24);
      if (Math.abs(y - lastY.current) < threshold) return;
      setDirection(y > lastY.current ? "down" : "up");
      lastY.current = y;
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return { direction, scrolled, hidden: direction === "down" && scrolled };
}
