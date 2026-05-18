"use client";

import * as React from "react";

import { cn } from "@/lib/utils";

interface QrFrameProps {
  children?: React.ReactNode;
  className?: string;
  scanning?: boolean;
  size?: "sm" | "md" | "lg";
}

export function QrFrame({
  children,
  className,
  scanning = false,
  size = "md",
}: QrFrameProps) {
  const dims =
    size === "lg"
      ? "h-72 w-72 md:h-80 md:w-80"
      : size === "sm"
      ? "h-40 w-40"
      : "h-56 w-56";

  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-2xl border border-border bg-secondary/40",
        dims,
        className
      )}
    >
      {/* Corner brackets */}
      <span className="absolute left-3 top-3 h-5 w-5 border-l-2 border-t-2 border-primary" />
      <span className="absolute right-3 top-3 h-5 w-5 border-r-2 border-t-2 border-primary" />
      <span className="absolute bottom-3 left-3 h-5 w-5 border-b-2 border-l-2 border-primary" />
      <span className="absolute bottom-3 right-3 h-5 w-5 border-b-2 border-r-2 border-primary" />

      {scanning ? (
        <span className="pointer-events-none absolute inset-x-3 top-3 h-px overflow-hidden">
          <span className="block h-px w-full animate-scan-line bg-primary" />
        </span>
      ) : null}

      <div className="flex h-full w-full items-center justify-center">
        {children ?? <QrPattern />}
      </div>
    </div>
  );
}

export function QrPattern({ className }: { className?: string }) {
  const cells = React.useMemo(() => {
    const seed = 7;
    return Array.from({ length: 21 * 21 }, (_, i) => {
      // deterministic pseudo-random for stable SSR
      return ((i * 2654435761 + seed) >>> 0) % 100 < 48;
    });
  }, []);
  return (
    <div
      className={cn(
        "grid grid-cols-[repeat(21,1fr)] gap-px overflow-hidden rounded-lg border border-border bg-background p-2",
        className
      )}
      style={{ width: "82%", aspectRatio: "1 / 1" }}
      aria-hidden
    >
      {cells.map((on, idx) => {
        const row = Math.floor(idx / 21);
        const col = idx % 21;
        const isCorner =
          (row < 7 && col < 7) ||
          (row < 7 && col > 13) ||
          (row > 13 && col < 7);
        if (isCorner) {
          const innerRow = row < 7 ? row : 20 - row;
          const innerCol = col < 7 ? col : 20 - col;
          const onCorner =
            innerRow === 0 ||
            innerRow === 6 ||
            innerCol === 0 ||
            innerCol === 6 ||
            (innerRow >= 2 && innerRow <= 4 && innerCol >= 2 && innerCol <= 4);
          return (
            <span
              key={idx}
              className={onCorner ? "bg-foreground" : "bg-transparent"}
            />
          );
        }
        return (
          <span
            key={idx}
            className={on ? "bg-foreground" : "bg-transparent"}
          />
        );
      })}
    </div>
  );
}
