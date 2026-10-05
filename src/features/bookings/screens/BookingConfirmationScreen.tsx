import React, { useState } from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

import { mockCars } from '../../../data/mockCars';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type BookingConfirmationScreenProps = {
  navigation?: {
    navigate: (screen: string) => void;
  };
  route?: {
    params?: RootStackParamList['BookingConfirmation'];
  };
};

// Shown when the screen is opened without booking data (e.g. directly in development).
const demoCar = mockCars[0];
const fallbackAddress = 'Campusvej 55, 5230 Odense M';
const demoBooking = {
  carName: demoCar.name,
  registrationNumber: demoCar.registrationNumber,
  pricePerDay: demoCar.pricePerDay,
  startDate: 'Dec 1, 2026',
  endDate: 'Dec 7, 2026',
  address: demoCar.location?.name ?? fallbackAddress,
};

const formatDate = (isoDate: string) =>
  new Date(isoDate).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  });

const generateBookingId = () => {
  const randomNumber = Math.floor(10000 + Math.random() * 90000);

  return `DOTG${randomNumber}`;
};

export default function BookingConfirmationScreen({
  navigation,
  route,
}: BookingConfirmationScreenProps) {
  const [bookingId] = useState(generateBookingId);
  const details = route?.params;
  const booking = details
    ? {
        carName: details.car.name,
        registrationNumber: details.car.registrationNumber,
        pricePerDay: details.car.pricePerDay,
        startDate: formatDate(details.startDate),
        endDate: formatDate(details.endDate),
        address: details.car.location?.name ?? fallbackAddress,
      }
    : demoBooking;

  const handleViewBookings = () => {
    navigation?.navigate('Bookings');
  };

  const handleBackHome = () => {
    navigation?.navigate('Map');
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      {/* Fixed top: confirmation icon and heading */}
      <View style={styles.header}>
        <View style={styles.confirmationIcon}>
          <Text style={styles.checkmark}>✓</Text>
        </View>

        <Text style={styles.title}>Booking Confirmed!</Text>
      </View>

      <ScrollView
        style={styles.scroll}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >

        <Text style={styles.description}>
          Your car has been reserved. We&apos;ve sent a confirmation email with
          all the details.
        </Text>

        {/* Booking card */}
        <View style={styles.bookingCard}>
          {/* Car information */}
          <View style={styles.carSection}>
            <View style={styles.carImagePlaceholder}>
              <Text style={styles.carEmoji}>🚙</Text>
            </View>

            <View style={styles.carDetails}>
              <Text style={styles.carName}>{booking.carName}</Text>

              <Text style={styles.registration}>
                Registration number {booking.registrationNumber}
              </Text>

              <Text style={styles.price}>{booking.pricePerDay} kr/day</Text>
            </View>
          </View>

          <View style={styles.divider} />

          {/* Booking number */}
          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Text style={styles.detailIcon}>☑</Text>
              <Text style={styles.detailLabel}>Booking ID</Text>
            </View>

            <Text style={styles.detailValue}>#{bookingId}</Text>
          </View>

          <View style={styles.divider} />

          {/* Start date */}
          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Text style={styles.detailIcon}>▣</Text>
              <Text style={styles.detailLabel}>Start date</Text>
            </View>

            <Text style={styles.detailValue}>{booking.startDate}</Text>
          </View>

          {/* End date */}
          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Text style={styles.detailIcon}>▣</Text>
              <Text style={styles.detailLabel}>End date</Text>
            </View>

            <Text style={styles.detailValue}>{booking.endDate}</Text>
          </View>

          {/* Location */}
          <View style={styles.detailRow}>
            <View style={styles.detailLabelContainer}>
              <Text style={styles.detailIcon}>⌖</Text>
              <Text style={styles.detailLabel}>Address</Text>
            </View>

            <Text style={[styles.detailValue, styles.locationText]}>
              {booking.address}
            </Text>
          </View>
        </View>

      </ScrollView>

      {/* Fixed bottom: buttons */}
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.primaryButton}
          onPress={handleViewBookings}
          accessibilityRole="button"
        >
          <Text style={styles.primaryButtonText}>View My Bookings</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.secondaryButton}
          onPress={handleBackHome}
          accessibilityRole="button"
        >
          <Text style={styles.secondaryButtonText}>Back to home</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },

  header: {
    paddingHorizontal: 24,
    paddingTop: 42,
  },

  scroll: {
    flex: 1,
  },

  container: {
    flexGrow: 1,
    paddingHorizontal: 24,
    paddingBottom: 16,
  },

  footer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    paddingBottom: 12,
    backgroundColor: '#FFFFFF',
  },

  confirmationIcon: {
    width: 102,
    height: 102,
    borderRadius: 51,
    backgroundColor: '#6268EA',
    alignSelf: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 44,
  },

  checkmark: {
    color: '#FFFFFF',
    fontSize: 58,
    fontWeight: '300',
    lineHeight: 65,
  },

  title: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: '700',
    color: '#20232A',
    marginBottom: 8,
  },

  description: {
    fontSize: 14,
    lineHeight: 21,
    color: '#9298A8',
    marginBottom: 16,
  },

  bookingCard: {
    borderWidth: 1,
    borderColor: '#D4D7DF',
    borderRadius: 14,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    marginBottom: 28,
  },

  carSection: {
    flexDirection: 'row',
    padding: 9,
  },

  carImagePlaceholder: {
    width: 98,
    height: 62,
    borderRadius: 8,
    backgroundColor: '#E9E9EC',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 10,
  },

  carEmoji: {
    fontSize: 40,
  },

  carDetails: {
    flex: 1,
    justifyContent: 'center',
  },

  carName: {
    fontSize: 12,
    fontWeight: '700',
    color: '#292C34',
    marginBottom: 4,
  },

  registration: {
    fontSize: 9,
    color: '#606572',
    marginBottom: 5,
  },

  price: {
    fontSize: 12,
    fontWeight: '700',
    color: '#6268EA',
  },

  divider: {
    height: 1,
    backgroundColor: '#D9DCE3',
  },

  detailRow: {
    minHeight: 37,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 6,
  },

  detailLabelContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  detailIcon: {
    width: 24,
    fontSize: 18,
    color: '#20232A',
  },

  detailLabel: {
    fontSize: 11,
    color: '#9298A8',
  },

  detailValue: {
    maxWidth: '55%',
    fontSize: 10,
    color: '#343740',
    textAlign: 'right',
  },

  locationText: {
    lineHeight: 14,
  },

  primaryButton: {
    height: 52,
    borderRadius: 13,
    backgroundColor: '#6268EA',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },

  primaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },

  secondaryButton: {
    height: 52,
    borderRadius: 13,
    backgroundColor: '#F4F4F6',
    justifyContent: 'center',
    alignItems: 'center',

    shadowColor: '#000000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.08,
    shadowRadius: 5,
    elevation: 2,
  },

  secondaryButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#252831',
  },
});