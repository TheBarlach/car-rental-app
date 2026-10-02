import { StyleSheet } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';

import { colors, radius } from '../theme';
import type { ButtonVariant } from './Button';

export const styles = StyleSheet.create({
  container: {
    minHeight: 55,
    borderRadius: radius.lg,
    paddingHorizontal: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: {
    alignSelf: 'stretch',
  },
  half: {
    flex: 1,
  },
  label: {
    fontSize: 20,
    lineHeight: 30,
    fontWeight: '700',
  },
});

export const variantStyles: Record<
  ButtonVariant,
  { container: ViewStyle; label: TextStyle; pressed: ViewStyle }
> = {
  primary: {
    container: { backgroundColor: colors.accent },
    label: { color: colors.textOnAccent },
    pressed: { opacity: 0.85 },
  },
  secondary: {
    container: { backgroundColor: colors.surfaceMuted },
    label: { color: colors.textStrong },
    pressed: { opacity: 0.7 },
  },
  danger: {
    container: { backgroundColor: colors.surfaceDanger },
    label: { color: colors.textDanger },
    pressed: { opacity: 0.7 },
  },
};
