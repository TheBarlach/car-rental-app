import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react-native';

import BookingConfirmationScreen from '../src/features/bookings/screens/BookingConfirmationScreen';

const mockNavigate = jest.fn();

const mockNavigation = {
  navigate: mockNavigate,
};

const renderScreen = async () => {
  return await render(
    <BookingConfirmationScreen
      navigation={mockNavigation}
    />,
  );
};

describe('BookingConfirmationScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the booking confirmation title', async () => {
    const { getByText } = await renderScreen();

    expect(getByText('Booking Confirmed!')).toBeTruthy();
  });

  it('renders the confirmation message', async () => {
    const { getByText } = await renderScreen();

    expect(
      getByText(
        "Your car has been reserved. We've sent a confirmation email with all the details.",
      ),
    ).toBeTruthy();
  });

  it('renders the booking information section', async () => {
    const { getAllByText } = await renderScreen();

    expect(getAllByText('Booking ID').length).toBeGreaterThan(0);
  });

  it('renders the View My Bookings button', async () => {
    const { getByText } = await renderScreen();

    expect(getByText('View My Bookings')).toBeTruthy();
  });

  it('renders the Back to home button', async () => {
    const { getByText } = await renderScreen();

    expect(getByText('Back to home')).toBeTruthy();
  });

  it('navigates to bookings when View My Bookings is pressed', async () => {
    const { getByText } = await renderScreen();

    await fireEvent.press(
      getByText('View My Bookings'),
    );

    expect(mockNavigate).toHaveBeenCalledWith('Bookings');
  });

  it('navigates to home when Back to home is pressed', async () => {
    const { getByText } = await renderScreen();

    await fireEvent.press(
      getByText('Back to home'),
    );

    expect(mockNavigate).toHaveBeenCalledWith('Home');
  });
});