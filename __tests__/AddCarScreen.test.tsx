import React from 'react';
import {
  render,
  screen,
  userEvent,
} from '@testing-library/react-native';

import AddCarScreen from '../src/features/admin/screens/AddCarScreen';
import {
  mockCars,
} from '../src/data/mockCars';

const mockGoBack = jest.fn();

const navigation = {
  goBack: mockGoBack,
} as any;

const route = {
  key: 'AddCar-test',
  name: 'AddCar',
  params: undefined,
} as any;

async function renderAddCarScreen() {
  await render(
    <AddCarScreen
      navigation={navigation}
      route={route}
    />
  );
}

describe('AddCarScreen', () => {
  let originalLength: number;

  beforeEach(() => {
    jest.clearAllMocks();

    originalLength = mockCars.length;
  });

  afterEach(() => {
    mockCars.splice(originalLength);
  });

  it('renders empty fields for a new car', async () => {
    await renderAddCarScreen();

    expect(
      screen.getByPlaceholderText('Car name')
    ).toBeTruthy();

    expect(
      screen.getByPlaceholderText(
        'Registration number'
      )
    ).toBeTruthy();

    expect(
      screen.getByPlaceholderText(
        'Price per day'
      )
    ).toBeTruthy();

    expect(
      screen.getByText('Select car type')
    ).toBeTruthy();

    expect(
      screen.getByText('Select gear type')
    ).toBeTruthy();

    expect(
      screen.getByText('Select capacity')
    ).toBeTruthy();

    expect(
      screen.getByText('Select fuel type')
    ).toBeTruthy();
  });

  it('goes back when the back button is pressed', async () => {
    const user = userEvent.setup();

    await renderAddCarScreen();

    await user.press(
      screen.getByTestId('back-button')
    );

    expect(
      mockGoBack
    ).toHaveBeenCalledTimes(1);
  });

  it('allows the admin to select car options', async () => {
    const user = userEvent.setup();

    await renderAddCarScreen();

    await user.press(
      screen.getByTestId(
        'car-type-selector'
      )
    );

    await user.press(
      screen.getByText('Sedan')
    );

    expect(
      screen.getByText('Sedan')
    ).toBeTruthy();

    await user.press(
      screen.getByTestId(
        'gear-type-selector'
      )
    );

    await user.press(
      screen.getByText('Automatic')
    );

    expect(
      screen.getByText('Automatic')
    ).toBeTruthy();
  });

  it('creates a new car', async () => {
    const user = userEvent.setup();

    await renderAddCarScreen();

    await user.type(
      screen.getByPlaceholderText('Car name'),
      'Audi A6 Test'
    );

    await user.type(
      screen.getByPlaceholderText(
        'Registration number'
      ),
      'TEST 123'
    );

    await user.type(
      screen.getByPlaceholderText(
        'Price per day'
      ),
      '2000'
    );

    await user.press(
      screen.getByTestId(
        'car-type-selector'
      )
    );

    await user.press(
      screen.getByText('Sedan')
    );

    await user.press(
      screen.getByTestId(
        'gear-type-selector'
      )
    );

    await user.press(
      screen.getByText('Automatic')
    );

    await user.press(
      screen.getByTestId(
        'capacity-selector'
      )
    );

    await user.press(
      screen.getByText('5 Persons')
    );

    await user.press(
      screen.getByTestId(
        'fuel-type-selector'
      )
    );

    await user.press(
      screen.getByText('Electric')
    );

    await user.type(
      screen.getByPlaceholderText(
        'Write something about the car...'
      ),
      'New test car'
    );

    await user.press(
      screen.getByTestId(
        'create-car-button'
      )
    );

    expect(mockCars).toHaveLength(
      originalLength + 1
    );

    const createdCar =
      mockCars[mockCars.length - 1];

    expect(createdCar.name).toBe(
      'Audi A6 Test'
    );

    expect(
      createdCar.registrationNumber
    ).toBe('TEST 123');

    expect(createdCar.pricePerDay).toBe(
      2000
    );

    expect(createdCar.carType).toBe(
      'Sedan'
    );

    expect(createdCar.gearType).toBe(
      'Automatic'
    );

    expect(createdCar.capacity).toBe(
      '5 Persons'
    );

    expect(createdCar.fuelType).toBe(
      'Electric'
    );

    expect(mockGoBack).toHaveBeenCalledTimes(
      1
    );
  });

  it('does not create an incomplete car', async () => {
    const user = userEvent.setup();

    await renderAddCarScreen();

    await user.press(
      screen.getByTestId(
        'create-car-button'
      )
    );

    expect(mockCars).toHaveLength(
      originalLength
    );

    expect(mockGoBack).not.toHaveBeenCalled();
  });
});