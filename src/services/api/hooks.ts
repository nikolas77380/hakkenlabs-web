import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  api,
  SupportedChainsResponse,
  SupportedLanguagesResponse,
  TokenDetailsResponse,
  TokenReportResponse,
  TokenSummaryResponse,
  SearchTokensResponse,
} from "./client";

export function useSupportedChains(
  options?: UseQueryOptions<SupportedChainsResponse>,
) {
  return useQuery<SupportedChainsResponse>({
    queryKey: ["supported-chains"],
    queryFn: () => api.getSupportedChains(),
    ...options,
  });
}

export function useSupportedLanguages(
  options?: UseQueryOptions<SupportedLanguagesResponse>,
) {
  return useQuery<SupportedLanguagesResponse>({
    queryKey: ["supported-languages"],
    queryFn: () => api.getSupportedLanguages(),
    ...options,
  });
}

export function useTokenReport(
  token: string,
  options?: UseQueryOptions<TokenReportResponse>,
) {
  return useQuery<TokenReportResponse>({
    queryKey: ["token-report", token],
    queryFn: () => api.getTokenReport(token),
    enabled: Boolean(token),
    ...options,
  });
}

export function useTokenDetails(
  lang: string,
  chainId: string,
  address: string,
  options?: UseQueryOptions<TokenDetailsResponse>,
) {
  return useQuery<TokenDetailsResponse>({
    queryKey: ["token-details", lang, chainId, address],
    queryFn: () => api.getTokenDetails(lang, chainId, address),
    enabled: Boolean(lang && chainId && address),
    ...options,
  });
}

export function useTokenSummary(
  lang: string,
  chainId: string,
  address: string,
  options?: UseQueryOptions<TokenSummaryResponse>,
) {
  return useQuery<TokenSummaryResponse>({
    queryKey: ["token-summary", lang, chainId, address],
    queryFn: () => api.getTokenSummary(lang, chainId, address),
    enabled: Boolean(lang && chainId && address),
    ...options,
  });
}

export function useSearchTokens(
  chainId: string,
  query: string,
  options?: UseQueryOptions<SearchTokensResponse>,
) {
  return useQuery<SearchTokensResponse>({
    queryKey: ["search-tokens", chainId, query],
    queryFn: () => api.searchTokens(chainId, query),
    enabled: Boolean(chainId && query),
    ...options,
  });
}
