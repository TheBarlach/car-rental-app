import { StyleSheet } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';

import type { ButtonVariant } from './Button';

export const styles = StyleSheet.create({
  container: {
    minHeight: 55,
    borderRadius: 16,
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
    container: { backgroundColor: '#636AE8' },
    label: { color: '#FFFFFF' },
    pressed: { opacity: 0.85 },
  },
  secondary: {
    container: { backgroundColor: '#F3F4F6' },
    label: { color: '#171A1F' },
    pressed: { opacity: 0.7 },
  },
  danger: {
    container: { backgroundColor: '#FBE6E6' },
    label: { color: '#8C1D18' },
    pressed: { opacity: 0.7 },
  },
};
