"use client";

import { useEffect, useMemo, useState } from "react";
import { Card } from "@/components/common/ui/card";
import { Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { MINIMUM_DURATION_MS } from "./AnalyzeForm";

const STEPS = ["collect", "fundamental", "technical", "risks", "preparation"];

interface AnalyzeProgressModalProps {
  isOpen: boolean;
}

export function AnalyzeProgressModal({ isOpen }: AnalyzeProgressModalProps) {
  const t = useTranslations();
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const [progress, setProgress] = useState(0);

  const minimumStepDurationMs = useMemo(
    () => MINIMUM_DURATION_MS / (STEPS.length - 1),
    [],
  );

  useEffect(() => {
    document.body.style.overflow = "hidden";
    const startTime = Date.now();
    let rafId = 0;
    const updateProgress = () => {
      const elapsed = Date.now() - startTime;
      const stepIndex = Math.min(
        Math.floor(elapsed / minimumStepDurationMs),
        STEPS.length - 1,
      );

      setCurrentStepIndex(stepIndex);

      const minimumProgress = Math.min(
        (elapsed / MINIMUM_DURATION_MS) * 100,
        100,
      );

      if (minimumProgress < 90) {
        setProgress(minimumProgress);
      } else {
        setProgress(90 + (minimumProgress - 90) * 0.3);
      }
      rafId = requestAnimationFrame(updateProgress);
    };

    rafId = requestAnimationFrame(updateProgress);

    return () => {
      document.body.style.overflow = "unset";
      cancelAnimationFrame(rafId);
    };
  }, [isOpen, minimumStepDurationMs]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-[20vh]">
      <div className="absolute inset-0 bg-black/60" />
      <Card className="relative z-10 w-[92%] max-w-md p-12 bg-black/70 animate-in fade-in-0 slide-in-from-bottom-4 duration-200">
        <div className="flex items-center gap-3 mb-4">
          <Loader2 className="w-5 h-5 animate-spin text-secondary" />
          <p className="text-foreground">
            {t(`progressModal.steps.${STEPS[currentStepIndex]}`) + "..." ||
              t("progressModal.title")}
          </p>
        </div>

        <div className="mb-4 h-2 w-full overflow-hidden rounded bg-muted">
          <div
            className="h-full bg-secondary"
            style={{ width: `${progress}%` }}
          />
        </div>

        {/* Show completed steps below */}
        {currentStepIndex > 0 && (
          <div className="mt-6 animate-in fade-in-0 slide-in-from-bottom-4 duration-500">
            <p className="text-sm text-muted-foreground mb-3">
              {t("progressModal.completed")}
            </p>
            <ul className="space-y-2">
              {STEPS.slice(0, currentStepIndex).map((label) => (
                <li
                  key={label}
                  className="flex items-center gap-3 animate-in fade-in-0 slide-in-from-bottom-4 duration-300"
                >
                  <span className="inline-flex h-2.5 w-2.5 rounded-full bg-secondary" />
                  <span className="text-sm text-muted-foreground line-through">
                    {t(`progressModal.steps.${label}`)}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </Card>
    </div>
  );
}

export default AnalyzeProgressModal;
