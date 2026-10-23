// src/lib/quality.ts
import type { QualityTier } from '../store/useStore';

export function detectQuality(): QualityTier {
  if (typeof window === 'undefined') {
    return 'medium';
  }

  const nav = window.navigator as Navigator & { deviceMemory?: number };
  const concurrency = nav.hardwareConcurrency || 4;
  const memory = nav.deviceMemory || 4;
  const width = window.innerWidth;

  if (width < 768 || concurrency <= 2 || memory <= 2) {
    return 'low';
  }

  if (concurrency >= 8 && memory >= 8 && width >= 1200) {
    return 'high';
  }

  return 'medium';
}