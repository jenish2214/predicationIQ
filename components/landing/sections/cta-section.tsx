"use client";

import { motion } from "framer-motion";
import { ArrowRight, CheckCircle2 } from "lucide-react";

import { MagneticButton } from "@/components/landing/ui/magnetic-button";
import { GlassCard } from "@/components/landing/ui/glass-card";

export function CtaSection() {
  return (
    <section className="relative pb-24 pt-8 md:pb-32">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 48, scale: 0.96 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        >
          <GlassCard glow="purple" className="overflow-hidden p-10 md:p-14">
            <div
              aria-hidden
              className="pointer-events-none absolute -left-32 top-0 h-64 w-64 rounded-full bg-neon-purple/25 blur-[100px]"
            />
            <div
              aria-hidden
              className="pointer-events-none absolute -right-24 bottom-0 h-56 w-56 rounded-full bg-neon-pink/20 blur-[90px]"
            />
            <div className="relative grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400">
                  <CheckCircle2 className="h-3.5 w-3.5" />
                  Ready when you are
                </span>
                <h2 className="mt-5 font-display text-3xl font-semibold tracking-tight md:text-4xl lg:text-5xl">
                  <span className="text-gradient">Start your reusable KYC journey</span>
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground md:text-lg">
                  Issue as a bank, hold as a citizen, verify as a merchant —
                  end to end in minutes.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:col-span-4 lg:justify-end">
                <MagneticButton href="/wallet">
                  Open Wallet
                  <ArrowRight className="h-4 w-4" />
                </MagneticButton>
                <MagneticButton href="/issuer" variant="outline">
                  Issue Credentials
                </MagneticButton>
              </div>
            </div>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
