import { useState } from 'react';
import { Pressable, Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import Svg, { Path } from 'react-native-svg';

import { colors } from '../../../theme';
import { styles } from './DateTimeField.styles';

export type DateTimeFieldMode = 'date' | 'time';

export interface DateTimeFieldProps {
  mode: DateTimeFieldMode;
  accessibilityLabel: string;
  placeholder: string;
  value: Date | null;
  onChange: (value: Date) => void;
}

const CALENDAR_PATH =
  'M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2M8 2v4m8-4v4M3 10h18';
const CLOCK_PATH =
  'M12 7v5l4 2m6-7a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z';

const PATHS: Record<DateTimeFieldMode, string> = {
  date: CALENDAR_PATH,
  time: CLOCK_PATH,
};

const FORMATTERS: Record<DateTimeFieldMode, Intl.DateTimeFormat> = {
  date: new Intl.DateTimeFormat('en-GB', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  }),
  time: new Intl.DateTimeFormat('en-GB', {
    hour: '2-digit',
    minute: '2-digit',
  }),
};

export function DateTimeField({
  mode,
  accessibilityLabel,
  placeholder,
  value,
  onChange,
}: DateTimeFieldProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Pressable
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        style={styles.trigger}
        onPress={() => setIsOpen(true)}
      >
        <Svg
          width={16}
          height={16}
          viewBox="0 0 24 24"
          style={styles.icon}
          testID="field-icon"
          accessibilityElementsHidden
          importantForAccessibility="no"
        >
          <Path d={PATHS[mode]} fill={colors.textSecondary} />
        </Svg>
        <Text style={styles.value}>
          {value ? FORMATTERS[mode].format(value) : placeholder}
        </Text>
      </Pressable>
      {isOpen ? (
        <DateTimePicker
          testID="mock-datetime-picker"
          value={value ?? new Date()}
          mode={mode}
          onChange={(_event, selectedDate) => {
            setIsOpen(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      ) : null}
    </>
  );
}