"use client";

import * as React from "react";
import Link from "next/link";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
} from "framer-motion";
import {
  ArrowRight,
  FileCheck2,
  IdCard,
  ScanLine,
  ShieldCheck,
  Sparkles,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { AnimatedNumber } from "@/components/animated-number";
import { TiltCard } from "@/components/animations/tilt-card";

const STATS: {
  value: number;
  suffix?: string;
  prefix?: string;
  decimals?: number;
  label: string;
}[] = [
  { value: 1, suffix: "×", label: "KYC once, reuse forever" },
  { value: 2.4, suffix: "s", decimals: 1, label: "Average verification time" },
  { value: 0, label: "PII stored on our servers" },
  { value: 100, suffix: "%", label: "User-held credentials" },
];

export function HomeHero() {
  const sectionRef = React.useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax layers — different speeds create depth, like the MetaMask hero.
  const layerSlow = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -60]);
  const layerMid = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -120]);
  const layerFast = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : -200]);
  const haloY = useTransform(scrollYProgress, [0, 1], [0, reduced ? 0 : 80]);
  const fade = useTransform(scrollYProgress, [0, 0.6], [1, 0.3]);

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden border-b border-border"
    >
      <motion.div
        aria-hidden
        style={{ y: haloY, opacity: fade }}
        className="absolute inset-0 bg-dot-grid opacity-40"
      />
      <motion.div
        aria-hidden
        style={{ y: layerSlow, opacity: fade }}
        className="absolute -left-32 top-[-6rem] h-[28rem] w-[28rem] rounded-full bg-primary/10 blur-3xl"
      />
      <motion.div
        aria-hidden
        style={{ y: layerMid, opacity: fade }}
        className="absolute -right-24 top-[20%] h-[24rem] w-[24rem] rounded-full bg-accent/10 blur-3xl"
      />

      <div className="container relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:py-32">
        <motion.div
          className="lg:col-span-7"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1.5 text-xs font-medium text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-accent" />
            India’s first decentralized reusable KYC network
            <span className="tricolor-bar ml-1" aria-hidden>
              <span className="stripe-saffron" />
              <span className="stripe-white" />
              <span className="stripe-green" />
            </span>
          </div>

          <h1 className="mt-6 text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl lg:text-6xl">
            Verify once.{" "}
            <span className="text-accent">Prove anywhere.</span>
            <br className="hidden md:block" />
            Without giving up your privacy.
          </h1>

          <p className="mt-6 max-w-2xl text-base text-muted-foreground md:text-lg">
            SovraID is a decentralized, reusable KYC and digital identity
            platform built for India. Your Aadhaar, PAN and bank KYC stay in
            your wallet — share only what a verifier truly needs.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Button asChild size="lg">
              <Link href="/wallet">
                Open Wallet
                <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline">
              <Link href="/verifier">See Verifier Demo</Link>
            </Button>
            <Link
              href="/docs"
              className="ml-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
            >
              Read the docs →
            </Link>
          </div>

          <div className="mt-10 grid grid-cols-2 gap-y-6 border-t border-border pt-8 sm:grid-cols-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-2xl font-semibold text-foreground">
                  <AnimatedNumber
                    value={stat.value}
                    suffix={stat.suffix}
                    prefix={stat.prefix}
                    decimals={stat.decimals ?? 0}
                  />
                </div>
                <div className="mt-1 text-xs text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        <div className="relative lg:col-span-5">
          <motion.div
            style={{ y: layerSlow }}
            className="pointer-events-none absolute -left-6 -top-6 hidden h-24 w-24 rounded-2xl border border-border bg-secondary/60 lg:block"
            aria-hidden
          />
          <motion.div
            style={{ y: layerFast }}
            className="pointer-events-none absolute -bottom-6 -right-4 hidden h-20 w-20 rounded-2xl border border-border bg-secondary/60 lg:block"
            aria-hidden
          />

          <motion.div
            style={{ y: layerMid }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
            className="relative mx-auto w-full max-w-md"
          >
            <TiltCard className="rounded-xl">
              <Card className="relative z-10 p-6">
                <div className="flex items-center justify-between">
                  <Badge variant="success">
                    <ShieldCheck className="h-3 w-3" />
                    Verified Credential
                  </Badge>
                  <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
                    VC-AADHAAR
                  </span>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary">
                    <IdCard className="h-6 w-6 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                      Holder
                    </p>
                    <p className="text-base font-semibold text-foreground">
                      Aarav Mehta
                    </p>
                  </div>
                </div>

                <div className="mt-5 space-y-2 rounded-lg border border-border bg-background/50 p-4">
                  <Row label="DID" value="did:sovra:0xA17f…3a21" mono />
                  <Row label="Issuer" value="UIDAI" />
                  <Row label="Issued" value="14 Aug 2025" />
                  <Row label="Network" value="Polygon Amoy" />
                </div>

                <div className="mt-5 flex items-center justify-between border-t border-border pt-4 text-xs">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <FileCheck2 className="h-3.5 w-3.5" />
                    On-chain anchor verified
                  </div>
                  <Link
                    href="/wallet"
                    className="font-medium text-accent hover:underline"
                  >
                    Open in Wallet →
                  </Link>
                </div>
              </Card>
            </TiltCard>

            <motion.div
              style={{ y: layerFast }}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
              className="absolute -bottom-6 -left-4 z-20 hidden w-60 md:block"
            >
              <Card className="p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary">
                    <ScanLine className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-[10px] uppercase tracking-wider text-muted-foreground">
                      NeoPay
                    </p>
                    <p className="text-sm font-medium text-foreground">
                      Asked: Age over 18
                    </p>
                  </div>
                </div>
                <div className="mt-3 flex items-center justify-between text-[11px]">
                  <span className="text-muted-foreground">You shared</span>
                  <span className="rounded-md bg-accent/15 px-1.5 py-0.5 font-medium text-accent">
                    Yes only
                  </span>
                </div>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Row({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between text-xs">
      <span className="text-muted-foreground">{label}</span>
      <span
        className={
          mono
            ? "font-mono text-foreground"
            : "font-medium text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}
