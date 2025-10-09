"use client";

import { useState } from "react";

interface DetailsRevealProps {
  children: React.ReactNode;
  showLabel?: string;
  hideLabel?: string;
}

export function DetailsReveal({
  children,
  showLabel = "Show details",
  hideLabel = "Hide details",
}: DetailsRevealProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleToggle() {
    setIsOpen((v) => !v);
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        className="inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium hover:bg-accent"
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        {isOpen ? hideLabel : showLabel}
      </button>
      {isOpen ? <div className="mt-4">{children}</div> : null}
    </div>
  );
}

export default DetailsReveal;
