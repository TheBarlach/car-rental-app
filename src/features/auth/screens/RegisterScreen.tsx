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
import Checkbox from '../../../components/Checkbox';

import { colors } from '../../../theme/colors';
import { spacing } from '../../../theme/spacing';
import { typography } from '../../../theme/typography';

import type { RootStackParamList } from '../../../navigation/RootNavigator';

type Props = NativeStackScreenProps<RootStackParamList, 'Register'>;

type Errors = {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  terms?: string;
};

export default function RegisterScreen({ navigation }: Props) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(false);

  const [errors, setErrors] = useState<Errors>({});
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const next: Errors = {};

    if (!name.trim()) {
      next.name = 'Name is required';
    }

    if (!email.trim()) {
      next.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      next.email = 'Enter a valid email';
    }

    if (!password) {
      next.password = 'Password is required';
    } else if (password.length < 6) {
      next.password = 'Password must be at least 6 characters';
    }

    if (!confirmPassword) {
      next.confirmPassword = 'Please confirm your password';
    } else if (confirmPassword !== password) {
      next.confirmPassword = 'Passwords do not match';
    }

    if (!acceptTerms) {
      next.terms = 'You must accept the terms and conditions';
    }

    setErrors(next);

    return Object.keys(next).length === 0;
  };

  const handleSignUp = async () => {
    if (!validate()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: connect to authService.register({
      //   name,
      //   email,
      //   password,
      //   acceptNewsletter,
      // })

      console.log('Sign up', {
        name,
        email,
        acceptNewsletter,
      });

      navigation.replace('Map');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Screen>
      <Image
        source={require('../../../../assets/images/logo.png')}
        style={styles.logo}
        resizeMode="contain"
      />

      <Text style={styles.title}>Sign up</Text>

      <View style={styles.form}>
        <Input
          label="Name"
          icon="person-outline"
          placeholder="Enter name"
          value={name}
          onChangeText={setName}
          autoCapitalize="words"
          autoComplete="name"
          error={errors.name}
        />

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

        <Input
          label="Confirm Password"
          icon="lock-closed-outline"
          placeholder="Confirm password"
          value={confirmPassword}
          onChangeText={setConfirmPassword}
          secureTextEntry
          error={errors.confirmPassword}
        />

        <Checkbox
          label="I accept terms and conditions"
          required
          checked={acceptTerms}
          onToggle={() => setAcceptTerms((value) => !value)}
          error={errors.terms}
        />

        <Checkbox
          label="I accept to get newsletters and offers"
          checked={acceptNewsletter}
          onToggle={() => setAcceptNewsletter((value) => !value)}
        />

        <View style={styles.buttonWrapper}>
          <Button
            title="Sign Up"
            onPress={handleSignUp}
            loading={loading}
          />
        </View>
      </View>

      <View style={styles.footer}>
        <Text style={styles.footerText}>
          Already have an account?{' '}
        </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.link}>Sign in</Text>
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
    marginTop: spacing.lg,
    marginBottom: spacing.lg,
  },

  form: {
    marginTop: spacing.sm,
  },

  buttonWrapper: {
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