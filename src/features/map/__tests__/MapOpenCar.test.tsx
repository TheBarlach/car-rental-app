import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';

import { MapScreen } from '../screens/MapScreen';
import { mockCars } from '../../../data/mockCars';
import CarDetailsScreen from '../../cars/screens/CarDetailsScreen';

type CarDetailsProps = React.ComponentProps<typeof CarDetailsScreen>;

const car = mockCars.find((mockCar) => mockCar.status === 'active' && mockCar.location)!;

describe('opening a car from the map', () => {
  it('only shows available cars with a location', async () => {
    const screen = await render(<MapScreen cars={mockCars} />);

    mockCars.forEach((mockCar) => {
      const marker = screen.queryByLabelText(`Select ${mockCar.name} at ${mockCar.location?.name}`);
      if (mockCar.status === 'active' && mockCar.location) {
        expect(marker).toBeTruthy();
      } else {
        expect(marker).toBeNull();
      }
    });
  });

  it('passes the selected car when Open is pressed', async () => {
    const onOpenCar = jest.fn();
    const screen = await render(<MapScreen cars={mockCars} onOpenCar={onOpenCar} />);

    await fireEvent.press(screen.getByLabelText(`Select ${car.name} at ${car.location!.name}`));
    await fireEvent.press(screen.getByText('Open'));

    expect(onOpenCar).toHaveBeenCalledWith(car);
    expect(screen.queryByText('Open')).toBeNull();
  });

  it('shows the same car on the car details page', async () => {
    const navigation = { navigate: jest.fn(), replace: jest.fn() };
    const screen = await render(
      <CarDetailsScreen
        navigation={navigation as unknown as CarDetailsProps['navigation']}
        route={{ key: 'CarDetails', name: 'CarDetails', params: { id: car.id } } as CarDetailsProps['route']}
      />,
    );

    expect(await screen.findByText(car.name)).toBeTruthy();
    expect(screen.getByText(car.registrationNumber)).toBeTruthy();
    expect(screen.getByText(String(car.year))).toBeTruthy();
    expect(screen.getByText(car.location!.name)).toBeTruthy();

    await fireEvent.press(screen.getByText('Continue to Book'));
    expect(navigation.navigate).toHaveBeenCalledWith(
      'Payment',
      expect.objectContaining({ carId: car.id, car }),
    );
  });
});
