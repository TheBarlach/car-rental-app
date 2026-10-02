import { render, screen, userEvent } from '@testing-library/react-native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

import { EntryScreen } from '../src/features/entry/screens/EntryScreen';
import type { RootStackParamList } from '../src/navigation/RootNavigator';

const makeNavigation = (navigate = jest.fn()) =>
  ({
    navigate,
  }) as unknown as NativeStackNavigationProp<RootStackParamList, 'Entry'>;

describe('EntryScreen', () => {
  it('forklarer at startskærmen endnu ikke er valgt', async () => {
    await render(<EntryScreen />);

    expect(screen.getByText('Choose a start screen')).toBeTruthy();
    expect(screen.getByText(/feature\/auth-screens/)).toBeTruthy();
  });

  it('viser bundnavigation uden at markere nogen fane som valgt', async () => {
    await render(<EntryScreen />);

    expect(screen.getByRole('tab', { name: 'Search' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Map' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Bookings' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Search' })).not.toBeSelected();
  });

  it('navigerer til Search når Search-fanen trykkes', async () => {
    const navigate = jest.fn();
    const user = userEvent.setup();

    await render(<EntryScreen navigation={makeNavigation(navigate)} />);
    await user.press(screen.getByRole('tab', { name: 'Search' }));

    expect(navigate).toHaveBeenCalledWith('Search');
  });

  it('sender også de andre faner til Search', async () => {
    const navigate = jest.fn();
    const user = userEvent.setup();

    await render(<EntryScreen navigation={makeNavigation(navigate)} />);
    await user.press(screen.getByRole('tab', { name: 'Map' }));
    await user.press(screen.getByRole('tab', { name: 'Bookings' }));

    expect(navigate).toHaveBeenCalledTimes(2);
    expect(navigate).toHaveBeenCalledWith('Search');
  });
});
