import { StyleSheet } from 'react-native';
import type { TextStyle, ViewStyle } from 'react-native';

import type { ButtonVariant } from './Button';

export const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  full: {
    alignSelf: 'stretch',
  },
  half: {
    flex: 1,
  },
  label: {},
});

export const variantStyles: Record<ButtonVariant, { container: ViewStyle; label: TextStyle }> = {
  primary: { container: {}, label: {} },
  secondary: { container: {}, label: {} },
  danger: { container: {}, label: {} },
};
