import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import ForgotPasswordScreen from '../ForgotPasswordScreen';

type Props = React.ComponentProps<typeof ForgotPasswordScreen>;

async function setup() {
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  const utils = await render(
    <ForgotPasswordScreen
      navigation={navigation as unknown as Props['navigation']}
      route={{ key: 'ForgotPassword', name: 'ForgotPassword' } as Props['route']}
    />
  );
  return { navigation, ...utils };
}

describe('ForgotPasswordScreen', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows an error for an empty email', async () => {
    const { getByText } = await setup();
    await fireEvent.press(getByText('Send Email'));
    expect(getByText('Email is required')).toBeTruthy();
  });

  it('shows an error for an invalid email', async () => {
    const { getByText, getByPlaceholderText } = await setup();
    await fireEvent.changeText(getByPlaceholderText('Enter email'), 'abc');
    await fireEvent.press(getByText('Send Email'));
    expect(getByText('Enter a valid email')).toBeTruthy();
  });

  it('shows the confirmation after a valid email', async () => {
    const { getByText, getByPlaceholderText } = await setup();
    await fireEvent.changeText(getByPlaceholderText('Enter email'), 'test@example.com');
    await fireEvent.press(getByText('Send Email'));
    await waitFor(
      () => expect(getByText('An Email have been sent to you with a reset link')).toBeTruthy(),
      { timeout: 3000 }
    );
  });

  it('goes to Login from the confirmation screen', async () => {
    const { getByText, getByPlaceholderText, navigation } = await setup();
    await fireEvent.changeText(getByPlaceholderText('Enter email'), 'test@example.com');
    await fireEvent.press(getByText('Send Email'));
    const button = await waitFor(() => getByText('Go to login page'), { timeout: 3000 });
    await fireEvent.press(button);
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});