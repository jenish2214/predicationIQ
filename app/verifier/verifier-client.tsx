"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  ClipboardCopy,
  Eye,
  EyeOff,
  Hash,
  Lock,
  RefreshCw,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wallet,
  X,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Switch } from "@/components/ui/switch";
import { QrFrame } from "@/components/qr-frame";
import { cn } from "@/lib/utils";
import { MOCK_PROOF_REQUEST } from "@/lib/mock-data";

type Phase = "scan" | "request" | "verifying" | "success" | "denied";

export function VerifierClient() {
  const [phase, setPhase] = React.useState<Phase>("scan");
  const [fields, setFields] = React.useState(MOCK_PROOF_REQUEST.fields);

  const requiredOk = fields
    .filter((f) => f.required)
    .every((f) => f.shared);

  React.useEffect(() => {
    if (phase !== "scan") return;
    const t = window.setTimeout(() => setPhase("request"), 2200);
    return () => window.clearTimeout(t);
  }, [phase]);

  const handleApprove = () => {
    if (!requiredOk) return;
    setPhase("verifying");
    window.setTimeout(() => setPhase("success"), 1300);
  };

  const handleDeny = () => setPhase("denied");

  const handleReset = () => {
    setFields(MOCK_PROOF_REQUEST.fields);
    setPhase("scan");
  };

  return (
    <div className="container py-10 md:py-14">
      <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
        <div>
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <Sparkles className="h-3.5 w-3.5 text-primary" />
            Verifier Demo · NeoPay
          </div>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
            NeoPay onboarding, powered by SovraID
          </h1>
          <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
            A simulation of how a fintech app would request reusable KYC from
            a user — asking for only the bare minimum data.
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-2">
          <Badge variant="outline">Polygon Amoy</Badge>
          <Badge variant="muted">
            Verifier DID · {MOCK_PROOF_REQUEST.verifierDid}
          </Badge>
        </div>
      </div>

      <div className="mt-10 grid gap-6 lg:grid-cols-12">
        {/* Phone-like demo surface */}
        <div className="lg:col-span-7">
          <Card className="overflow-hidden">
            <div className="flex items-center justify-between border-b border-border bg-secondary/40 px-5 py-3">
              <div className="flex items-center gap-2">
                <NeoPayLogo />
                <div>
                  <p className="text-sm font-semibold text-foreground">
                    NeoPay
                  </p>
                  <p className="text-[11px] text-muted-foreground">
                    Verifier · Tier 2 KYC
                  </p>
                </div>
              </div>
              <Badge
                variant={
                  phase === "success"
                    ? "success"
                    : phase === "denied"
                    ? "destructive"
                    : "muted"
                }
              >
                {phase === "scan" && "Awaiting scan"}
                {phase === "request" && "Awaiting consent"}
                {phase === "verifying" && "Verifying proof"}
                {phase === "success" && "Verified"}
                {phase === "denied" && "Declined"}
              </Badge>
            </div>

            <CardContent className="p-6 md:p-10">
              <AnimatePresence mode="wait">
                {phase === "scan" ? (
                  <motion.div
                    key="scan"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col items-center text-center"
                  >
                    <Badge variant="outline" className="mb-4">
                      <ScanLine className="h-3 w-3" />
                      Step 1 of 3
                    </Badge>
                    <h2 className="text-2xl font-semibold text-foreground">
                      Scan to verify your KYC
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      Open your SovraID wallet and point the camera at this
                      code. No documents to upload, no selfies to retake.
                    </p>
                    <div className="mt-8">
                      <QrFrame scanning size="lg" />
                    </div>
                    <p className="mt-6 text-xs text-muted-foreground">
                      Auto-detecting in{" "}
                      <span className="font-mono text-foreground">2s…</span>
                    </p>
                  </motion.div>
                ) : null}

                {phase === "request" ? (
                  <motion.div
                    key="request"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                  >
                    <Badge variant="outline" className="mb-4">
                      <ShieldCheck className="h-3 w-3" />
                      Step 2 of 3 · Proof request
                    </Badge>
                    <h2 className="text-2xl font-semibold text-foreground">
                      NeoPay would like to verify these attributes
                    </h2>
                    <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
                      Purpose: {MOCK_PROOF_REQUEST.purpose}. Toggle off
                      anything optional you don’t want to share.
                    </p>

                    <div className="mt-6 overflow-hidden rounded-xl border border-border bg-background/50">
                      <ul className="divide-y divide-border">
                        {fields.map((field, idx) => (
                          <li
                            key={field.label}
                            className="flex items-center justify-between gap-4 px-4 py-3"
                          >
                            <div className="flex items-start gap-3">
                              <div
                                className={cn(
                                  "mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border",
                                  field.shared
                                    ? "border-accent/40 bg-accent/10 text-accent"
                                    : "border-border text-muted-foreground"
                                )}
                              >
                                {field.shared ? (
                                  <Eye className="h-3.5 w-3.5" />
                                ) : (
                                  <EyeOff className="h-3.5 w-3.5" />
                                )}
                              </div>
                              <div>
                                <div className="flex items-center gap-2">
                                  <p className="text-sm font-medium text-foreground">
                                    {field.label}
                                  </p>
                                  {field.required ? (
                                    <Badge variant="muted" className="text-[10px]">
                                      Required
                                    </Badge>
                                  ) : (
                                    <Badge variant="outline" className="text-[10px]">
                                      Optional
                                    </Badge>
                                  )}
                                </div>
                                <p
                                  className={cn(
                                    "mt-0.5 font-mono text-xs",
                                    field.shared
                                      ? "text-foreground"
                                      : "text-muted-foreground line-through"
                                  )}
                                >
                                  {field.shared ? field.value : "•••••••••"}
                                </p>
                              </div>
                            </div>
                            <Switch
                              checked={field.shared}
                              onCheckedChange={(checked) =>
                                setFields((prev) =>
                                  prev.map((f, i) =>
                                    i === idx
                                      ? { ...f, shared: field.required ? true : checked }
                                      : f
                                  )
                                )
                              }
                              disabled={field.required}
                            />
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="mt-6 flex items-center justify-between gap-3">
                      <p className="text-xs text-muted-foreground">
                        SovraID will never share anything you don’t toggle on.
                      </p>
                      <div className="flex items-center gap-2">
                        <Button variant="outline" onClick={handleDeny}>
                          <X />
                          Decline
                        </Button>
                        <Button
                          variant="success"
                          onClick={handleApprove}
                          disabled={!requiredOk}
                        >
                          <ShieldCheck />
                          Share proof
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                ) : null}

                {phase === "verifying" ? (
                  <motion.div
                    key="verifying"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col items-center justify-center py-12 text-center"
                  >
                    <div className="relative flex h-20 w-20 items-center justify-center rounded-full border border-border bg-secondary">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full border border-primary" />
                      <ShieldCheck className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="mt-6 text-xl font-semibold text-foreground">
                      Verifying proof…
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      Checking signature against issuer DID and on-chain
                      anchor on Polygon Amoy.
                    </p>
                  </motion.div>
                ) : null}

                {phase === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
                      <CheckCircle2 className="h-9 w-9 text-accent" />
                    </div>
                    <Badge variant="success" className="mt-5">
                      Verification successful
                    </Badge>
                    <h2 className="mt-4 text-2xl font-semibold text-foreground">
                      Welcome to NeoPay, {firstName()}
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      Your reusable KYC was verified in under 3 seconds. No
                      documents, no waiting room, no PII stored.
                    </p>
                    <div className="mt-6 grid w-full gap-3 sm:grid-cols-2">
                      <Stat
                        label="Attributes shared"
                        value={`${fields.filter((f) => f.shared).length} / ${fields.length}`}
                      />
                      <Stat label="Time to verify" value="2.4s" />
                    </div>
                    <Button variant="outline" className="mt-6" onClick={handleReset}>
                      <RefreshCw />
                      Run demo again
                    </Button>
                  </motion.div>
                ) : null}

                {phase === "denied" ? (
                  <motion.div
                    key="denied"
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    className="flex flex-col items-center text-center"
                  >
                    <div className="flex h-20 w-20 items-center justify-center rounded-full border border-destructive/40 bg-destructive/10">
                      <X className="h-9 w-9 text-destructive" />
                    </div>
                    <Badge variant="destructive" className="mt-5">
                      Request declined
                    </Badge>
                    <h2 className="mt-4 text-2xl font-semibold text-foreground">
                      No problem.
                    </h2>
                    <p className="mt-2 max-w-md text-sm text-muted-foreground">
                      You stayed in control. NeoPay never saw your KYC
                      attributes.
                    </p>
                    <Button variant="outline" className="mt-6" onClick={handleReset}>
                      <ArrowLeft />
                      Back to scan
                    </Button>
                  </motion.div>
                ) : null}
              </AnimatePresence>
            </CardContent>
          </Card>
        </div>

        {/* Side rail */}
        <div className="lg:col-span-5">
          <div className="flex flex-col gap-4">
            <Card>
              <CardHeader>
                <CardTitle className="text-base">Verifier checklist</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-3 pt-5 text-sm">
                <Check label="Verifier DID registered on SovraID" />
                <Check label="Schema · Tier 2 KYC · v1.2" />
                <Check label="Issuer trust list · UIDAI, HDFC, ICICI…" />
                <Check label="Selective disclosure enforced" />
                <Check label="Audit log · enabled" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Cryptographic proof</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-3 pt-5 text-sm">
                <ProofRow icon={Hash} label="Holder DID" value="did:sovra:0xA17f…3a21" />
                <ProofRow icon={Wallet} label="Issuer DID" value="did:sovra:0xHd1C…42aB" />
                <ProofRow icon={Lock} label="Signature" value="EdDSA · Ed25519" />
                <ProofRow icon={ShieldCheck} label="Anchor" value="Polygon Amoy · 0x9c2a…7e41" />
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="text-base">Test the full loop</CardTitle>
              </CardHeader>
              <Separator />
              <CardContent className="pt-5">
                <p className="text-sm text-muted-foreground">
                  Switch perspectives — issue a credential as a bank, hold it
                  as a citizen, then come back here.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  <Button asChild variant="outline" size="sm">
                    <Link href="/issuer">
                      Issuer
                      <ArrowRight />
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="sm">
                    <Link href="/wallet">
                      Wallet
                      <ArrowRight />
                    </Link>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}

function firstName() {
  return MOCK_PROOF_REQUEST.fields[0]?.value.split(" ")[0] ?? "User";
}

function NeoPayLogo() {
  return (
    <div className="flex h-9 w-9 items-center justify-center rounded-md border border-border bg-background text-sm font-bold text-foreground">
      N
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg border border-border bg-secondary/40 px-4 py-3 text-left">
      <p className="text-[11px] uppercase tracking-wider text-muted-foreground">
        {label}
      </p>
      <p className="mt-1 text-lg font-semibold text-foreground">{value}</p>
    </div>
  );
}

function Check({ label }: { label: string }) {
  return (
    <div className="flex items-start gap-2">
      <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
      <span className="text-foreground/90">{label}</span>
    </div>
  );
}

function ProofRow({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-secondary">
          <Icon className="h-3.5 w-3.5 text-foreground" />
        </div>
        <span className="text-xs text-muted-foreground">{label}</span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="font-mono text-xs text-foreground">{value}</span>
        <button
          aria-label={`Copy ${label}`}
          className="rounded p-1 text-muted-foreground hover:text-foreground"
        >
          <ClipboardCopy className="h-3 w-3" />
        </button>
      </div>
    </div>
  );
}
