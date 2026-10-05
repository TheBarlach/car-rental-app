import { router, useLocalSearchParams } from 'expo-router';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';

export default function CreateBookingScreen() {
  const { carId } = useLocalSearchParams<{ carId?: string }>();
  return (
    <Screen title="Book bil" description={`Her vil bookingformularen være. Bil-ID: ${carId ?? 'Ingen bil valgt'}. Der oprettes ingen booking i denne demo.`}>
      <Button
        title="Gå til betaling"
        onPress={() =>
          router.push({ pathname: '/bookings/payment', params: { carId: carId ?? '' } })
        }
      />
      <Button title="Se mine bookinger" onPress={() => router.navigate('/(tabs)/bookings')} />
      <Button title="Til biloversigten" onPress={() => router.navigate('/')} />
    </Screen>
  );
}
