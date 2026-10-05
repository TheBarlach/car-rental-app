import React from 'react';
import { act, fireEvent, render } from '@testing-library/react-native';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';

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

// The screen fakes the reset request with a 600 ms delay; press and let it settle inside one act.
const submitAndWaitForResetRequest = (button: Parameters<typeof fireEvent.press>[0]) =>
  act(async () => {
    void fireEvent.press(button);
    await new Promise((resolve) => setTimeout(resolve, 700));
  });

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
    await submitAndWaitForResetRequest(getByText('Send Email'));
    expect(getByText('An Email have been sent to you with a reset link')).toBeTruthy();
  });

  it('goes to Login from the confirmation screen', async () => {
    const { getByText, getByPlaceholderText, navigation } = await setup();
    await fireEvent.changeText(getByPlaceholderText('Enter email'), 'test@example.com');
    await submitAndWaitForResetRequest(getByText('Send Email'));
    await fireEvent.press(getByText('Go to login page'));
    expect(navigation.navigate).toHaveBeenCalledWith('Login');
  });
});