import axiosInstance from "../config/axios-config";

export interface SupportedChainsResponse {
  chains: Array<{ id: string; name: string }>;
}

export interface SupportedLanguagesResponse {
  languages: Array<{ code: string; name: string }>;
}

export interface TokenReportResponse {
  token: string;
  reportUrl: string;
}

export interface HoldersSupply {
  top10?: { supply: string; supplyPercent: number };
  top25?: { supply: string; supplyPercent: number };
  top50?: { supply: string; supplyPercent: number };
  top100?: { supply: string; supplyPercent: number };
  top250?: { supply: string; supplyPercent: number };
  top500?: { supply: string; supplyPercent: number };
}

export interface HolderDistribution {
  shrimps?: number;
  fish?: number;
  crabs?: number;
  octopus?: number;
  dolphins?: number;
  sharks?: number;
  whales?: number;
}

export interface Holders {
  totalHolders?: number;
  change7d?: number;
  change30d?: number;
  holderChange?: {
    [window in "5min" | "1h" | "6h" | "24h" | "3d" | "7d" | "30d"]?: {
      change: number;
      changePercent: number; // decimal (e.g., 0.031 -> 3.1%)
    };
  };
  holderSupply?: HoldersSupply;
  holderDistribution?: HolderDistribution;
  holdersByAcquisition?: {
    swap?: number;
    airdrop?: number;
    transfer?: number;
  };
}

export interface CodeRisks {
  comments?: string[];
  mintFunction?: boolean;
  proxyPattern?: boolean;
  pauseFunction?: boolean;
  honeypotIndicators?: string[];
  ownerOnlyFunctions?: boolean;
  unsafeExternalCalls?: boolean;
  blacklistFunctionsDetected?: boolean;
}

export interface SocialLinks {
  github?: string | null;
  medium?: string | null;
  reddit?: string | null;
  discord?: string | null;
  twitter?: string | null;
  website?: string | null;
  youtube?: string | null;
  linkedin?: string | null;
  telegram?: string | null;
}

export interface TokenDetailsResponse {
  // Core identifiers
  tokenAddress: string;
  chainId: string;
  name: string;
  symbol: string;
  decimals: number;
  description: string;
  // Visuals / branding
  logo?: string | null;
  thumbnail?: string | null;
  addressLabel?: string | null;

  // DEX / pair
  dex?: string | null;
  pair?: string | null;

  // Ownership / contract traits
  isEOA?: boolean;
  owner?: string | null;
  proxy?: boolean;
  verified?: boolean;
  renounced?: boolean;
  canMint?: boolean;
  canPause?: boolean;
  canBlacklist?: boolean;
  hasMultisig?: boolean;
  hasTimelock?: boolean;
  timelockDelay?: number | null;

  // Market data
  price?: number | null;
  marketCap?: number | null;
  volume24h?: number | null;
  liquidityUSD?: number | null;
  fullyDilutedValuation?: number | null;
  riskScore?: number | null;
  categories?: string[];
  lastUpdated?: string | null; // ISO timestamp
  deployDate?: string | null;
  possibleSpam?: boolean | null;

  // Supply
  totalSupply?: string | null; // keep string to avoid precision loss

  // Socials
  socialLinks?: SocialLinks;

  // Holders
  holders?: Holders;

  // Summary / analysis text (markdown-like)
  summary?: string | null;

  // Code risk details
  codeRisks?: CodeRisks;
}

export interface TokenSummaryResponse {
  token: string;
  riskScore?: number;
  summary?: string;
}

export interface SearchTokensResponse {
  tokens: Array<{
    address: string;
    decimals: number;
    name: string;
    symbol: string;
    logo: string;
  }>;
}

export const api = {
  async getSupportedChains(): Promise<SupportedChainsResponse> {
    const { data } = await axiosInstance.get<SupportedChainsResponse>(
      "/token/supported-chains",
    );
    return data;
  },

  async getSupportedLanguages(): Promise<SupportedLanguagesResponse> {
    const { data } = await axiosInstance.get<SupportedLanguagesResponse>(
      "/token/supported-languages",
    );
    return data;
  },

  async getTokenReport(
    token: string,
    email: string,
    lang?: string,
  ): Promise<TokenReportResponse> {
    const { data } = await axiosInstance.get<TokenReportResponse>(
      `/report/${encodeURIComponent(token)}`,
      { params: { email, ...(lang ? { lang } : {}) } },
    );
    return data;
  },

  async getTokenDetails(
    lang: string,
    chainId: string,
    tokenAddress: string,
  ): Promise<TokenDetailsResponse> {
    const { data } = await axiosInstance.get<TokenDetailsResponse>(
      `/token/${encodeURIComponent(lang)}/${encodeURIComponent(
        chainId,
      )}/${encodeURIComponent(tokenAddress)}`,
    );
    return data;
  },

  async getTokenSummary(
    lang: string,
    chainId: string,
    tokenAddress: string,
  ): Promise<TokenSummaryResponse> {
    const { data } = await axiosInstance.get<TokenSummaryResponse>(
      `/token/${encodeURIComponent(lang)}/${encodeURIComponent(
        chainId,
      )}/${encodeURIComponent(tokenAddress)}/summary`,
    );
    return data;
  },

  async searchTokens(
    chainId: string,
    query: string,
  ): Promise<SearchTokensResponse> {
    const { data } = await axiosInstance.get<SearchTokensResponse>(
      `/search/tokens/${encodeURIComponent(chainId)}/${encodeURIComponent(
        query,
      )}`,
    );
    return data;
  },
};
