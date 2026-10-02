import { render, screen, userEvent } from '@testing-library/react-native';

import { RootNavigator } from '../src/navigation/RootNavigator';

describe('RootNavigator', () => {
  it('viser søgeskærmen som startskærm', async () => {
    await render(<RootNavigator />);

    expect(screen.getByText('Search for a car')).toBeTruthy();
  });

  it('viser Search som den valgte fane', async () => {
    await render(<RootNavigator />);

    expect(screen.getByRole('tab', { name: 'Search' })).toBeSelected();
  });

  it('lader de andre faner pege på Search indtil de får egne skærme', async () => {
    const user = userEvent.setup();
    await render(<RootNavigator />);

    await user.press(screen.getByRole('tab', { name: 'Map' }));
    await user.press(screen.getByRole('tab', { name: 'Bookings' }));

    expect(screen.getByText('Search for a car')).toBeTruthy();
  });
});