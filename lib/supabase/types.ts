import type { User } from "@supabase/supabase-js";

export type AuthUser = User;

export interface AuthProfile {
  id: string;
  email: string | null;
  fullName: string | null;
  initials: string;
}

export function toAuthProfile(user: AuthUser | null): AuthProfile | null {
  if (!user) return null;
  const fullName =
    (user.user_metadata?.full_name as string | undefined) ??
    (user.user_metadata?.name as string | undefined) ??
    null;
  const email = user.email ?? null;
  const seed = fullName ?? email ?? "U";
  const initials = seed
    .split(/\s+|@/)
    .filter(Boolean)
    .slice(0, 2)
    .map((s) => s[0]?.toUpperCase() ?? "")
    .join("")
    .padEnd(1, "U");
  return {
    id: user.id,
    email,
    fullName,
    initials,
  };
}
