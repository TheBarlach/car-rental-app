import React, { useState } from 'react';
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';

import { RootStackParamList } from '../../../navigation/RootNavigator';
import {
  Car,
  CarStatus,
  mockCars,
} from '../../../data/mockCars';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AddCar'
>;

export default function AddCarScreen({
  navigation,
}: Props) {
  const [name, setName] = useState('');

  const [
    registrationNumber,
    setRegistrationNumber,
  ] = useState('');

  const [pricePerDay, setPricePerDay] =
    useState('');

  const [status, setStatus] =
    useState<CarStatus>('not-active');

  const [carType, setCarType] =
    useState('');

  const [gearType, setGearType] =
    useState('');

  const [capacity, setCapacity] =
    useState('');

  const [fuelType, setFuelType] =
    useState('');

  const [description, setDescription] =
    useState('');

  const [showCarTypes, setShowCarTypes] =
    useState(false);

  const [showGearTypes, setShowGearTypes] =
    useState(false);

  const [showCapacities, setShowCapacities] =
    useState(false);

  const [showFuelTypes, setShowFuelTypes] =
    useState(false);

  const carTypes = [
    'Station Car',
    'Sedan',
    'SUV',
  ];

  const gearTypes = [
    'Manual',
    'Automatic',
  ];

  const capacities = [
    '2 Persons',
    '5 Persons',
    '7 Persons',
  ];

  const fuelTypes = [
    'Benzin',
    'Diesel',
    'Electric',
  ];

  const handleCreate = () => {
    const parsedPrice = Number(pricePerDay);

    if (
      !name.trim() ||
      !registrationNumber.trim() ||
      !pricePerDay.trim() ||
      Number.isNaN(parsedPrice) ||
      !carType ||
      !gearType ||
      !capacity ||
      !fuelType
    ) {
      return;
    }

    const newCar: Car = {
      id: Date.now().toString(),
      name: name.trim(),
      registrationNumber:
        registrationNumber.trim(),
      pricePerDay: parsedPrice,
      status,
      carType,
      gearType,
      capacity,
      fuelType,
      description: description.trim(),
      image: null,
    };

    mockCars.push(newCar);

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageSection}>
          <View
            style={
              styles.carImagePlaceholder
            }
          >
            <Text style={styles.carImageText}>
              🚗
            </Text>

            <Text
              style={
                styles.imageHelperText
              }
            >
              No image selected
            </Text>
          </View>

          <Pressable
            testID="back-button"
            style={styles.backButton}
            onPress={() =>
              navigation.goBack()
            }
          >
            <Text style={styles.backButtonText}>
              ←
            </Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.pageTitle}>
            Add Car
          </Text>

          <Text style={styles.sectionLabel}>
            Status
          </Text>

          <View style={styles.statusRow}>
            <Pressable
              testID="status-active"
              accessibilityState={{
                selected: status === 'active',
              }}
              style={[
                styles.statusButton,
                status === 'active' &&
                  styles.statusButtonSelected,
              ]}
              onPress={() =>
                setStatus('active')
              }
            >
              <Text
                style={[
                  styles.statusText,
                  status === 'active' &&
                    styles.statusTextSelected,
                ]}
              >
                Active
              </Text>
            </Pressable>

            <Pressable
              testID="status-rented"
              accessibilityState={{
                selected: status === 'rented',
              }}
              style={[
                styles.statusButton,
                status === 'rented' &&
                  styles.statusButtonSelected,
              ]}
              onPress={() =>
                setStatus('rented')
              }
            >
              <Text
                style={[
                  styles.statusText,
                  status === 'rented' &&
                    styles.statusTextSelected,
                ]}
              >
                Rented
              </Text>
            </Pressable>

            <Pressable
              testID="status-not-active"
              accessibilityState={{
                selected:
                  status === 'not-active',
              }}
              style={[
                styles.statusButton,
                status === 'not-active' &&
                  styles.statusButtonSelected,
              ]}
              onPress={() =>
                setStatus('not-active')
              }
            >
              <Text
                style={[
                  styles.statusText,
                  status === 'not-active' &&
                    styles.statusTextSelected,
                ]}
              >
                Not Active
              </Text>
            </Pressable>
          </View>

          <Text style={styles.label}>
            Name
          </Text>

          <TextInput
            testID="car-name-input"
            placeholder="Car name"
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Text style={styles.label}>
            Registration number
          </Text>

          <TextInput
            testID="registration-input"
            placeholder="Registration number"
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
            style={styles.input}
          />

          <Text style={styles.label}>
            Price
          </Text>

          <View style={styles.priceContainer}>
            <TextInput
              testID="price-input"
              placeholder="Price per day"
              value={pricePerDay}
              onChangeText={setPricePerDay}
              keyboardType="numeric"
              style={styles.priceInput}
            />

            <Text style={styles.priceSuffix}>
              kr
            </Text>
          </View>

          <Text style={styles.label}>
            Car Type
          </Text>

          <Pressable
            testID="car-type-selector"
            style={styles.selector}
            onPress={() =>
              setShowCarTypes(
                (current) => !current
              )
            }
          >
            <Text style={styles.selectorText}>
              {carType || 'Select car type'}
            </Text>

            <Text style={styles.selectorArrow}>
              ⌄
            </Text>
          </Pressable>

          {showCarTypes && (
            <View style={styles.options}>
              {carTypes.map((option) => (
                <Pressable
                  key={option}
                  style={styles.option}
                  onPress={() => {
                    setCarType(option);
                    setShowCarTypes(false);
                  }}
                >
                  <Text style={styles.optionText}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          <Text style={styles.label}>
            Gear Type
          </Text>

          <Pressable
            testID="gear-type-selector"
            style={styles.selector}
            onPress={() =>
              setShowGearTypes(
                (current) => !current
              )
            }
          >
            <Text style={styles.selectorText}>
              {gearType || 'Select gear type'}
            </Text>

            <Text style={styles.selectorArrow}>
              ⌄
            </Text>
          </Pressable>

          {showGearTypes && (
            <View style={styles.options}>
              {gearTypes.map((option) => (
                <Pressable
                  key={option}
                  style={styles.option}
                  onPress={() => {
                    setGearType(option);
                    setShowGearTypes(false);
                  }}
                >
                  <Text style={styles.optionText}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          <Text style={styles.label}>
            Capacity
          </Text>

          <Pressable
            testID="capacity-selector"
            style={styles.selector}
            onPress={() =>
              setShowCapacities(
                (current) => !current
              )
            }
          >
            <Text style={styles.selectorText}>
              {capacity || 'Select capacity'}
            </Text>

            <Text style={styles.selectorArrow}>
              ⌄
            </Text>
          </Pressable>

          {showCapacities && (
            <View style={styles.options}>
              {capacities.map((option) => (
                <Pressable
                  key={option}
                  style={styles.option}
                  onPress={() => {
                    setCapacity(option);
                    setShowCapacities(false);
                  }}
                >
                  <Text style={styles.optionText}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          <Text style={styles.label}>
            Fuel Type
          </Text>

          <Pressable
            testID="fuel-type-selector"
            style={styles.selector}
            onPress={() =>
              setShowFuelTypes(
                (current) => !current
              )
            }
          >
            <Text style={styles.selectorText}>
              {fuelType || 'Select fuel type'}
            </Text>

            <Text style={styles.selectorArrow}>
              ⌄
            </Text>
          </Pressable>

          {showFuelTypes && (
            <View style={styles.options}>
              {fuelTypes.map((option) => (
                <Pressable
                  key={option}
                  style={styles.option}
                  onPress={() => {
                    setFuelType(option);
                    setShowFuelTypes(false);
                  }}
                >
                  <Text style={styles.optionText}>
                    {option}
                  </Text>
                </Pressable>
              ))}
            </View>
          )}

          <Text style={styles.label}>
            About this car
          </Text>

          <TextInput
            testID="description-input"
            placeholder="Write something about the car..."
            value={description}
            onChangeText={setDescription}
            multiline
            style={styles.descriptionInput}
          />

        </ScrollView>

        {/* Fixed bottom: stays visible while the form scrolls */}
        <View style={styles.footer}>
          <Pressable
            testID="create-car-button"
            style={styles.saveButton}
            onPress={handleCreate}
          >
            <Text style={styles.saveButtonText}>
              Create Car
            </Text>
          </Pressable>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  imageSection: {
    height: 210,
    backgroundColor: '#D8DADD',
    justifyContent: 'center',
    alignItems: 'center',
  },

  carImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carImageText: {
    fontSize: 70,
  },

  imageHelperText: {
    fontSize: 13,
    color: '#666666',
    marginTop: 4,
  },

  backButton: {
    position: 'absolute',
    left: 16,
    bottom: 16,
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  backButtonText: {
    fontSize: 26,
    fontWeight: '600',
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 18,
    paddingTop: 14,
    paddingBottom: 24,
  },

  footer: {
    paddingHorizontal: 18,
    paddingTop: 10,
    paddingBottom: 12,
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
  },

  pageTitle: {
    fontSize: 22,
    fontWeight: '700',
    marginBottom: 16,
  },

  sectionLabel: {
    fontSize: 14,
    fontWeight: '700',
    marginBottom: 8,
  },

  statusRow: {
    flexDirection: 'row',
    gap: 8,
    marginBottom: 18,
  },

  statusButton: {
    flex: 1,
    minHeight: 38,
    borderRadius: 8,
    backgroundColor: '#E1E4E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  statusButtonSelected: {
    backgroundColor: '#818CF8',
  },

  statusText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#525866',
  },

  statusTextSelected: {
    color: '#FFFFFF',
  },

  label: {
    fontSize: 13,
    fontWeight: '600',
    color: '#525866',
    marginBottom: 5,
  },

  input: {
    height: 42,
    backgroundColor: '#E1E4E8',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    textAlign: 'center',
  },

  priceContainer: {
    height: 42,
    backgroundColor: '#E1E4E8',
    borderRadius: 8,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
  },

  priceInput: {
    flex: 1,
    textAlign: 'center',
  },

  priceSuffix: {
    fontSize: 14,
    fontWeight: '600',
    color: '#525866',
  },

  selector: {
    height: 42,
    backgroundColor: '#E1E4E8',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  selectorText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 14,
    color: '#525866',
  },

  selectorArrow: {
    fontSize: 18,
    color: '#525866',
  },

  options: {
    backgroundColor: '#F3F4F6',
    borderRadius: 8,
    marginTop: -6,
    marginBottom: 12,
    overflow: 'hidden',
  },

  option: {
    minHeight: 40,
    justifyContent: 'center',
    paddingHorizontal: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },

  optionText: {
    textAlign: 'center',
    fontSize: 14,
    color: '#525866',
  },

  descriptionInput: {
    minHeight: 86,
    backgroundColor: '#E1E4E8',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingTop: 10,
    marginBottom: 18,
    textAlignVertical: 'top',
  },

  saveButton: {
    minHeight: 46,
    borderRadius: 10,
    backgroundColor: '#818CF8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '700',
  },
});