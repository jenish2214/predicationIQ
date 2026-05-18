import type { LucideIcon } from "lucide-react";
import {
  BadgeCheck,
  Building2,
  FileCheck2,
  GraduationCap,
  IdCard,
  Landmark,
  ShieldCheck,
} from "lucide-react";

export type CredentialType =
  | "aadhaar"
  | "pan"
  | "drivingLicense"
  | "bankKyc"
  | "degree"
  | "passport";

export interface Credential {
  id: string;
  type: CredentialType;
  title: string;
  issuer: string;
  issuerLogo: string;
  issuedAt: string;
  expiresAt?: string;
  status: "active" | "expired" | "revoked";
  attributes: { label: string; value: string; selectable?: boolean }[];
  icon: LucideIcon;
}

export const MOCK_DID =
  "did:sovra:0xA17fE3c4D02b6D8e0e8Fb87A4f1C2c5e9d8B3a21";

export const MOCK_WALLET_ADDRESS =
  "0xA17fE3c4D02b6D8e0e8Fb87A4f1C2c5e9d8B3a21";

export const MOCK_TEST_BALANCE = "12.4821";

export const MOCK_CREDENTIALS: Credential[] = [
  {
    id: "vc_aadhaar_001",
    type: "aadhaar",
    title: "Aadhaar Identity",
    issuer: "UIDAI",
    issuerLogo: "UI",
    issuedAt: "2025-08-14T10:12:00.000Z",
    status: "active",
    icon: IdCard,
    attributes: [
      { label: "Full Name", value: "Aarav Mehta", selectable: true },
      { label: "Date of Birth", value: "12 Aug 1998", selectable: true },
      { label: "Gender", value: "Male", selectable: true },
      { label: "Address", value: "Mumbai, Maharashtra", selectable: true },
      { label: "Aadhaar No.", value: "XXXX XXXX 4291", selectable: true },
      { label: "Age over 18", value: "Yes", selectable: true },
    ],
  },
  {
    id: "vc_pan_001",
    type: "pan",
    title: "PAN Card",
    issuer: "Income Tax Dept.",
    issuerLogo: "IT",
    issuedAt: "2025-07-02T08:00:00.000Z",
    status: "active",
    icon: FileCheck2,
    attributes: [
      { label: "Full Name", value: "Aarav Mehta", selectable: true },
      { label: "PAN", value: "ABCDE1234F", selectable: true },
      { label: "Father's Name", value: "Rohan Mehta", selectable: true },
      { label: "Date of Birth", value: "12 Aug 1998", selectable: true },
    ],
  },
  {
    id: "vc_bank_001",
    type: "bankKyc",
    title: "Bank KYC",
    issuer: "HDFC Bank",
    issuerLogo: "HD",
    issuedAt: "2025-09-18T11:24:00.000Z",
    expiresAt: "2027-09-18T11:24:00.000Z",
    status: "active",
    icon: Landmark,
    attributes: [
      { label: "Account Holder", value: "Aarav Mehta", selectable: true },
      { label: "KYC Level", value: "Full KYC", selectable: true },
      { label: "Risk Category", value: "Low", selectable: true },
      { label: "Verified On", value: "18 Sep 2025", selectable: true },
    ],
  },
  {
    id: "vc_dl_001",
    type: "drivingLicense",
    title: "Driving License",
    issuer: "RTO Maharashtra",
    issuerLogo: "RT",
    issuedAt: "2024-03-04T09:30:00.000Z",
    expiresAt: "2044-03-04T09:30:00.000Z",
    status: "active",
    icon: BadgeCheck,
    attributes: [
      { label: "Name", value: "Aarav Mehta", selectable: true },
      { label: "DL No.", value: "MH02 2024 0034219", selectable: true },
      { label: "Vehicle Class", value: "LMV, MCWG", selectable: true },
      { label: "Valid Till", value: "04 Mar 2044", selectable: true },
    ],
  },
  {
    id: "vc_degree_001",
    type: "degree",
    title: "B.Tech Degree",
    issuer: "IIT Bombay",
    issuerLogo: "IB",
    issuedAt: "2024-06-22T13:00:00.000Z",
    status: "active",
    icon: GraduationCap,
    attributes: [
      { label: "Student", value: "Aarav Mehta", selectable: true },
      { label: "Program", value: "B.Tech — CSE", selectable: true },
      { label: "Graduated", value: "2024", selectable: true },
      { label: "CGPA", value: "8.92 / 10", selectable: true },
    ],
  },
];

export interface ActivityEntry {
  id: string;
  title: string;
  party: string;
  type: "issued" | "presented" | "revoked" | "received";
  at: string;
  status: "success" | "pending" | "failed";
  description: string;
}

export const MOCK_ACTIVITY: ActivityEntry[] = [
  {
    id: "act_01",
    title: "Proof Presented",
    party: "NeoPay Fintech",
    type: "presented",
    at: new Date(Date.now() - 1000 * 60 * 14).toISOString(),
    status: "success",
    description: "Shared Age over 18 + KYC Level only.",
  },
  {
    id: "act_02",
    title: "Credential Issued",
    party: "HDFC Bank",
    type: "issued",
    at: new Date(Date.now() - 1000 * 60 * 60 * 8).toISOString(),
    status: "success",
    description: "Bank KYC credential added to wallet.",
  },
  {
    id: "act_03",
    title: "Proof Presented",
    party: "Zomato Hyperpure",
    type: "presented",
    at: new Date(Date.now() - 1000 * 60 * 60 * 26).toISOString(),
    status: "success",
    description: "Shared Driving License number for delivery onboarding.",
  },
  {
    id: "act_04",
    title: "Credential Issued",
    party: "UIDAI",
    type: "issued",
    at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 4).toISOString(),
    status: "success",
    description: "Aadhaar Identity credential anchored on Polygon.",
  },
  {
    id: "act_05",
    title: "Verification Failed",
    party: "CryptoXchange",
    type: "presented",
    at: new Date(Date.now() - 1000 * 60 * 60 * 24 * 9).toISOString(),
    status: "failed",
    description: "Holder declined to share full address.",
  },
];

export interface IssuedCredentialRow {
  id: string;
  holder: string;
  did: string;
  type: string;
  issuedAt: string;
  status: "active" | "pending" | "revoked";
}

export const MOCK_ISSUED_ROWS: IssuedCredentialRow[] = [
  {
    id: "vc_2271",
    holder: "Aarav Mehta",
    did: "did:sovra:0xA17f…3a21",
    type: "Bank KYC",
    issuedAt: "2025-12-22T10:14:00.000Z",
    status: "active",
  },
  {
    id: "vc_2270",
    holder: "Saanvi Kapoor",
    did: "did:sovra:0x88cE…91Ad",
    type: "Bank KYC",
    issuedAt: "2025-12-22T09:48:00.000Z",
    status: "active",
  },
  {
    id: "vc_2269",
    holder: "Rohit Sharma",
    did: "did:sovra:0x4F12…77B0",
    type: "Bank KYC",
    issuedAt: "2025-12-21T16:02:00.000Z",
    status: "pending",
  },
  {
    id: "vc_2268",
    holder: "Priya Nair",
    did: "did:sovra:0x9A33…12Cd",
    type: "Bank KYC",
    issuedAt: "2025-12-21T11:30:00.000Z",
    status: "active",
  },
  {
    id: "vc_2267",
    holder: "Vikram Iyer",
    did: "did:sovra:0xC50d…44Fe",
    type: "Bank KYC",
    issuedAt: "2025-12-20T18:11:00.000Z",
    status: "revoked",
  },
];

export interface Feature {
  title: string;
  description: string;
  icon: LucideIcon;
}

export const FEATURES: Feature[] = [
  {
    title: "Reusable KYC",
    description:
      "Complete KYC once with a trusted issuer. Reuse it across banks, fintechs and merchants — without re-uploading documents.",
    icon: ShieldCheck,
  },
  {
    title: "Self-Sovereign Identity",
    description:
      "Your DID lives in your wallet. You hold the keys, you decide what to share, and you can revoke access anytime.",
    icon: IdCard,
  },
  {
    title: "Selective Disclosure",
    description:
      "Share only the attributes a verifier truly needs — like ‘age over 18’ — instead of your entire identity document.",
    icon: BadgeCheck,
  },
  {
    title: "Issuer-Friendly",
    description:
      "Banks, NBFCs and government bodies issue tamper-proof credentials anchored on Polygon, with full audit trail.",
    icon: Building2,
  },
  {
    title: "Privacy by Design",
    description:
      "Zero-knowledge friendly architecture. No central honeypot. PII never leaves the user’s device unless they consent.",
    icon: FileCheck2,
  },
  {
    title: "India-First",
    description:
      "Aligned with DPDP Act, RBI KYC guidelines and DigiLocker patterns. Built for Aadhaar, PAN, DL and Bank KYC.",
    icon: Landmark,
  },
];

export interface ProofRequestField {
  label: string;
  value: string;
  required: boolean;
  shared: boolean;
}

export const MOCK_PROOF_REQUEST = {
  verifier: "NeoPay",
  verifierDid: "did:sovra:0xNe0Pa…42aF",
  purpose: "Opening a savings wallet (Tier 2 KYC)",
  fields: [
    { label: "Full Name", value: "Aarav Mehta", required: true, shared: true },
    { label: "Age over 18", value: "Yes", required: true, shared: true },
    { label: "PAN", value: "ABCDE1234F", required: true, shared: true },
    { label: "Address", value: "Mumbai, Maharashtra", required: false, shared: false },
    { label: "Aadhaar No.", value: "XXXX XXXX 4291", required: false, shared: false },
  ] as ProofRequestField[],
};
