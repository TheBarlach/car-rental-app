import { useEffect, useState } from 'react';
import { router, useLocalSearchParams } from 'expo-router';
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from 'react-native';

import { getCarById } from '../../cars/carService';
import type { Car } from '../../cars/carService';

type PaymentMethod = 'card' | 'paypal' | 'applePay';
const rentalDays = 6;
const serviceFee = 150;

export default function PaymentScreen() {
  const { carId } = useLocalSearchParams<{ carId?: string }>();
  const [car, setCar] = useState<Car | null>(null);
  const [loading, setLoading] = useState(true);
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('card');
  const [paymentComplete, setPaymentComplete] = useState(false);
  const [startDate] = useState(() => new Date());
  const [endDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + rentalDays);
    return date;
  });

  useEffect(() => {
    let active = true;

    async function loadCar() {
      try {
        const result = await getCarById(carId ?? 'car-001');
        if (active) setCar(result);
      } finally {
        if (active) setLoading(false);
      }
    }

    loadCar();
    return () => {
      active = false;
    };
  }, [carId]);

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator size="large" color="#6266e9" />
      </SafeAreaView>
    );
  }

  if (!car) {
    return (
      <SafeAreaView style={styles.loading}>
        <Text style={styles.error}>The selected car could not be found.</Text>
        <Pressable onPress={() => router.back()}>
          <Text style={styles.backLink}>Go back</Text>
        </Pressable>
      </SafeAreaView>
    );
  }

  const subtotal = car.pricePerDay * rentalDays;
  const total = subtotal + serviceFee;

  return (
    <SafeAreaView style={styles.screen}>
      <View style={styles.header}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back" onPress={() => router.back()} hitSlop={12}>
          <Text style={styles.backArrow}>‹</Text>
        </Pressable>
        <Text style={styles.headerTitle}>Payment</Text>
        <View style={styles.headerSpacer} />
      </View>

      <ScrollView contentContainerStyle={styles.content}>
        <View style={styles.carSummary}>
          <View style={styles.carImagePlaceholder}>
            <Text style={styles.carEmoji}>🚘</Text>
          </View>
          <View style={styles.carInfo}>
            <Text numberOfLines={1} style={styles.carName}>{car.name}</Text>
            <Text style={styles.carPrice}>{car.pricePerDay} kr/day</Text>
            <Text style={styles.dateText}>
              {formatDate(startDate)} - {formatDate(endDate)} ({rentalDays} days)
            </Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Payment Method</Text>
        <View style={styles.methodsCard}>
          <Pressable
            accessibilityRole="radio"
            accessibilityState={{ selected: paymentMethod === 'card' }}
            onPress={() => setPaymentMethod('card')}
            style={styles.cardMethod}
          >
            <View style={styles.methodTitleRow}>
              <Radio selected={paymentMethod === 'card'} />
              <Text style={styles.methodIcon}>▰</Text>
              <Text style={styles.methodTitle}>Credit or Debit Card</Text>
            </View>
            {paymentMethod === 'card' && (
              <View style={styles.cardFields}>
                <Text style={styles.fieldLabel}>Card Number</Text>
                <TextInput
                  accessibilityLabel="Card number"
                  keyboardType="number-pad"
                  placeholder="1234 5678 9012 3456"
                  placeholderTextColor="#b9bdc7"
                  style={styles.input}
                />
                <View style={styles.smallFieldsRow}>
                  <View style={styles.smallField}>
                    <Text style={styles.fieldLabel}>Expiry Date</Text>
                    <TextInput
                      accessibilityLabel="Expiry date"
                      placeholder="MM / YY"
                      placeholderTextColor="#b9bdc7"
                      style={styles.input}
                    />
                  </View>
                  <View style={styles.smallField}>
                    <Text style={styles.fieldLabel}>CVC</Text>
                    <TextInput
                      accessibilityLabel="CVC"
                      keyboardType="number-pad"
                      placeholder="123"
                      placeholderTextColor="#b9bdc7"
                      secureTextEntry
                      style={styles.input}
                    />
                  </View>
                </View>
              </View>
            )}
          </Pressable>
          <PaymentMethodRow
            label="PayPal"
            mark="ℙ"
            selected={paymentMethod === 'paypal'}
            onPress={() => setPaymentMethod('paypal')}
          />
          <PaymentMethodRow
            label="Pay"
            mark="●"
            selected={paymentMethod === 'applePay'}
            onPress={() => setPaymentMethod('applePay')}
          />
        </View>

        <View style={styles.orderSummary}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <SummaryRow label={`${car.pricePerDay} kr x ${rentalDays} days`} value={`${subtotal} kr`} />
          <SummaryRow label="Service fee" value={`${serviceFee} kr`} />
          <View style={styles.divider} />
          <View style={styles.totalRow}>
            <Text style={styles.totalLabel}>Total (DKK)</Text>
            <Text style={styles.totalAmount}>{total} kr</Text>
          </View>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {paymentComplete ? (
          <Text accessibilityLiveRegion="polite" style={styles.confirmation}>
            Demo payment complete. No money has been charged.
          </Text>
        ) : (
          <Pressable
            accessibilityRole="button"
            onPress={() => setPaymentComplete(true)}
            style={({ pressed }) => [styles.payButton, pressed && styles.pressed]}
          >
            <Text style={styles.payButtonText}>Pay Now  ♙</Text>
          </Pressable>
        )}
      </View>
    </SafeAreaView>
  );
}

function formatDate(date: Date) {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function Radio({ selected }: { selected: boolean }) {
  return <View style={[styles.radio, selected && styles.radioSelected]} />;
}

function PaymentMethodRow({
  label,
  mark,
  selected,
  onPress,
}: {
  label: string;
  mark: string;
  selected: boolean;
  onPress: () => void;
}) {
  return (
    <Pressable
      accessibilityRole="radio"
      accessibilityState={{ selected }}
      onPress={onPress}
      style={styles.methodRow}
    >
      <Radio selected={selected} />
      <Text style={[styles.paymentMark, label === 'PayPal' && styles.paypalMark]}>{mark}</Text>
      <Text style={[styles.methodTitle, selected && styles.selectedMethodText]}>{label}</Text>
    </Pressable>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <View style={styles.summaryRow}>
      <Text style={styles.summaryLabel}>{label}</Text>
      <Text style={styles.summaryValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: { flex: 1, backgroundColor: '#ffffff' },
  loading: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 16, backgroundColor: '#ffffff' },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  backArrow: { width: 32, fontSize: 34, lineHeight: 38, color: '#17191f' },
  headerTitle: { fontSize: 27, fontWeight: '700', color: '#17191f' },
  headerSpacer: { width: 32 },
  content: { paddingHorizontal: 20, paddingBottom: 16 },
  carSummary: { flexDirection: 'row', alignItems: 'center', gap: 10, marginTop: 12, marginBottom: 18 },
  carImagePlaceholder: {
    width: 118,
    height: 64,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 9,
    backgroundColor: '#e8eaf0',
  },
  carEmoji: { fontSize: 42 },
  carInfo: { flex: 1, gap: 4 },
  carName: { fontSize: 13, fontWeight: '700', color: '#17191f' },
  carPrice: { fontSize: 14, fontWeight: '700', color: '#6266e9' },
  dateText: { fontSize: 11, color: '#8990a0' },
  sectionTitle: { marginBottom: 14, fontSize: 18, fontWeight: '700', color: '#17191f' },
  methodsCard: { overflow: 'hidden', borderWidth: 1, borderColor: '#c9ced8', borderRadius: 16 },
  cardMethod: { paddingHorizontal: 11, paddingTop: 11, paddingBottom: 10 },
  methodTitleRow: { minHeight: 24, flexDirection: 'row', alignItems: 'center', gap: 12 },
  radio: { width: 19, height: 19, borderRadius: 10, borderWidth: 2, borderColor: '#20232a' },
  radioSelected: { borderColor: '#6266e9', backgroundColor: '#6266e9' },
  methodIcon: { fontSize: 21, fontWeight: '700', color: '#6266e9' },
  methodTitle: { fontSize: 13, fontWeight: '600', color: '#25282d' },
  selectedMethodText: { color: '#6266e9' },
  cardFields: { gap: 5, marginTop: 13 },
  fieldLabel: { marginBottom: 3, fontSize: 11, color: '#49505d' },
  input: { height: 30, paddingHorizontal: 9, borderRadius: 6, backgroundColor: '#f0f1f4', fontSize: 12, color: '#20232a' },
  smallFieldsRow: { flexDirection: 'row', gap: 16, marginTop: 3 },
  smallField: { flex: 1 },
  methodRow: { minHeight: 38, flexDirection: 'row', alignItems: 'center', gap: 12, paddingHorizontal: 11, borderTopWidth: 1, borderColor: '#c9ced8' },
  paymentMark: { width: 20, textAlign: 'center', fontSize: 19, fontWeight: '700', color: '#17191f' },
  paypalMark: { color: '#6266e9' },
  orderSummary: { gap: 13, marginTop: 23 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between' },
  summaryLabel: { fontSize: 12, color: '#8990a0' },
  summaryValue: { fontSize: 12, color: '#8990a0' },
  divider: { height: 1, backgroundColor: '#c9ced8' },
  totalRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  totalLabel: { fontSize: 16, fontWeight: '700', color: '#17191f' },
  totalAmount: { fontSize: 16, fontWeight: '700', color: '#17191f' },
  footer: { paddingHorizontal: 20, paddingTop: 8, paddingBottom: 10, backgroundColor: '#ffffff' },
  payButton: { height: 49, alignItems: 'center', justifyContent: 'center', borderRadius: 13, backgroundColor: '#6266e9' },
  pressed: { opacity: 0.78 },
  payButtonText: { color: '#ffffff', fontSize: 17, fontWeight: '700' },
  confirmation: { padding: 12, textAlign: 'center', color: '#166534', fontSize: 14 },
  error: { color: '#991b1b', fontSize: 16 },
  backLink: { color: '#6266e9', fontSize: 16, fontWeight: '600' },
});
