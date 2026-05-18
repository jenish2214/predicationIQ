import { AtSign, Wallet } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import {
  GoogleIcon,
  MetaMaskIcon,
  PhantomIcon,
} from "@/components/auth/provider-icons";
import { PROVIDER_LABELS, type ProviderType } from "@/lib/supabase/types";

interface ProviderBadgeProps {
  providerType: ProviderType;
  className?: string;
  size?: "sm" | "md";
  showLabel?: boolean;
}

export function ProviderBadge({
  providerType,
  className,
  size = "sm",
  showLabel = true,
}: ProviderBadgeProps) {
  const Icon =
    providerType === "google"
      ? () => <GoogleIcon className="h-3 w-3" />
      : providerType === "ethereum_wallet"
      ? () => <MetaMaskIcon className="h-3.5 w-3.5" />
      : providerType === "solana_wallet"
      ? () => <PhantomIcon className="h-3.5 w-3.5" />
      : () => <AtSign className="h-3 w-3 text-foreground" />;

  const variant =
    providerType === "google"
      ? "outline"
      : providerType === "ethereum_wallet" || providerType === "solana_wallet"
      ? "success"
      : "muted";

  return (
    <Badge
      variant={variant}
      className={cn(
        "gap-1.5 capitalize",
        size === "md" && "px-3 py-1 text-xs",
        className
      )}
    >
      <Icon />
      {showLabel ? PROVIDER_LABELS[providerType] : null}
    </Badge>
  );
}

export function WalletIconChip({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex h-6 w-6 items-center justify-center rounded-full border border-border bg-secondary",
        className
      )}
    >
      <Wallet className="h-3 w-3 text-foreground" />
    </span>
  );
}
