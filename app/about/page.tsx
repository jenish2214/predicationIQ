import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Compass,
  Flag,
  Globe2,
  HeartHandshake,
  ShieldCheck,
  Target,
  Users2,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "About",
  description:
    "About SovraID — a decentralized reusable KYC and digital identity platform, built India-first.",
};

const VALUES = [
  {
    title: "Privacy is not a feature",
    description:
      "Selective disclosure, data minimisation and no-PII-on-our-servers are non-negotiable foundations.",
    icon: ShieldCheck,
  },
  {
    title: "Open by default",
    description:
      "Built on open standards — W3C DIDs, Verifiable Credentials, Polygon, and EVM tooling.",
    icon: Globe2,
  },
  {
    title: "India, not in translation",
    description:
      "Aadhaar, PAN, DigiLocker and UPI patterns are first-class. RBI and DPDP shape the protocol.",
    icon: Flag,
  },
  {
    title: "Trust, made tangible",
    description:
      "Every issuance and proof is signed, auditable and revocable — without exposing private data.",
    icon: HeartHandshake,
  },
];

const TEAM = [
  { name: "A. Mehta", role: "Co-founder · Identity & Protocol", initials: "AM" },
  { name: "P. Iyer", role: "Co-founder · Compliance", initials: "PI" },
  { name: "R. Sharma", role: "Engineering · Wallet", initials: "RS" },
  { name: "S. Nair", role: "Engineering · Verifier SDK", initials: "SN" },
  { name: "V. Khanna", role: "Design · Product", initials: "VK" },
  { name: "K. Bose", role: "BD · Banks & Fintech", initials: "KB" },
];

const MILESTONES = [
  {
    year: "Q1 ’25",
    title: "Genesis",
    body: "Concept paper. DID method drafted. First Polygon Amoy anchor.",
  },
  {
    year: "Q2 ’25",
    title: "Wallet alpha",
    body: "Holder wallet shipped. Issuer SDK in private preview with one partner bank.",
  },
  {
    year: "Q3 ’25",
    title: "Issuer network",
    body: "3 issuers live · UIDAI sandbox · 10k credentials issued in test mode.",
  },
  {
    year: "Q4 ’25",
    title: "Verifier rollout",
    body: "NeoPay demo + 4 design partners onboarded · DPDP Act alignment review.",
  },
];

export default function AboutPage() {
  return (
    <div className="border-b border-border">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="absolute inset-0 bg-dot-grid opacity-40" aria-hidden />
        <div className="container relative py-20 md:py-28">
          <div className="max-w-3xl">
            <Badge variant="outline" className="mb-4">
              <Compass className="h-3 w-3" />
              About SovraID
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              Identity should belong to the citizen — not the platform.
            </h1>
            <p className="mt-5 text-base text-muted-foreground md:text-lg">
              SovraID is building the digital identity layer for India: a
              decentralized, reusable KYC network where banks, government and
              fintechs participate as peers, and where every citizen holds
              their own credentials.
            </p>
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="/docs">
                  Read the protocol
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/wallet">Try the wallet</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="border-b border-border py-20 md:py-24">
        <div className="container grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading
              align="left"
              eyebrow="Our mission"
              title="A trustworthy, privacy-preserving identity layer for 1.4 billion people"
              description="We believe KYC shouldn’t be a tax citizens pay over and over. We’re here to fix that — without trading off security or compliance."
            />
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="outline">
                <Target className="h-3 w-3" />
                10M citizens by 2027
              </Badge>
              <Badge variant="outline">
                <Users2 className="h-3 w-3" />
                100 issuer partners
              </Badge>
            </div>
          </div>
          <div className="lg:col-span-7">
            <div className="grid gap-4 md:grid-cols-2">
              {VALUES.map((v) => {
                const Icon = v.icon;
                return (
                  <Card key={v.title} className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">
                      {v.title}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {v.description}
                    </p>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="border-b border-border py-20 md:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Timeline"
            title="Where we are, where we’re going"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            {MILESTONES.map((m, idx) => (
              <Card key={m.title} className="relative p-6">
                <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
                  {m.year}
                </span>
                <h3 className="mt-3 text-base font-semibold text-foreground">
                  {m.title}
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
                <span className="absolute right-5 top-5 text-xs font-mono text-muted-foreground">
                  0{idx + 1}
                </span>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="border-b border-border py-20 md:py-24">
        <div className="container">
          <SectionHeading
            eyebrow="Team"
            title="A small team obsessed with identity, privacy and India"
          />
          <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {TEAM.map((person) => (
              <Card key={person.name} className="flex items-center gap-4 p-5">
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-border bg-secondary text-sm font-semibold text-foreground">
                  {person.initials}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    {person.name}
                  </p>
                  <p className="text-xs text-muted-foreground">{person.role}</p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 md:py-24">
        <div className="container">
          <Card className="flex flex-col items-start justify-between gap-6 p-10 md:flex-row md:items-center md:p-14">
            <div>
              <h2 className="text-balance text-2xl font-semibold tracking-tight text-foreground md:text-3xl">
                Want to build with us?
              </h2>
              <p className="mt-2 max-w-xl text-sm text-muted-foreground">
                We’re working with banks, NBFCs and government bodies to roll
                out reusable KYC across India. Talk to us.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <Button asChild size="lg">
                <Link href="mailto:hello@sovraid.in">
                  Contact us
                  <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link href="/docs">Read docs</Link>
              </Button>
            </div>
          </Card>
        </div>
      </section>
    </div>
  );
}
