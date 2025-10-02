import { Button } from "@/components/ui/button";
import { ArrowUpRightFromSquare } from "lucide-react";
import React from "react";

export default function FullWebPlatform() {
  return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-transparent border border-gradient-to-br from-purple-10 to-blue-90 rounded-3xl p-8 md:p-12 text-center">
        <div className="mb-6">
          <span className="inline-block bg-purple-100 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
            Coming Soon
          </span>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-6">
          Full Web Platform
        </h2>

        <p className="text-lg text-[var(--color-muted)] mb-6 max-w-2xl mx-auto">
          We&apos;re building a comprehensive web platform with advanced
          features, detailed analytics, and portfolio tracking tools.
        </p>

        <p className="text-base text-[var(--color-muted)] mb-8 max-w-2xl mx-auto">
          Currently, HakkenLabs is available as a Telegram bot. Get instant
          token analysis and risk scores directly in your messaging app.
        </p>

        <div className="mb-4">
          <p className="text-base text-[var(--color-muted)] mb-6">
            Want early access to our web platform? Subscribe to our Telegram bot
            and be the first to know when we launch!
          </p>

          <Button variant="outline">
            Subscribe to Telegram Bot <ArrowUpRightFromSquare />
          </Button>
        </div>
      </div>
    </div>
  );
}
