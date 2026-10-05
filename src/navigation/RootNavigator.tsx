import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';

import BookingConfirmationScreen from '../features/bookings/screens/BookingConfirmationScreen';

import SettingsScreen from '../features/settings/screens/SettingsScreen';

import AdminScreen from '../features/admin/screens/AdminScreen';
import AddCarScreen from '../features/admin/screens/AddCarScreen';
import CarSettingsScreen from '../features/admin/screens/CarSettingsScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;

  BookingConfirmation: undefined;

  Settings: undefined;

  Search: undefined;
  Map: undefined;
  Bookings: undefined;

  AdminPage: undefined;
  AddCar: undefined;

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
        screenOptions={{
          headerShown: false,
        }}
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
          name="BookingConfirmation"
          component={BookingConfirmationScreen}
        />

        <Stack.Screen
          name="Settings"
          component={SettingsScreen}
        />

        <Stack.Screen
          name="AdminPage"
          component={AdminScreen}
        />

        <Stack.Screen
          name="AddCar"
          component={AddCarScreen}
        />

        <Stack.Screen
          name="CarSettings"
          component={CarSettingsScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}