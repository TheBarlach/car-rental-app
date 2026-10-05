import React, { PropsWithChildren } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type ScreenProps = PropsWithChildren<{
  title?: string;
  description?: string;
}>;

export default function Screen({
  title,
  description,
  children,
}: ScreenProps) {
  return (
    <SafeAreaView
      style={styles.safe}
      edges={['left', 'right', 'bottom']}
    >
      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {title && (
            <Text style={styles.title}>
              {title}
            </Text>
          )}

          {description && (
            <Text style={styles.description}>
              {description}
            </Text>
          )}

          {children}
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safe: {
    flex: 1,
    backgroundColor: colors.background,
  },

  flex: {
    flex: 1,
  },

  content: {
    flexGrow: 1,
    paddingHorizontal: spacing.screenPadding,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    color: colors.text,
  },

  description: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.textLabel,
  },
});