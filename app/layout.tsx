import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";

import "./globals.css";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { AppPageContent } from "@/components/layout/app-page-content";
import { LayoutShell } from "@/components/layout/layout-shell";
import { createClient } from "@/lib/supabase/server";
import { toAuthProfile } from "@/lib/supabase/types";
import { cn } from "@/lib/utils";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const mono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  display: "swap",
});

const display = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://sovraid.in"),
  title: {
    default: "SovraID — Decentralized Reusable KYC for India",
    template: "%s · SovraID",
  },
  description:
    "SovraID is a decentralized, reusable KYC and digital identity platform built for India. Verify once with trusted issuers, prove anywhere with selective disclosure.",
  keywords: [
    "SovraID",
    "Decentralized KYC",
    "Reusable KYC",
    "Digital Identity",
    "India",
    "Verifiable Credentials",
    "DID",
    "DPDP Act",
    "Aadhaar",
    "PAN",
  ],
  authors: [{ name: "SovraID Labs" }],
  openGraph: {
    title: "SovraID — Decentralized Reusable KYC for India",
    description:
      "Verify once, prove anywhere. Self-sovereign identity built for Indian banks, fintechs and government.",
    url: "https://sovraid.in",
    siteName: "SovraID",
    locale: "en_IN",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "SovraID — Decentralized Reusable KYC for India",
    description:
      "Verify once, prove anywhere. Self-sovereign identity built for Indian banks, fintechs and government.",
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  let profileRow = null;
  if (user) {
    const { data } = await supabase
      .from("profiles")
      .select(
        "id, email, display_name, provider_type, wallet_chain, wallet_address, created_at, updated_at"
      )
      .eq("id", user.id)
      .maybeSingle();
    profileRow = data;
  }
  const profile = toAuthProfile(user, profileRow);

  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          mono.variable,
          display.variable,
          "min-h-screen bg-background font-sans text-foreground"
        )}
      >
        <LayoutShell>
          <div className="relative flex min-h-screen flex-col">
            <Navbar profile={profile} />
            <main className="flex-1">
              <PageTransition>
                <AppPageContent>{children}</AppPageContent>
              </PageTransition>
            </main>
            <Footer />
          </div>
        </LayoutShell>
      </body>
    </html>
  );
}
