import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import SettingsScreen from '../src/features/settings/screens/SettingsScreen';

describe('SettingsScreen', () => {
  const mockNavigate = jest.fn();
  const mockLogout = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderScreen = () => {
    return render(
      <SettingsScreen
        user={{
          name: 'Maria Mikkelsen',
          email: 'maria.mikkelsen@gmail.com',
        }}
        onNavigate={mockNavigate}
        onLogout={mockLogout}
      />,
    );
  };

  it('renders the settings page title', () => {
    const { getByText } = renderScreen();

    expect(getByText('Settings')).toBeTruthy();
  });

  it('renders the user information', () => {
    const { getByText } = renderScreen();

    expect(getByText('Maria Mikkelsen')).toBeTruthy();
    expect(getByText('maria.mikkelsen@gmail.com')).toBeTruthy();
  });

  it('renders the main settings options', () => {
    const { getByText } = renderScreen();

    expect(getByText('Personal Information')).toBeTruthy();
    expect(getByText("Driver's License")).toBeTruthy();
    expect(getByText('Payment Methods')).toBeTruthy();
    expect(getByText('My Booking')).toBeTruthy();
    expect(getByText('Notifications')).toBeTruthy();
    expect(getByText('Help & Support')).toBeTruthy();
    expect(getByText('About Drive On The Go')).toBeTruthy();
  });

  it('navigates to personal information when pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Personal Information'));

    expect(mockNavigate).toHaveBeenCalledWith('personal-information');
  });

  it('navigates to bookings when My Booking is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('My Booking'));

    expect(mockNavigate).toHaveBeenCalledWith('bookings');
  });

  it('can toggle notifications', () => {
    const { getByTestId } = renderScreen();

    const notificationSwitch = getByTestId('notifications-switch');

    expect(notificationSwitch.props.value).toBe(false);

    fireEvent(notificationSwitch, 'valueChange', true);

    expect(getByTestId('notifications-switch').props.value).toBe(true);
  });

  it('logs the user out when Logout is pressed', () => {
    const { getByText } = renderScreen();

    fireEvent.press(getByText('Logout'));

    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
});