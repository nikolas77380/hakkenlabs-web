"use client";

import React from "react";
import { CheckIcon, CopyIcon, Share2, X } from "lucide-react";
import { Button } from "@/components/common/ui/button";
import Image from "next/image";

interface ShareButtonProps {
  className?: string;
  size?: "sm" | "default" | "lg" | "icon";
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link";
}

export function ShareButton({
  className,
  size = "sm",
  variant = "secondary",
}: ShareButtonProps) {
  const [isOpen, setIsOpen] = React.useState(false);
  const [shareUrl, setShareUrl] = React.useState<string>("");

  React.useEffect(() => {
    if (!isOpen) return;
    setShareUrl(window.location.href);
  }, [isOpen]);

  function close() {
    setIsOpen(false);
  }

  function open() {
    setIsOpen(true);
  }

  const encoded = encodeURIComponent(shareUrl);
  const shareLinks = React.useMemo(
    () => ({
      twitter: `https://twitter.com/intent/tweet?url=${encoded}`,
      telegram: `https://t.me/share/url?url=${encoded}`,
      reddit: `https://www.reddit.com/submit?url=${encoded}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encoded}`,
    }),
    [encoded],
  );

  const [copied, setCopied] = React.useState(false);

  function copy() {
    if (!shareUrl) return;
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1200);
  }

  return (
    <>
      <Button
        variant={variant}
        size={size}
        className={className}
        onClick={open}
        aria-label="Share"
      >
        <Share2 className="w-4 h-4" />
      </Button>

      {isOpen ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          aria-modal
          role="dialog"
          onKeyDown={(e) => {
            if (e.key === "Escape") close();
          }}
        >
          <div
            className="absolute inset-0 bg-black/60"
            onClick={close}
          />
          <div className="relative z-10 w-full max-w-md rounded-xl border bg-[#0b0b0c] p-5 text-card-foreground shadow-xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-base font-semibold">Share</h3>
              <button
                className="p-1 rounded hover:bg-white/10 cursor-pointer"
                onClick={close}
                aria-label="Close"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="grid grid-cols-4 gap-3 mb-5">
              <a
                className="flex h-12 items-center justify-center rounded-md border hover:bg-white/10"
                href={shareLinks.twitter}
                target="_blank"
                rel="noreferrer"
                aria-label="Share to X"
              >
                <Image
                  src="/socials/twitter.svg"
                  alt="twitter"
                  width={20}
                  height={20}
                  className="w-5 h-5 invert hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                className="flex h-12 items-center justify-center rounded-md border hover:bg-white/10"
                href={shareLinks.telegram}
                target="_blank"
                rel="noreferrer"
                aria-label="Share to Telegram"
              >
                <Image
                  src="/socials/telegram.svg"
                  alt="telegram"
                  width={20}
                  height={20}
                  className="w-5 h-5 invert hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                className="flex h-12 items-center justify-center rounded-md border hover:bg-white/10"
                href={shareLinks.reddit}
                target="_blank"
                rel="noreferrer"
                aria-label="Share to Reddit"
              >
                <Image
                  src="/socials/reddit.svg"
                  alt="reddit"
                  width={20}
                  height={20}
                  className="w-5 h-5 invert hover:scale-110 transition-transform duration-300"
                />
              </a>
              <a
                className="flex h-12 items-center justify-center rounded-md border hover:bg-white/10"
                href={shareLinks.linkedin}
                target="_blank"
                rel="noreferrer"
                aria-label="Share to LinkedIn"
              >
                <Image
                  src="/socials/linkedin.svg"
                  alt="linkedin"
                  width={20}
                  height={20}
                  className="w-5 h-5 invert hover:scale-110 transition-transform duration-300"
                />
              </a>
            </div>

            <div className="flex items-stretch rounded-md border overflow-hidden">
              <div className="flex-1 min-w-0 bg-background/40 px-3 py-2">
                <span
                  className="block truncate text-sm"
                  title={shareUrl}
                >
                  {shareUrl || ""}
                </span>
              </div>
              <button
                className="bg-white text-black px-3 py-2 text-sm font-medium border-l hover:bg-white/70 cursor-pointer transition-all duration-300"
                onClick={copy}
                aria-label="Copy link"
              >
                {copied ? (
                  <div className="flex items-center gap-2">
                    <span>Copied</span>
                    <CheckIcon className="w-4 h-4" />
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <span>Copy</span>
                    <CopyIcon className="w-4 h-4" />
                  </div>
                )}
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

export default ShareButton;
