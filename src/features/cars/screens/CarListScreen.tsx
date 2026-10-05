import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function CarListScreen({ navigation }: Props) {
  return (
    <Screen title="Biler" description="Tryk på knapperne for at prøve appens forskellige skærme.">
      <Button title="Se bildetaljer" onPress={() => navigation.navigate('CarDetails', { id: 'car-002' })} />
      <Button title="Book en bil" onPress={() => navigation.navigate('CreateBooking', { carId: 'demo' })} />
      <Button title="Mine bookinger" onPress={() => navigation.navigate('MyBooking')} />
    </Screen>
  );
}
