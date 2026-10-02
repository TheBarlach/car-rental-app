import { StyleSheet } from 'react-native';

import { colors, hitTarget, radius, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  trigger: {
    minHeight: hitTarget.min,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.md,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: radius.md,
    backgroundColor: colors.surfaceSunken,
  },
  icon: {
    width: 16,
    height: 16,
  },
  value: {
    flex: 1,
    fontSize: 13,
    color: colors.textSecondary,
    textAlign: 'center',
  },
});