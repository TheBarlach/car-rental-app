import React from 'react';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import LoginScreen from '../LoginScreen';

type Props = React.ComponentProps<typeof LoginScreen>;

async function setup() {
  const navigation = { navigate: jest.fn(), goBack: jest.fn() };
  const utils = await render(
    <LoginScreen
      navigation={navigation as unknown as Props['navigation']}
      route={{ key: 'Login', name: 'Login' } as Props['route']}
    />
  );
  return { navigation, ...utils };
}

describe('LoginScreen', () => {
  beforeEach(() => {
    jest.spyOn(console, 'log').mockImplementation(() => {});
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  it('shows the welcome title and the form', async () => {
    const { getByText, getByPlaceholderText } = await setup();
    expect(getByText('Hello Welcome!')).toBeTruthy();
    expect(getByPlaceholderText('Enter email')).toBeTruthy();
    expect(getByPlaceholderText('Enter password')).toBeTruthy();
  });

  it('shows errors when submitting empty fields', async () => {
    const { getByText } = await setup();
    await fireEvent.press(getByText('Sign In'));
    expect(getByText('Email is required')).toBeTruthy();
    expect(getByText('Password is required')).toBeTruthy();
  });

  it('shows an error for an invalid email', async () => {
    const { getByText, getByPlaceholderText } = await setup();
    await fireEvent.changeText(getByPlaceholderText('Enter email'), 'abc');
    await fireEvent.changeText(getByPlaceholderText('Enter password'), 'secret123');
    await fireEvent.press(getByText('Sign In'));
    expect(getByText('Enter a valid email')).toBeTruthy();
  });

  it('shows no errors for valid input', async () => {
    const { getByText, getByPlaceholderText, queryByText } = await setup();
    await fireEvent.changeText(getByPlaceholderText('Enter email'), 'test@example.com');
    await fireEvent.changeText(getByPlaceholderText('Enter password'), 'secret123');
    await fireEvent.press(getByText('Sign In'));
    await waitFor(() => expect(getByText('Sign In')).toBeTruthy());
    expect(queryByText('Email is required')).toBeNull();
    expect(queryByText('Password is required')).toBeNull();
  });

  it('navigates to ForgotPassword and Register', async () => {
    const { getByText, navigation } = await setup();
    await fireEvent.press(getByText('Forgot password?'));
    expect(navigation.navigate).toHaveBeenCalledWith('ForgotPassword');
    await fireEvent.press(getByText('Sign up'));
    expect(navigation.navigate).toHaveBeenCalledWith('Register');
  });
});