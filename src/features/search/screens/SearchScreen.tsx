import { useReducer } from 'react';
import { ScrollView, Text, View } from 'react-native';

import { Avatar, Button, Logo, ScreenHeader } from '../../../components';
import {
  mockCapacities,
  mockCarTypes,
  mockFuelTypes,
  mockGearTypes,
  mockInsuranceOptions,
} from '../../../mocks/filters';
import { BottomNavigation } from '../../../navigation/BottomNavigation';
import { DateTimeField } from '../components/DateTimeField';
import { FilterPicker } from '../components/FilterPicker';
import { PriceRangeField } from '../components/PriceRangeField';
import { searchFormReducer } from '../searchFormReducer';
import { initialSearchForm } from '../types';
import { styles } from './SearchScreen.styles';

export function SearchScreen() {
  const [state, dispatch] = useReducer(searchFormReducer, initialSearchForm);

  return (
    <View style={styles.screen}>
      <View style={styles.headerArea}>
        <ScreenHeader
          left={<Logo variant="wordmark" />}
          right={
            <Avatar
              initials="AB"
              accessibilityLabel="Profile"
              onPress={() => {}}
            />
          }
        />
      </View>
      <ScrollView
        style={styles.card}
        contentContainerStyle={styles.cardContent}
      >
        <Text style={styles.title}>Search for a car</Text>
        <Text style={styles.subtitle}>
          Enter the things you wish for the car
        </Text>

        <View style={styles.formGroup}>
          <View style={styles.datetimeSection}>
            <View style={styles.datetimeColumn}>
              <Text style={styles.columnTitle}>Pickup</Text>
              <DateTimeField
                mode="date"
                accessibilityLabel="Pickup date"
                placeholder="DD/MM/YYYY"
                value={state.pickupDate}
                onChange={(value) => dispatch({ type: 'setPickupDate', value })}
              />
              <DateTimeField
                mode="time"
                accessibilityLabel="Pickup time"
                placeholder="HH:MM"
                value={state.pickupTime}
                onChange={(value) => dispatch({ type: 'setPickupTime', value })}
              />
            </View>
            <View style={styles.datetimeColumn}>
              <Text style={styles.columnTitle}>Return</Text>
              <DateTimeField
                mode="date"
                accessibilityLabel="Return date"
                placeholder="DD/MM/YYYY"
                value={state.returnDate}
                onChange={(value) => dispatch({ type: 'setReturnDate', value })}
              />
              <DateTimeField
                mode="time"
                accessibilityLabel="Return time"
                placeholder="HH:MM"
                value={state.returnTime}
                onChange={(value) => dispatch({ type: 'setReturnTime', value })}
              />
            </View>
          </View>
        </View>

        <View style={styles.formGroup}>
          <FilterPicker
            label="Capacity"
            items={mockCapacities}
            value={state.capacity}
            onValueChange={(value) => dispatch({ type: 'setCapacity', value })}
            showPlaceholder={false}
          />
        </View>

        <View style={styles.formGroup}>
          <FilterPicker
            label="Gear Type"
            items={mockGearTypes}
            value={state.gearType}
            onValueChange={(value) => dispatch({ type: 'setGearType', value })}
          />
        </View>

        <View style={styles.formGroup}>
          <FilterPicker
            label="Car Type"
            items={mockCarTypes}
            value={state.carType}
            onValueChange={(value) => dispatch({ type: 'setCarType', value })}
          />
        </View>

        <View style={styles.formGroup}>
          <Text style={styles.groupLabel}>Price Range</Text>
          <PriceRangeField
            minPrice={state.minPrice}
            maxPrice={state.maxPrice}
            onMinPriceTextChange={(value) =>
              dispatch({ type: 'setMinPriceText', value })
            }
            onMaxPriceTextChange={(value) =>
              dispatch({ type: 'setMaxPriceText', value })
            }
            onMinPriceCommit={() => dispatch({ type: 'commitMinPrice' })}
            onMaxPriceCommit={() => dispatch({ type: 'commitMaxPrice' })}
            onPriceRangeChange={(min, max) =>
              dispatch({ type: 'setPriceRangeFromSlider', min, max })
            }
          />
        </View>

        <View style={styles.formGroup}>
          <FilterPicker
            label="Fuel"
            items={mockFuelTypes}
            value={state.fuelType}
            onValueChange={(value) => dispatch({ type: 'setFuelType', value })}
          />
        </View>

        <View style={styles.formGroupLast}>
          <FilterPicker
            label="Insurance"
            items={mockInsuranceOptions}
            value={state.insurance}
            onValueChange={(value) => dispatch({ type: 'setInsurance', value })}
          />
        </View>

        <Button label="Search" onPress={() => {}} width="full" />
      </ScrollView>
      <BottomNavigation activeTab="search" />
    </View>
  );
}