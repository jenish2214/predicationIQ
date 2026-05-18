/**
 * Web3 wallet helpers for SovraID.
 *
 * Flow (works with only the Supabase publishable key, no service role required):
 *   1. Connect to MetaMask / Phantom in the browser.
 *   2. Ask the user to sign a deterministic SovraID auth message — proves
 *      ownership of the private key, never moves funds.
 *   3. Derive a deterministic { email, password } pair from that signature
 *      + address. The signature can only be produced by the wallet owner.
 *   4. Supabase signs the user up (first time) or signs them in (returning).
 *
 * NOTE for production: this client-side flow trades some guarantees for
 * simplicity. For stricter setups, swap step 3 for a server route that
 * verifies the signature (viem / tweetnacl) and mints a Supabase user via
 * `auth.admin.createUser` with the service-role key. See README.
 */

export type WalletChain = "ethereum" | "solana";

export interface WalletConnection {
  chain: WalletChain;
  address: string;
  signature: string;
  shortAddress: string;
}

export type WalletProviderType = "ethereum_wallet" | "solana_wallet";

export interface WalletCredentials {
  email: string;
  password: string;
  metadata: {
    full_name: string;
    wallet_address: string;
    wallet_chain: WalletChain;
    provider_type: WalletProviderType;
  };
}

const ETH_DOMAIN = "eth.wallets.sovraid.app";
const SOL_DOMAIN = "sol.wallets.sovraid.app";

function buildAuthMessage(chain: WalletChain, address: string) {
  return [
    "Sign in to SovraID with this wallet.",
    "",
    "This signature proves you control the wallet. It is not a transaction",
    "and does not move any funds.",
    "",
    `Wallet: ${address}`,
    `Network: ${chain === "ethereum" ? "Ethereum" : "Solana"}`,
    "Domain: sovraid.in",
    "Statement: I authorize this device to access my SovraID wallet.",
    "Version: 1",
  ].join("\n");
}

export function shortenAddress(address: string, chars = 4) {
  if (!address) return "";
  const isHex = address.startsWith("0x");
  const lead = isHex ? address.slice(0, 2 + chars) : address.slice(0, chars);
  const tail = address.slice(-chars);
  return `${lead}…${tail}`;
}

export function isMetaMaskAvailable() {
  if (typeof window === "undefined") return false;
  return Boolean(window.ethereum);
}

export function isPhantomAvailable() {
  if (typeof window === "undefined") return false;
  const provider = window.phantom?.solana ?? window.solana;
  return Boolean(provider?.isPhantom);
}

export async function connectEthereumWallet(): Promise<WalletConnection> {
  if (!isMetaMaskAvailable()) {
    throw new Error(
      "MetaMask (or any Ethereum wallet) not detected. Please install MetaMask and try again."
    );
  }
  const ethereum = window.ethereum!;
  const accounts = (await ethereum.request({
    method: "eth_requestAccounts",
  })) as string[];
  const address = accounts?.[0];
  if (!address) throw new Error("No Ethereum account was returned by the wallet.");

  const message = buildAuthMessage("ethereum", address);
  const signature = (await ethereum.request({
    method: "personal_sign",
    params: [message, address],
  })) as string;

  return {
    chain: "ethereum",
    address: address.toLowerCase(),
    signature,
    shortAddress: shortenAddress(address.toLowerCase()),
  };
}

export async function connectSolanaWallet(): Promise<WalletConnection> {
  if (!isPhantomAvailable()) {
    throw new Error(
      "Phantom (or any Solana wallet) not detected. Please install Phantom and try again."
    );
  }
  const provider = window.phantom?.solana ?? window.solana!;
  const { publicKey } = await provider.connect();
  const address = publicKey.toString();

  const message = buildAuthMessage("solana", address);
  const encoded = new TextEncoder().encode(message);
  const { signature } = await provider.signMessage(encoded, "utf8");
  const hex = Array.from(signature)
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");

  return {
    chain: "solana",
    address,
    signature: `0x${hex}`,
    shortAddress: shortenAddress(address),
  };
}

async function sha256Hex(input: string) {
  const data = new TextEncoder().encode(input);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function deriveWalletCredentials(
  conn: WalletConnection
): Promise<WalletCredentials> {
  const seed = `${conn.chain}:${conn.address}:${conn.signature}`;
  const hex = await sha256Hex(seed);

  const localPart = `${conn.chain}-${conn.address.replace(/^0x/, "").slice(0, 12)}-${hex.slice(0, 8)}`;
  const domain = conn.chain === "ethereum" ? ETH_DOMAIN : SOL_DOMAIN;

  return {
    email: `${localPart}@${domain}`.toLowerCase(),
    // Mix in upper/lower/symbol to satisfy any Supabase password policy.
    password: `W3!${hex.slice(0, 28).toUpperCase()}${hex.slice(28, 36)}`,
    metadata: {
      full_name: `${conn.chain === "ethereum" ? "ETH" : "SOL"} ${conn.shortAddress}`,
      wallet_address: conn.address,
      wallet_chain: conn.chain,
      provider_type:
        conn.chain === "ethereum" ? "ethereum_wallet" : "solana_wallet",
    },
  };
}
