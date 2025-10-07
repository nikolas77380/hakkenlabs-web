import { http } from "./axios-config";

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

export interface TokenDetailsResponse {
  name: string;
  symbol: string;
  chainId: string;
  address: string;
}

export interface TokenSummaryResponse {
  token: string;
  riskScore?: number;
  summary?: string;
}

export interface SearchTokensResponse {
  items: Array<{
    name: string;
    symbol: string;
    chainId: string;
    address: string;
  }>;
}

export const api = {
  async getSupportedChains(): Promise<SupportedChainsResponse> {
    const { data } = await http.get<SupportedChainsResponse>(
      "/token/supported-chains",
    );
    return data;
  },

  async getSupportedLanguages(): Promise<SupportedLanguagesResponse> {
    const { data } = await http.get<SupportedLanguagesResponse>(
      "/token/supported-languages",
    );
    return data;
  },

  async getTokenReport(token: string): Promise<TokenReportResponse> {
    const { data } = await http.get<TokenReportResponse>(`/report/${token}`);
    return data;
  },

  async getTokenDetails(
    lang: string,
    chainId: string,
    tokenAddress: string,
  ): Promise<TokenDetailsResponse> {
    const { data } = await http.get<TokenDetailsResponse>(
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
    const { data } = await http.get<TokenSummaryResponse>(
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
    const { data } = await http.get<SearchTokensResponse>(
      `/search/tokens/${encodeURIComponent(chainId)}/${encodeURIComponent(
        query,
      )}`,
    );
    return data;
  },
};
