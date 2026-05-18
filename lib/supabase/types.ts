import type { User } from "@supabase/supabase-js";

export type AuthUser = User;

export type ProviderType =
  | "email"
  | "google"
  | "ethereum_wallet"
  | "solana_wallet";

export interface ProfileRow {
  id: string;
  email: string | null;
  display_name: string | null;
  provider_type: ProviderType;
  wallet_chain: string | null;
  wallet_address: string | null;
  created_at: string;
  updated_at: string;
}

export interface AuthProfile {
  id: string;
  email: string | null;
  fullName: string | null;
  initials: string;
  providerType: ProviderType;
  walletChain: "ethereum" | "solana" | null;
  walletAddress: string | null;
}

export const PROVIDER_LABELS: Record<ProviderType, string> = {
  email: "Email",
  google: "Google",
  ethereum_wallet: "Ethereum Wallet",
  solana_wallet: "Solana Wallet",
};

export const PROVIDER_SHORT_LABELS: Record<ProviderType, string> = {
  email: "Email",
  google: "Google",
  ethereum_wallet: "ETH",
  solana_wallet: "SOL",
};

function deriveProvider(user: AuthUser): ProviderType {
  const fromMeta = user.user_metadata?.provider_type as
    | string
    | undefined;
  if (
    fromMeta === "email" ||
    fromMeta === "google" ||
    fromMeta === "ethereum_wallet" ||
    fromMeta === "solana_wallet"
  ) {
    return fromMeta;
  }
  const fromApp = user.app_metadata?.provider as string | undefined;
  if (fromApp === "google") return "google";
  return "email";
}

export function toAuthProfile(
  user: AuthUser | null,
  row?: ProfileRow | null
): AuthProfile | null {
  if (!user) return null;

  const fullName =
    row?.display_name ??
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    null;

  const email = user.email ?? row?.email ?? null;

  const seed = fullName ?? email ?? "U";
  const initials = seed
    .split(/\s+|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("")
    .padEnd(1, "U");

  const providerType: ProviderType =
    row?.provider_type ?? deriveProvider(user);

  const walletChainRaw =
    row?.wallet_chain ??
    (user.user_metadata?.wallet_chain as string | undefined) ??
    null;
  const walletChain: "ethereum" | "solana" | null =
    walletChainRaw === "ethereum" || walletChainRaw === "solana"
      ? walletChainRaw
      : null;
  const walletAddress =
    row?.wallet_address ??
    ((user.user_metadata?.wallet_address as string | undefined) ?? null);

  return {
    id: user.id,
    email,
    fullName,
    initials,
    providerType,
    walletChain,
    walletAddress,
  };
}
