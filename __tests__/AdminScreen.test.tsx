import React from 'react';
import {
  render,
  screen,
  userEvent,
} from '@testing-library/react-native';

import AdminScreen from '../src/features/admin/screens/AdminScreen';
import {
  mockCars,
} from '../src/data/mockCars';

jest.mock('@react-navigation/native', () => ({
  useFocusEffect: jest.fn(),
}));

const mockNavigate = jest.fn();

const navigation = {
  navigate: mockNavigate,
} as any;

const route = {
  key: 'AdminPage-test',
  name: 'AdminPage',
  params: undefined,
} as any;

async function renderAdminScreen() {
  await render(
    <AdminScreen
      navigation={navigation}
      route={route}
    />
  );
}

describe('AdminScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the Cars title', async () => {
    await renderAdminScreen();

    expect(
      screen.getByText('Cars')
    ).toBeTruthy();
  });

  it('renders all cars from mock data', async () => {
    await renderAdminScreen();

    mockCars.forEach((car) => {
      expect(
        screen.getByText(car.name)
      ).toBeTruthy();

      expect(
        screen.getByText(
          `${car.pricePerDay} kr/day`
        )
      ).toBeTruthy();

      expect(
        screen.getByTestId(
          `car-button-${car.id}`
        )
      ).toBeTruthy();
    });
  });

  it('renders the same number of car buttons as mock cars', async () => {
    await renderAdminScreen();

    const carButtons =
      screen.getAllByTestId(/^car-button-/);

    expect(carButtons).toHaveLength(
      mockCars.length
    );
  });

  it('renders an add car button', async () => {
    await renderAdminScreen();

    expect(
      screen.getByTestId('add-car-button')
    ).toBeTruthy();
  });

  it('opens the add car page when the add button is pressed', async () => {
    const user = userEvent.setup();

    await renderAdminScreen();

    await user.press(
      screen.getByTestId('add-car-button')
    );

    expect(
      mockNavigate
    ).toHaveBeenCalledWith('AddCar');
  });

  it('opens car settings with the selected car id', async () => {
    const user = userEvent.setup();

    await renderAdminScreen();

    const car = mockCars[0];

    await user.press(
      screen.getByTestId(
        `car-button-${car.id}`
      )
    );

    expect(
      mockNavigate
    ).toHaveBeenCalledWith(
      'CarSettings',
      {
        carId: car.id,
      }
    );
  });

  it('opens settings when the profile button is pressed', async () => {
    const user = userEvent.setup();

    await renderAdminScreen();

    await user.press(
      screen.getByTestId('profile-button')
    );

    expect(
      mockNavigate
    ).toHaveBeenCalledWith(
      'Settings'
    );
  });
});