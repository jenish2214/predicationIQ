"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { Logo } from "@/components/logo";
import { ConnectWalletButton } from "@/components/connect-wallet-button";
import { UserMenu } from "@/components/user-menu";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { AuthProfile } from "@/lib/supabase/types";
import { signOutAction } from "@/app/auth/actions";

const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/issuer", label: "Issuer" },
  { href: "/wallet", label: "Wallet" },
  { href: "/verifier", label: "Verifier" },
  { href: "/docs", label: "Docs" },
  { href: "/about", label: "About" },
];

interface NavbarProps {
  profile: AuthProfile | null;
}

export function Navbar({ profile }: NavbarProps) {
  const pathname = usePathname();
  const { hidden, scrolled } = useScrollDirection();
  const [open, setOpen] = React.useState(false);

  React.useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <motion.header
      initial={false}
      animate={{
        y: hidden && scrolled ? -100 : 0,
        opacity: hidden && scrolled ? 0 : 1,
      }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className={cn(
        "fixed inset-x-0 top-0 z-50 w-full border-b transition-[background,border] duration-300",
        scrolled
          ? "glass-premium border-white/10 bg-neon-black/85"
          : "border-white/5 bg-transparent"
      )}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-neon-purple/50 to-transparent"
      />
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-8">
          <Link href="/" className="flex items-center" aria-label="SovraID home">
            <Logo />
          </Link>
          <nav className="hidden items-center gap-1 md:flex">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "group relative rounded-md px-3 py-1.5 text-sm font-medium transition-colors",
                    isActive
                      ? "text-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {link.label}
                  <span
                    className={cn(
                      "absolute inset-x-3 -bottom-0.5 h-px origin-left scale-x-0 bg-gradient-to-r from-neon-purple to-neon-blue transition-transform duration-300",
                      isActive ? "scale-x-100" : "group-hover:scale-x-100"
                    )}
                  />
                </Link>
              );
            })}
          </nav>
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {profile ? (
            <>
              <ConnectWalletButton size="sm" variant="outline" />
              <UserMenu profile={profile} />
            </>
          ) : (
            <>
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="hover:bg-white/5"
              >
                <Link href="/login">Sign in</Link>
              </Button>
              <Button asChild size="sm">
                <Link href="/signup">Get started</Link>
              </Button>
            </>
          )}
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="inline-flex h-9 w-9 items-center justify-center rounded-md border border-white/10 bg-white/5 md:hidden"
          aria-label="Toggle menu"
          aria-expanded={open}
        >
          {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
        </button>
      </div>

      {open ? (
        <div className="border-t border-white/10 glass-premium md:hidden">
          <div className="container flex flex-col gap-1 py-3">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === "/"
                  ? pathname === "/"
                  : pathname.startsWith(link.href);
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "rounded-md px-3 py-2 text-sm font-medium transition-colors",
                    isActive
                      ? "bg-white/10 text-foreground"
                      : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
            <div className="mt-2 flex flex-col gap-2 border-t border-white/10 pt-3">
              {profile ? (
                <>
                  <div className="flex items-center justify-between rounded-md border border-white/10 bg-white/5 px-3 py-2">
                    <div className="flex items-center gap-2">
                      <span className="flex h-7 w-7 items-center justify-center rounded-full border border-neon-purple/40 bg-neon-purple/10 text-xs font-semibold text-neon-purple">
                        {profile.initials}
                      </span>
                      <span className="truncate text-sm font-medium text-foreground">
                        {profile.email}
                      </span>
                    </div>
                  </div>
                  <ConnectWalletButton size="sm" variant="outline" />
                  <form action={signOutAction}>
                    <Button
                      type="submit"
                      variant="outline"
                      size="sm"
                      className="w-full border-white/10"
                    >
                      Sign out
                    </Button>
                  </form>
                </>
              ) : (
                <>
                  <Button asChild variant="outline" size="sm" className="border-white/10">
                    <Link href="/login">Sign in</Link>
                  </Button>
                  <Button asChild size="sm">
                    <Link href="/signup">Get started</Link>
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </motion.header>
  );
}
