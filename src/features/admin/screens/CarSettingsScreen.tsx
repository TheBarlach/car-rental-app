import React, { useState } from 'react';
import {
  Image,
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
  CarStatus,
  mockCars,
} from '../../../data/mockCars';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'CarSettings'
>;

export default function CarSettingsScreen({
  navigation,
  route,
}: Props) {
  const { carId } = route.params;

  const car = mockCars.find(
    (item) => item.id === carId
  );

  const [name, setName] = useState(
    car?.name ?? ''
  );

  const [
    registrationNumber,
    setRegistrationNumber,
  ] = useState(
    car?.registrationNumber ?? ''
  );

  const [pricePerDay, setPricePerDay] =
    useState(
      car?.pricePerDay?.toString() ?? ''
    );

  const [status, setStatus] =
    useState<CarStatus>(
      car?.status ?? 'not-active'
    );

  const [carType, setCarType] =
    useState(
      car?.carType ?? ''
    );

  const [gearType, setGearType] =
    useState(
      car?.gearType ?? ''
    );

  const [capacity, setCapacity] =
    useState(
      car?.capacity ?? ''
    );

  const [fuelType, setFuelType] =
    useState(
      car?.fuelType ?? ''
    );

  const [description, setDescription] =
    useState(
      car?.description ?? ''
    );

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

  if (!car) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundText}>
            Car not found
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  const handleSave = () => {
    const parsedPrice = Number(pricePerDay);

    if (
      !name.trim() ||
      !pricePerDay.trim() ||
      Number.isNaN(parsedPrice)
    ) {
      return;
    }

    const selectedCar = mockCars.find(
      (item) => item.id === carId
    );

    if (!selectedCar) {
      return;
    }

    selectedCar.name = name.trim();

    selectedCar.registrationNumber =
      registrationNumber.trim();

    selectedCar.pricePerDay = parsedPrice;
    selectedCar.status = status;
    selectedCar.carType = carType;
    selectedCar.gearType = gearType;
    selectedCar.capacity = capacity;
    selectedCar.fuelType = fuelType;

    selectedCar.description =
      description.trim();

    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.imageSection}>
          {car.image ? (
            <Image
              source={car.image}
              style={styles.mainCarImage}
              resizeMode="cover"
            />
          ) : (
            <View
              style={
                styles.carImagePlaceholder
              }
            >
              <Text style={styles.carImageText}>
                🚗
              </Text>
            </View>
          )}

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
            value={name}
            onChangeText={setName}
            style={styles.input}
          />

          <Text style={styles.label}>
            Registration number
          </Text>

          <TextInput
            value={registrationNumber}
            onChangeText={setRegistrationNumber}
            style={styles.input}
          />

          <Text style={styles.label}>
            Price
          </Text>

          <View style={styles.priceContainer}>
            <TextInput
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
              {carType}
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
              {gearType}
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
              {capacity}
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
              {fuelType}
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
            value={description}
            onChangeText={setDescription}
            multiline
            style={styles.descriptionInput}
          />

        </ScrollView>

        {/* Fixed bottom: stays visible while the form scrolls */}
        <View style={styles.footer}>
          <Pressable
            testID="save-button"
            style={styles.saveButton}
            onPress={handleSave}
          >
            <Text style={styles.saveButtonText}>
              Save Changes
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

  notFoundContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },

  notFoundText: {
    fontSize: 18,
    fontWeight: '600',
  },

  imageSection: {
    height: 210,
    backgroundColor: '#D8DADD',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },

  mainCarImage: {
    width: '100%',
    height: '100%',
  },

  carImagePlaceholder: {
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carImageText: {
    fontSize: 90,
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