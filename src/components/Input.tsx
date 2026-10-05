import React, { useState } from 'react';
import {
  StyleSheet,
  Text,
  TextInput,
  TextInputProps,
  TouchableOpacity,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';
import { typography } from '../theme/typography';

type Props = TextInputProps & {
  label: string;
  icon: keyof typeof Ionicons.glyphMap;
  error?: string;
};

export default function Input({
  label,
  icon,
  error,
  secureTextEntry,
  ...rest
}: Props) {
  const [hidden, setHidden] = useState(true);

  const isPassword = !!secureTextEntry;

  return (
    <View style={styles.wrapper}>
      <Text style={styles.label}>{label}</Text>

      <View style={[styles.field, !!error && styles.fieldError]}>
        <Ionicons
          name={icon}
          size={22}
          color={colors.icon}
        />

        <TextInput
          style={styles.input}
          placeholderTextColor={colors.placeholder}
          autoCapitalize="none"
          secureTextEntry={isPassword && hidden}
          {...rest}
        />

        {isPassword && (
          <TouchableOpacity
            onPress={() => setHidden((h) => !h)}
            hitSlop={10}
          >
            <Ionicons
              name={hidden ? 'eye-off-outline' : 'eye-outline'}
              size={22}
              color={colors.icon}
            />
          </TouchableOpacity>
        )}
      </View>

      {!!error && (
        <Text style={styles.error}>
          {error}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  wrapper: {
    marginBottom: spacing.md,
  },

  label: {
    ...typography.label,
    color: colors.textLabel,
    marginBottom: spacing.sm,
  },

  field: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.inputBackground,
    borderRadius: spacing.radius,
    paddingHorizontal: spacing.md,
    height: 54,
    borderWidth: 1,
    borderColor: 'transparent',
  },

  fieldError: {
    borderColor: colors.error,
  },

  input: {
    flex: 1,
    marginLeft: spacing.sm,
    ...typography.body,
    color: colors.text,
  },

  error: {
    color: colors.error,
    marginTop: spacing.xs,
    fontSize: 13,
  },
});