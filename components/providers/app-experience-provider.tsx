"use client";

import { useLenisScroll } from "@/hooks/use-lenis-scroll";
import { CursorGlow } from "@/components/landing/background/cursor-glow";

/** Global Lenis smooth scroll + cursor glow for every route. */
export function AppExperienceProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useLenisScroll(true);

  return (
    <>
      <CursorGlow />
      {children}
    </>
  );
}
