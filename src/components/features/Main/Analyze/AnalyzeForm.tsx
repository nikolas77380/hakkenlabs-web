"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useLocale, useTranslations } from "next-intl";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/common/ui/form";
import { Input } from "@/components/common/ui/input";
import { useSearchTokens } from "@/services/api/hooks";
import { api } from "@/services/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/ui/select";
import { Loader2 } from "lucide-react";
import Image from "next/image";
import { formatAddress } from "@/lib/utils";
import { Button } from "@/components/common/ui/button";

const FormSchema = z.object({
  blockchain: z
    .string({
      required_error: "analyzeForm.errors.blockchainRequired",
    })
    .min(1, "analyzeForm.errors.blockchainMin"),
  contractAddress: z
    .string({
      required_error: "analyzeForm.errors.addressRequired",
    })
    .min(2, "analyzeForm.errors.addressMin")
    .regex(/^0x[a-fA-F0-9]{40}$/, "analyzeForm.errors.addressInvalid"),
});

type FormData = z.infer<typeof FormSchema>;

const BLOCKCHAIN_NETWORKS = [
  {
    value: "Ethereum",
    name: "analyzeForm.options.ethereum",
    isAvailable: true,
  },
  { value: "solana", name: "analyzeForm.options.solana", isAvailable: false },
  {
    value: "arbitrum",
    name: "analyzeForm.options.arbitrum",
    isAvailable: false,
  },
];

const AnalyzeForm = () => {
  const t = useTranslations();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blockchain: "Ethereum",
      contractAddress: "",
    },
  });
  const locale = useLocale();

  const [searchQuery, setSearchQuery] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const router = useRouter();

  const selectedChainId = form.watch("blockchain");

  // Debounce search query
  const debouncedQuery = useMemo(() => searchQuery.trim(), [searchQuery]);
  const effectiveQuery = debouncedQuery.length >= 2 ? debouncedQuery : "";

  const {
    data: searchData,
    isLoading: isSearching,
    isError,
  } = useSearchTokens(selectedChainId, effectiveQuery);

  useEffect(() => {
    if (!debouncedQuery) setIsDropdownOpen(false);
  }, [debouncedQuery]);

  async function onSubmit(data: FormData) {
    try {
      const email = "cepuii@example.com"; // stub until email field is added

      const res = await api.getTokenReport(data.contractAddress, email, locale);
      if (res) {
        const target = `/token/${encodeURIComponent(data.contractAddress)}`;
        router.push(target);
      } else {
        toast(t("common.error"));
      }
    } catch (error) {
      toast(t("common.error"));
      console.error(error);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-2xl space-y-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-[200px_1fr_auto] gap-3 items-start">
          <FormField
            control={form.control}
            name="blockchain"
            render={({ field, fieldState }) => (
              <FormItem>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue
                        placeholder={t("analyzeForm.placeholders.blockchain")}
                      />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {BLOCKCHAIN_NETWORKS.map((network) => (
                      <SelectItem
                        key={network.value}
                        value={network.value}
                        disabled={!network.isAvailable}
                      >
                        {t(network.name)}{" "}
                        {network.isAvailable
                          ? ""
                          : t("analyzeForm.options.comingSoon")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormMessage>
                  {fieldState.error?.message && t(fieldState.error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contractAddress"
            render={({ field, fieldState }) => (
              <FormItem>
                <div
                  className="relative"
                  ref={containerRef}
                >
                  <FormControl>
                    <Input
                      placeholder={t(
                        "analyzeForm.placeholders.contractAddress",
                      )}
                      inputMode="text"
                      className="min-w-[380px]"
                      value={searchQuery || field.value}
                      onChange={(e) => {
                        const value = e.target.value;
                        setSearchQuery(value);
                        setIsDropdownOpen(Boolean(value.trim().length >= 2));
                        field.onChange(value);
                      }}
                      onFocus={() => {
                        if ((searchData?.tokens?.length ?? 0) > 0)
                          setIsDropdownOpen(true);
                      }}
                      onBlur={() => {
                        // Delay closing to allow click selection
                        setTimeout(() => setIsDropdownOpen(false), 150);
                      }}
                    />
                  </FormControl>

                  {isDropdownOpen && (
                    <div className="absolute z-50 mt-1 w-full rounded-md border bg-popover text-popover-foreground shadow-md">
                      {isSearching && (
                        <div className="px-3 py-2 text-sm text-muted-foreground">
                          <Loader2 className="w-4 h-4 animate-spin" />
                        </div>
                      )}
                      {!isSearching && isError && (
                        <div className="px-3 py-2 text-sm text-destructive">
                          {t("common.error")}
                        </div>
                      )}
                      {!isSearching && !isError && (
                        <ul className="max-h-64 overflow-y-auto py-1">
                          {(searchData?.tokens ?? []).length === 0 &&
                            debouncedQuery && (
                              <li className="px-3 py-2 text-sm text-muted-foreground">
                                {t("common.noResults")}
                              </li>
                            )}
                          {(searchData?.tokens ?? []).map((item) => (
                            <li
                              key={`${item.address}`}
                              className="cursor-pointer px-3 py-2 hover:bg-accent hover:text-accent-foreground"
                              onMouseDown={(e) => {
                                e.preventDefault();
                                form.setValue("contractAddress", item.address, {
                                  shouldValidate: true,
                                });
                                setSearchQuery(item.address);
                                setIsDropdownOpen(false);
                              }}
                              aria-label={`${item.name} (${item.symbol} ${item.address})`}
                            >
                              <div className="flex items-center gap-2">
                                {item?.logo && (
                                  <Image
                                    src={item.logo}
                                    alt={item.name}
                                    className="rounded"
                                    width={20}
                                    height={20}
                                  />
                                )}
                                <span className="text-sm font-medium text-wrap">
                                  {item.name}{" "}
                                </span>
                                <span className="text-muted-foreground">
                                  ({item.symbol})
                                </span>
                                <span className="text-xs text-muted-foreground">
                                  {formatAddress(item.address)}
                                </span>
                              </div>
                            </li>
                          ))}
                        </ul>
                      )}
                    </div>
                  )}
                </div>

                <FormMessage>
                  {fieldState.error?.message && t(fieldState.error?.message)}
                </FormMessage>
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="secondary"
            className="md:w-auto w-full"
            disabled={form.formState.isSubmitting}
          >
            {form.formState.isSubmitting ? (
              <Loader2 className="w-4 h-4 animate-spin" />
            ) : (
              t("analyzeForm.cta")
            )}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AnalyzeForm;
