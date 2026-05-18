"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface MarqueeProps {
  children: React.ReactNode;
  className?: string;
  reverse?: boolean;
  speed?: number; // seconds per loop
  pauseOnHover?: boolean;
  fade?: boolean;
}

/**
 * Infinite horizontal marquee implemented with two duplicated tracks for a
 * seamless wrap-around. Honors prefers-reduced-motion via CSS in globals.
 */
export function Marquee({
  children,
  className,
  reverse = false,
  speed = 40,
  pauseOnHover = true,
  fade = true,
}: MarqueeProps) {
  const style: React.CSSProperties = {
    animationDuration: `${speed}s`,
    animationDirection: reverse ? "reverse" : "normal",
  };

  return (
    <div
      className={cn(
        "group relative flex w-full overflow-hidden",
        fade && "[mask-image:linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]",
        className
      )}
    >
      <div
        className={cn(
          "flex shrink-0 items-center gap-6 animate-marquee whitespace-nowrap pr-6",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={style}
        aria-hidden="false"
      >
        {children}
      </div>
      <div
        className={cn(
          "flex shrink-0 items-center gap-6 animate-marquee whitespace-nowrap pr-6",
          pauseOnHover && "group-hover:[animation-play-state:paused]"
        )}
        style={style}
        aria-hidden="true"
      >
        {children}
      </div>
    </div>
  );
}
