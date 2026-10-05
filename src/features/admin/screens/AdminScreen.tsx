import React, {
  useCallback,
  useState,
} from 'react';
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { useFocusEffect } from '@react-navigation/native';

import BottomNavigation from '../../../components/BottomNavigation';
import SettingsIcon from '../../../components/SettingsIcon';
import { RootStackParamList } from '../../../navigation/RootNavigator';
import {
  Car,
  mockCars,
} from '../../../data/mockCars';

type Props = NativeStackScreenProps<
  RootStackParamList,
  'AdminPage'
>;

export default function AdminScreen({
  navigation,
}: Props) {
  const [cars, setCars] = useState<Car[]>([
    ...mockCars,
  ]);

  useFocusEffect(
    useCallback(() => {
      setCars([...mockCars]);
    }, [])
  );

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.logo}>
            DriveOn{'\n'}TheGo
          </Text>

          <SettingsIcon
            testID="profile-button"
            onPress={() =>
              navigation.navigate('Settings')
            }
          />
        </View>

        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
        >
          <Text style={styles.title}>
            Cars
          </Text>

          <View style={styles.list}>
            {cars.map((car) => (
              <Pressable
                key={car.id}
                testID={`car-button-${car.id}`}
                style={({ pressed }) => [
                  styles.carCard,
                  pressed &&
                    styles.carCardPressed,
                ]}
                onPress={() =>
                  navigation.navigate(
                    'CarSettings',
                    {
                      carId: car.id,
                    }
                  )
                }
              >
                {car.image ? (
                  <Image
                    source={car.image}
                    style={styles.carImage}
                    resizeMode="cover"
                  />
                ) : (
                  <View
                    style={
                      styles.carImagePlaceholder
                    }
                  >
                    <Text
                      style={
                        styles.carPlaceholderEmoji
                      }
                    >
                      🚗
                    </Text>
                  </View>
                )}

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

            <Pressable
              testID="add-car-button"
              style={styles.addButton}
              onPress={() =>
                navigation.navigate('AddCar')
              }
            >
              <Text style={styles.addButtonText}>
                +
              </Text>
            </Pressable>
          </View>
        </ScrollView>

        <BottomNavigation
          onSearch={() =>
            navigation.navigate('Search')
          }
          onMap={() =>
            navigation.navigate('Map')
          }
          onBookings={() =>
            navigation.navigate('Bookings')
          }
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
    minHeight: 82,
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
    width: 110,
    height: 66,
    borderRadius: 10,
    backgroundColor: '#C8CBCF',
  },

  carImagePlaceholder: {
    width: 110,
    height: 66,
    borderRadius: 10,
    backgroundColor: '#C8CBCF',
    alignItems: 'center',
    justifyContent: 'center',
  },

  carPlaceholderEmoji: {
    fontSize: 34,
  },

  carInfo: {
    marginLeft: 12,
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
});