import Link from "next/link";
import {
  ArrowRight,
  CheckCircle2,
  Fingerprint,
  Lock,
  ShieldCheck,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { Reveal, RevealStagger, RevealStaggerItem } from "@/components/animations/reveal";
import { HomeHero } from "@/components/home/hero";
import { HowItWorksStack } from "@/components/home/how-it-works-stack";
import { TrustedByMarquee } from "@/components/home/trusted-by-marquee";
import { FeatureGrid } from "@/components/home/feature-grid";

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

export default function HomePage() {
  return (
    <>
      <HomeHero />

      <TrustedByMarquee />

      <section className="border-b border-border py-20 md:py-24">
        <div className="container">
          <Reveal>
            <SectionHeading
              eyebrow="Why SovraID"
              title="A privacy-first identity layer for India"
              description="Designed for banks, fintechs and government to issue, hold and verify identity — without creating a central honeypot of PII."
            />
          </Reveal>
          <FeatureGrid />
        </div>
      </section>

      <HowItWorksStack />

      <section className="border-b border-border py-20 md:py-24">
        <div className="container grid items-start gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
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
          </Reveal>

          <RevealStagger className="lg:col-span-7" stagger={0.08}>
            <div className="grid gap-4 md:grid-cols-1">
              {TRUST.map((t) => {
                const Icon = t.icon;
                return (
                  <RevealStaggerItem key={t.title}>
                    <Card className="flex items-start gap-4 p-5 transition-colors hover:border-primary/40">
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
                  </RevealStaggerItem>
                );
              })}
            </div>
          </RevealStagger>
        </div>
      </section>

      <section className="py-20 md:py-24">
        <div className="container">
          <Reveal>
            <Card className="relative overflow-hidden p-10 md:p-14">
              <div
                className="absolute inset-0 bg-dot-grid opacity-30"
                aria-hidden
              />
              <div className="absolute -left-24 top-[-6rem] h-72 w-72 rounded-full bg-primary/10 blur-3xl" aria-hidden />
              <div className="absolute -right-16 bottom-[-4rem] h-64 w-64 rounded-full bg-accent/10 blur-3xl" aria-hidden />
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
          </Reveal>
        </div>
      </section>
    </>
  );
}
