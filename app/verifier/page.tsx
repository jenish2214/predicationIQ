import type { Metadata } from "next";

import { VerifierClient } from "./verifier-client";

export const metadata: Metadata = {
  title: "Verifier Demo",
  description:
    "NeoPay verifier demo — scan a SovraID QR, request a proof with minimal data, and verify in seconds.",
};

export default function VerifierPage() {
  return <VerifierClient />;
}
