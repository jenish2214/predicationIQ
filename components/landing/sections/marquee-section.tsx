"use client";

import { Marquee } from "@/components/animations/marquee";
import { ShieldCheck } from "lucide-react";

const ISSUERS = [
  "UIDAI",
  "HDFC Bank",
  "ICICI Bank",
  "Income Tax",
  "RTO Maharashtra",
  "IIT Bombay",
  "DigiLocker",
];

const VERIFIERS = [
  "NeoPay",
  "Zomato",
  "CryptoXchange",
  "Swiggy",
  "Bharat Mobility",
  "EduScholar",
  "TaxFiler",
];

export function MarqueeSection() {
  return (
    <section className="relative border-y border-white/5 py-14 md:py-16">
      <div className="container mb-8 text-center">
        <span className="inline-flex items-center gap-2 text-[11px] font-medium uppercase tracking-[0.2em] text-muted-foreground">
          <ShieldCheck className="h-3.5 w-3.5 text-neon-purple" />
          Trusted network
        </span>
      </div>
      <Marquee speed={42} className="mb-4">
        {ISSUERS.map((name) => (
          <Chip key={name} label={name} />
        ))}
      </Marquee>
      <Marquee speed={50} reverse>
        {VERIFIERS.map((name) => (
          <Chip key={name} label={name} variant="verifier" />
        ))}
      </Marquee>
    </section>
  );
}

function Chip({
  label,
  variant = "issuer",
}: {
  label: string;
  variant?: "issuer" | "verifier";
}) {
  return (
    <div className="flex h-11 items-center gap-3 rounded-full border border-white/10 bg-white/[0.04] px-5 backdrop-blur-md">
      <span
        className={
          variant === "issuer"
            ? "flex h-6 w-6 items-center justify-center rounded-md bg-neon-purple/20 text-[10px] font-bold text-neon-purple"
            : "h-1.5 w-1.5 rounded-full bg-neon-blue shadow-neon-blue"
        }
      >
        {variant === "issuer" ? label.slice(0, 2).toUpperCase() : null}
      </span>
      <span className="text-sm font-medium text-foreground/90">{label}</span>
    </div>
  );
}
