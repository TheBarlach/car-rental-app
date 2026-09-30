import { Image, Pressable, Text } from 'react-native';

import { styles } from './Avatar.styles';

export interface AvatarProps {
  onPress: () => void;
  accessibilityLabel: string;
  imageUri?: string;
  initials?: string;
}

export function Avatar({ onPress, accessibilityLabel, imageUri, initials }: AvatarProps) {
  return (
    <Pressable
      accessibilityLabel={accessibilityLabel}
      accessibilityRole="button"
      hitSlop={2}
      onPress={onPress}
      style={styles.container}
    >
      {imageUri ? (
        <Image source={{ uri: imageUri }} style={styles.image} />
      ) : (
        <Text style={styles.initials}>{initials}</Text>
      )}
    </Pressable>
  );
}
