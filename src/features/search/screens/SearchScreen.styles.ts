import { StyleSheet } from 'react-native';

import { colors, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.surface,
  },
  headerArea: {
    paddingVertical: spacing.md,
    backgroundColor: colors.surface,
  },
  card: {
    flex: 1,
    marginHorizontal: spacing.lg,
    marginVertical: spacing.sm,
    borderRadius: spacing.xl,
    backgroundColor: colors.background,
  },
  cardContent: {
    paddingVertical: spacing.xl,
    paddingHorizontal: 20,
    paddingBottom: spacing.xxl,
  },
  title: {
    fontSize: 20,
    fontWeight: '700',
    color: colors.textPrimary,
  },
  subtitle: {
    marginTop: spacing.xs,
    marginBottom: spacing.lg,
    paddingBottom: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
    fontSize: 13,
    color: colors.textSecondary,
  },
  formGroup: {
    gap: spacing.sm,
    paddingBottom: spacing.lg,
    marginBottom: spacing.lg,
    borderBottomWidth: 1,
    borderBottomColor: colors.divider,
  },
  formGroupLast: {
    marginBottom: spacing.xl,
  },
  groupLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textBody,
  },
  datetimeSection: {
    flexDirection: 'row',
    gap: spacing.lg,
  },
  datetimeColumn: {
    flex: 1,
    gap: spacing.md,
  },
  columnTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.textBody,
  },
});