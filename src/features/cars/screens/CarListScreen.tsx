import { router } from 'expo-router';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';

export default function CarListScreen() {
  return (
    <Screen title="Biler" description="Tryk på knapperne for at prøve appens forskellige skærme.">
      <Button title="Se bildetaljer" onPress={() => router.push('/cars/car-002')} />
      <Button title="Book en bil" onPress={() => router.push({ pathname: '/bookings/create', params: { carId: 'demo' } })} />
      <Button title="Mine bookinger" onPress={() => router.navigate('/(tabs)/bookings')} />
    </Screen>
  );
}
