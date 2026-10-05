import React from 'react';
import {
  fireEvent,
  render,
  screen,
} from '@testing-library/react-native';

import SettingsScreen from '../src/features/settings/screens/SettingsScreen';

describe('SettingsScreen', () => {
  const mockNavigate = jest.fn();

  const navigation = {
    navigate: mockNavigate,
  } as any;

  const route = {
    key: 'Settings-test',
    name: 'Settings',
  } as any;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  const renderScreen = async () => {
    await render(
      <SettingsScreen
        navigation={navigation}
        route={route}
      />,
    );
  };

  it('renders the settings page title', async () => {
    await renderScreen();

    expect(screen.getByText('Settings')).toBeTruthy();
  });

  it('renders the user information', async () => {
    await renderScreen();

    expect(screen.getByText('Maria Mikkelsen')).toBeTruthy();
    expect(
      screen.getByText('maria.mikkelsen@gmail.com'),
    ).toBeTruthy();
  });

  it('renders the main settings options', async () => {
    await renderScreen();

    expect(screen.getByText('Admin Page')).toBeTruthy();
    expect(screen.getByText('Personal Information')).toBeTruthy();
    expect(screen.getByText("Driver's License")).toBeTruthy();
    expect(screen.getByText('Payment Methods')).toBeTruthy();
    expect(screen.getByText('My Booking')).toBeTruthy();
    expect(screen.getByText('Notifications')).toBeTruthy();
    expect(screen.getByText('Help & Support')).toBeTruthy();
    expect(screen.getByText('About Drive On The Go')).toBeTruthy();
  });

  it('navigates to admin page when pressed', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByText('Admin Page'));

    expect(mockNavigate).toHaveBeenCalledWith('AdminPage');
  });

  it('navigates to personal information when pressed', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByText('Personal Information'));

    expect(mockNavigate).toHaveBeenCalledWith('PersonalInformation');
  });

  it('navigates to driver license when pressed', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByText("Driver's License"));

    expect(mockNavigate).toHaveBeenCalledWith('DriversLicense');
  });

  it('navigates to payment methods when pressed', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByText('Payment Methods'));

    expect(mockNavigate).toHaveBeenCalledWith('PaymentMethods');
  });

  it('navigates to bookings when My Booking is pressed', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByText('My Booking'));

    expect(mockNavigate).toHaveBeenCalledWith('MyBooking');
  });

  it('renders the notification switch', async () => {
    await renderScreen();

    expect(screen.getByRole('switch')).toBeTruthy();
  });

  it('navigates to help and support when pressed', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByText('Help & Support'));

    expect(mockNavigate).toHaveBeenCalledWith('HelpSupport');
  });

  it('navigates to about when pressed', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByText('About Drive On The Go'));

    expect(mockNavigate).toHaveBeenCalledWith('About');
  });

  it('navigates to login when logout is pressed', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByText('Log Out'));

    expect(mockNavigate).toHaveBeenCalledWith('Login');
  });

  it('renders the bottom navigation', async () => {
    await renderScreen();

    expect(screen.getByText('Search')).toBeTruthy();
    expect(screen.getByText('Map')).toBeTruthy();
    expect(screen.getByText('Bookings')).toBeTruthy();
  });

  it('uses the bottom navigation correctly', async () => {
    await renderScreen();

    await fireEvent.press(screen.getByText('Search'));
    expect(mockNavigate).toHaveBeenCalledWith('Search');

    await fireEvent.press(screen.getByText('Map'));
    expect(mockNavigate).toHaveBeenCalledWith('Map');

    await fireEvent.press(screen.getByText('Bookings'));
    expect(mockNavigate).toHaveBeenCalledWith('Bookings');
  });
});