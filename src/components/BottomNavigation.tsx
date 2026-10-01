import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

import { colors } from '../theme/colors';
import { spacing } from '../theme/spacing';

type BottomNavigationProps = {
  onSearch: () => void;
  onMap: () => void;
  onBookings: () => void;
};

export default function BottomNavigation({
  onSearch,
  onMap,
  onBookings,
}: BottomNavigationProps) {
  return (
    <View style={styles.container}>
      <Pressable style={styles.item} onPress={onSearch}>
        <Ionicons name="search-outline" size={22} color={colors.textLabel} />
        <Text style={styles.label}>Search</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={onMap}>
        <Ionicons name="map-outline" size={22} color={colors.textLabel} />
        <Text style={styles.label}>Map</Text>
      </Pressable>

      <Pressable style={styles.item} onPress={onBookings}>
        <Ionicons name="calendar-outline" size={22} color={colors.textLabel} />
        <Text style={styles.label}>Bookings</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: colors.white,
  },

  item: {
    flex: 1,
    alignItems: 'center',
    gap: spacing.xs,
  },

  label: {
    fontSize: 12,
    color: colors.textLabel,
  },
});