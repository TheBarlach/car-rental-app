import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import RegisterScreen from '../screens/RegisterScreen';

type Props = React.ComponentProps<typeof RegisterScreen>;

async function setup() {
  const navigation = { navigate: jest.fn(), replace: jest.fn(), goBack: jest.fn() };
  const utils = await render(
    <RegisterScreen
      navigation={navigation as unknown as Props['navigation']}
      route={{ key: 'Register', name: 'Register' } as Props['route']}
    />
  );
  return { navigation, ...utils };
}

type Utils = Awaited<ReturnType<typeof setup>>;

async function fillValid(
  { getByPlaceholderText }: Utils,
  overrides: { confirm?: string } = {}
) {
  await fireEvent.changeText(getByPlaceholderText('Enter name'), 'Test User');
  await fireEvent.changeText(getByPlaceholderText('Enter email'), 'test@example.com');
  await fireEvent.changeText(getByPlaceholderText('Enter password'), 'secret123');
  await fireEvent.changeText(
    getByPlaceholderText('Confirm password'),
    overrides.confirm ?? 'secret123'
  );
}

describe('RegisterScreen', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows errors when submitting empty fields', async () => {
    const { getByText } = await setup();
    await fireEvent.press(getByText('Sign Up'));
    expect(getByText('Name is required')).toBeTruthy();
    expect(getByText('Email is required')).toBeTruthy();
    expect(getByText('Password is required')).toBeTruthy();
    expect(getByText('Please confirm your password')).toBeTruthy();
    expect(getByText('You must accept the terms and conditions')).toBeTruthy();
  });

  it('rejects a password shorter than 6 characters', async () => {
    const utils = await setup();
    await fireEvent.changeText(utils.getByPlaceholderText('Enter password'), '123');
    await fireEvent.press(utils.getByText('Sign Up'));
    expect(utils.getByText('Password must be at least 6 characters')).toBeTruthy();
  });

  it('rejects mismatching passwords', async () => {
    const utils = await setup();
    await fillValid(utils, { confirm: 'different' });
    await fireEvent.press(utils.getByText('Sign Up'));
    expect(utils.getByText('Passwords do not match')).toBeTruthy();
  });

  it('requires the terms checkbox', async () => {
    const utils = await setup();
    await fillValid(utils);
    await fireEvent.press(utils.getByText('Sign Up'));
    expect(utils.getByText('You must accept the terms and conditions')).toBeTruthy();
    expect(utils.queryByText('Name is required')).toBeNull();
    expect(utils.queryByText('Passwords do not match')).toBeNull();
  });

  it('submits and goes to the map when everything is valid', async () => {
    const utils = await setup();
    await fillValid(utils);
    await fireEvent.press(utils.getByText(/I accept terms and conditions/));
    await fireEvent.press(utils.getByText('Sign Up'));
    await waitFor(() =>
      expect(utils.navigation.replace).toHaveBeenCalledWith('Map')
    );
  });

  it('has a link back to Login', async () => {
    const { getByText, navigation } = await setup();
    await fireEvent.press(getByText('Sign in'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});