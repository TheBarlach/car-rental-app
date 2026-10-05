import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RootNavigator from './src/navigation/RootNavigator';

export default function App() {
  return (
    <SafeAreaProvider>
      <RootNavigator />
      <StatusBar style="auto" />
    </SafeAreaProvider>
  );
}
// To test the map screen in isolation, render this instead of <RootNavigator />:
//   import { MapScreen } from './src/features/map/screens/MapScreen';
//   import { mockCars } from './src/data/mockCars';
//   return <MapScreen cars={mockCars} />;
