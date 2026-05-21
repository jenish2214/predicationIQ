"use client";

import dynamic from "next/dynamic";

const FloatingOrbScene = dynamic(
  () =>
    import("@/components/landing/three/floating-orb").then((m) => m.FloatingOrb),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[min(420px,50vw)] w-[min(420px,50vw)] items-center justify-center">
        <div className="h-48 w-48 animate-pulse rounded-full bg-neon-purple/20 blur-3xl" />
      </div>
    ),
  }
);

export function FloatingOrbLazy() {
  return <FloatingOrbScene />;
}
