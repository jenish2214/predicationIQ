"use client";

import { motion } from "framer-motion";
import { Fingerprint, Lock, ShieldCheck } from "lucide-react";

import { GlassCard } from "@/components/landing/ui/glass-card";
import { LandingSectionHeading } from "@/components/landing/ui/section-heading";

const TRUST = [
  {
    title: "DPDP Act aligned",
    description:
      "Data minimisation, purpose limitation and consent are wired into the protocol.",
    icon: ShieldCheck,
    glow: "purple" as const,
  },
  {
    title: "RBI KYC ready",
    description:
      "Built around RBI Master Direction on KYC and reusable KYC norms.",
    icon: Lock,
    glow: "blue" as const,
  },
  {
    title: "Built for Bharat",
    description:
      "Aadhaar, PAN, DigiLocker and UPI patterns are first-class citizens.",
    icon: Fingerprint,
    glow: "pink" as const,
  },
];

const BADGES = [
  "W3C VC 2.0",
  "W3C DID 1.0",
  "DPDP Act 2023",
  "RBI KYC MD",
  "Polygon Amoy",
  "DigiLocker",
];

export function TrustSection() {
  return (
    <section id="trust" className="relative py-24 md:py-32">
      <div className="container grid gap-12 lg:grid-cols-12 lg:gap-16">
        <div className="lg:col-span-5">
          <LandingSectionHeading
            align="left"
            eyebrow="Trust & compliance"
            title="India-first by design,"
            highlight="not translation"
            description="Built around how Indian KYC actually works."
          />
          <div className="mt-8 flex flex-wrap gap-2">
            {BADGES.map((b) => (
              <span
                key={b}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-[11px] text-muted-foreground"
              >
                {b}
              </span>
            ))}
          </div>
        </div>
        <div className="space-y-4 lg:col-span-7">
          {TRUST.map((t, i) => {
            const Icon = t.icon;
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, x: 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08, duration: 0.5 }}
              >
                <GlassCard glow={t.glow} className="flex items-start gap-4 p-5 md:p-6">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-display text-base font-semibold">
                      {t.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {t.description}
                    </p>
                  </div>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
