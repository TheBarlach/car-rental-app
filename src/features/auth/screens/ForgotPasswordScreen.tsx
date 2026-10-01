import React, { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Screen from '../../../components/Screen';
import Input from '../../../components/Input';
import Button from '../../../components/Button';
import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';
import { AuthStackParamList } from './LoginScreen';

type Props = NativeStackScreenProps<AuthStackParamList, 'ForgotPassword'>;

export default function ForgotPasswordScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const validate = () => {
    let message: string | undefined;
    if (!email.trim()) message = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(email)) message = 'Enter a valid email';
    setError(message);
    return !message;
  };

  const handleSendEmail = async () => {
    if (!validate()) return;
    setLoading(true);
    try {
      // TODO: connect to authService.sendPasswordReset(email)
      await new Promise((resolve) => setTimeout(resolve, 600)); // fake delay
      console.log('Password reset requested for', email);
      setSent(true);
    } finally {
      setLoading(false);
    }
  };

  // State 2: "email sent" confirmation
  if (sent) {
    return (
      <Screen>
        <Image
          source={require('../../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />

        <View style={styles.centered}>
          <Text style={styles.sentText}>An Email have been sent to you with a reset link</Text>
          <Text style={styles.sentText}>Reset your password and login again</Text>
          <View style={styles.buttonWrapper}>
            <Button title="Go to login page" onPress={() => navigation.navigate('Login')} />
          </View>
        </View>
      </Screen>
    );
  }

  // State 1: enter email
  return (
    <Screen>
      <View>
        {/* Logo sits in the same place as on Login/Register */}
        <Image
          source={require('../../../../assets/images/logo.png')}
          style={styles.logo}
          resizeMode="contain"
        />
        {/* Back arrow floats in the top-left corner */}
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => navigation.goBack()}
          hitSlop={12}
        >
          <Ionicons name="arrow-back" size={28} color={colors.text} />
        </TouchableOpacity>
      </View>

      <View style={styles.centered}>
        <Text style={styles.title}>Forgot password</Text>
        <Text style={styles.subtitle}>
          Enter your Email to get a password reset link over mail
        </Text>

        <View style={styles.form}>
          <Input
            label="Enter Email"
            icon="mail-outline"
            placeholder="Enter email"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoComplete="email"
            error={error}
          />
          <View style={styles.buttonWrapper}>
            <Button title="Send Email" onPress={handleSendEmail} loading={loading} />
          </View>
        </View>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: { width: 120, height: 58, alignSelf: 'center', marginTop: spacing.sm },
  backButton: {
    position: 'absolute',
    left: 0,
    top: 0,
    bottom: 0,
    justifyContent: 'center',
  },
  centered: {
    flex: 1,
    justifyContent: 'center',
    paddingBottom: spacing.xxl,
  },
  title: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
  },
  subtitle: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.md,
    marginBottom: spacing.lg,
    paddingHorizontal: spacing.xl,
  },
  form: { marginTop: spacing.sm },
  buttonWrapper: { marginTop: spacing.lg },
  sentText: {
    ...typography.body,
    color: colors.text,
    textAlign: 'center',
    lineHeight: 24,
  },
});