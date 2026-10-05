import React from 'react';
import { fireEvent, render } from '@testing-library/react-native';
import LoginScreen from '../screens/LoginScreen';

type Props = React.ComponentProps<typeof LoginScreen>;

async function setup() {
  const navigation = { navigate: jest.fn(), replace: jest.fn(), goBack: jest.fn() };
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

  it('does not sign in when a field is empty', async () => {
    const { getByText, getByPlaceholderText, navigation } = await setup();
    await fireEvent.changeText(getByPlaceholderText('Enter email'), 'test@example.com');
    await fireEvent.press(getByText('Sign In'));
    expect(getByText('Password is required')).toBeTruthy();
    expect(navigation.replace).not.toHaveBeenCalled();
  });

  it('signs in with any non-empty email and password', async () => {
    const { getByText, getByPlaceholderText, queryByText, navigation } = await setup();
    await fireEvent.changeText(getByPlaceholderText('Enter email'), 'not-a-real-user');
    await fireEvent.changeText(getByPlaceholderText('Enter password'), 'x');
    await fireEvent.press(getByText('Sign In'));
    expect(queryByText('Email is required')).toBeNull();
    expect(queryByText('Password is required')).toBeNull();
    expect(navigation.replace).toHaveBeenCalledWith('Map');
  });

  it('navigates to ForgotPassword and Register', async () => {
    const { getByText, navigation } = await setup();
    await fireEvent.press(getByText('Forgot password?'));
    expect(navigation.navigate).toHaveBeenCalledWith('ForgotPassword');
    await fireEvent.press(getByText('Sign up'));
    expect(navigation.navigate).toHaveBeenCalledWith('Register');
  });
});