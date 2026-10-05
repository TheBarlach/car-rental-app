import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../../navigation/RootNavigator';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { getBookingById } from '../booking.types';

type Props = NativeStackScreenProps<RootStackParamList, 'BookingDetails'>;

export default function BookingDetailsScreen({ navigation, route }: Props) {
  const booking = getBookingById(route.params.bookingId);

  if (!booking) {
    return (
      <SafeAreaView style={styles.screen}>
        <Pressable accessibilityRole="button" style={styles.backButton} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={22} color="#1E2024" />
        </Pressable>
        <Text style={styles.notFoundTitle}>Booking not found</Text>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.screen} edges={['bottom']}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Image
            source={require('../../map/assets/car-placeholder.png')}
            style={styles.vehicleImage}
            resizeMode="contain"
          />
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Go back to bookings"
            style={styles.heroBackButton}
            onPress={() => navigation.goBack()}
          >
            <Ionicons name="arrow-back" size={22} color={colors.bookingDetailsText} />
          </Pressable>
          <View style={styles.photoCount}>
            <Text style={styles.photoCountText}>1/2</Text>
          </View>
        </View>

        <View style={styles.content}>
          <View style={styles.vehicleHeader}>
            <View style={styles.vehicleTitleBlock}>
              <Text style={styles.vehicleName}>{booking.vehicleName}</Text>
              <Text style={styles.registrationLabel}>Registration number</Text>
            </View>
            <Text style={styles.registrationNumber}>{booking.registrationNumber}</Text>
          </View>

          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total (DKK)</Text>
            <Text style={styles.totalValue}>{booking.total} kr</Text>
          </View>

          <Text style={styles.statusLine}>
            Status: <Text style={{ color: booking.statusColor }}>{booking.status}</Text>
          </Text>

          <View style={styles.specRow}>
            <SpecTile icon="people-outline" label={booking.seats} />
            <SpecTile icon="settings-outline" label={booking.transmission} />
            <SpecTile icon="water-outline" label={booking.fuel} />
            <SpecTile icon="car-outline" label={booking.assistance} />
          </View>

          <Text style={styles.sectionTitle}>About this car</Text>
          <Text style={styles.description}>{booking.description}</Text>

          <Text style={styles.sectionTitle}>Rental Period</Text>
          <View style={styles.dateRow}>
            <DateField label="Pick-up" date="01 may 2026" />
            <DateField label="Return" date="02 may 2026" />
          </View>

          <Text style={styles.sectionTitle}>Insurance</Text>
          <Text style={styles.insuranceLabel}>Full cover</Text>

          <View style={styles.updatesPanel}>
            <Text style={styles.updatesTitle}>Updates</Text>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

function SpecTile({ icon, label }: { icon: keyof typeof Ionicons.glyphMap; label: string }) {
  return (
    <View style={styles.specTile}>
      <Ionicons name={icon} size={21} color="#8E949A" />
      <Text style={styles.specLabel}>{label}</Text>
    </View>
  );
}

function DateField({ label, date }: { label: string; date: string }) {
  return (
    <View style={styles.dateField}>
      <Text style={styles.dateLabel}>{label}</Text>
      <View style={styles.dateValueRow}>
        <Ionicons name="calendar-outline" size={18} color="#777D84" />
        <Text style={styles.dateValue}>{date}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: '#FFFFFF',
    flex: 1,
  },
  backButton: {
    alignItems: 'center',
    height: 36,
    justifyContent: 'center',
    margin: 16,
    width: 36,
  },
  notFoundTitle: {
    color: '#1E2024',
    fontSize: 20,
    fontWeight: '800',
    marginHorizontal: 16,
  },
  hero: {
    alignItems: 'center',
    backgroundColor: colors.bookingHeroBackground,
    height: 174,
    justifyContent: 'center',
    overflow: 'hidden',
    position: 'relative',
  },
  vehicleImage: {
    height: '100%',
    width: '100%',
  },
  heroBackButton: {
    alignItems: 'center',
    backgroundColor: colors.bookingHeroButton,
    borderRadius: 17,
    height: 34,
    justifyContent: 'center',
    left: 8,
    position: 'absolute',
    top: 8,
    width: 34,
  },
  photoCount: {
    backgroundColor: colors.bookingHeroOverlay,
    borderRadius: 12,
    bottom: 8,
    paddingHorizontal: 9,
    paddingVertical: 5,
    position: 'absolute',
    right: 8,
  },
  photoCountText: {
    color: '#FFFFFF',
    fontSize: 11,
    fontWeight: '700',
  },
  content: {
    paddingHorizontal: 12,
    paddingTop: 10,
  },
  vehicleHeader: {
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  vehicleTitleBlock: {
    flex: 1,
  },
  vehicleName: {
    color: colors.bookingDetailsText,
    ...typography.bookingDetailsTitle,
  },
  registrationLabel: {
    color: colors.bookingDetailsMuted,
    fontSize: 11,
    marginTop: 2,
  },
  registrationNumber: {
    color: '#5B6065',
    fontSize: 10,
    fontWeight: '800',
    marginTop: 15,
  },
  totalRow: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  totalLabel: {
    color: colors.bookingDetailsText,
    ...typography.bookingDetailsHeading,
  },
  totalValue: {
    color: colors.bookingDetailsText,
    ...typography.bookingDetailsHeading,
  },
  statusLine: {
    color: colors.bookingDetailsText,
    ...typography.bookingDetailsHeading,
    lineHeight: 24,
    marginTop: 2,
  },
  specRow: {
    flexDirection: 'row',
    gap: spacing.bookingSpecGap,
    marginTop: 4,
  },
  specTile: {
    alignItems: 'center',
    backgroundColor: colors.bookingSpecBackground,
    borderRadius: 12,
    height: 61,
    justifyContent: 'center',
    paddingHorizontal: 5,
    width: 55,
  },
  specLabel: {
    color: colors.bookingSpecText,
    fontSize: 10,
    marginTop: 3,
    textAlign: 'center',
  },
  sectionTitle: {
    color: colors.bookingDetailsText,
    ...typography.bookingDetailsHeading,
    marginTop: 8,
  },
  description: {
    color: colors.bookingMutedText,
    ...typography.bookingDetailsBody,
    lineHeight: 17,
    marginTop: 3,
  },
  dateRow: {
    flexDirection: 'row',
    gap: spacing.bookingDateGap,
    marginTop: 4,
  },
  dateField: {
    borderColor: colors.bookingDateBorder,
    borderRadius: 7,
    borderWidth: 2,
    height: 86,
    padding: 7,
    width: 111,
  },
  dateLabel: {
    color: colors.bookingDetailsMuted,
    fontSize: 11,
  },
  dateValueRow: {
    alignItems: 'center',
    backgroundColor: colors.bookingDateBackground,
    borderRadius: 7,
    flex: 1,
    flexDirection: 'row',
    gap: 5,
    marginTop: 5,
    paddingHorizontal: 7,
  },
  dateValue: {
    color: colors.bookingDateText,
    fontSize: 10,
  },
  insuranceLabel: {
    color: colors.bookingMutedText,
    fontSize: 11,
    marginTop: 5,
  },
  updatesPanel: {
    backgroundColor: colors.bookingUpdatesBackground,
    borderRadius: 15,
    height: 82,
    marginTop: 7,
    padding: 17,
  },
  updatesTitle: {
    color: '#33383C',
    fontSize: 16,
  },
});