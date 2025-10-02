"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

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
      required_error: "Please select a blockchain.",
    })
    .min(1, "Blockchain is required"),
  contractAddress: z
    .string({
      required_error: "Please enter a contract address.",
    })
    .min(42, "Contract address must be at least 42 characters")
    .regex(/^0x[a-fA-F0-9]{40}$/, "Invalid Ethereum contract address format"),
});

type FormData = z.infer<typeof FormSchema>;

const AnalyzeForm = () => {
  const form = useForm<FormData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      blockchain: "ethereum",
      contractAddress: "",
    },
  });

  function onSubmit(data: FormData) {
    toast("Analysis started", {
      description: `Analyzing ${data.contractAddress} on ${data.blockchain}`,
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
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder="Select blockchain" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="ethereum">Ethereum (ETH)</SelectItem>
                    <SelectItem value="polygon">Polygon (MATIC)</SelectItem>
                    <SelectItem value="bsc">
                      Binance Smart Chain (BNB)
                    </SelectItem>
                    <SelectItem value="arbitrum">Arbitrum (ARB)</SelectItem>
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
                <FormLabel>Contract Address</FormLabel>
                <FormControl>
                  <Input
                    placeholder="0x..."
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
            Analyze Token
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AnalyzeForm;
