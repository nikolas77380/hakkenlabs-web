"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import React from "react";

export default function StayUpdated() {
  return (
    <div className="max-w-2xl mx-auto text-center">
      <div className="mb-8">
        <div className="flex justify-center mb-6">
          <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center">
            <svg
              className="w-8 h-8 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>
        </div>

        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Stay Updated
        </h2>

        <p className="text-lg text-[var(--color-muted)] mb-8">
          Get the latest crypto insights, platform updates, and be the first to
          know when we launch new features
        </p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          // Handle form submission here
        }}
        className="flex flex-col sm:flex-row gap-3 mb-6"
      >
        <Input
          placeholder="your.email@example.com"
          type="email"
          required
          className="flex-1"
        />
        <Button
          type="submit"
          variant="outline"
        >
          Subscribe
          <svg
            className="ml-2 w-4 h-4"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </Button>
      </form>

      <p className="text-sm text-[var(--color-muted)]">
        Join 5,000+ crypto enthusiasts who trust HakkenLabs for market insights.
        Unsubscribe anytime.
      </p>
    </div>
  );
}
