import type { Metadata } from "next";

import { IssuerDashboard } from "./issuer-dashboard";

export const metadata: Metadata = {
  title: "Issuer Portal",
  description:
    "Bank and government view to verify a citizen and issue a tamper-proof reusable KYC credential.",
};

export default function IssuerPage() {
  return <IssuerDashboard />;
}
