"use client";

import {
  BadgeCheck,
  Building2,
  GraduationCap,
  IdCard,
  Landmark,
  ScanLine,
  ShieldCheck,
  Sparkles,
  Wallet,
} from "lucide-react";

import { Marquee } from "@/components/animations/marquee";

const ROW_ONE = [
  { name: "UIDAI", sub: "Aadhaar" },
  { name: "HDFC Bank", sub: "Bank KYC" },
  { name: "ICICI Bank", sub: "Bank KYC" },
  { name: "Income Tax", sub: "PAN" },
  { name: "RTO Maharashtra", sub: "Driving License" },
  { name: "IIT Bombay", sub: "Degree" },
  { name: "DigiLocker", sub: "e-Docs" },
];

const ROW_TWO = [
  { name: "NeoPay", icon: Wallet },
  { name: "Zomato Hyperpure", icon: BadgeCheck },
  { name: "CryptoXchange", icon: ScanLine },
  { name: "Swiggy Onboard", icon: IdCard },
  { name: "Bharat Mobility", icon: ShieldCheck },
  { name: "EduScholar", icon: GraduationCap },
  { name: "RentalDekho", icon: Landmark },
  { name: "TaxFiler", icon: Building2 },
  { name: "GovServe", icon: Sparkles },
];

export function TrustedByMarquee() {
  return (
    <section className="border-b border-border py-12 md:py-16">
      <div className="container space-y-4">
        <div className="flex flex-col items-center text-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/60 px-3 py-1 text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            <ShieldCheck className="h-3 w-3 text-accent" />
            Issuer & Verifier Network
          </span>
          <p className="mt-3 text-sm text-muted-foreground md:text-base">
            India’s banks, government bodies and fintechs already speak SovraID.
          </p>
        </div>

        <div className="space-y-3 pt-2">
          <Marquee speed={45}>
            {ROW_ONE.map((item) => (
              <IssuerChip key={item.name} name={item.name} sub={item.sub} />
            ))}
          </Marquee>
          <Marquee speed={55} reverse>
            {ROW_TWO.map((item) => (
              <VerifierChip
                key={item.name}
                name={item.name}
                Icon={item.icon}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
}

function IssuerChip({ name, sub }: { name: string; sub: string }) {
  return (
    <div className="flex h-12 items-center gap-3 rounded-xl border border-border bg-card px-4">
      <div className="flex h-7 w-7 items-center justify-center rounded-md border border-border bg-secondary text-[10px] font-semibold text-foreground">
        {name.slice(0, 2).toUpperCase()}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-foreground">{name}</span>
        <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
          {sub}
        </span>
      </div>
    </div>
  );
}

function VerifierChip({
  name,
  Icon,
}: {
  name: string;
  Icon: typeof Wallet;
}) {
  return (
    <div className="flex h-12 items-center gap-2 rounded-xl border border-border bg-card px-4">
      <Icon className="h-4 w-4 text-foreground" />
      <span className="text-sm font-medium text-foreground">{name}</span>
    </div>
  );
}
