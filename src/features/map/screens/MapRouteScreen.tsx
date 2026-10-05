import React from 'react';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';

import BottomNavigation from '../../../components/BottomNavigation';
import SettingsIcon from '../../../components/SettingsIcon';
import { mockCars } from '../../../data/mockCars';
import type { RootStackParamList } from '../../../navigation/RootNavigator';
import { MapScreen } from './MapScreen';

type Props = NativeStackScreenProps<RootStackParamList, 'Map'>;

export default function MapRouteScreen({ navigation }: Props) {
  return (
    <MapScreen
      cars={mockCars}
      onOpenCar={(car) => navigation.navigate('CarDetails', { id: car.id })}
      headerRight={<SettingsIcon onPress={() => navigation.navigate('Settings')} />}
      footer={
        <BottomNavigation
          onSearch={() => navigation.navigate('Search')}
          onMap={() => navigation.navigate('Map')}
          onBookings={() => navigation.navigate('Bookings')}
        />
      }
    />
  );
}
