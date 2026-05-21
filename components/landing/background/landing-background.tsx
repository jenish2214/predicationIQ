"use client";

import { MeshGradient } from "@/components/landing/background/mesh-gradient";
import { NoiseOverlay } from "@/components/landing/background/noise-overlay";
import { Particles } from "@/components/landing/background/particles";

export function LandingBackground() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 -z-10 bg-neon-black"
    >
      <MeshGradient />
      <Particles />
      <NoiseOverlay />
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
    </div>
  );
}
