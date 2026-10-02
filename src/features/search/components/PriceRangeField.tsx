import { Text, TextInput, View } from 'react-native';
import { RangeSlider } from '@react-native-assets/slider';
import { clampPriceRange, PRICE_RANGE, PRICE_SLIDER } from '../priceRange';
import { styles } from './PriceRangeField.styles';

export interface PriceRangeFieldProps {
  minPrice: string;
  maxPrice: string;
  onMinPriceTextChange: (value: string) => void;
  onMaxPriceTextChange: (value: string) => void;
  onMinPriceCommit: () => void;
  onMaxPriceCommit: () => void;
  onPriceRangeChange: (min: number, max: number) => void;
}

function toSliderValue(raw: string, fallback: number): number {
  const trimmed = raw.trim();
  if (trimmed === '') return fallback;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : fallback;
}

export function PriceRangeField({ minPrice, maxPrice, onMinPriceTextChange, onMaxPriceTextChange, onMinPriceCommit, onMaxPriceCommit, onPriceRangeChange }: PriceRangeFieldProps) {
  const minValue = toSliderValue(minPrice, PRICE_RANGE.initialMin);
  const maxValue = toSliderValue(maxPrice, PRICE_RANGE.initialMax);

  function shiftMax(delta: number) { const [nextMin, nextMax] = clampPriceRange(minValue, maxValue + delta); onPriceRangeChange(nextMin, nextMax); }
  function shiftMin(delta: number) { const [nextMin, nextMax] = clampPriceRange(minValue + delta, maxValue); onPriceRangeChange(nextMin, nextMax); }

  return (
    <View style={styles.container}>
      <View style={styles.inputs}>
        <View style={styles.inputColumn}>
          <Text style={styles.inputLabel}>Min per day</Text>
          <TextInput accessibilityLabel="Min price" style={styles.input} value={minPrice} onChangeText={onMinPriceTextChange} onBlur={onMinPriceCommit} keyboardType="number-pad" />
        </View>
        <View style={styles.inputColumn}>
          <Text style={styles.inputLabel}>Max per day</Text>
          <TextInput accessibilityLabel="Max price" style={styles.input} value={maxPrice} onChangeText={onMaxPriceTextChange} onBlur={onMaxPriceCommit} keyboardType="number-pad" />
        </View>
      </View>
      <RangeSlider
        accessible
        accessibilityRole="adjustable"
        accessibilityLabel="Price range slider"
        accessibilityHint="Dobbeltskyd til at ændre maksimumpris. Brug de tilgængelige handlinger for at ændre minimumprisen."
        accessibilityValue={{ min: PRICE_RANGE.min, max: PRICE_RANGE.max, now: maxValue, text: `Fra ${minValue} til ${maxValue} pr. dag` }}
        accessibilityActions={[
          { name: 'increment', label: 'Hæv maksimumpris' },
          { name: 'decrement', label: 'Sænk maksimumpris' },
          { name: 'incrementMinimum', label: 'Hæv minimumpris' },
          { name: 'decrementMinimum', label: 'Sænk minimumpris' },
        ]}
        onAccessibilityAction={(event) => {
          const step = PRICE_RANGE.step;
          switch (event.nativeEvent.actionName) {
            case 'increment': shiftMax(step); break;
            case 'decrement': shiftMax(-step); break;
            case 'incrementMinimum': shiftMin(step); break;
            case 'decrementMinimum': shiftMin(-step); break;
          }
        }}
        minimumValue={PRICE_RANGE.min}
        maximumValue={PRICE_RANGE.max}
        step={PRICE_RANGE.step}
        minimumRange={PRICE_RANGE.minimumRange}
        crossingAllowed={false}
        range={[minValue, maxValue]}
        onValueChange={([min, max]) => onPriceRangeChange(min, max)}
        style={{ paddingVertical: PRICE_SLIDER.touchPadding }}
        outboundColor={PRICE_SLIDER.outboundColor}
        inboundColor={PRICE_SLIDER.inboundColor}
        thumbTintColor={PRICE_SLIDER.thumbColor}
        trackHeight={PRICE_SLIDER.trackHeight}
        thumbSize={PRICE_SLIDER.thumbSize}
      />
    </View>
  );
}
