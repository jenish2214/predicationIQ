"use client";

import * as React from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  IdCard,
  LayoutDashboard,
  LifeBuoy,
  LogOut,
  ShieldCheck,
} from "lucide-react";

import { signOutAction } from "@/app/auth/actions";
import { cn } from "@/lib/utils";
import type { AuthProfile } from "@/lib/supabase/types";

interface UserMenuProps {
  profile: AuthProfile;
  className?: string;
}

export function UserMenu({ profile, className }: UserMenuProps) {
  const [open, setOpen] = React.useState(false);
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function onClick(e: MouseEvent) {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  return (
    <div ref={ref} className={cn("relative", className)}>
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="group flex items-center gap-2 rounded-full border border-border bg-secondary/60 py-1.5 pl-1.5 pr-3 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-secondary"
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <span className="relative flex h-7 w-7 items-center justify-center rounded-full border border-primary/40 bg-background text-xs font-semibold text-primary">
          {profile.initials}
          <span className="absolute -bottom-0.5 -right-0.5 h-2 w-2 rounded-full border border-background bg-accent" />
        </span>
        <span className="hidden max-w-[140px] truncate sm:inline">
          {profile.fullName ?? profile.email ?? "Account"}
        </span>
        <ChevronDown
          className={cn(
            "h-3.5 w-3.5 text-muted-foreground transition-transform",
            open && "rotate-180"
          )}
        />
      </button>

      <AnimatePresence>
        {open ? (
          <motion.div
            initial={{ opacity: 0, y: -6, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -4, scale: 0.98 }}
            transition={{ duration: 0.14, ease: "easeOut" }}
            className="absolute right-0 z-50 mt-2 w-64 origin-top-right overflow-hidden rounded-xl border border-border bg-card shadow-2xl shadow-black/40"
            role="menu"
          >
            <div className="border-b border-border bg-secondary/40 px-4 py-3">
              <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                Signed in as
              </p>
              <p className="mt-0.5 truncate text-sm font-medium text-foreground">
                {profile.email ?? "—"}
              </p>
            </div>

            <nav className="py-1">
              <MenuLink href="/wallet" onClick={() => setOpen(false)}>
                <LayoutDashboard className="h-4 w-4" />
                Wallet dashboard
              </MenuLink>
              <MenuLink href="/issuer" onClick={() => setOpen(false)}>
                <IdCard className="h-4 w-4" />
                Issuer portal
              </MenuLink>
              <MenuLink href="/verifier" onClick={() => setOpen(false)}>
                <ShieldCheck className="h-4 w-4" />
                Verifier demo
              </MenuLink>
              <MenuLink href="/docs" onClick={() => setOpen(false)}>
                <LifeBuoy className="h-4 w-4" />
                Docs & support
              </MenuLink>
            </nav>

            <form action={signOutAction} className="border-t border-border">
              <button
                type="submit"
                className="flex w-full items-center gap-2 px-4 py-2.5 text-left text-sm font-medium text-destructive transition-colors hover:bg-destructive/10"
                role="menuitem"
              >
                <LogOut className="h-4 w-4" />
                Sign out
              </button>
            </form>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </div>
  );
}

function MenuLink({
  href,
  children,
  onClick,
}: {
  href: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      role="menuitem"
      className="flex items-center gap-2 px-4 py-2 text-sm text-foreground transition-colors hover:bg-secondary"
    >
      {children}
    </Link>
  );
}
