"use client";

import * as React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowLeft, IdCard, ShieldCheck, Sparkles } from "lucide-react";

import { Logo } from "@/components/logo";
import { cn } from "@/lib/utils";

interface AuthShellProps {
  title: string;
  description: string;
  side: "left" | "right";
  children: React.ReactNode;
}

const HIGHLIGHTS = [
  {
    icon: ShieldCheck,
    title: "Privacy by default",
    description: "Selective disclosure means you share fields, not files.",
  },
  {
    icon: IdCard,
    title: "Self-sovereign wallet",
    description:
      "Bring your MetaMask or Phantom — your keys, your DID, your call.",
  },
  {
    icon: Sparkles,
    title: "One click via Google",
    description:
      "Or skip the seed phrase and continue with Google. Both stay end-to-end secure.",
  },
];

export function AuthShell({ title, description, side, children }: AuthShellProps) {
  return (
    <div className="relative grid min-h-[calc(100vh-4rem)] grid-cols-1 lg:grid-cols-2">
      <Link
        href="/"
        className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3 w-3" />
        Back to home
      </Link>

      <div
        className={cn(
          "flex items-center justify-center px-6 py-16 lg:px-12",
          side === "right" && "lg:order-2"
        )}
      >
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="w-full max-w-md"
        >
          <div className="flex items-center gap-2">
            <Logo />
          </div>
          <h1 className="mt-8 text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            {title}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground md:text-base">
            {description}
          </p>
          <div className="mt-8">{children}</div>
        </motion.div>
      </div>

      <div
        className={cn(
          "relative hidden overflow-hidden border-l border-border bg-card/40 lg:flex lg:items-center lg:justify-center",
          side === "right" && "lg:order-1 lg:border-l-0 lg:border-r"
        )}
      >
        <div className="absolute inset-0 bg-dot-grid opacity-50" aria-hidden />
        <div className="absolute -top-32 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/15 blur-3xl" aria-hidden />
        <div className="absolute bottom-[-6rem] left-[20%] h-80 w-80 rounded-full bg-accent/10 blur-3xl" aria-hidden />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
          className="relative z-10 w-full max-w-md px-12"
        >
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-background/70 px-3 py-1.5 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-accent" />
            Decentralized identity for India
          </div>
          <h2 className="mt-5 text-balance text-3xl font-semibold tracking-tight text-foreground">
            One identity. <span className="text-accent">Infinite</span> verifications.
          </h2>
          <p className="mt-3 text-sm text-muted-foreground">
            Issue, hold and verify KYC credentials without giving up control of
            your data. Built on W3C DIDs and Verifiable Credentials.
          </p>

          <ul className="mt-8 space-y-3">
            {HIGHLIGHTS.map((h, i) => {
              const Icon = h.icon;
              return (
                <motion.li
                  key={h.title}
                  initial={{ opacity: 0, x: -12 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.2 + i * 0.08,
                    ease: "easeOut",
                  }}
                  className="flex items-start gap-3 rounded-xl border border-border bg-background/70 p-3 backdrop-blur"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-secondary">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      {h.title}
                    </p>
                    <p className="mt-0.5 text-xs text-muted-foreground">
                      {h.description}
                    </p>
                  </div>
                </motion.li>
              );
            })}
          </ul>

          <div className="mt-10 flex items-center gap-3 rounded-xl border border-border bg-background/70 p-4 backdrop-blur">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-primary/30 bg-primary/10 text-xs font-semibold text-primary">
              AM
            </div>
            <div>
              <p className="text-xs text-muted-foreground">
                “Reusable KYC saved our onboarding 4 days per customer.”
              </p>
              <p className="mt-1 text-[11px] font-medium text-foreground">
                A. Mehta · CTO, NeoPay
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
