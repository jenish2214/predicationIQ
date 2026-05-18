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
  Mail,
  ShieldCheck,
  Wand2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { AuthProviders } from "@/components/auth/auth-providers";
import { createClient } from "@/lib/supabase/client";
import { cn } from "@/lib/utils";

type Mode = "password" | "magic";

export function LoginForm() {
  const router = useRouter();
  const search = useSearchParams();
  const redirectTo = search.get("redirect") ?? "/wallet";
  const initialError = search.get("error");

  const [mode, setMode] = React.useState<Mode>("password");
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(
    initialError ? decodeURIComponent(initialError) : null
  );
  const [magicSent, setMagicSent] = React.useState(false);

  const supabase = React.useMemo(() => createClient(), []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (mode === "password") {
        const { error } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (error) throw error;
        router.replace(redirectTo);
        router.refresh();
      } else {
        const { error } = await supabase.auth.signInWithOtp({
          email: email.trim(),
          options: {
            emailRedirectTo:
              typeof window !== "undefined"
                ? `${window.location.origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`
                : undefined,
          },
        });
        if (error) throw error;
        setMagicSent(true);
      }
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Could not sign you in.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-5 rounded-2xl border border-border bg-card/70 p-6 backdrop-blur md:p-7"
    >
      <AuthProviders variant="login" dividerLabel="Or with email" />

      <ModeToggle mode={mode} onChange={setMode} />

      <AnimatePresence mode="wait">
        {error ? (
          <motion.div
            key="err"
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

      <AnimatePresence initial={false}>
        {mode === "password" ? (
          <motion.div
            key="pw"
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.22 }}
            className="overflow-hidden"
          >
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password">Password</Label>
                <Link
                  href="/login?forgot=1"
                  className="text-[11px] font-medium text-muted-foreground hover:text-foreground"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pr-9"
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
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {magicSent ? (
          <motion.div
            key="magic-ok"
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            className="flex items-start gap-2 rounded-lg border border-accent/40 bg-accent/10 p-3 text-xs text-foreground"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            <div>
              <p className="font-medium">Magic link sent</p>
              <p className="text-muted-foreground">
                Check {email} for a one-time sign-in link.
              </p>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <Button
        type="submit"
        className="w-full"
        size="lg"
        disabled={loading || (magicSent && mode === "magic")}
      >
        {loading ? (
          <>
            <Loader2 className="animate-spin" />
            {mode === "password" ? "Signing in…" : "Sending link…"}
          </>
        ) : mode === "password" ? (
          <>
            <ShieldCheck />
            Sign in securely
          </>
        ) : (
          <>
            <Wand2 />
            Send magic link
          </>
        )}
      </Button>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-[10px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          or
        </span>
        <Separator className="flex-1" />
      </div>

      <p className="text-center text-sm text-muted-foreground">
        New to SovraID?{" "}
        <Link
          href={{
            pathname: "/signup",
            query: redirectTo === "/wallet" ? undefined : { redirect: redirectTo },
          }}
          className="font-medium text-foreground underline-offset-4 hover:underline"
        >
          Create your wallet
        </Link>
      </p>

      <p className="flex items-center justify-center gap-1.5 text-center text-[11px] text-muted-foreground">
        <ShieldCheck className="h-3 w-3 text-accent" />
        End-to-end encrypted by Supabase Auth
      </p>
    </form>
  );
}

function ModeToggle({
  mode,
  onChange,
}: {
  mode: Mode;
  onChange: (m: Mode) => void;
}) {
  return (
    <div className="relative inline-flex w-full items-center rounded-lg border border-border bg-secondary p-1 text-sm">
      <ToggleButton
        active={mode === "password"}
        onClick={() => onChange("password")}
      >
        Password
      </ToggleButton>
      <ToggleButton active={mode === "magic"} onClick={() => onChange("magic")}>
        <Wand2 className="h-3.5 w-3.5" />
        Magic link
      </ToggleButton>
    </div>
  );
}

function ToggleButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        "relative flex flex-1 items-center justify-center gap-1.5 rounded-md px-3 py-1.5 text-xs font-medium transition-colors",
        active
          ? "text-foreground"
          : "text-muted-foreground hover:text-foreground"
      )}
    >
      {active ? (
        <motion.span
          layoutId="auth-toggle-pill"
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          className="absolute inset-0 -z-10 rounded-md border border-border bg-card shadow-sm"
        />
      ) : null}
      {children}
    </button>
  );
}
