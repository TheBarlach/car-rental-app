import { render, screen } from '@testing-library/react-native';

import { BottomNavigation } from '../src/navigation/BottomNavigation';

describe('BottomNavigation', () => {
  it('viser alle tre tabs', async () => {
    await render(<BottomNavigation activeTab="search" />);

    expect(screen.getByRole('tab', { name: 'Search' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Map' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Bookings' })).toBeTruthy();
  });

  it('markerer den aktive tab som valgt', async () => {
    await render(<BottomNavigation activeTab="map" />);

    expect(screen.getByRole('tab', { name: 'Map' }).props.accessibilityState).toEqual({
      selected: true,
    });
    expect(screen.getByRole('tab', { name: 'Search' }).props.accessibilityState).toEqual({
      selected: false,
    });
  });

  it('er statisk og kalder ikke onTabPress uden et tryk', async () => {
    const spy = jest.fn();

    await render(<BottomNavigation activeTab="search" onTabPress={spy} />);

    expect(spy).not.toHaveBeenCalled();
  });
});