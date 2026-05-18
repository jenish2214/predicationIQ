"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Fingerprint,
  Loader2,
  Sparkles,
  Wallet,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";
import {
  connectEthereumWallet,
  connectSolanaWallet,
  deriveWalletCredentials,
  isMetaMaskAvailable,
  isPhantomAvailable,
  type WalletChain,
  type WalletConnection,
} from "@/lib/web3/wallet";
import {
  MetaMaskIcon,
  PhantomIcon,
} from "@/components/auth/provider-icons";

type Phase =
  | { kind: "idle" }
  | { kind: "connecting"; chain: WalletChain }
  | { kind: "signing"; chain: WalletChain; shortAddress: string }
  | { kind: "authenticating"; chain: WalletChain; shortAddress: string }
  | { kind: "success"; chain: WalletChain; shortAddress: string }
  | { kind: "error"; message: string };

interface WalletButtonsProps {
  variant: "login" | "signup";
}

export function WalletButtons({ variant }: WalletButtonsProps) {
  const router = useRouter();
  const search = useSearchParams();
  const redirectTo = search.get("redirect") ?? "/wallet";
  const supabase = React.useMemo(() => createClient(), []);

  const [phase, setPhase] = React.useState<Phase>({ kind: "idle" });

  const [available, setAvailable] = React.useState({ eth: false, sol: false });
  React.useEffect(() => {
    setAvailable({
      eth: isMetaMaskAvailable(),
      sol: isPhantomAvailable(),
    });
  }, []);

  const handleConnect = async (chain: WalletChain) => {
    setPhase({ kind: "connecting", chain });
    try {
      let connection: WalletConnection;
      try {
        connection =
          chain === "ethereum"
            ? await connectEthereumWallet()
            : await connectSolanaWallet();
      } catch (err) {
        const message =
          err instanceof Error ? err.message : "Could not connect wallet.";
        setPhase({ kind: "error", message });
        return;
      }

      setPhase({
        kind: "signing",
        chain,
        shortAddress: connection.shortAddress,
      });

      const creds = await deriveWalletCredentials(connection);

      setPhase({
        kind: "authenticating",
        chain,
        shortAddress: connection.shortAddress,
      });

      // Try sign-in first; if user doesn't exist yet, fall back to sign-up.
      const signIn = await supabase.auth.signInWithPassword({
        email: creds.email,
        password: creds.password,
      });

      if (signIn.error) {
        const signUp = await supabase.auth.signUp({
          email: creds.email,
          password: creds.password,
          options: { data: creds.metadata },
        });

        if (signUp.error) {
          throw signUp.error;
        }

        // If email confirmation is enabled in Supabase, signUp returns no
        // session. We can't fake confirm without the service role key.
        if (!signUp.data.session) {
          setPhase({
            kind: "error",
            message:
              "Wallet sign-in requires email confirmation to be disabled. Go to Supabase → Authentication → Sign In / Up → and turn off 'Confirm email'.",
          });
          return;
        }
      }

      setPhase({
        kind: "success",
        chain,
        shortAddress: connection.shortAddress,
      });
      window.setTimeout(() => {
        router.replace(redirectTo);
        router.refresh();
      }, 700);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Wallet sign-in failed.";
      setPhase({ kind: "error", message });
    }
  };

  const isBusy =
    phase.kind === "connecting" ||
    phase.kind === "signing" ||
    phase.kind === "authenticating";
  const busyChain =
    phase.kind === "connecting" ||
    phase.kind === "signing" ||
    phase.kind === "authenticating"
      ? phase.chain
      : null;

  return (
    <div className="space-y-3">
      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
        <WalletProviderButton
          chain="ethereum"
          icon={<MetaMaskIcon />}
          label="MetaMask"
          subLabel="Ethereum · EVM"
          installed={available.eth}
          loading={busyChain === "ethereum"}
          disabled={isBusy && busyChain !== "ethereum"}
          onClick={() => handleConnect("ethereum")}
        />
        <WalletProviderButton
          chain="solana"
          icon={<PhantomIcon />}
          label="Phantom"
          subLabel="Solana"
          installed={available.sol}
          loading={busyChain === "solana"}
          disabled={isBusy && busyChain !== "solana"}
          onClick={() => handleConnect("solana")}
        />
      </div>

      <AnimatePresence mode="wait">
        {phase.kind !== "idle" ? <StatusCard key={phase.kind} phase={phase} /> : null}
      </AnimatePresence>

      <p className="text-center text-[11px] text-muted-foreground">
        {variant === "signup"
          ? "Connecting a wallet will create your SovraID account automatically."
          : "Sign a one-time message — no transaction, no gas, no PII shared."}
      </p>
    </div>
  );
}

function WalletProviderButton({
  icon,
  label,
  subLabel,
  installed,
  loading,
  disabled,
  onClick,
}: {
  chain: WalletChain;
  icon: React.ReactNode;
  label: string;
  subLabel: string;
  installed: boolean;
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}) {
  return (
    <Button
      type="button"
      variant="outline"
      onClick={onClick}
      disabled={disabled || loading}
      className={cn(
        "h-auto justify-start gap-3 p-3 text-left transition-shadow",
        loading && "glow-primary"
      )}
    >
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md border border-border bg-background">
        {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : icon}
      </span>
      <span className="flex min-w-0 flex-1 flex-col leading-tight">
        <span className="text-sm font-medium text-foreground">{label}</span>
        <span className="text-[11px] text-muted-foreground">
          {installed ? subLabel : "Not detected"}
        </span>
      </span>
      {!installed ? (
        <Badge variant="muted" className="ml-auto text-[10px]">
          Install
        </Badge>
      ) : null}
    </Button>
  );
}

function StatusCard({ phase }: { phase: Phase }) {
  if (phase.kind === "idle") return null;

  const meta = (() => {
    switch (phase.kind) {
      case "connecting":
        return {
          icon: Wallet,
          tone: "primary" as const,
          title: `Connecting to ${chainLabel(phase.chain)}…`,
          body: "Approve the connection request in your wallet.",
        };
      case "signing":
        return {
          icon: Fingerprint,
          tone: "primary" as const,
          title: "Sign the SovraID auth message",
          body: `Wallet ${phase.shortAddress} — this proves you control the key. No gas, no transaction.`,
        };
      case "authenticating":
        return {
          icon: Sparkles,
          tone: "primary" as const,
          title: "Setting up your SovraID session…",
          body: `Linking ${chainLabel(phase.chain)} wallet ${phase.shortAddress}.`,
        };
      case "success":
        return {
          icon: CheckCircle2,
          tone: "accent" as const,
          title: "Wallet connected",
          body: `Signed in with ${chainLabel(phase.chain)} ${phase.shortAddress}.`,
        };
      case "error":
        return {
          icon: AlertCircle,
          tone: "destructive" as const,
          title: "Couldn't sign in with wallet",
          body: phase.message,
        };
    }
  })();

  const Icon = meta.icon;
  const toneClass =
    meta.tone === "accent"
      ? "border-accent/40 bg-accent/10 text-foreground"
      : meta.tone === "destructive"
      ? "border-destructive/40 bg-destructive/10 text-foreground"
      : "border-primary/40 bg-primary/10 text-foreground";
  const iconClass =
    meta.tone === "accent"
      ? "text-accent"
      : meta.tone === "destructive"
      ? "text-destructive"
      : "text-primary";

  return (
    <motion.div
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -4 }}
      transition={{ duration: 0.2 }}
      className={cn(
        "flex items-start gap-3 rounded-lg border p-3 text-xs",
        toneClass
      )}
    >
      <span className="mt-0.5 flex h-5 w-5 items-center justify-center">
        {phase.kind === "connecting" ||
        phase.kind === "signing" ||
        phase.kind === "authenticating" ? (
          <Loader2 className={cn("h-4 w-4 animate-spin", iconClass)} />
        ) : (
          <Icon className={cn("h-4 w-4", iconClass)} />
        )}
      </span>
      <div>
        <p className="text-sm font-medium">{meta.title}</p>
        <p className="mt-0.5 text-muted-foreground">{meta.body}</p>
      </div>
    </motion.div>
  );
}

function chainLabel(chain: WalletChain) {
  return chain === "ethereum" ? "Ethereum" : "Solana";
}
