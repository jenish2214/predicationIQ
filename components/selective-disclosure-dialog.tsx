"use client";

import * as React from "react";
import { motion } from "framer-motion";
import { CheckCircle2, Eye, EyeOff, ShieldCheck } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import type { Credential } from "@/lib/mock-data";

interface SelectiveDisclosureDialogProps {
  credential: Credential | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function SelectiveDisclosureDialog({
  credential,
  open,
  onOpenChange,
}: SelectiveDisclosureDialogProps) {
  const [selected, setSelected] = React.useState<Record<string, boolean>>({});
  const [phase, setPhase] = React.useState<"select" | "signing" | "done">(
    "select"
  );

  React.useEffect(() => {
    if (open && credential) {
      const initial: Record<string, boolean> = {};
      for (const attr of credential.attributes) {
        initial[attr.label] = false;
      }
      setSelected(initial);
      setPhase("select");
    }
  }, [open, credential]);

  if (!credential) return null;

  const toggle = (label: string) =>
    setSelected((prev) => ({ ...prev, [label]: !prev[label] }));

  const sharedCount = Object.values(selected).filter(Boolean).length;

  const handleShare = () => {
    setPhase("signing");
    window.setTimeout(() => setPhase("done"), 1100);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-xl">
        <DialogHeader>
          <div className="flex items-center gap-2">
            <Badge variant="success">
              <ShieldCheck className="h-3 w-3" />
              Selective Disclosure
            </Badge>
            <Badge variant="muted">ZK-ready</Badge>
          </div>
          <DialogTitle className="text-xl">
            Share fields from {credential.title}
          </DialogTitle>
          <DialogDescription>
            Pick exactly which attributes the verifier will see. The rest stay
            in your wallet and never leave your device.
          </DialogDescription>
        </DialogHeader>

        {phase === "select" ? (
          <div className="max-h-[360px] overflow-y-auto rounded-lg border border-border bg-background/50">
            <ul className="divide-y divide-border">
              {credential.attributes.map((attr) => {
                const isOn = selected[attr.label];
                return (
                  <li
                    key={attr.label}
                    className="flex items-center justify-between px-4 py-3"
                  >
                    <div className="flex items-start gap-3">
                      <div
                        className={cn(
                          "mt-0.5 flex h-6 w-6 items-center justify-center rounded-md border",
                          isOn
                            ? "border-accent/50 bg-accent/10 text-accent"
                            : "border-border text-muted-foreground"
                        )}
                      >
                        {isOn ? (
                          <Eye className="h-3.5 w-3.5" />
                        ) : (
                          <EyeOff className="h-3.5 w-3.5" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-foreground">
                          {attr.label}
                        </p>
                        <p
                          className={cn(
                            "font-mono text-xs",
                            isOn
                              ? "text-foreground"
                              : "text-muted-foreground line-through"
                          )}
                        >
                          {isOn ? attr.value : "•••••••••"}
                        </p>
                      </div>
                    </div>
                    <Switch
                      checked={!!isOn}
                      onCheckedChange={() => toggle(attr.label)}
                      aria-label={`Share ${attr.label}`}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        ) : null}

        {phase === "signing" ? (
          <div className="flex flex-col items-center justify-center gap-3 py-10 text-center">
            <div className="relative flex h-16 w-16 items-center justify-center rounded-full border border-border bg-secondary">
              <span className="absolute inset-0 animate-pulse-ring rounded-full border border-primary" />
              <ShieldCheck className="h-7 w-7 text-primary" />
            </div>
            <p className="text-sm font-medium text-foreground">
              Signing presentation with your DID…
            </p>
            <p className="font-mono text-xs text-muted-foreground">
              did:sovra:0xA17f…3a21
            </p>
          </div>
        ) : null}

        {phase === "done" ? (
          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex flex-col items-center justify-center gap-3 py-10 text-center"
          >
            <div className="flex h-16 w-16 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
              <CheckCircle2 className="h-8 w-8 text-accent" />
            </div>
            <p className="text-base font-semibold text-foreground">
              Proof shared securely
            </p>
            <p className="max-w-sm text-sm text-muted-foreground">
              Only the {sharedCount}{" "}
              {sharedCount === 1 ? "attribute" : "attributes"} you selected
              {" "}were sent. Everything else stays in your wallet.
            </p>
          </motion.div>
        ) : null}

        <DialogFooter className="items-center sm:items-center">
          {phase === "select" ? (
            <>
              <div className="mr-auto text-xs text-muted-foreground">
                Sharing{" "}
                <span className="font-mono text-foreground">{sharedCount}</span>{" "}
                of{" "}
                <span className="font-mono text-foreground">
                  {credential.attributes.length}
                </span>{" "}
                attributes
              </div>
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleShare}
                disabled={sharedCount === 0}
                variant="success"
              >
                <ShieldCheck className="h-4 w-4" />
                Share Proof
              </Button>
            </>
          ) : null}
          {phase === "done" ? (
            <Button onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Done
            </Button>
          ) : null}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
