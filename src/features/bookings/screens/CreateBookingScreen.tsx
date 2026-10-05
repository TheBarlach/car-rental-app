import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateBooking'>;

export default function CreateBookingScreen({ navigation, route }: Props) {
  const carId = route.params?.carId;
  return (
    <Screen title="Book a car" description={`The booking form will be shown here. Car ID: ${carId ?? 'No car selected'}. No booking is created in this demo.`}>
      <Button
        title="Go to payment"
        onPress={() => navigation.navigate('Payment', { carId })}
      />
      <Button title="See my bookings" onPress={() => navigation.navigate('MyBooking')} />
      <Button title="Back to car overview" onPress={() => navigation.navigate('Search')} />
    </Screen>
  );
}
