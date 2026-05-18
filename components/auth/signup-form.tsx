"use client";

import * as React from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Eye,
  EyeOff,
  Loader2,
  Lock,
  Mail,
  MailCheck,
  ShieldCheck,
  UserRound,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { AuthProviders } from "@/components/auth/auth-providers";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

const PASSWORD_RULES = [
  { label: "8+ characters", test: (s: string) => s.length >= 8 },
  { label: "1 uppercase", test: (s: string) => /[A-Z]/.test(s) },
  { label: "1 number", test: (s: string) => /\d/.test(s) },
  { label: "1 symbol", test: (s: string) => /[^A-Za-z0-9]/.test(s) },
];

export function SignupForm() {
  const router = useRouter();
  const search = useSearchParams();
  const redirectTo = search.get("redirect") ?? "/wallet";

  const [fullName, setFullName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [agree, setAgree] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [confirmation, setConfirmation] = React.useState<null | {
    email: string;
    needsConfirmation: boolean;
  }>(null);

  const supabase = React.useMemo(() => createClient(), []);

  const passedRules = PASSWORD_RULES.filter((r) => r.test(password)).length;
  const passwordStrong = passedRules === PASSWORD_RULES.length;
  const canSubmit =
    fullName.trim().length >= 2 &&
    email.trim().length > 3 &&
    passwordStrong &&
    agree;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email: email.trim(),
        password,
        options: {
          data: { full_name: fullName.trim() },
          emailRedirectTo:
            typeof window !== "undefined"
              ? `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`
              : undefined,
        },
      });
      if (error) throw error;

      // If email confirmation is enabled in Supabase, session will be null
      // and the user must confirm via email link.
      const needsConfirmation = !data.session;
      if (needsConfirmation) {
        setConfirmation({ email: email.trim(), needsConfirmation: true });
      } else {
        router.replace(redirectTo);
        router.refresh();
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not create account.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  if (confirmation) {
    return (
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        className="rounded-2xl border border-border bg-card/70 p-8 text-center backdrop-blur md:p-10"
      >
        <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full border border-accent/40 bg-accent/10">
          <MailCheck className="h-7 w-7 text-accent" />
        </div>
        <Badge variant="success" className="mt-5">
          <CheckCircle2 className="h-3 w-3" />
          Almost there
        </Badge>
        <h2 className="mt-3 text-xl font-semibold tracking-tight text-foreground">
          Confirm your email
        </h2>
        <p className="mt-2 text-sm text-muted-foreground">
          We sent a verification link to{" "}
          <span className="font-medium text-foreground">
            {confirmation.email}
          </span>
          . Click it to activate your SovraID wallet.
        </p>
        <div className="mt-6 flex flex-col items-center gap-2">
          <Button asChild className="w-full" size="lg">
            <Link href="/login">
              <ShieldCheck />
              Continue to sign in
            </Link>
          </Button>
          <button
            type="button"
            onClick={() => setConfirmation(null)}
            className="text-xs font-medium text-muted-foreground hover:text-foreground"
          >
            Use a different email
          </button>
        </div>
      </motion.div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur md:p-7"
    >
      <AuthProviders variant="signup" dividerLabel="Or sign up with email" />

      <AnimatePresence>
        {error ? (
          <motion.div
            initial={{ opacity: 0, y: -4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -4 }}
            className="flex items-start gap-2 rounded-lg border border-destructive/40 bg-destructive/10 p-3 text-xs text-destructive"
          >
            <AlertCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            <span>{error}</span>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <div className="space-y-2">
        <Label htmlFor="name">Full name</Label>
        <div className="relative">
          <UserRound className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="name"
            type="text"
            autoComplete="name"
            required
            placeholder="Aarav Mehta"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <div className="relative">
          <Mail className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="email"
            type="email"
            autoComplete="email"
            required
            placeholder="you@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="pl-9"
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <div className="relative">
          <Lock className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            id="password"
            type={showPassword ? "text" : "password"}
            autoComplete="new-password"
            required
            placeholder="Strong, unique password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="pl-9 pr-9"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded p-1 text-muted-foreground hover:text-foreground"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? (
              <EyeOff className="h-4 w-4" />
            ) : (
              <Eye className="h-4 w-4" />
            )}
          </button>
        </div>
        <PasswordStrength password={password} passed={passedRules} />
      </div>

      <label className="flex items-start gap-2 text-xs text-muted-foreground">
        <input
          type="checkbox"
          checked={agree}
          onChange={(e) => setAgree(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-border bg-secondary accent-primary"
        />
        <span>
          I agree to the{" "}
          <Link
            href="/docs#terms"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Terms
          </Link>{" "}
          and{" "}
          <Link
            href="/docs#privacy"
            className="font-medium text-foreground underline-offset-4 hover:underline"
          >
            Privacy Policy
          </Link>
          . SovraID never stores my PII.
        </span>
      </label>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={!canSubmit || loading}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            Creating wallet…
          </>
        ) : (
          <>
            <ShieldCheck />
            Create my SovraID wallet
          </>
        )}
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        Already have a wallet?{" "}
        <Link
          href={{
            pathname: "/login",
            query: redirectTo === "/wallet" ? undefined : { redirect: redirectTo },
          }}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Sign in
        </Link>
      </p>
    </form>
  );
}

function PasswordStrength({
  password,
  passed,
}: {
  password: string;
  passed: number;
}) {
  const total = PASSWORD_RULES.length;
  const pct = (passed / total) * 100;
  const tone =
    passed === total
      ? "bg-accent"
      : passed >= 2
      ? "bg-saffron"
      : "bg-destructive";
  const label =
    passed === 0
      ? "Pick a strong password"
      : passed === total
      ? "Strong"
      : passed >= 2
      ? "Getting there"
      : "Weak";

  return (
    <div className="space-y-2 pt-1">
      <div className="flex items-center justify-between text-[11px]">
        <span className="text-muted-foreground">{label}</span>
        <span className="font-mono text-muted-foreground">
          {passed}/{total}
        </span>
      </div>
      <div className="h-1.5 overflow-hidden rounded-full bg-secondary">
        <motion.div
          className={cn("h-full rounded-full transition-colors", tone)}
          initial={false}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.3 }}
        />
      </div>
      <ul className="grid grid-cols-2 gap-1.5 pt-1 text-[11px]">
        {PASSWORD_RULES.map((r) => {
          const ok = r.test(password);
          return (
            <li
              key={r.label}
              className={cn(
                "flex items-center gap-1.5",
                ok ? "text-accent" : "text-muted-foreground"
              )}
            >
              <CheckCircle2
                className={cn(
                  "h-3 w-3",
                  ok ? "text-accent" : "text-muted-foreground/60"
                )}
              />
              {r.label}
            </li>
          );
        })}
      </ul>
    </div>
  );
}
