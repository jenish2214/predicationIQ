"use client";

import * as React from "react";
import { Check, Loader2, Wallet } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn, shortenAddress } from "@/lib/utils";
import { MOCK_WALLET_ADDRESS } from "@/lib/mock-data";

interface ConnectWalletButtonProps {
  className?: string;
  size?: "sm" | "default" | "lg";
  variant?: "default" | "outline" | "secondary";
}

export function ConnectWalletButton({
  className,
  size = "default",
  variant = "default",
}: ConnectWalletButtonProps) {
  const [status, setStatus] = React.useState<
    "idle" | "connecting" | "connected"
  >("idle");

  const handleClick = React.useCallback(() => {
    if (status === "connected") return;
    setStatus("connecting");
    window.setTimeout(() => setStatus("connected"), 900);
  }, [status]);

  const label = React.useMemo(() => {
    if (status === "connected") return shortenAddress(MOCK_WALLET_ADDRESS);
    if (status === "connecting") return "Connecting…";
    return "Connect Wallet";
  }, [status]);

  return (
    <Button
      onClick={handleClick}
      size={size}
      variant={status === "connected" ? "outline" : variant}
      className={cn(
        "font-medium",
        status === "connected" && "border-accent/50 text-accent",
        className
      )}
    >
      {status === "connecting" ? (
        <Loader2 className="animate-spin" />
      ) : status === "connected" ? (
        <Check className="text-accent" />
      ) : (
        <Wallet />
      )}
      <span className={status === "connected" ? "font-mono text-xs" : ""}>
        {label}
      </span>
    </Button>
  );
}
