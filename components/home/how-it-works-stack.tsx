"use client";

import * as React from "react";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  useInView,
} from "framer-motion";
import {
  ArrowRight,
  Building2,
  ScanLine,
  UserRound,
  type LucideIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { SectionHeading } from "@/components/section-heading";
import { cn } from "@/lib/utils";

interface Step {
  role: string;
  title: string;
  description: string;
  icon: LucideIcon;
  examples: string[];
}

const STEPS: Step[] = [
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

export function HowItWorksStack() {
  const containerRef = React.useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Spotlight glow follows the active step in the sticky left rail.
  const indicatorY = useTransform(
    scrollYProgress,
    [0, 1],
    [0, reduced ? 0 : 100]
  );

  return (
    <section className="border-b border-border">
      <div className="container py-20 md:py-24">
        <SectionHeading
          eyebrow="How it works"
          title="Issuer → Holder → Verifier"
          description="A simple three-party model based on open W3C Verifiable Credentials and DIDs — anchored on Polygon."
        />
      </div>

      <div ref={containerRef} className="container">
        <div className="relative grid gap-10 lg:grid-cols-12">
          {/* Sticky left rail — stays pinned while right column scrolls. */}
          <aside className="lg:col-span-4">
            <div className="sticky top-24 hidden lg:block">
              <div className="relative">
                <motion.div
                  aria-hidden
                  style={{ y: indicatorY }}
                  className="pointer-events-none absolute -left-3 top-0 h-32 w-32 rounded-full bg-primary/12 blur-3xl"
                />
                <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                  Three-party protocol
                </p>
                <h3 className="mt-3 text-3xl font-semibold tracking-tight text-foreground">
                  One identity. <span className="text-accent">Many roles.</span>
                </h3>
                <p className="mt-3 max-w-sm text-sm text-muted-foreground">
                  Scroll to see how an Indian KYC credential flows from issuer
                  to citizen to verifier — without anyone hoarding your data.
                </p>

                <StepIndicator scrollProgress={scrollYProgress} />
              </div>
            </div>

            {/* Mobile compact heading */}
            <div className="block lg:hidden">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Three-party protocol
              </p>
              <h3 className="mt-2 text-2xl font-semibold tracking-tight text-foreground">
                One identity. <span className="text-accent">Many roles.</span>
              </h3>
            </div>
          </aside>

          {/* Scrollable column with steps. */}
          <div className="space-y-8 lg:col-span-8 lg:space-y-16">
            {STEPS.map((step, idx) => (
              <StepCard key={step.role} step={step} index={idx} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function StepIndicator({
  scrollProgress,
}: {
  scrollProgress: ReturnType<typeof useScroll>["scrollYProgress"];
}) {
  // Map total scroll to a step (0, 1, 2)
  const stepCount = STEPS.length;
  const activeIndex = useTransform(scrollProgress, (v) => {
    const idx = Math.min(stepCount - 1, Math.floor(v * stepCount * 0.99));
    return idx;
  });
  const [active, setActive] = React.useState(0);
  React.useEffect(() => {
    return activeIndex.on("change", (v) => setActive(v));
  }, [activeIndex]);

  return (
    <ol className="mt-8 space-y-2">
      {STEPS.map((step, idx) => {
        const isActive = idx === active;
        return (
          <li
            key={step.role}
            className={cn(
              "group flex items-center gap-3 rounded-lg border border-border bg-card/40 px-3 py-2 transition-colors",
              isActive && "border-primary/40 bg-card"
            )}
          >
            <span
              className={cn(
                "flex h-7 w-7 items-center justify-center rounded-md border text-[11px] font-mono",
                isActive
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-secondary text-muted-foreground"
              )}
            >
              0{idx + 1}
            </span>
            <div className="flex min-w-0 flex-1 flex-col leading-tight">
              <span
                className={cn(
                  "text-sm font-semibold transition-colors",
                  isActive ? "text-foreground" : "text-muted-foreground"
                )}
              >
                {step.role}
              </span>
              <span className="truncate text-[11px] text-muted-foreground">
                {step.title}
              </span>
            </div>
            <ArrowRight
              className={cn(
                "h-3.5 w-3.5 transition-opacity",
                isActive ? "text-primary opacity-100" : "opacity-0"
              )}
            />
          </li>
        );
      })}
    </ol>
  );
}

function StepCard({ step, index }: { step: Step; index: number }) {
  const ref = React.useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { amount: 0.45 });
  const Icon = step.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.3 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <Card
        className={cn(
          "relative flex flex-col p-6 transition-colors md:p-8",
          inView && "border-primary/40"
        )}
      >
        <div className="flex items-center justify-between">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted-foreground">
            Step 0{index + 1}
          </span>
          <Badge variant="outline" className="text-[10px]">
            {step.role}
          </Badge>
        </div>
        <div className="mt-5 flex h-12 w-12 items-center justify-center rounded-xl border border-border bg-secondary">
          <Icon className="h-6 w-6 text-foreground" />
        </div>
        <h3 className="mt-5 text-xl font-semibold text-foreground md:text-2xl">
          {step.title}
        </h3>
        <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
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
    </motion.div>
  );
}
