import { Text, View } from 'react-native';
import { Picker } from '@react-native-picker/picker';

import type { PickerItem } from '../types';
import { styles } from './FilterPicker.styles';

export interface FilterPickerProps {
  label: string;
  items: PickerItem[];
  value: PickerItem | null;
  onValueChange: (value: PickerItem | null) => void;
  showPlaceholder?: boolean;
}

export function FilterPicker({
  label,
  items,
  value,
  onValueChange,
  showPlaceholder = true,
}: FilterPickerProps) {
  const selectedValue =
    value?.id ?? (showPlaceholder ? '' : (items[0]?.id ?? ''));

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{label}</Text>
      <View style={styles.box}>
        <Picker
          accessibilityLabel={label}
          selectedValue={selectedValue}
          style={styles.picker}
          onValueChange={(itemValue) =>
            onValueChange(
              items.find((item) => item.id === itemValue) ?? null,
            )
          }
        >
          {showPlaceholder ? <Picker.Item label="Select..." value="" /> : null}
          {items.map((item) => (
            <Picker.Item key={item.id} label={item.label} value={item.id} />
          ))}
        </Picker>
      </View>
    </View>
  );
}