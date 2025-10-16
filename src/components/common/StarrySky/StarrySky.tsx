"use client";

import React, { useEffect, useMemo, useRef, useCallback } from "react";

/**
 * Optimized Starry sky with performance improvements:
 * - Single RAF loop for all animations
 * - Memoized calculations and CSS
 * - Reduced memory allocations
 * - Performance controls for low-end devices
 * - Cached trigonometric calculations
 */

// ------------------------
// Performance Utilities
// ------------------------
const useDevicePixelRatio = () => {
  const dpr = typeof window !== "undefined" ? window.devicePixelRatio || 1 : 1;
  return Math.min(2, dpr); // clamp to keep perf sane
};

// Performance detection
const usePerformanceMode = () => {
  const [isLowEnd, setIsLowEnd] = React.useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;

    // Simple performance detection
    const isLowEndDevice =
      navigator.hardwareConcurrency <= 2 ||
      ((navigator as Navigator & { deviceMemory?: number }).deviceMemory ||
        4) <= 2 ||
      /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent,
      );

    setIsLowEnd(isLowEndDevice);
  }, []);

  return isLowEnd;
};

// Cached trigonometric calculations
class TrigCache {
  private cache = new Map<string, number>();

  sin(angle: number): number {
    const key = `sin_${angle}`;
    if (!this.cache.has(key)) {
      this.cache.set(key, Math.sin(angle));
    }
    return this.cache.get(key)!;
  }

  cos(angle: number): number {
    const key = `cos_${angle}`;
    if (!this.cache.has(key)) {
      this.cache.set(key, Math.cos(angle));
    }
    return this.cache.get(key)!;
  }

  clear() {
    this.cache.clear();
  }
}

const useResizeCanvas = (canvasRef: React.RefObject<HTMLCanvasElement>) => {
  const dpr = useDevicePixelRatio();
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const resize = () => {
      const { clientWidth, clientHeight } = canvas.parentElement!;
      canvas.width = Math.max(1, Math.floor(clientWidth * dpr));
      canvas.height = Math.max(1, Math.floor(clientHeight * dpr));
      canvas.style.width = clientWidth + "px";
      canvas.style.height = clientHeight + "px";
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas.parentElement!);
    return () => ro.disconnect();
  }, [canvasRef, dpr]);
};

// Deterministic PRNG so stars don't jump between renders
function mulberry32(seed: number) {
  return function () {
    let t = (seed += 0x6d2b79f5);
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

// ------------------------
// Optimized Combined Animation Layer
// ------------------------
interface Streak {
  x: number; // px
  y: number; // px
  vx: number; // px/s
  vy: number; // px/s
  life: number; // s
  age: number; // s
  len: number; // px
}

const StarryLayer = ({
  intensity = 0.08,
  shootingRatePerMin = 10,
  isLowEnd = false,
}: {
  intensity?: number;
  shootingRatePerMin?: number;
  isLowEnd?: boolean;
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  useResizeCanvas(canvasRef as React.RefObject<HTMLCanvasElement>);

  const trigCache = useRef(new TrigCache());
  const streaks = useRef<Streak[]>([]);
  const rand = useRef(mulberry32(123));
  const lastTime = useRef(performance.now());

  useEffect(() => {
    let raf = 0;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d")!;
    const cache = trigCache.current;

    // Adjust parameters for low-end devices
    const maxStreaks = isLowEnd ? 3 : 8;

    const spawnShootingStar = () => {
      if (streaks.current.length >= maxStreaks) return;

      const w = canvas.width;
      const h = canvas.height;
      const side = rand.current() < 0.5 ? -0.1 * w : 1.1 * w;
      const y = (0.1 + rand.current() * 0.8) * h * (0.7 + rand.current() * 0.3);
      const speed = (0.6 + rand.current() * 0.7) * (Math.max(w, h) * 1.2);
      const angle =
        (side < 0 ? -15 : 195) * (Math.PI / 180) + (rand.current() - 0.5) * 0.2;

      streaks.current.push({
        x: side,
        y,
        vx: cache.cos(angle) * speed,
        vy: cache.sin(angle) * speed,
        life: 1.2 + rand.current() * 0.6,
        age: 0,
        len: 120 + rand.current() * 150,
      });
    };

    const draw = () => {
      const now = performance.now();
      const dt = Math.min(0.05, (now - lastTime.current) / 1000);
      lastTime.current = now;

      const w = canvas.width;
      const h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      // Shooting stars
      if (rand.current() < (shootingRatePerMin / 60) * dt * 2) {
        spawnShootingStar();
      }

      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);
    return () => {
      cancelAnimationFrame(raf);
      cache.clear();
    };
  }, [canvasRef, intensity, shootingRatePerMin, isLowEnd]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0"
      aria-hidden
    />
  );
};

// ------------------------
// Optimized Stars Layer – CSS/box-shadow version with memoization
// ------------------------
const shadowCache = new Map<string, string>();

function buildBoxShadowString(n: number, area: number, seed: number): string {
  const cacheKey = `${n}_${area}_${seed}`;

  if (shadowCache.has(cacheKey)) {
    return shadowCache.get(cacheKey)!;
  }

  const r = mulberry32(seed);
  const parts: string[] = [];

  // Pre-allocate array for better performance
  parts.length = n;

  for (let i = 0; i < n; i++) {
    const x = Math.floor(r() * area);
    const y = Math.floor(r() * area);
    parts[i] = `${x}px ${y}px #FFF`;
  }

  const result = parts.join(", ");

  // Cache with size limit to prevent memory leaks
  if (shadowCache.size > 50) {
    const firstKey = shadowCache.keys().next().value;
    if (firstKey) {
      shadowCache.delete(firstKey);
    }
  }

  shadowCache.set(cacheKey, result);
  return result;
}

interface CssStarsLayerProps {
  area?: number; // virtual canvas size for star distribution (px)
  small?: number;
  medium?: number;
  big?: number;
  isLowEnd?: boolean; // Performance mode
}

const CssStarsLayer = ({
  area,
  small = 700,
  medium = 200,
  big = 100,
  isLowEnd = false,
}: CssStarsLayerProps) => {
  // Calculate dynamic area based on viewport size with throttling
  const [dynamicArea, setDynamicArea] = React.useState(2000);
  const resizeTimeoutRef = useRef<NodeJS.Timeout | undefined>(undefined);

  const updateArea = useCallback(() => {
    const timeoutId = resizeTimeoutRef.current;
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    resizeTimeoutRef.current = setTimeout(() => {
      const vw = Math.max(
        document.documentElement.clientWidth || 0,
        window.innerWidth || 0,
      );
      const vh = Math.max(
        document.documentElement.clientHeight || 0,
        window.innerHeight || 0,
      );
      // Use the larger dimension and add some padding to ensure full coverage
      const maxDimension = Math.max(vw, vh);
      const calculatedArea = Math.max(2000, maxDimension * 1.5);
      setDynamicArea(calculatedArea);
    }, 100); // Throttle resize updates
  }, []);

  React.useEffect(() => {
    updateArea();
    window.addEventListener("resize", updateArea, { passive: true });
    return () => {
      window.removeEventListener("resize", updateArea);
      const timeoutId = resizeTimeoutRef.current;
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [updateArea]);

  const effectiveArea = area || dynamicArea;

  // Adjust star counts for low-end devices
  const adjustedSmall = isLowEnd ? Math.floor(small * 0.6) : small;
  const adjustedMedium = isLowEnd ? Math.floor(medium * 0.7) : medium;
  const adjustedBig = isLowEnd ? Math.floor(big * 0.8) : big;

  const smallShadow = useMemo(
    () => buildBoxShadowString(adjustedSmall, effectiveArea, 1),
    [adjustedSmall, effectiveArea],
  );
  const medShadow = useMemo(
    () => buildBoxShadowString(adjustedMedium, effectiveArea, 2),
    [adjustedMedium, effectiveArea],
  );
  const bigShadow = useMemo(
    () => buildBoxShadowString(adjustedBig, effectiveArea, 3),
    [adjustedBig, effectiveArea],
  );

  return (
    <div
      className="absolute inset-0 overflow-hidden"
      aria-hidden
    >
      {/* keyframes once */}
      <style>{`
        @keyframes skyScroll { from { transform: translateY(0); } to { transform: translateY(-${effectiveArea}px); } }
      `}</style>

      {/* Layer helper renders two identical blocks to emulate :after offset */}
      {(
        [
          { size: 1, shadows: smallShadow, dur: 50 },
          { size: 2, shadows: medShadow, dur: 100 },
          { size: 3, shadows: bigShadow, dur: 150 },
        ] as const
      ).map((L, i) => (
        <div
          key={i}
          className="absolute left-0 top-0"
          style={{ width: L.size, height: L.size }}
        >
          <div
            className="absolute left-0 top-0"
            style={{
              width: L.size,
              height: L.size,
              boxShadow: L.shadows,
              animation: `skyScroll ${L.dur}s linear infinite`,
              willChange: "transform",
            }}
          />
          <div
            className="absolute left-0"
            style={{
              top: effectiveArea,
              width: L.size,
              height: L.size,
              boxShadow: L.shadows,
              animation: `skyScroll ${L.dur}s linear infinite`,
              willChange: "transform",
            }}
          />
        </div>
      ))}
    </div>
  );
};

// ------------------------
// Optimized Composition Root
// ------------------------
const StarrySky = ({
  className = "",
  shootingRatePerMin = 10,
  intensity = 0.05,
}: {
  className?: string;
  shootingRatePerMin?: number;
  intensity?: number;
}) => {
  const isLowEnd = usePerformanceMode();

  return (
    <div className="absolute inset-0 -z-10">
      <div className={`relative ${className}`}>
        {/* Accessibility label for screen readers */}
        <span className="sr-only">
          Animated starry night sky with twinkling and occasional shooting stars
        </span>

        <StarryLayer
          intensity={intensity}
          shootingRatePerMin={shootingRatePerMin}
          isLowEnd={isLowEnd}
        />

        <CssStarsLayer isLowEnd={isLowEnd} />

        {/* Edge vignette for depth */}
        <div
          className="pointer-events-none absolute inset-0"
          aria-hidden
        >
          <div
            className="absolute inset-0 -z-10 pointer-events-none"
            style={{
              background: `
            radial-gradient(ellipse at 50% 120%, #0b1220 40%, #070c16 85%, #000 100%),
            radial-gradient(ellipse at 70% 30%, rgba(90, 110, 160, 0.15) 0%, transparent 50%),
            radial-gradient(ellipse at 30% 60%, rgba(70, 90, 140, 0.1) 0%, transparent 50%)
          `,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default StarrySky;
