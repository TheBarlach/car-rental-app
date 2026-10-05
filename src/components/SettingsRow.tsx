import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type SettingsRowProps = {
  title: string;
  icon: keyof typeof Ionicons.glyphMap;
  onPress?: () => void;
  rightText?: string;
};

export default function SettingsRow({
  title,
  icon,
  onPress,
  rightText,
}: SettingsRowProps) {
  return (
    <Pressable style={styles.row} onPress={onPress}>
      <View style={styles.left}>
        <Ionicons name={icon} size={22} color={colors.text} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.right}>
        {rightText ? <Text style={styles.rightText}>{rightText}</Text> : null}

        <Ionicons
          name="chevron-forward"
          size={18}
          color={colors.textLabel}
        />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  row: {
    minHeight: 54,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    backgroundColor: colors.white,
  },

  left: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
  },

  right: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
  },

  title: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.text,
  },

  rightText: {
    fontSize: 12,
    color: colors.textLabel,
  },
});