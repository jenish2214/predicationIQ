"use client";

import * as React from "react";
import { motion } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowUpRight,
  Check,
  ClipboardCopy,
  Eye,
  EyeOff,
  Globe2,
  Plus,
  QrCode,
  ScanLine,
  ShieldCheck,
  Wallet as WalletIcon,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { CredentialCard } from "@/components/credential-card";
import { SelectiveDisclosureDialog } from "@/components/selective-disclosure-dialog";
import { ActivityList } from "@/components/activity-list";
import { QrFrame } from "@/components/qr-frame";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import { ProviderBadge } from "@/components/provider-badge";
import {
  MOCK_ACTIVITY,
  MOCK_CREDENTIALS,
  MOCK_DID,
  MOCK_TEST_BALANCE,
  MOCK_WALLET_ADDRESS,
  type Credential,
} from "@/lib/mock-data";
import { cn, shortenAddress } from "@/lib/utils";
import type { AuthProfile } from "@/lib/supabase/types";

export function WalletPageClient({
  profile,
}: {
  profile: AuthProfile | null;
}) {
  const [selected, setSelected] = React.useState<Credential | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
  const [showBalance, setShowBalance] = React.useState(true);
  const [copied, setCopied] = React.useState<"did" | "addr" | null>(null);

  const handleCardClick = (credential: Credential) => {
    setSelected(credential);
    setDialogOpen(true);
  };

  const copy = async (value: string, kind: "did" | "addr") => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(kind);
      window.setTimeout(() => setCopied(null), 1500);
    } catch {
      /* noop */
    }
  };

  return (
    <div className="container py-10 md:py-14">
      {/* Wallet header */}
      <Card className="relative overflow-hidden">
        <div className="absolute inset-0 bg-dot-grid opacity-30" aria-hidden />
        <div className="relative grid gap-6 p-6 md:p-8 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-lg border border-border bg-secondary">
                  <WalletIcon className="h-5 w-5 text-foreground" />
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    SovraID Wallet
                  </p>
                  <p className="text-sm font-medium text-foreground">
                    {profile?.fullName ?? profile?.email ?? "Aarav Mehta"}
                  </p>
                </div>
              </div>
              {profile ? (
                <ProviderBadge providerType={profile.providerType} size="md" />
              ) : null}
            </div>

            <div className="mt-6 space-y-3">
              <CopyRow
                label="Decentralized Identifier"
                value={MOCK_DID}
                onCopy={() => copy(MOCK_DID, "did")}
                copied={copied === "did"}
                mono
              />
              <CopyRow
                label={
                  profile?.walletChain === "ethereum"
                    ? "Ethereum Address"
                    : profile?.walletChain === "solana"
                    ? "Solana Address"
                    : "Wallet Address"
                }
                value={profile?.walletAddress ?? MOCK_WALLET_ADDRESS}
                onCopy={() =>
                  copy(profile?.walletAddress ?? MOCK_WALLET_ADDRESS, "addr")
                }
                copied={copied === "addr"}
                short
                mono
              />
            </div>

            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="success">
                <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                Wallet active
              </Badge>
              <Badge variant="outline">
                <Globe2 className="h-3 w-3" />
                {profile?.walletChain === "ethereum"
                  ? "Ethereum"
                  : profile?.walletChain === "solana"
                  ? "Solana"
                  : "Polygon Amoy"}
              </Badge>
              <Badge variant="muted">3 issuers trusted</Badge>
            </div>
          </div>

          <div className="lg:col-span-5">
            <div className="flex flex-col gap-3">
              <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-5">
                <div>
                  <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                    Test Balance
                  </p>
                  <div className="mt-1 flex items-baseline gap-2">
                    <span className="text-3xl font-semibold tracking-tight text-foreground">
                      {showBalance ? MOCK_TEST_BALANCE : "•••••"}
                    </span>
                    <span className="text-sm font-medium text-muted-foreground">
                      tMATIC
                    </span>
                  </div>
                  <p className="mt-1 text-xs text-muted-foreground">
                    ≈ ₹0 (testnet)
                  </p>
                </div>
                <button
                  onClick={() => setShowBalance((v) => !v)}
                  className="rounded-md border border-border p-2 text-muted-foreground hover:text-foreground"
                  aria-label="Toggle balance visibility"
                >
                  {showBalance ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </button>
              </div>

              <div className="grid grid-cols-3 gap-2">
                <QuickAction icon={ArrowDownToLine} label="Receive" />
                <QuickAction icon={ArrowUpRight} label="Send" />
                <QuickAction icon={ScanLine} label="Scan" />
              </div>

              <ConnectWalletButton variant="outline" />
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultValue="credentials" className="mt-10">
        <TabsList className="w-full justify-start md:w-auto">
          <TabsTrigger value="credentials">Credentials</TabsTrigger>
          <TabsTrigger value="receive">Receive</TabsTrigger>
          <TabsTrigger value="activity">Activity</TabsTrigger>
        </TabsList>

        {/* Credentials */}
        <TabsContent value="credentials" className="mt-6">
          <div className="flex flex-col items-start justify-between gap-3 md:flex-row md:items-end">
            <div>
              <h2 className="text-xl font-semibold text-foreground">
                My credentials
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Tap any credential to selectively share its attributes.
              </p>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="muted">
                {MOCK_CREDENTIALS.length} held
              </Badge>
              <Button variant="outline" size="sm">
                <Plus />
                Add credential
              </Button>
            </div>
          </div>

          <motion.div
            initial="hidden"
            animate="show"
            variants={{
              hidden: {},
              show: { transition: { staggerChildren: 0.05 } },
            }}
            className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3"
          >
            {MOCK_CREDENTIALS.map((c) => (
              <motion.div
                key={c.id}
                variants={{
                  hidden: { opacity: 0, y: 8 },
                  show: { opacity: 1, y: 0 },
                }}
              >
                <CredentialCard
                  credential={c}
                  onClick={() => handleCardClick(c)}
                />
              </motion.div>
            ))}

            <motion.button
              type="button"
              variants={{
                hidden: { opacity: 0, y: 8 },
                show: { opacity: 1, y: 0 },
              }}
              className="flex min-h-[14rem] flex-col items-center justify-center rounded-xl border border-dashed border-border bg-card/40 p-5 text-center transition-colors hover:border-primary/40 hover:bg-card/60"
            >
              <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                <Plus className="h-5 w-5 text-foreground" />
              </div>
              <p className="mt-4 text-sm font-medium text-foreground">
                Add a new credential
              </p>
              <p className="mt-1 max-w-[200px] text-xs text-muted-foreground">
                Scan an issuer QR or accept an incoming request from a bank or
                government body.
              </p>
            </motion.button>
          </motion.div>
        </TabsContent>

        {/* Receive */}
        <TabsContent value="receive" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <Card className="lg:col-span-7">
              <CardHeader>
                <CardTitle className="text-base">
                  Scan to receive a credential
                </CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Point an issuer’s QR at this scanner. Or share your DID QR
                  with a verifier to receive a proof request.
                </p>
              </CardHeader>
              <Separator />
              <CardContent className="flex flex-col items-center gap-6 pt-8 md:flex-row md:items-stretch">
                <div className="flex flex-1 flex-col items-center">
                  <QrFrame scanning size="lg">
                    <div className="flex flex-col items-center text-center">
                      <ScanLine className="h-8 w-8 text-primary" />
                      <p className="mt-3 text-sm font-medium text-foreground">
                        Scanning for issuer QR…
                      </p>
                      <p className="mt-1 text-xs text-muted-foreground">
                        Hold steady · auto-detect
                      </p>
                    </div>
                  </QrFrame>
                </div>
                <div className="flex flex-1 flex-col gap-3">
                  <div className="rounded-xl border border-border bg-secondary/40 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      My DID QR
                    </p>
                    <div className="mt-3 flex items-center gap-4">
                      <QrFrame size="sm" />
                      <div className="space-y-2 text-xs">
                        <p className="font-mono text-foreground">
                          {shortenAddress(MOCK_DID, 6)}
                        </p>
                        <Button size="sm" variant="outline" className="w-full">
                          <QrCode />
                          Show full QR
                        </Button>
                      </div>
                    </div>
                  </div>
                  <div className="rounded-xl border border-border bg-secondary/40 p-4">
                    <p className="text-xs uppercase tracking-wider text-muted-foreground">
                      Pending issuer requests
                    </p>
                    <ul className="mt-3 space-y-2 text-sm">
                      <PendingRow
                        issuer="HDFC Bank"
                        type="Bank KYC"
                        time="2m ago"
                      />
                      <PendingRow
                        issuer="RTO Maharashtra"
                        type="Driving License"
                        time="14h ago"
                      />
                    </ul>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="lg:col-span-5">
              <CardHeader>
                <CardTitle className="text-base">Trusted issuers</CardTitle>
                <p className="mt-1 text-xs text-muted-foreground">
                  Only verified issuer DIDs can mint credentials into your
                  wallet.
                </p>
              </CardHeader>
              <Separator />
              <CardContent className="pt-4">
                <ul className="divide-y divide-border">
                  {[
                    { name: "UIDAI", did: "did:sovra:0xUiD…11aA" },
                    { name: "HDFC Bank", did: "did:sovra:0xHd1C…42aB" },
                    { name: "Income Tax Dept.", did: "did:sovra:0xITdp…77FC" },
                    { name: "RTO Maharashtra", did: "did:sovra:0xRtMh…91Bd" },
                    { name: "IIT Bombay", did: "did:sovra:0xIITb…0142" },
                  ].map((i) => (
                    <li
                      key={i.name}
                      className="flex items-center justify-between py-3"
                    >
                      <div className="flex items-center gap-3">
                        <div className="flex h-8 w-8 items-center justify-center rounded-md border border-border bg-secondary text-[10px] font-semibold text-foreground">
                          {i.name.slice(0, 2).toUpperCase()}
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground">
                            {i.name}
                          </p>
                          <p className="font-mono text-[11px] text-muted-foreground">
                            {i.did}
                          </p>
                        </div>
                      </div>
                      <Badge variant="success">
                        <ShieldCheck className="h-3 w-3" />
                        Trusted
                      </Badge>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Activity */}
        <TabsContent value="activity" className="mt-6">
          <div className="grid gap-6 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <h2 className="text-xl font-semibold text-foreground">
                Activity
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                A transparent log of every credential issued, presented, or
                revoked.
              </p>
              <div className="mt-5">
                <ActivityList entries={MOCK_ACTIVITY} />
              </div>
            </div>
            <div className="lg:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">
                    Privacy summary
                  </CardTitle>
                  <p className="mt-1 text-xs text-muted-foreground">
                    Aggregated, last 30 days.
                  </p>
                </CardHeader>
                <Separator />
                <CardContent className="space-y-4 pt-5">
                  <PrivacyRow
                    label="Proofs presented"
                    value="14"
                    sub="across 9 verifiers"
                  />
                  <PrivacyRow
                    label="Attributes shared"
                    value="2.4"
                    sub="average per request"
                  />
                  <PrivacyRow
                    label="Requests declined"
                    value="3"
                    sub="too much data asked"
                  />
                  <PrivacyRow
                    label="PII leaked"
                    value="0"
                    sub="zero, by design"
                    accent
                  />
                </CardContent>
              </Card>
            </div>
          </div>
        </TabsContent>
      </Tabs>

      <SelectiveDisclosureDialog
        credential={selected}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
      />
    </div>
  );
}

function CopyRow({
  label,
  value,
  onCopy,
  copied,
  short,
  mono,
}: {
  label: string;
  value: string;
  onCopy: () => void;
  copied: boolean;
  short?: boolean;
  mono?: boolean;
}) {
  const display = short ? shortenAddress(value, 6) : value;
  return (
    <div className="flex items-center justify-between rounded-lg border border-border bg-secondary/30 px-4 py-3">
      <div className="min-w-0">
        <p className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
          {label}
        </p>
        <p
          className={cn(
            "mt-0.5 truncate text-sm",
            mono ? "font-mono text-foreground" : "text-foreground"
          )}
        >
          {display}
        </p>
      </div>
      <button
        onClick={onCopy}
        className="ml-3 flex shrink-0 items-center gap-1 rounded-md border border-border bg-background/40 px-2.5 py-1.5 text-xs text-muted-foreground hover:text-foreground"
      >
        {copied ? (
          <>
            <Check className="h-3.5 w-3.5 text-accent" />
            <span className="text-accent">Copied</span>
          </>
        ) : (
          <>
            <ClipboardCopy className="h-3.5 w-3.5" />
            Copy
          </>
        )}
      </button>
    </div>
  );
}

function QuickAction({
  icon: Icon,
  label,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
}) {
  return (
    <button
      type="button"
      className="flex flex-col items-center justify-center gap-1.5 rounded-lg border border-border bg-secondary/40 py-3 text-xs font-medium text-foreground transition-colors hover:bg-secondary"
    >
      <Icon className="h-4 w-4 text-foreground" />
      {label}
    </button>
  );
}

function PendingRow({
  issuer,
  type,
  time,
}: {
  issuer: string;
  type: string;
  time: string;
}) {
  return (
    <li className="flex items-center justify-between rounded-md border border-border bg-background/40 px-3 py-2">
      <div className="flex items-center gap-2">
        <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-secondary text-[10px] font-semibold text-foreground">
          {issuer.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <p className="text-xs font-medium text-foreground">{issuer}</p>
          <p className="text-[11px] text-muted-foreground">{type}</p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[11px] text-muted-foreground">{time}</span>
        <Button size="sm" variant="outline" className="h-7 px-2 text-xs">
          Accept
        </Button>
      </div>
    </li>
  );
}

function PrivacyRow({
  label,
  value,
  sub,
  accent,
}: {
  label: string;
  value: string;
  sub: string;
  accent?: boolean;
}) {
  return (
    <div className="flex items-end justify-between border-b border-border pb-3 last:border-0 last:pb-0">
      <div>
        <p className="text-sm text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground">{sub}</p>
      </div>
      <p
        className={cn(
          "text-2xl font-semibold tracking-tight",
          accent ? "text-accent" : "text-foreground"
        )}
      >
        {value}
      </p>
    </div>
  );
}
