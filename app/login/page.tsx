import { Suspense } from "react";
import type { Metadata } from "next";

import { AuthShell } from "@/components/auth/auth-shell";
import { LoginForm } from "@/components/auth/login-form";

export const metadata: Metadata = {
  title: "Sign in",
  description: "Sign in to your SovraID wallet.",
};

export default function LoginPage() {
  return (
    <AuthShell
      side="left"
      title="Welcome back"
      description="Sign in to access your SovraID wallet, credentials and verifier history."
    >
      <Suspense
        fallback={
          <div className="h-64 rounded-2xl border border-border bg-card/70 backdrop-blur" />
        }
      >
        <LoginForm />
      </Suspense>
    </AuthShell>
  );
}
