import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono } from "next/font/google";

import "./globals.css";

import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { PageTransition } from "@/components/page-transition";
import { ScrollProgress } from "@/components/animations/scroll-progress";
import { SiteBackground } from "@/components/site-background";
import { ThemeProvider } from "@/components/theme-provider";
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
  themeColor: "#0a0f1f",
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
    <html lang="en" suppressHydrationWarning>
      <body
        className={cn(
          inter.variable,
          mono.variable,
          "min-h-screen bg-background font-sans text-foreground"
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem={false}
          disableTransitionOnChange
        >
          <SiteBackground />
          <ScrollProgress />
          <div className="relative flex min-h-screen flex-col">
            <Navbar profile={profile} />
            <main className="flex-1">
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer />
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
