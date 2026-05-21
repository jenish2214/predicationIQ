"use client";

import { AppExperienceProvider } from "@/components/providers/app-experience-provider";
import { LandingBackground } from "@/components/landing/background/landing-background";
import { ScrollProgress } from "@/components/animations/scroll-progress";

interface LayoutShellProps {
  children: React.ReactNode;
}

/** Premium mesh background, particles, Lenis, and scroll progress on all routes. */
export function LayoutShell({ children }: LayoutShellProps) {
  return (
    <AppExperienceProvider>
      <LandingBackground />
      <ScrollProgress />
      {children}
    </AppExperienceProvider>
  );
}
