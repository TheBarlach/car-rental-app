import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type Props = {
  label: string;
  checked: boolean;
  onToggle: () => void;
  required?: boolean;
  error?: string;
};

export default function Checkbox({ label, checked, onToggle, required, error }: Props) {
  return (
    <View style={styles.wrapper}>
      <TouchableOpacity style={styles.row} onPress={onToggle} activeOpacity={0.7}>
        <Text style={styles.label}>
          {label}
          {required && <Text style={styles.required}>*</Text>}
        </Text>
        <View style={[styles.box, checked && styles.boxChecked, !!error && styles.boxError]}>
          {checked && <Ionicons name="checkmark" size={16} color={colors.white} />}
        </View>
      </TouchableOpacity>
      {!!error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: { marginBottom: spacing.md },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  label: {
    color: colors.link,
    fontSize: 16,
    textDecorationLine: 'underline',
    flex: 1,
    paddingRight: spacing.md,
  },
  required: { color: colors.error, textDecorationLine: 'none' },
  box: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 1.5,
    borderColor: colors.textLabel,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: spacing.sm,
  },
  boxChecked: { backgroundColor: colors.primary, borderColor: colors.primary },
  boxError: { borderColor: colors.error },
  error: { color: colors.error, marginTop: spacing.xs, fontSize: 13 },
});