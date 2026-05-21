"use client";

import { HeroSection } from "@/components/landing/hero/hero-section";
import { MarqueeSection } from "@/components/landing/sections/marquee-section";
import { FeaturesSection } from "@/components/landing/sections/features-section";
import { ProtocolSection } from "@/components/landing/sections/protocol-section";
import { TrustSection } from "@/components/landing/sections/trust-section";
import { CtaSection } from "@/components/landing/sections/cta-section";

export function LandingPage() {
  return (
    <>
      <HeroSection />
      <MarqueeSection />
      <FeaturesSection />
      <ProtocolSection />
      <TrustSection />
      <CtaSection />
    </>
  );
}
