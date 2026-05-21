"use client";

import * as React from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, ShieldCheck, Sparkles } from "lucide-react";

import { AnimatedNumber } from "@/components/animated-number";
import { MagneticButton } from "@/components/landing/ui/magnetic-button";
import { FloatingOrbLazy } from "@/components/landing/three/floating-orb-lazy";
import { useMouseParallax } from "@/hooks/use-mouse-parallax";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const STATS = [
  { value: 1, suffix: "×", label: "KYC once, reuse forever" },
  { value: 2.4, suffix: "s", decimals: 1, label: "Avg verification" },
  { value: 0, label: "PII on our servers" },
  { value: 100, suffix: "%", label: "User-held credentials" },
];

const WORDS = ["Verify", "once.", "Prove", "anywhere."];

export function HeroSection() {
  const reduced = useReducedMotion();
  const sectionRef = React.useRef<HTMLElement>(null);
  const parallax = useMouseParallax(24);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.5], [0, reduced ? 0 : 120]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100svh] overflow-hidden pt-24 pb-20 md:pt-32 md:pb-28"
    >
      <motion.div style={{ opacity, y }} className="container relative z-10">
        <motion.div
          style={
            reduced
              ? undefined
              : { x: parallax.x * 0.3, y: parallax.y * 0.3 }
          }
          className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8"
        >
          <div className="lg:col-span-6 xl:col-span-7">
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur-md"
            >
              <Sparkles className="h-3.5 w-3.5 text-neon-purple" />
              India&apos;s decentralized reusable KYC network
            </motion.div>

            <h1 className="mt-8 font-display text-4xl font-semibold leading-[1.08] tracking-tight md:text-6xl lg:text-7xl">
              {WORDS.map((word, i) => (
                <motion.span
                  key={word + i}
                  initial={{ opacity: 0, y: 40, filter: "blur(8px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  transition={{
                    duration: 0.7,
                    delay: 0.08 * i,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className={
                    i === 1 || i === 3
                      ? "text-gradient-accent mr-[0.2em] inline-block"
                      : "text-foreground mr-[0.2em] inline-block"
                  }
                >
                  {word}
                </motion.span>
              ))}
              <motion.span
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-2 block text-xl font-normal text-muted-foreground md:text-2xl"
              >
                Without giving up your privacy.
              </motion.span>
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55, duration: 0.6 }}
              className="mt-6 max-w-xl text-base text-muted-foreground md:text-lg"
            >
              SovraID is a self-sovereign identity layer for India. Aadhaar, PAN
              and bank KYC stay in your wallet — share only what verifiers need.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.65, duration: 0.6 }}
              className="mt-10 flex flex-wrap items-center gap-4"
            >
              <MagneticButton href="/wallet">
                Open Wallet
                <ArrowRight className="h-4 w-4" />
              </MagneticButton>
              <MagneticButton href="/verifier" variant="outline">
                Verifier Demo
              </MagneticButton>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.85 }}
              className="mt-12 grid grid-cols-2 gap-6 border-t border-white/10 pt-8 sm:grid-cols-4"
            >
              {STATS.map((stat) => (
                <div key={stat.label}>
                  <div className="font-display text-2xl font-semibold text-foreground">
                    <AnimatedNumber
                      value={stat.value}
                      suffix={stat.suffix}
                      decimals={stat.decimals ?? 0}
                    />
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </p>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            style={
              reduced
                ? undefined
                : { x: parallax.x * -0.5, y: parallax.y * -0.5 }
            }
            className="relative flex items-center justify-center lg:col-span-6 xl:col-span-5"
          >
            <div className="relative">
              <div
                aria-hidden
                className="absolute inset-0 m-auto h-64 w-64 rounded-full bg-neon-purple/30 blur-[80px]"
              />
              <div className="hidden md:block">
                <FloatingOrbLazy />
              </div>
              <div
                aria-hidden
                className="flex h-[min(280px,60vw)] w-[min(280px,60vw)] items-center justify-center md:hidden"
              >
                <div className="h-40 w-40 animate-pulse rounded-full bg-neon-purple/25 blur-3xl" />
              </div>
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="absolute -bottom-4 -right-2 hidden rounded-xl border border-white/10 bg-white/5 px-4 py-3 backdrop-blur-xl md:block"
              >
                <div className="flex items-center gap-2 text-xs">
                  <ShieldCheck className="h-4 w-4 text-neon-purple" />
                  <span className="text-muted-foreground">VC verified</span>
                  <span className="font-mono text-foreground">2.4s</span>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
}
