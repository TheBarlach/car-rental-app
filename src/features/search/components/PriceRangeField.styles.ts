import { StyleSheet } from 'react-native';
import { colors, hitTarget, radius, spacing } from '../../../theme';

export const styles = StyleSheet.create({
  container: { gap: spacing.md },
  inputs: { flexDirection: 'row', gap: spacing.md },
  inputColumn: { flex: 1, gap: spacing.xs },
  inputLabel: { fontSize: 11, color: colors.textSecondary },
  input: { minHeight: hitTarget.min, paddingVertical: 10, paddingHorizontal: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: radius.sm, fontSize: 14, color: colors.textBody },
});
