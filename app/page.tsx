import Link from "next/link";
import {
  ArrowRight,
  Building2,
  CheckCircle2,
  FileCheck2,
  Fingerprint,
  IdCard,
  Lock,
  ScanLine,
  ShieldCheck,
  Sparkles,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { FEATURES } from "@/lib/mock-data";

const STEPS = [
  {
    role: "Issuer",
    title: "Banks & Government issue",
    description:
      "Trusted issuers like UIDAI, banks and RTOs verify a citizen once and mint a tamper-proof credential into their wallet.",
    icon: Building2,
    examples: ["UIDAI", "HDFC Bank", "Income Tax Dept."],
  },
  {
    role: "Holder",
    title: "You hold it in your wallet",
    description:
      "Credentials sit safely in the SovraID wallet on your phone. Your DID and keys never leave the device.",
    icon: UserRound,
    examples: ["Aadhaar", "PAN", "Bank KYC", "Degree"],
  },
  {
    role: "Verifier",
    title: "Verifiers check the proof",
    description:
      "Apps and merchants request only the attributes they need. You approve, sign, and share — instantly.",
    icon: ScanLine,
    examples: ["NeoPay", "Zomato", "CryptoXchange"],
  },
];

const TRUST = [
  {
    title: "DPDP Act aligned",
    description:
      "Data minimisation, purpose limitation and user consent are wired into the protocol — not bolted on.",
    icon: ShieldCheck,
  },
  {
    title: "RBI KYC ready",
    description:
      "Designed around RBI Master Direction on KYC and reusable KYC norms for Indian banks and NBFCs.",
    icon: Lock,
  },
  {
    title: "Built for Bharat",
    description:
      "Aadhaar, PAN, DigiLocker and UPI patterns are first-class — not Western identity flows retrofitted.",
    icon: Fingerprint,
  },
];

const STATS = [
  { value: "1×", label: "KYC once, reuse forever" },
  { value: "<3s", label: "Average verification time" },
  { value: "0", label: "PII stored on our servers" },
  { value: "100%", label: "User-held credentials" },
];

export default function HomePage() {
  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden />
        <div className="container relative grid items-center gap-12 py-20 md:py-28 lg:grid-cols-12 lg:py-32">
          <div className="lg:col-span-7">
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
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-muted-foreground">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-5">
            <HeroCredentialCard />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="border-b border-border py-20 md:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Why SovraID"
            title="A privacy-first identity layer for India"
            description="Designed for banks, fintechs and government to issue, hold and verify identity — without creating a central honeypot of PII."
          />

          <div className="mt-12 grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
            {FEATURES.map((feature) => {
              const Icon = feature.icon;
              return (
                <Card
                  key={feature.title}
                  className="p-6 transition-colors hover:border-primary/40"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                    <Icon className="h-5 w-5 text-foreground" />
                  </div>
                  <h3 className="mt-5 text-base font-semibold text-foreground">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {feature.description}
                  </p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="border-b border-border py-20 md:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="How it works"
            title="Issuer → Holder → Verifier"
            description="A simple three-party model based on open W3C Verifiable Credentials and DIDs — anchored on Polygon."
          />

          <div className="mt-12 grid grid-cols-1 gap-4 lg:grid-cols-3">
            {STEPS.map((step, idx) => {
              const Icon = step.icon;
              return (
                <Card
                  key={step.role}
                  className="relative flex flex-col p-6"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Step 0{idx + 1}
                    </span>
                    <Badge variant="outline" className="text-[10px]">
                      {step.role}
                    </Badge>
                  </div>
                  <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary">
                    <Icon className="h-6 w-6 text-foreground" />
                  </div>
                  <h3 className="mt-5 text-lg font-semibold text-foreground">
                    {step.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm text-muted-foreground">
                    {step.description}
                  </p>
                  <div className="mt-5 flex flex-wrap gap-1.5 border-t border-border pt-4">
                    {step.examples.map((ex) => (
                      <span
                        key={ex}
                        className="rounded-md border border-border bg-secondary px-2 py-0.5 text-[11px] text-muted-foreground"
                      >
                        {ex}
                      </span>
                    ))}
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Trust signals */}
      <section className="border-b border-border py-20 md:py-24">
        <div className="container grid items-start gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Trust & compliance"
              title="India-first by design, not by translation"
              description="SovraID isn’t a foreign identity stack with a saree thrown on top. It’s built around how Indian KYC actually works."
            />
            <div className="mt-8 flex flex-wrap gap-2">
              <Badge variant="outline">W3C VC 2.0</Badge>
              <Badge variant="outline">W3C DID 1.0</Badge>
              <Badge variant="outline">DPDP Act 2023</Badge>
              <Badge variant="outline">RBI KYC MD</Badge>
              <Badge variant="outline">Polygon Amoy</Badge>
              <Badge variant="outline">DigiLocker</Badge>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="grid gap-4 md:grid-cols-1">
              {TRUST.map((t) => {
                const Icon = t.icon;
                return (
                  <Card
                    key={t.title}
                    className="flex items-start gap-4 p-5"
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border border-border bg-secondary">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <div>
                      <h3 className="text-sm font-semibold text-foreground">
                        {t.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {t.description}
                      </p>
                    </div>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="container">
          <Card className="relative overflow-hidden p-10 md:p-14">
            <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
            <div className="relative grid items-center gap-8 lg:grid-cols-12">
              <div className="lg:col-span-8">
                <Badge variant="success" className="mb-4">
                  <CheckCircle2 className="h-3 w-3" />
                  Ready when you are
                </Badge>
                <h2 className="text-balance text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
                  Start your reusable KYC journey
                </h2>
                <p className="mt-3 max-w-2xl text-base text-muted-foreground">
                  Try the full flow end-to-end — issue a credential as a bank,
                  hold it as a citizen, and verify it as a merchant.
                </p>
              </div>
              <div className="flex flex-wrap items-center justify-start gap-3 lg:col-span-4 lg:justify-end">
                <Button asChild size="lg">
                  <Link href="/wallet">
                    Open Wallet
                    <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/issuer">Issue Credentials</Link>
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </section>
    </>
  );
}

function HeroCredentialCard() {
  return (
    <div className="relative mx-auto w-full max-w-md">
      <div className="absolute -left-6 -top-6 hidden h-24 w-24 rounded-2xl border border-border bg-secondary/60 lg:block" aria-hidden />
      <div className="absolute -bottom-6 -right-4 hidden h-20 w-20 rounded-2xl border border-border bg-secondary/60 lg:block" aria-hidden />

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

      <Card className="absolute -bottom-6 -left-4 z-20 hidden w-60 p-4 md:block">
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
    </div>
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
