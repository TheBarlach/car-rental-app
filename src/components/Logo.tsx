import { Image } from 'react-native';

import wordmark from '../../assets/images/wordmark.png';

import { styles } from './Logo.styles';

export const logoVariants = {
  wordmark: { source: wordmark, width: 96, height: 48 },
  mark: { source: wordmark, width: 43, height: 21 },
} as const;

export type LogoVariant = keyof typeof logoVariants;

export interface LogoProps {
  variant?: LogoVariant;
  accessibilityLabel?: string;
}

export function Logo({ variant = 'wordmark', accessibilityLabel = 'Drive On The Go' }: LogoProps) {
  const { source, width, height } = logoVariants[variant];

  return (
    <Image
      source={source}
      style={[styles.logo, { width, height }]}
      accessible
      accessibilityRole="image"
      accessibilityLabel={accessibilityLabel}
    />
  );
}
