import { router } from 'expo-router';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';

export default function MyBookingsScreen() {
  return (
    <Screen title="Mine bookinger" description="Her vil dine bookinger blive vist. Dette er en demoside.">
      <Button title="Find en bil" onPress={() => router.navigate('/')} />
    </Screen>
  );
}
