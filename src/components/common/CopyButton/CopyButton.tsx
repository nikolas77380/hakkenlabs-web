import { formatAddress } from "@/lib/utils";
import { CheckIcon, CopyIcon } from "lucide-react";
import React, { useEffect, useState } from "react";

type Props = {
  value: string;
};

const CopyButton = ({ value }: Props) => {
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setIsCopied(false);
    }, 1500);
  }, [isCopied]);

  return (
    <button
      className="flex items-center gap-2 hover:text-primary-foreground transition-all duration-300 cursor-pointer"
      onClick={() => {
        navigator.clipboard.writeText(value);
        setIsCopied(true);
      }}
    >
      <span>{value}</span>
      {isCopied ? (
        <CheckIcon className="w-4 h-4" />
      ) : (
        <CopyIcon className="w-4 h-4" />
      )}
    </button>
  );
};

export default CopyButton;
