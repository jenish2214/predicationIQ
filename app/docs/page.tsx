import type { Metadata } from "next";
import Link from "next/link";
import {
  ArrowRight,
  Boxes,
  Building2,
  Cog,
  FileCode2,
  Globe2,
  Key,
  Layers,
  Lock,
  ScrollText,
  ShieldCheck,
  Terminal,
  UserRound,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { SectionHeading } from "@/components/section-heading";

export const metadata: Metadata = {
  title: "Documentation",
  description:
    "Technical documentation for SovraID — DID method, VC schemas, SDKs, security, and compliance.",
};

const TOC = [
  { href: "#overview", label: "Overview" },
  { href: "#actors", label: "Actors" },
  { href: "#protocol", label: "Protocol" },
  { href: "#did", label: "DID Method" },
  { href: "#vc", label: "VC Schemas" },
  { href: "#sdk", label: "SDKs" },
  { href: "#security", label: "Security" },
  { href: "#compliance", label: "Compliance" },
];

const ACTORS = [
  {
    role: "Issuer",
    icon: Building2,
    desc: "Banks, NBFCs, UIDAI, RTOs, universities. Issue signed VCs to holder DIDs.",
  },
  {
    role: "Holder",
    icon: UserRound,
    desc: "The citizen. Holds VCs in the SovraID wallet. Controls keys and consent.",
  },
  {
    role: "Verifier",
    icon: ShieldCheck,
    desc: "Fintechs, merchants, government services. Request proofs from holders.",
  },
];

export default function DocsPage() {
  return (
    <div className="container py-12 md:py-16">
      <div className="grid gap-10 lg:grid-cols-12">
        {/* Sidebar */}
        <aside className="lg:col-span-3">
          <div className="sticky top-24 hidden flex-col gap-1 lg:flex">
            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Documentation
            </p>
            <nav className="flex flex-col gap-0.5">
              {TOC.map((t) => (
                <a
                  key={t.href}
                  href={t.href}
                  className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {t.label}
                </a>
              ))}
            </nav>

            <Separator className="my-4" />

            <p className="px-3 pb-2 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Legal
            </p>
            <nav className="flex flex-col gap-0.5">
              {[
                { href: "#privacy", label: "Privacy" },
                { href: "#terms", label: "Terms" },
                { href: "#dpdp", label: "DPDP Act" },
                { href: "#status", label: "Status" },
              ].map((t) => (
                <a
                  key={t.href}
                  href={t.href}
                  className="rounded-md px-3 py-1.5 text-sm text-muted-foreground transition-colors hover:bg-secondary hover:text-foreground"
                >
                  {t.label}
                </a>
              ))}
            </nav>
          </div>
        </aside>

        {/* Content */}
        <div className="space-y-16 lg:col-span-9">
          {/* Header */}
          <section id="overview">
            <Badge variant="outline" className="mb-3">
              <ScrollText className="h-3 w-3" />
              v0.1.0 · Living document
            </Badge>
            <h1 className="text-balance text-4xl font-semibold tracking-tight text-foreground md:text-5xl">
              SovraID — Protocol Documentation
            </h1>
            <p className="mt-4 max-w-3xl text-base text-muted-foreground md:text-lg">
              SovraID is a decentralized, reusable KYC and digital identity
              network for India. This document covers the three-party model,
              DID method, credential schemas, SDKs, security and compliance.
            </p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Badge variant="outline">W3C DID 1.0</Badge>
              <Badge variant="outline">W3C VC 2.0</Badge>
              <Badge variant="outline">Polygon Amoy</Badge>
              <Badge variant="outline">EdDSA · Ed25519</Badge>
              <Badge variant="outline">DPDP 2023</Badge>
            </div>
          </section>

          {/* Actors */}
          <section id="actors">
            <SectionHeading
              align="left"
              eyebrow="01"
              title="Three actors, one protocol"
              description="SovraID models identity as a triangle between an issuer, a holder and a verifier — with no central database in the middle."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-3">
              {ACTORS.map((a) => {
                const Icon = a.icon;
                return (
                  <Card key={a.role} className="p-6">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
                      <Icon className="h-5 w-5 text-foreground" />
                    </div>
                    <h3 className="mt-4 text-base font-semibold text-foreground">
                      {a.role}
                    </h3>
                    <p className="mt-2 text-sm text-muted-foreground">
                      {a.desc}
                    </p>
                  </Card>
                );
              })}
            </div>
          </section>

          {/* Protocol */}
          <section id="protocol">
            <SectionHeading
              align="left"
              eyebrow="02"
              title="Protocol flow"
              description="Issuance, presentation and revocation in plain language."
            />
            <div className="mt-8 grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4 text-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Issuance
                  </h3>
                </div>
                <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="mr-2 font-mono text-foreground">1.</span>
                    Holder requests a credential from an issuer with their DID.
                  </li>
                  <li>
                    <span className="mr-2 font-mono text-foreground">2.</span>
                    Issuer verifies KYC + liveness, then signs a VC with their
                    DID key.
                  </li>
                  <li>
                    <span className="mr-2 font-mono text-foreground">3.</span>
                    A hash of the VC is anchored on Polygon. PII never goes
                    on-chain.
                  </li>
                  <li>
                    <span className="mr-2 font-mono text-foreground">4.</span>
                    VC is delivered to the holder’s wallet over a secure
                    channel.
                  </li>
                </ol>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Boxes className="h-4 w-4 text-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Presentation
                  </h3>
                </div>
                <ol className="mt-4 space-y-2 text-sm text-muted-foreground">
                  <li>
                    <span className="mr-2 font-mono text-foreground">1.</span>
                    Verifier sends a proof request (which attributes + purpose).
                  </li>
                  <li>
                    <span className="mr-2 font-mono text-foreground">2.</span>
                    Holder reviews and selects attributes to share.
                  </li>
                  <li>
                    <span className="mr-2 font-mono text-foreground">3.</span>
                    Wallet builds and signs a Verifiable Presentation.
                  </li>
                  <li>
                    <span className="mr-2 font-mono text-foreground">4.</span>
                    Verifier validates signature + on-chain anchor and grants
                    access.
                  </li>
                </ol>
              </Card>
            </div>
          </section>

          {/* DID Method */}
          <section id="did">
            <SectionHeading
              align="left"
              eyebrow="03"
              title="DID method · did:sovra"
              description="A lightweight DID method anchored on Polygon, optimised for India-scale throughput."
            />
            <Card className="mt-6">
              <CardContent className="p-0">
                <CodeBlock language="text" code={DID_DOC_EXAMPLE} />
              </CardContent>
            </Card>
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <FactCard icon={Key} title="Key type" value="Ed25519 (default), secp256k1 (optional)" />
              <FactCard icon={Globe2} title="Network" value="Polygon Amoy (testnet) · Mainnet planned" />
              <FactCard icon={Cog} title="Resolution" value="Universal Resolver-compatible driver" />
            </div>
          </section>

          {/* VC Schemas */}
          <section id="vc">
            <SectionHeading
              align="left"
              eyebrow="04"
              title="Verifiable Credential schemas"
              description="JSON-LD schemas for the most common Indian identity credentials. All schemas are versioned and registered on-chain."
            />
            <Card className="mt-6">
              <CardContent className="p-0">
                <CodeBlock language="json" code={VC_EXAMPLE} />
              </CardContent>
            </Card>
            <div className="mt-6 grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {[
                "AadhaarIdentityCredential",
                "PanCredential",
                "BankKycCredential",
                "DrivingLicenseCredential",
                "DegreeCredential",
                "PassportCredential",
              ].map((s) => (
                <Card key={s} className="flex items-center gap-3 p-4">
                  <FileCode2 className="h-4 w-4 text-foreground" />
                  <span className="font-mono text-sm text-foreground">{s}</span>
                </Card>
              ))}
            </div>
          </section>

          {/* SDKs */}
          <section id="sdk">
            <SectionHeading
              align="left"
              eyebrow="05"
              title="SDKs"
              description="A verifier integration is a few lines of code. Wallet support is built-in."
            />
            <Card className="mt-6">
              <CardContent className="p-0">
                <CodeBlock language="ts" code={SDK_EXAMPLE} />
              </CardContent>
            </Card>
            <div className="mt-6 grid gap-3 md:grid-cols-3">
              <SdkBadge label="@sovraid/verifier" sub="TypeScript · React" />
              <SdkBadge label="@sovraid/issuer" sub="Node · server-side" />
              <SdkBadge label="@sovraid/wallet" sub="React Native · iOS · Android" />
            </div>
          </section>

          {/* Security */}
          <section id="security">
            <SectionHeading
              align="left"
              eyebrow="06"
              title="Security & threat model"
            />
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <Lock className="h-4 w-4 text-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Wallet security
                  </h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  Keys live in the device secure enclave (Keystore / Secure
                  Enclave). Biometric unlock by default. Recovery via social
                  guardians and encrypted backup.
                </p>
              </Card>
              <Card className="p-6">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-4 w-4 text-foreground" />
                  <h3 className="text-sm font-semibold text-foreground">
                    Protocol guarantees
                  </h3>
                </div>
                <p className="mt-3 text-sm text-muted-foreground">
                  PII never goes on-chain. Issuer revocation is published
                  through a status list, not by leaking holder identities.
                </p>
              </Card>
            </div>
          </section>

          {/* Compliance */}
          <section id="compliance">
            <SectionHeading
              align="left"
              eyebrow="07"
              title="Compliance"
            />
            <div className="mt-6 grid gap-4 md:grid-cols-3">
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-foreground">
                  DPDP Act 2023
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Lawful purpose, notice, consent and data minimisation are
                  baked into proof requests.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-foreground">
                  RBI KYC Master Direction
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Issuer credentials map to V-CIP and Aadhaar-based e-KYC flows
                  with full audit trail.
                </p>
              </Card>
              <Card className="p-6">
                <h3 className="text-sm font-semibold text-foreground">
                  SEBI / IRDAI ready
                </h3>
                <p className="mt-2 text-sm text-muted-foreground">
                  Roadmap for capital markets and insurance KYC re-use with
                  partner regulators.
                </p>
              </Card>
            </div>
          </section>

          <Card className="flex flex-col items-start justify-between gap-4 p-8 md:flex-row md:items-center">
            <div>
              <h3 className="text-lg font-semibold text-foreground">
                Want early SDK access?
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                We’re onboarding design partners — banks, fintechs and public
                sector teams.
              </p>
            </div>
            <Button asChild>
              <Link href="mailto:hello@sovraid.in">
                Request access
                <ArrowRight />
              </Link>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

function FactCard({
  icon: Icon,
  title,
  value,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  value: string;
}) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <Icon className="h-4 w-4 text-foreground" />
        <p className="text-xs uppercase tracking-wider text-muted-foreground">
          {title}
        </p>
      </div>
      <p className="mt-2 text-sm font-medium text-foreground">{value}</p>
    </Card>
  );
}

function SdkBadge({ label, sub }: { label: string; sub: string }) {
  return (
    <Card className="p-5">
      <div className="flex items-center gap-2">
        <Terminal className="h-4 w-4 text-foreground" />
        <p className="font-mono text-sm text-foreground">{label}</p>
      </div>
      <p className="mt-1 text-xs text-muted-foreground">{sub}</p>
    </Card>
  );
}

function CodeBlock({ language, code }: { language: string; code: string }) {
  return (
    <div className="rounded-xl">
      <div className="flex items-center justify-between border-b border-border px-4 py-2">
        <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
          {language}
        </span>
        <span className="text-[11px] text-muted-foreground">read-only</span>
      </div>
      <pre className="overflow-x-auto px-4 py-4 text-xs leading-relaxed text-foreground/90">
        <code className="font-mono">{code}</code>
      </pre>
    </div>
  );
}

const DID_DOC_EXAMPLE = `{
  "@context": "https://www.w3.org/ns/did/v1",
  "id": "did:sovra:0xA17fE3c4D02b6D8e0e8Fb87A4f1C2c5e9d8B3a21",
  "verificationMethod": [
    {
      "id": "did:sovra:0xA17f...3a21#key-1",
      "type": "Ed25519VerificationKey2020",
      "controller": "did:sovra:0xA17f...3a21",
      "publicKeyMultibase": "z6MkpTHR8VNsBxYAAWHut2Geadd9jSwuB..."
    }
  ],
  "authentication": ["did:sovra:0xA17f...3a21#key-1"],
  "assertionMethod": ["did:sovra:0xA17f...3a21#key-1"]
}`;

const VC_EXAMPLE = `{
  "@context": ["https://www.w3.org/ns/credentials/v2"],
  "type": ["VerifiableCredential", "BankKycCredential"],
  "issuer": "did:sovra:0xHd1C...42aB",
  "validFrom": "2025-09-18T11:24:00Z",
  "credentialSubject": {
    "id": "did:sovra:0xA17f...3a21",
    "name": "Aarav Mehta",
    "kycLevel": "FULL",
    "riskCategory": "LOW"
  },
  "credentialStatus": {
    "id": "https://status.sovraid.in/list#42",
    "type": "StatusList2021Entry"
  },
  "proof": { "type": "Ed25519Signature2020", "...": "..." }
}`;

const SDK_EXAMPLE = `import { Verifier } from "@sovraid/verifier";

const verifier = new Verifier({
  did: "did:sovra:0xNe0Pa...42aF",
  network: "amoy",
});

const request = await verifier.requestProof({
  schema: "BankKycCredential",
  fields: ["name", "kycLevel", { age: { gte: 18 } }],
  purpose: "Open a NeoPay wallet (Tier 2)",
});

const result = await request.await();
if (result.valid) {
  // grant access — no PII stored on your servers
}`;
