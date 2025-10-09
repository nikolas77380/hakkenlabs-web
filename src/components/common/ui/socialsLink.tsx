import Link from "next/link";
import React from "react";

type Props = {
  label: string;
  url?: string | null;
};

const SocialsLink = ({ label, url }: Props) => {
  if (!url) return null;
  return (
    <Link
      key={label}
      href={url}
      className="text-card-foreground hover:underline break-all"
      target="_blank"
      rel="noreferrer"
    >
      {label}
    </Link>
  );
};

export default SocialsLink;
