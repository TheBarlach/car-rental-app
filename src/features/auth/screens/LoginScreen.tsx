import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import Screen from '../../../components/Screen';
import Input from '../../../components/Input';
import Button from '../../../components/Button';

import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Login'>;

export default function LoginScreen({ navigation }: Props) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [errors, setErrors] = useState<{
    email?: string;
    password?: string;
  }>({});

  const validate = () => {
    const next: {
      email?: string;
      password?: string;
    } = {};

    if (!email.trim()) {
      next.email = 'Email is required';
    }

    if (!password) {
      next.password = 'Password is required';
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSignIn = async () => {
    if (!validate()) {
      return;
    }

    // TODO: connect to authService.login(email, password).
    // Until then any non-empty email and password signs the user in.
    navigation.replace('Map');
  };

  return (
    <Screen>
      <Image
        source={require('../../../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Hello Welcome!</Text>

      <View style={styles.form}>
        <Input
          label="Email"
          icon="mail-outline"
          placeholder="Enter email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoComplete="email"
          error={errors.email}
        />

        <Input
          label="Password"
          icon="lock-closed-outline"
          placeholder="Enter password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
          error={errors.password}
        />

        <TouchableOpacity
          style={styles.forgot}
          onPress={() => navigation.navigate('ForgotPassword')}
        >
          <Text style={styles.link}>Forgot password?</Text>
        </TouchableOpacity>

        <Button
          title="Sign In"
          onPress={handleSignIn}
        />
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          {"Don't have an account? "}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Register')}
        >
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View>
    </Screen>
  );
}

const styles = StyleSheet.create({
  logo: {
    width: 120,
    height: 60,
    alignSelf: 'center',
    marginTop: spacing.sm,
  },

  title: {
    ...typography.title,
    color: colors.text,
    textAlign: 'center',
    marginTop: spacing.xxl,
    marginBottom: spacing.xl,
  },

  form: {
    marginTop: spacing.lg,
  },

  forgot: {
    alignSelf: 'flex-end',
    marginBottom: spacing.lg,
    marginTop: spacing.sm,
  },

  link: {
    color: colors.primary,
    fontSize: 16,
  },

  footer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 'auto',
    paddingTop: spacing.xl,
  },

  footerText: {
    fontSize: 16,
    color: colors.text,
  },
});