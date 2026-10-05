import { useState } from 'react';
import { router } from 'expo-router';
import { StyleSheet, Text, TextInput } from 'react-native';
import Button from '../../../components/Button';
import Screen from '../../../components/Screen';

export default function ForgotPasswordScreen() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  function sendResetLink() {
    if (!email.trim()) {
      setMessage('Indtast din e-mailadresse først.');
      return;
    }

    setMessage('Hvis adressen findes, modtager du et link til at nulstille din adgangskode.');
  }

  return (
    <Screen
      title="Glemt adgangskode?"
      description="Skriv din e-mailadresse, så kan du få hjælp til at nulstille adgangskoden."
    >
      <TextInput
        accessibilityLabel="E-mailadresse"
        autoCapitalize="none"
        autoComplete="email"
        keyboardType="email-address"
        onChangeText={setEmail}
        placeholder="E-mailadresse"
        style={styles.input}
        value={email}
      />
      <Button title="Send nulstillingslink" onPress={sendResetLink} />
      {message ? <Text accessibilityLiveRegion="polite" style={styles.message}>{message}</Text> : null}
      <Button title="Tilbage til login" onPress={() => router.replace('/login')} />
    </Screen>
  );
}

const styles = StyleSheet.create({
  input: {
    minHeight: 48,
    borderWidth: 1,
    borderColor: '#cbd5e1',
    borderRadius: 12,
    paddingHorizontal: 14,
    backgroundColor: '#ffffff',
    fontSize: 16,
  },
  message: { color: '#334155', fontSize: 15, lineHeight: 22 },
});
