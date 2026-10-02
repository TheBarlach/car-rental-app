import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import SettingsScreen from '../features/settings/screens/SettingsScreen';
import AdminScreen from '../features/admin/screens/AdminScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
  Settings: undefined;

  Search: undefined;
  Map: undefined;
  Bookings: undefined;

  AdminPage: undefined;

  CarSettings: {
    carId: string;
  };

  PersonalInformation: undefined;
  DriversLicense: undefined;
  PaymentMethods: undefined;
  MyBooking: undefined;
  Notifications: undefined;
  HelpSupport: undefined;
  About: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen
          name="Login"
          component={LoginScreen}
        />

        <Stack.Screen
          name="Register"
          component={RegisterScreen}
        />

        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPasswordScreen}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />

        <Stack.Screen
          name="AdminPage"
          component={AdminScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}