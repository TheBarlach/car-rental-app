import { colors } from '../../theme';

export const PRICE_RANGE = {
  min: 0,
  max: 10000,
  initialMin: 500,
  initialMax: 9000,
  step: 100,
  minimumRange: 100,
} as const;

export const PRICE_SLIDER = {
  trackHeight: 4,
  touchPadding: 22,
  thumbSize: 20,
  inboundColor: colors.accent,
  outboundColor: colors.accentSoft,
  thumbColor: colors.surface,
} as const;

function snap(value: number): number {
  return Math.round(value / PRICE_RANGE.step) * PRICE_RANGE.step;
}

function clampToRange(value: number): number {
  return Math.min(Math.max(value, PRICE_RANGE.min), PRICE_RANGE.max);
}

export function clampPriceRange(min: number, max: number): [number, number] {
  const lower = clampToRange(snap(min));
  const upper = clampToRange(snap(max));

  if (upper - lower >= PRICE_RANGE.minimumRange) {
    return [lower, upper];
  }

  return [Math.max(PRICE_RANGE.min, upper - PRICE_RANGE.minimumRange), upper];
}