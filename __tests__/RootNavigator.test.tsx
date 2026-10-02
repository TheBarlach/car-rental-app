import { render, screen, userEvent } from '@testing-library/react-native';

import { RootNavigator } from '../src/navigation/RootNavigator';

describe('RootNavigator', () => {
  it('starter på Entry-pladsholderen, ikke på Search', async () => {
    await render(<RootNavigator />);

    expect(screen.getByText('Choose a start screen')).toBeTruthy();
    expect(screen.queryByText('Search for a car')).toBeNull();
  });

  it('markerer ingen fane som valgt på Entry', async () => {
    await render(<RootNavigator />);

    expect(screen.getByRole('tab', { name: 'Search' })).not.toBeSelected();
    expect(screen.getByRole('tab', { name: 'Map' })).not.toBeSelected();
    expect(screen.getByRole('tab', { name: 'Bookings' })).not.toBeSelected();
  });

  it('når Search fra Entry via Search-fanen', async () => {
    const user = userEvent.setup();
    await render(<RootNavigator />);

    await user.press(screen.getByRole('tab', { name: 'Search' }));

    expect(screen.getByText('Search for a car')).toBeTruthy();
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
