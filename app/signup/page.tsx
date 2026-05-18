import { Suspense } from "react";
import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { SignupForm } from "@/components/auth/signup-form";

export const metadata: Metadata = {
  title: "Create your wallet",
  description: "Create a SovraID wallet — your reusable KYC identity for India.",
};

export default function SignupPage() {
  return (
    <AuthShell
      side="right"
      title="Create your wallet"
      description="Set up a SovraID DID and wallet in under a minute. Your keys, your data."
    >
      <Suspense
        fallback={
          <div className="h-80 rounded-2xl border border-border bg-card/70 backdrop-blur" />
        }
      >
        <SignupForm />
      </Suspense>
    </AuthShell>
  );
}
