import { NativeStackScreenProps } from '@react-navigation/native-stack';
import BottomNavigation from '../../../components/BottomNavigation';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Search'>;

export default function CarListScreen({ navigation }: Props) {
  return (
    <Screen
      title="Cars"
      description="Tap the buttons to try the different screens of the app."
      footer={
        <BottomNavigation
          onSearch={() => navigation.navigate('Search')}
          onMap={() => navigation.navigate('Map')}
          onBookings={() => navigation.navigate('Bookings')}
        />
      }
    >
      <Button title="See car details" onPress={() => navigation.navigate('CarDetails', { id: '3' })} />
      <Button title="Book a car" onPress={() => navigation.navigate('CreateBooking', { carId: 'demo' })} />
      <Button title="My bookings" onPress={() => navigation.navigate('MyBooking')} />
    </Screen>
  );
}
