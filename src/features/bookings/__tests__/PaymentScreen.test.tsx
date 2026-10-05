import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import PaymentScreen from '../screens/PaymentScreen';
import { mockCars } from '../../../data/mockCars';

type Props = React.ComponentProps<typeof PaymentScreen>;

describe('PaymentScreen', () => {
  it('goes to the booking confirmation when Pay Now is pressed', async () => {
    const car = mockCars[0];
    const navigation = { navigate: jest.fn(), replace: jest.fn(), goBack: jest.fn() };
    const screen = await render(
      <PaymentScreen
        navigation={navigation as unknown as Props['navigation']}
        route={{ key: 'Payment', name: 'Payment', params: { car } } as Props['route']}
      />,
    );

    await fireEvent.press(screen.getByText(/Pay Now/));

    expect(navigation.replace).toHaveBeenCalledWith(
      'BookingConfirmation',
      expect.objectContaining({ car }),
    );
  });

  it('uses the dates picked on the car details page', async () => {
    const car = mockCars[0];
    const startDate = new Date(2026, 0, 10).toISOString();
    const endDate = new Date(2026, 0, 13).toISOString();
    const navigation = { navigate: jest.fn(), replace: jest.fn(), goBack: jest.fn() };
    const screen = await render(
      <PaymentScreen
        navigation={navigation as unknown as Props['navigation']}
        route={{ key: 'Payment', name: 'Payment', params: { car, startDate, endDate } } as Props['route']}
      />,
    );

    expect(screen.getByText(`${car.pricePerDay} kr x 3 days`)).toBeTruthy();

    await fireEvent.press(screen.getByText(/Pay Now/));
    expect(navigation.replace).toHaveBeenCalledWith('BookingConfirmation', { car, startDate, endDate });
  });
});
