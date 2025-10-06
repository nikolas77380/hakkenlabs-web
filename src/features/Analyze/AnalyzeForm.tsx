"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { useTranslations } from "next-intl";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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
    .min(42, "analyzeForm.errors.addressMin")
    .regex(/^0x[a-fA-F0-9]{40}$/, "analyzeForm.errors.addressInvalid"),
});

type FormData = z.infer<typeof FormSchema>;

const AnalyzeForm = () => {
  const t = useTranslations();
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blockchain: "ethereum",
      contractAddress: "",
    },
  });

  function onSubmit(data: FormData) {
    toast(t("analyzeForm.toast.title"), {
      description: t("analyzeForm.toast.desc", {
        contract: data.contractAddress,
        chain: data.blockchain,
      }),
    });

    // Here you would typically make an API call to analyze the contract
    console.log("Form submitted:", data);
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
            render={({ field }) => (
              <FormItem>
                <FormLabel>Select Blockchain</FormLabel>
                {/* Labels translated */}
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
                    <SelectItem value="ethereum">
                      {t("analyzeForm.options.ethereum")}
                    </SelectItem>
                    <SelectItem value="polygon">
                      {t("analyzeForm.options.polygon")}
                    </SelectItem>
                    <SelectItem value="bsc">
                      {t("analyzeForm.options.bsc")}
                    </SelectItem>
                    <SelectItem value="arbitrum">
                      {t("analyzeForm.options.arbitrum")}
                    </SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="contractAddress"
            render={({ field }) => (
              <FormItem>
                <FormLabel>{t("analyzeForm.labels.contractAddress")}</FormLabel>
                <FormControl>
                  <Input
                    placeholder={t("analyzeForm.placeholders.contractAddress")}
                    inputMode="text"
                    className="min-w-[320px]"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            variant="secondary"
            className="md:w-auto w-full mt-6"
          >
            {t("analyzeForm.cta")}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AnalyzeForm;
