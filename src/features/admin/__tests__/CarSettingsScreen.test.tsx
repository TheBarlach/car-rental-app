import React from 'react';
import {
  render,
  screen,
  userEvent,
} from '@testing-library/react-native';

import CarSettingsScreen from '../screens/CarSettingsScreen';

const mockGoBack = jest.fn();

const navigation = {
  goBack: mockGoBack,
} as any;

const route = {
  key: 'CarSettings-test',
  name: 'CarSettings',
  params: {
    carId: '1',
  },
} as any;

async function renderCarSettingsScreen() {
  await render(
    <CarSettingsScreen
      navigation={navigation}
      route={route}
    />
  );
}

describe('CarSettingsScreen', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders the selected car information', async () => {
    await renderCarSettingsScreen();

    expect(
      screen.getByDisplayValue('VW Golf VIII 1.5 eTSI')
    ).toBeTruthy();

    expect(
      screen.getByDisplayValue('AB 12 345')
    ).toBeTruthy();

    expect(
      screen.getByDisplayValue('2200')
    ).toBeTruthy();

    expect(
      screen.getByText('Station Car')
    ).toBeTruthy();

    expect(
      screen.getByText('Manual')
    ).toBeTruthy();

    expect(
      screen.getByText('2 Persons')
    ).toBeTruthy();

    expect(
      screen.getByText('Benzin')
    ).toBeTruthy();

    expect(
      screen.getByDisplayValue(
        'A stylish and comfortable sedan, perfect for both city drives and long trips.'
      )
    ).toBeTruthy();
  });

  it('renders the three car statuses', async () => {
    await renderCarSettingsScreen();

    expect(
      screen.getByText('Active')
    ).toBeTruthy();

    expect(
      screen.getByText('Rented')
    ).toBeTruthy();

    expect(
      screen.getByText('Not Active')
    ).toBeTruthy();
  });

  it('allows the admin to change the car name', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    const nameInput = screen.getByDisplayValue(
      'VW Golf VIII 1.5 eTSI'
    );

    await user.clear(nameInput);

    await user.type(
      nameInput,
      'VW Golf Test'
    );

    expect(
      screen.getByDisplayValue('VW Golf Test')
    ).toBeTruthy();
  });

  it('allows the admin to change the registration number', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    const registrationInput =
      screen.getByDisplayValue('AB 12 345');

    await user.clear(registrationInput);

    await user.type(
      registrationInput,
      'TEST 123'
    );

    expect(
      screen.getByDisplayValue('TEST 123')
    ).toBeTruthy();
  });

  it('allows the admin to change the price', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    const priceInput =
      screen.getByDisplayValue('2200');

    await user.clear(priceInput);

    await user.type(
      priceInput,
      '14500'
    );

    expect(
      screen.getByDisplayValue('14500')
    ).toBeTruthy();
  });

  it('allows the admin to change the description', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    const descriptionInput =
      screen.getByDisplayValue(
        'A stylish and comfortable sedan, perfect for both city drives and long trips.'
      );

    await user.clear(descriptionInput);

    await user.type(
      descriptionInput,
      'Updated car description'
    );

    expect(
      screen.getByDisplayValue(
        'Updated car description'
      )
    ).toBeTruthy();
  });

  it('allows the admin to change the car status', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    await user.press(
      screen.getByTestId('status-rented')
    );

    expect(
      screen.getByTestId('status-rented')
    ).toHaveProp(
      'accessibilityState',
      {
        selected: true,
      }
    );
  });

  it('allows the admin to open car type options', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    await user.press(
      screen.getByTestId('car-type-selector')
    );

    expect(
      screen.getByText('Sedan')
    ).toBeTruthy();
  });

  it('allows the admin to open gear type options', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    await user.press(
      screen.getByTestId('gear-type-selector')
    );

    expect(
      screen.getByText('Automatic')
    ).toBeTruthy();
  });

  it('allows the admin to open capacity options', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    await user.press(
      screen.getByTestId('capacity-selector')
    );

    expect(
      screen.getByText('5 Persons')
    ).toBeTruthy();
  });

  it('allows the admin to open fuel type options', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    await user.press(
      screen.getByTestId('fuel-type-selector')
    );

    expect(
      screen.getByText('Electric')
    ).toBeTruthy();
  });

  it('goes back when the back button is pressed', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    await user.press(
      screen.getByTestId('back-button')
    );

    expect(
      mockGoBack
    ).toHaveBeenCalledTimes(1);
  });

  it('has a save button for the edited car', async () => {
    await renderCarSettingsScreen();

    expect(
      screen.getByTestId('save-button')
    ).toBeTruthy();
  });

  it('allows the admin to save the car', async () => {
    const user = userEvent.setup();

    await renderCarSettingsScreen();

    const nameInput = screen.getByDisplayValue(
      'VW Golf VIII 1.5 eTSI'
    );

    await user.clear(nameInput);

    await user.type(
      nameInput,
      'Updated VW Golf'
    );

    await user.press(
      screen.getByTestId('save-button')
    );

    expect(
      screen.getByDisplayValue(
        'Updated VW Golf'
      )
    ).toBeTruthy();
  });
});