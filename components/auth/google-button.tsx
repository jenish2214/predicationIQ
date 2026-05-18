"use client";

import * as React from "react";
import { useSearchParams } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { createClient } from "@/lib/supabase/client";
import { GoogleIcon } from "@/components/auth/provider-icons";

interface GoogleButtonProps {
  label?: string;
  className?: string;
}

export function GoogleButton({ label = "Continue with Google", className }: GoogleButtonProps) {
  const search = useSearchParams();
  const redirectTo = search.get("redirect") ?? "/wallet";

  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  const supabase = React.useMemo(() => createClient(), []);

  const handleClick = async () => {
    setError(null);
    setLoading(true);
    try {
      const origin =
        typeof window !== "undefined" ? window.location.origin : "";
      const { error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
          redirectTo: `${origin}/auth/callback?redirect=${encodeURIComponent(redirectTo)}`,
          queryParams: {
            access_type: "offline",
            prompt: "consent",
          },
        },
      });
      if (error) throw error;
      // Supabase redirects the browser to Google — keep spinner until then.
    } catch (err) {
      const message =
        err instanceof Error
          ? err.message
          : "Could not start Google sign-in.";
      setError(message);
      setLoading(false);
    }
  };

  return (
    <div className={className}>
      <Button
        type="button"
        variant="outline"
        size="lg"
        className="w-full justify-center font-medium"
        onClick={handleClick}
        disabled={loading}
      >
        {loading ? (
          <Loader2 className="h-4 w-4 animate-spin" />
        ) : (
          <GoogleIcon />
        )}
        {label}
      </Button>
      {error ? (
        <p className="mt-2 text-xs text-destructive">
          {error}{" "}
          <span className="text-muted-foreground">
            (Enable Google provider in Supabase → Auth → Providers.)
          </span>
        </p>
      ) : null}
    </div>
  );
}
