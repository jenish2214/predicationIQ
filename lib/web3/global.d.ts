// Minimal type declarations for browser-injected wallet providers.
// We don't pull viem/wagmi to keep the bundle lean — the EIP-1193 interface
// for MetaMask-style wallets and the Phantom interface for Solana are enough
// for sign-message flows.

export {};

declare global {
  interface Ethereum1193Provider {
    isMetaMask?: boolean;
    request: (args: {
      method: string;
      params?: unknown[] | Record<string, unknown>;
    }) => Promise<unknown>;
    on?: (event: string, listener: (...args: unknown[]) => void) => void;
    removeListener?: (event: string, listener: (...args: unknown[]) => void) => void;
  }

  interface PhantomSolanaProvider {
    isPhantom?: boolean;
    publicKey: { toString(): string } | null;
    connect: (opts?: { onlyIfTrusted?: boolean }) => Promise<{
      publicKey: { toString(): string };
    }>;
    disconnect: () => Promise<void>;
    signMessage: (
      message: Uint8Array,
      display?: "utf8" | "hex"
    ) => Promise<{ signature: Uint8Array; publicKey: { toString(): string } }>;
  }

  interface Window {
    ethereum?: Ethereum1193Provider;
    solana?: PhantomSolanaProvider;
    phantom?: { solana?: PhantomSolanaProvider };
  }
}
