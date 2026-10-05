import { router } from 'expo-router';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';

export default function RegisterScreen() {
  return (
    <Screen title="Opret konto" description="Her vil registreringsformularen være. Der oprettes ingen konto i denne demo.">
      <Button title="Log ind" onPress={() => router.navigate('/login')} />
      <Button title="Til biloversigten" onPress={() => router.navigate('/')} />
    </Screen>
  );
}
