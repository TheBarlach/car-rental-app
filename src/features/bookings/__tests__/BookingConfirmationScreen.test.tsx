import React from 'react';
import {
  fireEvent,
  render,
} from '@testing-library/react-native';

import BookingConfirmationScreen from '../screens/BookingConfirmationScreen';
import { mockCars } from '../../../data/mockCars';

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

  it('navigates to the map when Back to home is pressed', async () => {
    const { getByText } = await renderScreen();

    await fireEvent.press(
      getByText('Back to home'),
    );

    expect(mockNavigate).toHaveBeenCalledWith('Map');
  });
});
describe('BookingConfirmationScreen with booking data', () => {
  it('shows the car that was booked', async () => {
    const car = mockCars[1];

    const { getByText, queryByText } = await render(
      <BookingConfirmationScreen
        navigation={mockNavigation}
        route={{
          params: {
            car,
            startDate: new Date(2026, 0, 10).toISOString(),
            endDate: new Date(2026, 0, 12).toISOString(),
          },
        }}
      />,
    );

    expect(getByText(car.name)).toBeTruthy();
    expect(getByText(`Registration number ${car.registrationNumber}`)).toBeTruthy();
    expect(getByText(`${car.pricePerDay} kr/day`)).toBeTruthy();
    expect(getByText(car.location!.name)).toBeTruthy();
    expect(queryByText('VW Golf VIII 1.5 eTSI')).toBeNull();
  });
});
