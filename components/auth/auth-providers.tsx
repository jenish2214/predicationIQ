"use client";

import { Separator } from "@/components/ui/separator";
import { GoogleButton } from "@/components/auth/google-button";
import { WalletButtons } from "@/components/auth/wallet-buttons";

interface AuthProvidersProps {
  variant: "login" | "signup";
  dividerLabel?: string;
}

export function AuthProviders({
  variant,
  dividerLabel = "Or continue with",
}: AuthProvidersProps) {
  return (
    <div className="space-y-4">
      <GoogleButton
        label={variant === "signup" ? "Sign up with Google" : "Continue with Google"}
      />

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Web3
        </span>
        <Separator className="flex-1" />
      </div>

      <WalletButtons variant={variant} />

      <div className="flex items-center gap-3 pt-1">
        <Separator className="flex-1" />
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          {dividerLabel}
        </span>
        <Separator className="flex-1" />
      </div>
    </div>
  );
}
