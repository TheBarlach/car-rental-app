import { View } from 'react-native';
import type { ReactNode } from 'react';

import { styles } from './ScreenHeader.styles';

export interface ScreenHeaderProps {
  left?: ReactNode;
  center?: ReactNode;
  right?: ReactNode;
}

export function ScreenHeader({ left, center, right }: ScreenHeaderProps) {
  return (
    <View style={styles.container}>
      <View style={styles.sideLeft}>{left}</View>
      <View style={styles.center}>{center}</View>
      <View style={styles.sideRight}>{right}</View>
    </View>
  );
}
