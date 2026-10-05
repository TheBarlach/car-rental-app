import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import type { Car } from '../data/mockCars';
import LoginScreen from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';

import BookingDetailsScreen from '../features/bookings/screens/BookingDetailsScreen';
import BookingsScreen from '../features/bookings/screens/BookingsScreen';
import BookingConfirmationScreen from '../features/bookings/screens/BookingConfirmationScreen';

import MapRouteScreen from '../features/map/screens/MapRouteScreen';
import CarListScreen from '../features/cars/screens/CarListScreen';
import CarDetailsScreen from '../features/cars/screens/CarDetailsScreen';
import CreateBookingScreen from '../features/bookings/screens/CreateBookingScreen';
import PaymentScreen from '../features/bookings/screens/PaymentScreen';
import MyBookingsScreen from '../features/bookings/screens/MyBookingsScreen';

import SettingsScreen from '../features/settings/screens/SettingsScreen';

import AdminScreen from '../features/admin/screens/AdminScreen';
import AddCarScreen from '../features/admin/screens/AddCarScreen';
import CarSettingsScreen from '../features/admin/screens/CarSettingsScreen';

export type RootStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;

  BookingConfirmation: {
    car: Car;
    // ISO date strings; route params must stay serializable.
    startDate: string;
    endDate: string;
  } | undefined;

  Settings: undefined;

  Search: undefined;
  Map: undefined;
  CarDetails: { id?: string } | undefined;
  CreateBooking: { carId?: string } | undefined;
  Payment: { carId?: string; car?: Car; startDate?: string; endDate?: string } | undefined;

  Bookings: undefined;
  BookingDetails: {
    bookingId: string;
  };

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
          name="Map"
          component={MapRouteScreen}
        />

        <Stack.Screen
          name="Search"
          component={CarListScreen}
        />

        <Stack.Screen
          name="CarDetails"
          component={CarDetailsScreen}
        />

        <Stack.Screen
          name="CreateBooking"
          component={CreateBookingScreen}
        />

        <Stack.Screen
          name="Payment"
          component={PaymentScreen}
        />

        <Stack.Screen
          name="MyBooking"
          component={MyBookingsScreen}
        />

        <Stack.Screen
          name="Bookings"
          component={BookingsScreen}
        />

        <Stack.Screen
          name="BookingDetails"
          component={BookingDetailsScreen}
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