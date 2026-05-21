"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowUpRight, Github, Linkedin, Twitter } from "lucide-react";

import { Logo } from "@/components/logo";
import { MagneticButton } from "@/components/landing/ui/magnetic-button";
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

const SOCIAL = [
  { href: "#", label: "Twitter", icon: Twitter },
  { href: "#", label: "GitHub", icon: Github },
  { href: "#", label: "LinkedIn", icon: Linkedin },
] as const;

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  show: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] },
  }),
};

export function Footer() {
  return (
    <footer className="relative z-[2] mt-auto border-t border-white/5">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple/60 to-transparent"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-0 h-48 w-48 rounded-full bg-neon-purple/15 blur-[80px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-24 bottom-0 h-40 w-40 rounded-full bg-neon-pink/10 blur-[70px]"
      />

      <div className="container relative py-16 md:py-20">
        <div className="glass-premium gradient-border overflow-hidden rounded-2xl p-8 md:p-12">
          <div className="grid grid-cols-1 gap-10 md:grid-cols-12">
            <motion.div
              className="md:col-span-5"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.3 }}
              variants={fadeUp}
              custom={0}
            >
              <Logo />
              <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
                Decentralized reusable KYC and digital identity for India.
                Verify once, prove anywhere — without giving up your privacy.
              </p>
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5">
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
              <div className="mt-8 hidden sm:block">
                <MagneticButton href="/wallet" variant="outline">
                  Open Wallet
                  <ArrowUpRight className="h-4 w-4" />
                </MagneticButton>
              </div>
            </motion.div>

            {COLUMNS.map((col, colIdx) => (
              <motion.div
                key={col.title}
                className="md:col-span-2"
                initial="hidden"
                whileInView="show"
                viewport={{ once: true, amount: 0.2 }}
                variants={fadeUp}
                custom={colIdx + 1}
              >
                <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                  {col.title}
                </h4>
                <ul className="mt-4 space-y-2.5">
                  {col.links.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="group inline-flex items-center gap-1 text-sm text-foreground/75 transition-colors hover:text-foreground"
                      >
                        {link.label}
                        <ArrowUpRight className="h-3 w-3 opacity-0 transition-all group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:opacity-100" />
                      </Link>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}

            <motion.div
              className="md:col-span-1"
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, amount: 0.2 }}
              variants={fadeUp}
              custom={4}
            >
              <h4 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-muted-foreground">
                Social
              </h4>
              <div className="mt-4 flex gap-2">
                {SOCIAL.map(({ href, label, icon: Icon }) => (
                  <a
                    key={label}
                    href={href}
                    aria-label={label}
                    className="group flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-muted-foreground transition-all hover:border-neon-purple/40 hover:bg-neon-purple/10 hover:text-foreground hover:shadow-neon"
                  >
                    <Icon className="h-4 w-4 transition-transform group-hover:scale-110" />
                  </a>
                ))}
              </div>
            </motion.div>
          </div>

          <motion.div
            className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-8 text-xs text-muted-foreground md:flex-row md:items-center"
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            variants={fadeUp}
            custom={5}
          >
            <p>
              © {new Date().getFullYear()} SovraID Labs. All rights reserved.
            </p>
            <div className="flex flex-wrap items-center gap-x-5 gap-y-2">
              <FooterLink href="/docs#privacy">Privacy</FooterLink>
              <FooterLink href="/docs#terms">Terms</FooterLink>
              <FooterLink href="/docs#dpdp">DPDP Act</FooterLink>
              <span className="font-mono text-[11px] text-foreground/50">
                v0.1.0 · Polygon Amoy
              </span>
            </div>
          </motion.div>
        </div>
      </div>
    </footer>
  );
}

function FooterLink({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      className="relative transition-colors hover:text-foreground after:absolute after:inset-x-0 after:-bottom-px after:h-px after:origin-left after:scale-x-0 after:bg-gradient-to-r after:from-neon-purple after:to-neon-blue after:transition-transform hover:after:scale-x-100"
    >
      {children}
    </Link>
  );
}
