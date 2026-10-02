import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../theme';
import { styles } from './BottomNavigation.styles';

export type BottomNavigationTab = 'search' | 'map' | 'bookings';

export interface BottomNavigationProps {
  activeTab: BottomNavigationTab;
  onTabPress?: (tab: BottomNavigationTab) => void;
}

const SEARCH_PATH =
  'M15.5 14h-.79l-.28-.27C15.41 12.59 16 11.11 16 9.5 16 5.91 13.09 3 9.5 3S3 5.91 3 9.5 5.91 16 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z';
const MAP_PATH =
  'M20.5 3l-.16.03L15 5.1 9 3 3.36 4.9c-.21.07-.36.25-.36.48V20.5c0 .28.22.5.5.5l.16-.03L9 18.9l6 2.1 5.64-1.9c.21-.07.36-.25.36-.48V3.5c0-.28-.22-.5-.5-.5zM15 19l-6-2.11V5l6 2.11V19z';
const BOOKINGS_PATH =
  'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11z';

const TABS: readonly {
  id: BottomNavigationTab;
  label: string;
  path: string;
}[] = [
  { id: 'search', label: 'Search', path: SEARCH_PATH },
  { id: 'map', label: 'Map', path: MAP_PATH },
  { id: 'bookings', label: 'Bookings', path: BOOKINGS_PATH },
];

export function BottomNavigation({
  activeTab,
  onTabPress,
}: BottomNavigationProps) {
  return (
    <View style={styles.container} accessibilityRole="tablist">
      {TABS.map((tab) => {
        const isActive = tab.id === activeTab;

        return (
          <Pressable
            key={tab.id}
            accessibilityRole="tab"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: isActive }}
            style={styles.tab}
            onPress={() => onTabPress?.(tab.id)}
          >
            <Svg width={22} height={22} viewBox="0 0 24 24">
              <Path
                d={tab.path}
                fill={isActive ? colors.accent : colors.textMuted}
              />
            </Svg>
            <Text style={isActive ? styles.labelActive : styles.label}>
              {tab.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}