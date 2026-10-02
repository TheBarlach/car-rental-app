export const spacing = {
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  xxl: 40,
} as const;

export const radius = {
  sm: 10,
  md: 12,
  lg: 16,
} as const;

export const hitTarget = {
  min: 48,
} as const;

export type SpacingToken = keyof typeof spacing;
export type RadiusToken = keyof typeof radius;
