import { StyleSheet } from 'react-native';

import { colors, hitTarget, spacing } from '../theme';

export const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.borderSubtle,
    paddingVertical: spacing.sm,
  },
  tab: {
    flex: 1,
    minHeight: hitTarget.min,
    alignItems: 'center',
    gap: spacing.xs,
    paddingVertical: spacing.sm,
  },
  label: {
    fontSize: 11,
    color: colors.textMuted,
  },
  labelActive: {
    fontSize: 11,
    color: colors.accent,
    fontWeight: '600',
  },
});
