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

import BottomNavigation from '../../../components/BottomNavigation';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import { Car, mockCars } from '../data/mockCars';

type Props = NativeStackScreenProps<RootStackParamList, 'AdminPage'>;

export default function AdminScreen({ navigation }: Props) {
  const [cars, setCars] = useState<Car[]>(mockCars);

  const [showForm, setShowForm] = useState(false);
  const [carName, setCarName] = useState('');
  const [pricePerDay, setPricePerDay] = useState('');

  const handleAddCar = () => {
    const parsedPrice = Number(pricePerDay);

    if (
      !carName.trim() ||
      !pricePerDay.trim() ||
      Number.isNaN(parsedPrice)
    ) {
      return;
    }

    const newCar: Car = {
      id: Date.now().toString(),
      name: carName.trim(),
      pricePerDay: parsedPrice,
    };

    setCars((currentCars) => [
      ...currentCars,
      newCar,
    ]);

    setCarName('');
    setPricePerDay('');
    setShowForm(false);
  };

  const handleCancel = () => {
    setCarName('');
    setPricePerDay('');
    setShowForm(false);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>
            DriveOn{'\n'}TheGo
          </Text>

          <Pressable
            testID="profile-button"
            style={styles.profile}
            onPress={() => navigation.navigate('Settings')}
          >
            <Text style={styles.profileText}>👩</Text>
          </Pressable>
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>Cars</Text>

          <View style={styles.list}>
            {cars.map((car) => (
              <Pressable
                key={car.id}
                testID={`car-button-${car.id}`}
                style={({ pressed }) => [
                  styles.carCard,
                  pressed && styles.carCardPressed,
                ]}
                onPress={() =>
                  navigation.navigate('CarSettings', {
                    carId: car.id,
                  })
                }
              >
                <View style={styles.carImage}>
                  <Text style={styles.carEmoji}>🚗</Text>
                </View>

                <View style={styles.carInfo}>
                  <Text style={styles.carName}>
                    {car.name}
                  </Text>

                  <Text style={styles.carPrice}>
                    {car.pricePerDay} kr/day
                  </Text>
                </View>
              </Pressable>
            ))}

            {!showForm ? (
              <Pressable
                testID="add-car-button"
                style={styles.addButton}
                onPress={() => setShowForm(true)}
              >
                <Text style={styles.addButtonText}>+</Text>
              </Pressable>
            ) : (
              <View style={styles.form}>
                <TextInput
                  placeholder="Car name"
                  value={carName}
                  onChangeText={setCarName}
                  style={styles.input}
                />

                <TextInput
                  placeholder="Price per day"
                  value={pricePerDay}
                  onChangeText={setPricePerDay}
                  keyboardType="numeric"
                  style={styles.input}
                />

                <View style={styles.formButtons}>
                  <Pressable
                    testID="cancel-car-button"
                    style={styles.cancelButton}
                    onPress={handleCancel}
                  >
                    <Text style={styles.cancelButtonText}>
                      Cancel
                    </Text>
                  </Pressable>

                  <Pressable
                    testID="submit-car-button"
                    style={styles.submitButton}
                    onPress={handleAddCar}
                  >
                    <Text style={styles.submitButtonText}>
                      Add car
                    </Text>
                  </Pressable>
                </View>
              </View>
            )}
          </View>
        </ScrollView>

        <BottomNavigation
          onSearch={() => navigation.navigate('Search')}
          onMap={() => navigation.navigate('Map')}
          onBookings={() => navigation.navigate('Bookings')}
        />
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

  header: {
    height: 72,
    paddingHorizontal: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },

  logo: {
    fontSize: 10,
    fontWeight: '700',
    lineHeight: 10,
    color: '#0057A8',
  },

  profile: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#DDDFF8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  profileText: {
    fontSize: 22,
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 12,
    paddingTop: 8,
    paddingBottom: 24,
  },

  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 16,
  },

  list: {
    paddingBottom: 16,
  },

  carCard: {
    minHeight: 72,
    borderRadius: 16,
    backgroundColor: '#E1E4E8',
    padding: 8,
    marginBottom: 14,
    flexDirection: 'row',
    alignItems: 'center',
  },

  carCardPressed: {
    opacity: 0.7,
  },

  carImage: {
    width: 106,
    height: 58,
    borderRadius: 10,
    backgroundColor: '#C8CBCF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carEmoji: {
    fontSize: 34,
  },

  carInfo: {
    marginLeft: 10,
    flex: 1,
  },

  carName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#525866',
  },

  carPrice: {
    marginTop: 4,
    fontSize: 14,
    fontWeight: '600',
    color: '#818CF8',
  },

  addButton: {
    height: 72,
    borderRadius: 16,
    backgroundColor: '#E1E4E8',
    alignItems: 'center',
    justifyContent: 'center',
  },

  addButtonText: {
    fontSize: 30,
    fontWeight: '300',
    color: '#555B64',
  },

  form: {
    borderRadius: 16,
    backgroundColor: '#E1E4E8',
    padding: 14,
  },

  input: {
    height: 44,
    backgroundColor: '#FFFFFF',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 10,
  },

  formButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 10,
  },

  cancelButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#C8CBCF',
  },

  cancelButtonText: {
    color: '#444444',
    fontWeight: '600',
  },

  submitButton: {
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: '#818CF8',
  },

  submitButtonText: {
    color: '#FFFFFF',
    fontWeight: '600',
  },
});