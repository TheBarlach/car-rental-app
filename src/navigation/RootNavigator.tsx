import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen, {
  AuthStackParamList,
} from '../features/auth/screens/LoginScreen';

import RegisterScreen from '../features/auth/screens/RegisterScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import BookingConfirmationScreen from '../features/bookings/screens/BookingConfirmationScreen';

const Stack = createNativeStackNavigator<AuthStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="BookingConfirmation"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />
        <Stack.Screen
          name="BookingConfirmation"
          component={BookingConfirmationScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}