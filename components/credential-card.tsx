"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { ShieldCheck } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn, formatDate } from "@/lib/utils";
import type { Credential } from "@/lib/mock-data";

interface CredentialCardProps {
  credential: Credential;
  onClick?: () => void;
  className?: string;
}

export function CredentialCard({
  credential,
  onClick,
  className,
}: CredentialCardProps) {
  const Icon = credential.icon;

  return (
    <motion.button
      type="button"
      onClick={onClick}
      whileHover={{ y: -2 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className={cn(
        "group relative flex h-full w-full flex-col rounded-xl border border-border bg-card p-5 text-left transition-colors hover:border-primary/40",
        className
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg border border-border bg-secondary">
            <Icon className="h-5 w-5 text-foreground" />
          </div>
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.16em] text-muted-foreground">
              Verified Credential
            </p>
            <p className="text-sm font-semibold text-foreground">
              {credential.title}
            </p>
          </div>
        </div>
        <Badge
          variant={credential.status === "active" ? "success" : "muted"}
          className="capitalize"
        >
          <span
            className={cn(
              "h-1.5 w-1.5 rounded-full",
              credential.status === "active"
                ? "bg-accent"
                : "bg-muted-foreground"
            )}
          />
          {credential.status}
        </Badge>
      </div>

      <div className="mt-5 flex-1 space-y-2">
        {credential.attributes.slice(0, 2).map((attr) => (
          <div
            key={attr.label}
            className="flex items-baseline justify-between gap-3 border-b border-dashed border-border/70 pb-1.5 last:border-0"
          >
            <span className="text-xs text-muted-foreground">{attr.label}</span>
            <span className="truncate text-sm font-medium text-foreground">
              {attr.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-border pt-4">
        <div className="flex items-center gap-2">
          <div className="flex h-7 w-7 items-center justify-center rounded-full border border-border bg-secondary text-[10px] font-semibold text-foreground">
            {credential.issuerLogo}
          </div>
          <div className="flex flex-col">
            <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
              Issued by
            </span>
            <span className="text-xs font-medium text-foreground">
              {credential.issuer}
            </span>
          </div>
        </div>
        <div className="flex flex-col items-end">
          <span className="text-[10px] uppercase tracking-wider text-muted-foreground">
            Issued on
          </span>
          <span className="text-xs font-medium text-foreground">
            {formatDate(credential.issuedAt)}
          </span>
        </div>
      </div>

      <div className="pointer-events-none absolute right-4 top-4 flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
        <ShieldCheck className="h-3.5 w-3.5 text-accent" />
        <span className="text-[10px] font-medium uppercase tracking-wider text-accent">
          Anchored
        </span>
      </div>
    </motion.button>
  );
}
