import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';
import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'MyBooking'>;

export default function MyBookingsScreen({ navigation }: Props) {
  return (
    <Screen title="Mine bookinger" description="Her vil dine bookinger blive vist. Dette er en demoside.">
      <Button title="Find en bil" onPress={() => navigation.navigate('Search')} />
    </Screen>
  );
}
