import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import MapRouteScreen from '../../features/map/screens/MapRouteScreen';
import CarListScreen from '../../features/cars/screens/CarListScreen';
import BookingsScreen from '../../features/bookings/screens/BookingsScreen';

type AnyScreen = React.ComponentType<{ navigation: never; route: never }>;

const screens: [string, AnyScreen, string][] = [
  ['Map', MapRouteScreen as unknown as AnyScreen, 'Map'],
  ['Search', CarListScreen as unknown as AnyScreen, 'Search'],
  ['Bookings', BookingsScreen as unknown as AnyScreen, 'Bookings'],
];

describe.each(screens)('%s screen bottom navigation', (_, Screen, routeName) => {
  async function setup() {
    const navigation = { navigate: jest.fn(), replace: jest.fn(), goBack: jest.fn() };
    const utils = await render(
      <Screen
        navigation={navigation as never}
        route={{ key: routeName, name: routeName } as never}
      />,
    );
    return { navigation, ...utils };
  }

  // The nav items are the last matches; the Bookings screen also has a "Bookings" title.
  const navItem = (utils: Awaited<ReturnType<typeof setup>>, label: string) =>
    utils.getAllByText(label).at(-1)!;

  it('shows Search, Map and Bookings', async () => {
    const utils = await setup();
    expect(navItem(utils, 'Search')).toBeTruthy();
    expect(navItem(utils, 'Map')).toBeTruthy();
    expect(navItem(utils, 'Bookings')).toBeTruthy();
  });

  it('navigates to the matching routes', async () => {
    const utils = await setup();
    await fireEvent.press(navItem(utils, 'Search'));
    expect(utils.navigation.navigate).toHaveBeenCalledWith('Search');
    await fireEvent.press(navItem(utils, 'Map'));
    expect(utils.navigation.navigate).toHaveBeenCalledWith('Map');
    await fireEvent.press(navItem(utils, 'Bookings'));
    expect(utils.navigation.navigate).toHaveBeenCalledWith('Bookings');
  });
});
