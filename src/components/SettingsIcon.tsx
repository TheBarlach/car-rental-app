import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

import { colors } from '../theme/colors';

type SettingsIconProps = {
  onPress: () => void;
  testID?: string;
};

// Top-right profile avatar (originally from BookingsScreen) that opens Settings.
export default function SettingsIcon({ onPress, testID = 'settings-icon' }: SettingsIconProps) {
  return (
    <Pressable
      testID={testID}
      accessibilityRole="button"
      accessibilityLabel="Open settings"
      hitSlop={8}
      onPress={onPress}
      style={({ pressed }) => [styles.avatar, pressed && styles.pressed]}
    >
      <Text style={styles.avatarText}>JD</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.bookingAvatar,
    borderColor: colors.bookingAvatarBorder,
    borderRadius: 16,
    borderWidth: 2,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  avatarText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  pressed: {
    opacity: 0.72,
  },
});
