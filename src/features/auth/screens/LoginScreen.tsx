import { router } from 'expo-router';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';

export default function LoginScreen() {
  return (
    <Screen title="Log ind" description="Her vil loginformularen være. Dette er en demoside uden loginfunktion.">
      <Button title="Log ind" onPress={() => router.replace('/(tabs)')} />
      <Button title="Opret konto" onPress={() => router.push('/register')} />
      <Button title="Glemt adgangskode?" onPress={() => router.push('/forgotpassword')} />

    </Screen>
  );
}
