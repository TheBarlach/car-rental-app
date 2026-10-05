import React, { PropsWithChildren, ReactNode } from 'react';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type ScreenProps = PropsWithChildren<{
  title?: string;
  description?: string;
  // Rendered below the scrolling content, e.g. BottomNavigation.
  footer?: ReactNode;
}>;

export default function Screen({
  title,
  description,
  footer,
  children,
}: ScreenProps) {
  return (
    <SafeAreaView style={styles.safe}>
      {/* The title stays fixed; only the content below it scrolls. */}
      {(title || description) && (
        <View style={styles.header}>
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
        </View>
      )}

      <KeyboardAvoidingView
        style={styles.flex}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          contentContainerStyle={styles.content}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {children}
        </ScrollView>
      </KeyboardAvoidingView>

      {footer}
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

  header: {
    paddingHorizontal: spacing.screenPadding,
    paddingTop: spacing.md,
    paddingBottom: spacing.sm,
    gap: spacing.md,
  },

  content: {
    flexGrow: 1,
    paddingTop: spacing.sm,
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