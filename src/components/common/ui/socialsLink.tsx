import Link from "next/link";
import React from "react";

type Props = {
  label: string;
  url?: string | null;
};

const SocialsLink = ({ label, url }: Props) => {
  if (!url) return null;
  return (
    <div className="flex items-center gap-2 justify-between">
      <span className="font-medium">{label}: </span>
      <Link
        key={label}
        href={url}
        className="text-card-foreground hover:underline break-all"
        target="_blank"
        rel="noreferrer"
      >
        {url}
      </Link>
    </div>
  );
};

export default SocialsLink;
