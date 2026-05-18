import type { Metadata } from "next";

import { WalletPageClient } from "./wallet-client";
import { createClient } from "@/lib/supabase/server";
import { toAuthProfile, type AuthProfile } from "@/lib/supabase/types";

export const metadata: Metadata = {
  title: "Wallet",
  description:
    "Your SovraID wallet — hold reusable KYC credentials, prove with selective disclosure, and stay in control.",
};

export default async function WalletPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profile: AuthProfile | null = null;
  if (user) {
    const { data: row } = await supabase
      .from("profiles")
      .select(
        "id, email, display_name, provider_type, wallet_chain, wallet_address, created_at, updated_at"
      )
      .eq("id", user.id)
      .maybeSingle();
    profile = toAuthProfile(user, row);
  }

  return <WalletPageClient profile={profile} />;
}
