import Link from "next/link";
import { Github, Linkedin, Twitter } from "lucide-react";

import { Logo } from "@/components/logo";

const COLUMNS: { title: string; links: { href: string; label: string }[] }[] = [
  {
    title: "Product",
    links: [
      { href: "/issuer", label: "Issuer Portal" },
      { href: "/wallet", label: "User Wallet" },
      { href: "/verifier", label: "Verifier Demo" },
      { href: "/docs", label: "Documentation" },
    ],
  },
  {
    title: "Company",
    links: [
      { href: "/about", label: "About" },
      { href: "/docs#trust", label: "Trust Center" },
      { href: "/docs#security", label: "Security" },
      { href: "/docs#compliance", label: "Compliance" },
    ],
  },
  {
    title: "Resources",
    links: [
      { href: "/docs#did", label: "DID Method" },
      { href: "/docs#vc", label: "VC Schemas" },
      { href: "/docs#sdk", label: "SDKs" },
      { href: "/docs#status", label: "Status" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-card/40">
      <div className="container py-14">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
          <div className="md:col-span-5">
            <Logo />
            <p className="mt-4 max-w-sm text-sm text-muted-foreground">
              Decentralized reusable KYC and digital identity for India.
              Verify once, prove anywhere — without giving up your privacy.
            </p>
            <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-3 py-1.5">
              <span className="tricolor-bar" aria-hidden>
                <span className="stripe-saffron" />
                <span className="stripe-white" />
                <span className="stripe-green" />
              </span>
              <span className="text-xs font-medium text-muted-foreground">
                Made for India
              </span>
            </div>
          </div>

          {COLUMNS.map((col) => (
            <div key={col.title} className="md:col-span-2">
              <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                {col.title}
              </h4>
              <ul className="mt-4 space-y-3">
                {col.links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-foreground/80 transition-colors hover:text-foreground"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div className="md:col-span-1">
            <h4 className="text-xs font-semibold uppercase tracking-[0.18em] text-muted-foreground">
              Social
            </h4>
            <div className="mt-4 flex gap-2">
              <a
                href="#"
                aria-label="Twitter"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
              >
                <Twitter className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="GitHub"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
              >
                <Github className="h-4 w-4" />
              </a>
              <a
                href="#"
                aria-label="LinkedIn"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-border text-muted-foreground hover:text-foreground"
              >
                <Linkedin className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-3 border-t border-border pt-6 text-xs text-muted-foreground md:flex-row md:items-center">
          <p>
            © {new Date().getFullYear()} SovraID Labs. All rights reserved.
          </p>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
            <Link href="/docs#privacy" className="hover:text-foreground">
              Privacy
            </Link>
            <Link href="/docs#terms" className="hover:text-foreground">
              Terms
            </Link>
            <Link href="/docs#dpdp" className="hover:text-foreground">
              DPDP Act
            </Link>
            <span className="font-mono">v0.1.0 · Polygon Amoy</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
