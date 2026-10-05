import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'MyBooking'>;

export default function MyBookingsScreen({ navigation }: Props) {
  return (
    <Screen title="My bookings" description="Your bookings will be shown here. This is a demo page.">
      <Button title="Find a car" onPress={() => navigation.navigate('Search')} />
    </Screen>
  );
}
