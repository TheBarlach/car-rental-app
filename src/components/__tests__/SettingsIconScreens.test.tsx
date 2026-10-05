import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import MapRouteScreen from '../../features/map/screens/MapRouteScreen';
import BookingsScreen from '../../features/bookings/screens/BookingsScreen';

type AnyScreen = React.ComponentType<{ navigation: never; route: never }>;

// AdminScreen is covered by its own "profile-button" test.
const screens: [string, AnyScreen][] = [
  ['Map', MapRouteScreen as unknown as AnyScreen],
  ['Bookings', BookingsScreen as unknown as AnyScreen],
];

describe.each(screens)('%s screen settings icon', (routeName, Screen) => {
  it('is rendered and opens Settings', async () => {
    const navigation = { navigate: jest.fn(), replace: jest.fn(), goBack: jest.fn() };
    const screen = await render(
      <Screen
        navigation={navigation as never}
        route={{ key: routeName, name: routeName } as never}
      />,
    );

    const icon = screen.getByLabelText('Open settings');
    expect(icon).toBeTruthy();

    await fireEvent.press(icon);
    expect(navigation.navigate).toHaveBeenCalledWith('Settings');
  });
});
