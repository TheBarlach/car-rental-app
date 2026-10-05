import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen, { AuthStackParamList } from '../features/auth/screens/LoginScreen';
import RegisterScreen from '../features/auth/screens/RegisterScreen';
import ForgotPasswordScreen from '../features/auth/screens/ForgotPasswordScreen';
import BookingDetailsScreen from '../features/booking/booking_details/BookingDetailsScreen';
import BookingsScreen from '../features/booking/BookingsScreen';

export type RootStackParamList = AuthStackParamList & {
  Bookings: undefined;
  BookingDetails: { bookingId: string };
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Register" component={RegisterScreen} />
        <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} />
        <Stack.Screen name="Bookings" component={BookingsScreen} />
        <Stack.Screen name="BookingDetails" component={BookingDetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}