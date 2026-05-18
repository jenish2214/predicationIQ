import type { Metadata } from "next";

import { WalletPageClient } from "./wallet-client";

export const metadata: Metadata = {
  title: "Wallet",
  description:
    "Your SovraID wallet — hold reusable KYC credentials, prove with selective disclosure, and stay in control.",
};

export default function WalletPage() {
  return <WalletPageClient />;
}
