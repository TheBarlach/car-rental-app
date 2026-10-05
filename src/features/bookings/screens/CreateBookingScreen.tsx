import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'CreateBooking'>;

export default function CreateBookingScreen({ navigation, route }: Props) {
  const carId = route.params?.carId;
  return (
    <Screen title="Book bil" description={`Her vil bookingformularen være. Bil-ID: ${carId ?? 'Ingen bil valgt'}. Der oprettes ingen booking i denne demo.`}>
      <Button
        title="Gå til betaling"
        onPress={() => navigation.navigate('Payment', { carId })}
      />
      <Button title="Se mine bookinger" onPress={() => navigation.navigate('MyBooking')} />
      <Button title="Til biloversigten" onPress={() => navigation.navigate('Search')} />
    </Screen>
  );
}
