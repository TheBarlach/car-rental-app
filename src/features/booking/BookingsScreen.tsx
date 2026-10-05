import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { Image, Pressable, StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import type { RootStackParamList } from '../../navigation/RootNavigator';
import { colors } from '../../theme/colors';
import { spacing } from '../../theme/spacing';
import { typography } from '../../theme/typography';
import { bookings } from './booking.types';

type Props = NativeStackScreenProps<RootStackParamList, 'Bookings'>;

export default function BookingsScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>JD</Text>
        </View>
      </View>

      <Text style={styles.title}>Bookings</Text>

      <View style={styles.list}>
        {bookings.map((booking) => (
          <Pressable
            key={booking.id}
            accessibilityRole="button"
            accessibilityLabel={`Open booking for ${booking.vehicleName}`}
            style={({ pressed }) => [styles.bookingCard, pressed && styles.bookingCardPressed]}
            onPress={() => navigation.navigate('BookingDetails', { bookingId: booking.id })}
          >
            <Image
              source={require('../map/assets/car-placeholder.png')}
              style={styles.vehicleImage}
              resizeMode="contain"
            />
            <View style={styles.bookingContent}>
              <View style={styles.bookingTopRow}>
                <Text numberOfLines={1} style={styles.vehicleName}>
                  {booking.vehicleName}
                </Text>
                <Text style={[styles.status, { color: booking.statusColor }]}>
                  {booking.status}
                </Text>
              </View>
              <Text style={styles.rate}>{booking.dailyRate} kr/day</Text>
              <View style={styles.dateRow}>
                <Text style={styles.dateText}>
                  {booking.startDate} - {booking.endDate}
                </Text>
                <Text style={styles.duration}>({booking.duration})</Text>
              </View>
            </View>
            <Ionicons name="chevron-forward" size={17} color="#8B9092" />
          </Pressable>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.bookingScreenPadding,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingHorizontal: spacing.bookingScreenPadding,
    paddingTop: 3,
  },
  avatar: {
    alignItems: 'center',
    backgroundColor: colors.bookingAvatar,
    borderColor: colors.bookingAvatarBorder,
    borderRadius: 16,
    borderWidth: 2,
    height: 32,
    justifyContent: 'center',
    width: 32,
  },
  avatarText: {
    color: colors.white,
    fontSize: 10,
    fontWeight: '800',
  },
  title: {
    color: colors.bookingDetailsText,
    ...typography.bookingTitle,
    marginBottom: 11,
    marginTop: 15,
    paddingHorizontal: 7,
  },
  list: {
    gap: spacing.bookingCardGap,
  },
  bookingCard: {
    alignItems: 'center',
    backgroundColor: colors.bookingCardBackground,
    borderRadius: 10,
    flexDirection: 'row',
    minHeight: 58,
    paddingHorizontal: spacing.bookingCardPadding,
    paddingVertical: 4,
  },
  bookingCardPressed: {
    opacity: 0.72,
  },
  vehicleImage: {
    backgroundColor: colors.bookingImageBackground,
    borderRadius: 7,
    height: 48,
    width: 80,
  },
  bookingContent: {
    flex: 1,
    marginLeft: spacing.bookingContentGap,
    minWidth: 0,
  },
  bookingTopRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 5,
  },
  vehicleName: {
    color: colors.bookingText,
    flex: 1,
    ...typography.bookingVehicle,
  },
  status: {
    fontSize: 7,
    fontWeight: '800',
    maxWidth: 59,
    textAlign: 'right',
  },
  rate: {
    color: colors.bookingAccent,
    ...typography.bookingRate,
    marginTop: 2,
  },
  dateRow: {
    alignItems: 'center',
    flexDirection: 'row',
    gap: 3,
    marginTop: 2,
  },
  dateText: {
    color: colors.bookingMutedText,
    ...typography.bookingMeta,
  },
  duration: {
    color: colors.bookingMutedText,
    fontSize: 7,
  },
});