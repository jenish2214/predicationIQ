"use client";

import * as React from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  ArrowRight,
  Building2,
  Camera,
  CheckCircle2,
  ClipboardCopy,
  FileCheck2,
  Fingerprint,
  Loader2,
  RefreshCw,
  ScanFace,
  Search,
  ShieldCheck,
  Users2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/section-heading";
import { cn, formatDate } from "@/lib/utils";
import { MOCK_ISSUED_ROWS } from "@/lib/mock-data";

const STAT_CARDS = [
  {
    label: "Credentials issued",
    value: "12,481",
    change: "+248 today",
    icon: FileCheck2,
  },
  {
    label: "Verified citizens",
    value: "9,302",
    change: "+184 today",
    icon: Users2,
  },
  {
    label: "Avg. issuance time",
    value: "1m 42s",
    change: "−12% wk",
    icon: ShieldCheck,
  },
  {
    label: "Active issuer DIDs",
    value: "3",
    change: "HDFC, ICICI, UIDAI",
    icon: Building2,
  },
];

type Liveness = "idle" | "scanning" | "passed";

export function IssuerDashboard() {
  const [form, setForm] = React.useState({
    fullName: "",
    aadhaar: "",
    pan: "",
    dob: "",
  });
  const [liveness, setLiveness] = React.useState<Liveness>("idle");
  const [issuanceState, setIssuanceState] = React.useState<
    "idle" | "issuing" | "issued"
  >("idle");
  const [issuedRows, setIssuedRows] = React.useState(MOCK_ISSUED_ROWS);

  const isFormValid =
    form.fullName.trim().length > 1 &&
    form.aadhaar.replace(/\s/g, "").length >= 8 &&
    form.pan.trim().length >= 6;

  const handleLiveness = () => {
    if (liveness === "scanning") return;
    setLiveness("scanning");
    window.setTimeout(() => setLiveness("passed"), 1800);
  };

  const handleIssue = () => {
    if (!isFormValid || liveness !== "passed") return;
    setIssuanceState("issuing");
    window.setTimeout(() => {
      setIssuanceState("issued");
      setIssuedRows((rows) => [
        {
          id: `vc_${Math.floor(Math.random() * 9000) + 1000}`,
          holder: form.fullName,
          did: `did:sovra:0x${Math.random()
            .toString(16)
            .slice(2, 6)}…${Math.random().toString(16).slice(2, 6)}`,
          type: "Bank KYC",
          issuedAt: new Date().toISOString(),
          status: "active",
        },
        ...rows,
      ]);
    }, 1400);
  };

  const handleReset = () => {
    setForm({ fullName: "", aadhaar: "", pan: "", dob: "" });
    setLiveness("idle");
    setIssuanceState("idle");
  };

  return (
    <div className="border-b border-border bg-background">
      <div className="container py-12 md:py-16">
        {/* Header */}
        <div className="flex flex-col items-start justify-between gap-4 md:flex-row md:items-end">
          <div>
            <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              <Building2 className="h-3.5 w-3.5 text-primary" />
              Issuer Portal
            </div>
            <h1 className="mt-3 text-3xl font-semibold tracking-tight text-foreground md:text-4xl">
              Issue verifiable credentials with confidence
            </h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              You are signed in as{" "}
              <span className="font-medium text-foreground">HDFC Bank</span>{" "}
              <span className="font-mono text-xs">
                (did:sovra:0xHd1C…42aB)
              </span>
              . Verify a citizen and mint a tamper-proof credential into their
              SovraID wallet.
            </p>
          </div>
          <div className="flex flex-wrap items-center gap-2">
            <Badge variant="outline">Network: Polygon Amoy</Badge>
            <Badge variant="success">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" />
              Live
            </Badge>
          </div>
        </div>

        {/* Stats */}
        <div className="mt-8 grid grid-cols-2 gap-4 lg:grid-cols-4">
          {STAT_CARDS.map((s) => {
            const Icon = s.icon;
            return (
              <Card key={s.label} className="p-5">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-muted-foreground">
                    {s.label}
                  </span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary">
                    <Icon className="h-4 w-4 text-foreground" />
                  </div>
                </div>
                <p className="mt-3 text-2xl font-semibold text-foreground">
                  {s.value}
                </p>
                <p className="mt-1 text-[11px] text-muted-foreground">
                  {s.change}
                </p>
              </Card>
            );
          })}
        </div>

        {/* Main grid */}
        <div className="mt-10 grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Verification form */}
          <div className="xl:col-span-7">
            <Card>
              <CardHeader className="flex flex-row items-start justify-between space-y-0">
                <div>
                  <CardTitle className="text-base">
                    Citizen verification
                  </CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Enter Aadhaar + PAN details and confirm facial liveness
                    before issuance.
                  </p>
                </div>
                <Badge variant="muted">Step 1 · KYC capture</Badge>
              </CardHeader>
              <Separator />
              <CardContent className="space-y-6 pt-6">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                  <Field label="Full Name (as per Aadhaar)">
                    <Input
                      placeholder="e.g. Aarav Mehta"
                      value={form.fullName}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, fullName: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Date of Birth">
                    <Input
                      type="date"
                      value={form.dob}
                      onChange={(e) =>
                        setForm((f) => ({ ...f, dob: e.target.value }))
                      }
                    />
                  </Field>
                  <Field label="Aadhaar Number">
                    <Input
                      placeholder="XXXX XXXX XXXX"
                      inputMode="numeric"
                      maxLength={14}
                      value={form.aadhaar}
                      onChange={(e) => {
                        const digits = e.target.value
                          .replace(/\D/g, "")
                          .slice(0, 12);
                        const grouped = digits.replace(
                          /(\d{4})(?=\d)/g,
                          "$1 "
                        );
                        setForm((f) => ({ ...f, aadhaar: grouped }));
                      }}
                    />
                  </Field>
                  <Field label="PAN">
                    <Input
                      placeholder="ABCDE1234F"
                      maxLength={10}
                      value={form.pan}
                      onChange={(e) =>
                        setForm((f) => ({
                          ...f,
                          pan: e.target.value.toUpperCase(),
                        }))
                      }
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 items-stretch gap-4 md:grid-cols-12">
                  <div className="md:col-span-7">
                    <Field label="Photo / Document Upload">
                      <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-lg border border-dashed border-border bg-background/40 px-4 text-center">
                        <Camera className="h-5 w-5 text-muted-foreground" />
                        <p className="text-xs text-muted-foreground">
                          Drag & drop photo or click to upload
                          <span className="block">
                            (JPG, PNG · max 4MB · mock upload)
                          </span>
                        </p>
                        <Button variant="outline" size="sm">
                          Select file
                        </Button>
                      </div>
                    </Field>
                  </div>

                  <div className="md:col-span-5">
                    <Field label="Facial Liveness Check">
                      <LivenessCheck
                        state={liveness}
                        onStart={handleLiveness}
                      />
                    </Field>
                  </div>
                </div>

                <Separator />

                <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-center">
                  <div className="text-xs text-muted-foreground">
                    By issuing, the credential is signed with your issuer DID
                    and anchored on Polygon Amoy.
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="outline" onClick={handleReset}>
                      <RefreshCw />
                      Reset
                    </Button>
                    <Button
                      onClick={handleIssue}
                      disabled={
                        !isFormValid ||
                        liveness !== "passed" ||
                        issuanceState === "issuing"
                      }
                      variant="success"
                    >
                      {issuanceState === "issuing" ? (
                        <>
                          <Loader2 className="animate-spin" />
                          Issuing…
                        </>
                      ) : issuanceState === "issued" ? (
                        <>
                          <CheckCircle2 />
                          Issued
                        </>
                      ) : (
                        <>
                          <ShieldCheck />
                          Issue Credential
                        </>
                      )}
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Side panel - credential preview */}
          <div className="xl:col-span-5">
            <CredentialPreview
              fullName={form.fullName}
              aadhaar={form.aadhaar}
              pan={form.pan}
              dob={form.dob}
              issuanceState={issuanceState}
              livenessOk={liveness === "passed"}
            />
          </div>
        </div>

        {/* Issued list */}
        <div className="mt-12">
          <SectionHeading
            align="left"
            eyebrow="Recently issued"
            title="Issued credentials"
            description="Every issuance is logged with the holder DID, issuer DID and an on-chain anchor."
          />

          <Card className="mt-6 overflow-hidden">
            <div className="flex flex-col items-stretch justify-between gap-3 border-b border-border p-4 md:flex-row md:items-center">
              <div className="relative w-full max-w-sm">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  placeholder="Search by holder, DID, credential ID…"
                  className="pl-9"
                />
              </div>
              <div className="flex items-center gap-2">
                <Badge variant="outline">All types</Badge>
                <Badge variant="outline">Last 7 days</Badge>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-border text-sm">
                <thead>
                  <tr className="bg-secondary/40 text-left text-[11px] uppercase tracking-wider text-muted-foreground">
                    <th className="px-5 py-3 font-medium">Credential ID</th>
                    <th className="px-5 py-3 font-medium">Holder</th>
                    <th className="px-5 py-3 font-medium">Holder DID</th>
                    <th className="px-5 py-3 font-medium">Type</th>
                    <th className="px-5 py-3 font-medium">Issued</th>
                    <th className="px-5 py-3 font-medium text-right">
                      Status
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {issuedRows.map((row) => (
                    <tr key={row.id} className="hover:bg-secondary/30">
                      <td className="px-5 py-3 font-mono text-xs text-foreground">
                        {row.id}
                      </td>
                      <td className="px-5 py-3 font-medium text-foreground">
                        {row.holder}
                      </td>
                      <td className="px-5 py-3 font-mono text-xs text-muted-foreground">
                        {row.did}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {row.type}
                      </td>
                      <td className="px-5 py-3 text-muted-foreground">
                        {formatDate(row.issuedAt)}
                      </td>
                      <td className="px-5 py-3 text-right">
                        <Badge
                          variant={
                            row.status === "active"
                              ? "success"
                              : row.status === "pending"
                              ? "warning"
                              : "muted"
                          }
                          className="capitalize"
                        >
                          {row.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

          <div className="mt-8 flex flex-wrap items-center justify-between gap-3 rounded-xl border border-border bg-card/40 p-5">
            <p className="text-sm text-muted-foreground">
              Want to test the holder side?
            </p>
            <Button asChild variant="outline">
              <Link href="/wallet">
                Open the wallet
                <ArrowRight />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  const id = React.useId();
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs text-muted-foreground">
        {label}
      </Label>
      <div id={id}>{children}</div>
    </div>
  );
}

function LivenessCheck({
  state,
  onStart,
}: {
  state: Liveness;
  onStart: () => void;
}) {
  return (
    <div className="flex h-32 flex-col items-center justify-center gap-2 rounded-lg border border-border bg-background/40 px-4 text-center">
      <div className="relative flex h-10 w-10 items-center justify-center rounded-full border border-border bg-secondary">
        <ScanFace
          className={cn(
            "h-5 w-5",
            state === "passed" ? "text-accent" : "text-foreground"
          )}
        />
        {state === "scanning" ? (
          <span className="absolute inset-0 animate-pulse-ring rounded-full border border-primary" />
        ) : null}
      </div>
      <p className="text-xs text-muted-foreground">
        {state === "idle"
          ? "Capture a live selfie to verify the citizen."
          : state === "scanning"
          ? "Detecting blink and head turn…"
          : "Liveness verified · Match score 0.97"}
      </p>
      {state === "passed" ? (
        <Badge variant="success">
          <CheckCircle2 className="h-3 w-3" />
          Liveness passed
        </Badge>
      ) : (
        <Button
          size="sm"
          variant={state === "scanning" ? "outline" : "default"}
          onClick={onStart}
          disabled={state === "scanning"}
        >
          {state === "scanning" ? (
            <>
              <Loader2 className="animate-spin" />
              Scanning
            </>
          ) : (
            <>
              <Fingerprint />
              Start liveness
            </>
          )}
        </Button>
      )}
    </div>
  );
}

function CredentialPreview({
  fullName,
  aadhaar,
  pan,
  dob,
  issuanceState,
  livenessOk,
}: {
  fullName: string;
  aadhaar: string;
  pan: string;
  dob: string;
  issuanceState: "idle" | "issuing" | "issued";
  livenessOk: boolean;
}) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-start justify-between space-y-0">
        <div>
          <CardTitle className="text-base">Credential preview</CardTitle>
          <p className="mt-1 text-xs text-muted-foreground">
            What the holder will see in their SovraID wallet.
          </p>
        </div>
        <Badge variant="muted">Step 2 · Mint</Badge>
      </CardHeader>
      <Separator />
      <CardContent className="space-y-4 pt-6">
        <div className="rounded-xl border border-border bg-secondary/40 p-5">
          <div className="flex items-center justify-between">
            <Badge variant="success">
              <ShieldCheck className="h-3 w-3" />
              VC · Bank KYC
            </Badge>
            <span className="font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              HDFC BANK
            </span>
          </div>
          <div className="mt-4 grid gap-2 text-sm">
            <PreviewRow label="Holder" value={fullName || "—"} />
            <PreviewRow label="DOB" value={dob || "—"} />
            <PreviewRow
              label="Aadhaar"
              value={aadhaar ? `XXXX XXXX ${aadhaar.slice(-4)}` : "—"}
              mono
            />
            <PreviewRow
              label="PAN"
              value={pan || "—"}
              mono
            />
            <PreviewRow label="KYC Level" value="Full KYC" />
            <PreviewRow label="Issuer" value="HDFC Bank" />
            <PreviewRow
              label="Issued"
              value={
                issuanceState === "issued"
                  ? formatDate(new Date())
                  : "Pending"
              }
            />
          </div>

          <Separator className="my-5" />

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              <FileCheck2 className="h-3.5 w-3.5" />
              <span className="font-mono">
                0x9c2a…7e41
              </span>
              <button
                className="rounded p-1 text-muted-foreground hover:bg-muted hover:text-foreground"
                aria-label="Copy hash"
              >
                <ClipboardCopy className="h-3.5 w-3.5" />
              </button>
            </div>
            <Badge
              variant={
                issuanceState === "issued" ? "success" : "muted"
              }
              className="text-[10px]"
            >
              {issuanceState === "issued"
                ? "On-chain anchor confirmed"
                : "Awaiting issuance"}
            </Badge>
          </div>
        </div>

        <AnimatePresence>
          {issuanceState === "issued" ? (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -4 }}
              className="flex items-start gap-3 rounded-lg border border-accent/30 bg-accent/10 p-4"
            >
              <CheckCircle2 className="mt-0.5 h-5 w-5 text-accent" />
              <div className="text-sm">
                <p className="font-medium text-foreground">
                  Credential issued to the holder
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Push notification sent to wallet · No PII stored on
                  SovraID servers.
                </p>
              </div>
            </motion.div>
          ) : null}
        </AnimatePresence>

        <div className="grid grid-cols-3 gap-2 text-[11px]">
          <Step
            n={1}
            label="KYC capture"
            active={true}
            done={!!fullName && !!aadhaar && !!pan}
          />
          <Step
            n={2}
            label="Liveness"
            active={!!fullName && !!aadhaar && !!pan}
            done={livenessOk}
          />
          <Step
            n={3}
            label="Issue VC"
            active={livenessOk}
            done={issuanceState === "issued"}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function PreviewRow({
  label,
  value,
  mono,
}: {
  label: string;
  value: string;
  mono?: boolean;
}) {
  return (
    <div className="flex items-center justify-between border-b border-dashed border-border/60 pb-1.5 last:border-0">
      <span className="text-xs text-muted-foreground">{label}</span>
      <span
        className={
          mono
            ? "font-mono text-sm text-foreground"
            : "text-sm font-medium text-foreground"
        }
      >
        {value}
      </span>
    </div>
  );
}

function Step({
  n,
  label,
  active,
  done,
}: {
  n: number;
  label: string;
  active: boolean;
  done: boolean;
}) {
  return (
    <div
      className={cn(
        "flex items-center gap-2 rounded-md border px-2.5 py-2",
        done
          ? "border-accent/40 bg-accent/10 text-accent"
          : active
          ? "border-border bg-secondary text-foreground"
          : "border-border/60 text-muted-foreground"
      )}
    >
      <span
        className={cn(
          "flex h-5 w-5 items-center justify-center rounded-full border text-[10px] font-medium",
          done
            ? "border-accent/40 bg-accent text-accent-foreground"
            : "border-border bg-background"
        )}
      >
        {done ? <CheckCircle2 className="h-3 w-3" /> : n}
      </span>
      <span className="font-medium">{label}</span>
    </div>
  );
}
