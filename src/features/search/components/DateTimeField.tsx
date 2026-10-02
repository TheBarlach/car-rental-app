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
  'M19 4h-1V2h-2v2H8V2H6v2H5c-1.11 0-1.99.9-1.99 2L3 20c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 16H5V9h14v11zM7 11h5v5H7z';
const CLOCK_PATH =
  'M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm.5-13H11v6l5.25 3.15.75-1.23-4.5-2.67z';

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