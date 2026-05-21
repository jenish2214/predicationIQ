"use client";

import { FEATURES } from "@/lib/mock-data";
import { GlassCard } from "@/components/landing/ui/glass-card";
import { LandingSectionHeading } from "@/components/landing/ui/section-heading";
import { motion } from "framer-motion";

export function FeaturesSection() {
  return (
    <section id="features" className="relative py-24 md:py-32">
      <div className="container">
        <LandingSectionHeading
          eyebrow="Why SovraID"
          title="Privacy-first identity"
          highlight="for India"
          description="Issue, hold and verify credentials without a central honeypot of PII."
        />
        <div className="mt-16 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {FEATURES.map((feature, i) => {
            const Icon = feature.icon;
            const glow =
              i % 3 === 0 ? "purple" : i % 3 === 1 ? "blue" : "pink";
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40, scale: 0.96 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{
                  duration: 0.55,
                  delay: i * 0.06,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <GlassCard glow={glow} className="h-full p-6 md:p-7">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-white/5">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {feature.description}
                  </p>
                </GlassCard>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
