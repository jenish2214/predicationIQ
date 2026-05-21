"use client";

import * as React from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Building2,
  ScanLine,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { GlassCard } from "@/components/landing/ui/glass-card";
import { LandingSectionHeading } from "@/components/landing/ui/section-heading";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STEPS: {
  role: string;
  title: string;
  description: string;
  icon: LucideIcon;
  examples: string[];
}[] = [
  {
    role: "Issuer",
    title: "Banks & Government issue",
    description:
      "UIDAI, banks and RTOs verify once and mint tamper-proof credentials into the citizen wallet.",
    icon: Building2,
    examples: ["UIDAI", "HDFC Bank", "Income Tax"],
  },
  {
    role: "Holder",
    title: "You hold it in your wallet",
    description:
      "Credentials stay on-device. Your DID and keys never leave your control.",
    icon: UserRound,
    examples: ["Aadhaar", "PAN", "Bank KYC"],
  },
  {
    role: "Verifier",
    title: "Verifiers check the proof",
    description:
      "Merchants request only the attributes they need. You approve and share instantly.",
    icon: ScanLine,
    examples: ["NeoPay", "Zomato", "CryptoXchange"],
  },
];

export function ProtocolSection() {
  const reduced = useReducedMotion();
  const pinRef = React.useRef<HTMLDivElement>(null);
  const cardsRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (reduced || !pinRef.current || !cardsRef.current) return;

    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: pinRef.current,
        start: "top top",
        end: "+=200%",
        pin: true,
        pinSpacing: true,
        anticipatePin: 1,
      });

      const cards = cardsRef.current?.querySelectorAll("[data-step-card]");
      cards?.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0.3, scale: 0.94, y: 40 },
          {
            opacity: 1,
            scale: 1,
            y: 0,
            scrollTrigger: {
              trigger: card,
              start: `top ${75 - i * 5}%`,
              end: "top 40%",
              scrub: 0.5,
            },
          }
        );
      });
    }, pinRef);

    return () => ctx.revert();
  }, [reduced]);

  return (
    <section id="protocol" className="relative border-y border-white/5">
      <div className="container py-20 md:py-24">
        <LandingSectionHeading
          eyebrow="How it works"
          title="Issuer → Holder →"
          highlight="Verifier"
          description="W3C Verifiable Credentials and DIDs — anchored on Polygon."
        />
      </div>

      <div ref={pinRef} className="container pb-24">
        <div className="grid gap-12 lg:grid-cols-12">
          <div className="hidden lg:col-span-4 lg:block">
            <p className="font-display text-3xl font-semibold text-foreground">
              One identity.
              <br />
              <span className="text-gradient-accent">Many roles.</span>
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Scroll to walk through the three-party KYC flow.
            </p>
          </div>
          <div ref={cardsRef} className="space-y-8 lg:col-span-8 lg:space-y-12">
            {STEPS.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.role} data-step-card>
                  <GlassCard glow={i === 0 ? "purple" : i === 1 ? "blue" : "pink"} className="p-6 md:p-8">
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-xs uppercase tracking-[0.2em] text-muted-foreground">
                        Step 0{i + 1}
                      </span>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-wider text-foreground">
                        {step.role}
                      </span>
                    </div>
                    <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                      <Icon className="h-6 w-6" />
                    </div>
                    <h3 className="mt-5 font-display text-2xl font-semibold">
                      {step.title}
                    </h3>
                    <p className="mt-2 max-w-xl text-muted-foreground">
                      {step.description}
                    </p>
                    <div className="mt-5 flex flex-wrap gap-2 border-t border-white/10 pt-4">
                      {step.examples.map((ex) => (
                        <span
                          key={ex}
                          className="rounded-md border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-muted-foreground"
                        >
                          {ex}
                        </span>
                      ))}
                    </div>
                  </GlassCard>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
