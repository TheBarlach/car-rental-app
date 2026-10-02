import { Alert, StyleSheet, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { render, screen, userEvent } from '@testing-library/react-native';

import { Button } from '../src/components';
import { variantStyles } from '../src/components/Button.styles';
import { colors } from '../src/theme';

function flattenButtonStyle(name: string): ViewStyle {
  return StyleSheet.flatten(screen.getByRole('button', { name }).props.style) as ViewStyle;
}

describe('Button', () => {
  test('videresender tryk til den korrekte knap', async () => {
    const spy = jest.spyOn(Alert, 'alert').mockImplementation(() => {});

    await render(
      <View>
        <Button label="Ja" variant="danger" onPress={() => Alert.alert('Slet', 'Er du sikker?')} />
        <Button label="Nej" variant="secondary" onPress={() => Alert.alert('Behold', 'Annulleret')} />
      </View>
    );

    await userEvent.press(screen.getByRole('button', { name: 'Ja' }));
    await userEvent.press(screen.getByRole('button', { name: 'Nej' }));

    expect(spy).toHaveBeenNthCalledWith(1, 'Slet', 'Er du sikker?');
    expect(spy).toHaveBeenNthCalledWith(2, 'Behold', 'Annulleret');

    spy.mockRestore();
  });

  test('gør knappen tilgængelig med etiketten som navn', async () => {
    await render(<Button label="Gem ændringer" onPress={() => {}} />);

    expect(screen.getByRole('button', { name: 'Gem ændringer' })).toBeTruthy();
  });

  test.each([
    ['primary', colors.accent],
    ['secondary', colors.surfaceMuted],
    ['danger', colors.surfaceDanger],
  ] as const)('applikerer %s-baggrund på knappen', async (variant, expected) => {
    await render(<Button label={variant} variant={variant} onPress={() => {}} />);

    expect(flattenButtonStyle(variant).backgroundColor).toBe(expected);
  });

  test('applikerer designsystemets grundmål på alle varianter', async () => {
    await render(
      <View>
        <Button label="Primær" onPress={() => {}} />
        <Button label="Sekundær" variant="secondary" onPress={() => {}} />
        <Button label="Fare" variant="danger" onPress={() => {}} />
      </View>
    );

    for (const name of ['Primær', 'Sekundær', 'Fare']) {
      const style = flattenButtonStyle(name);
      expect(style.minHeight).toBe(55);
      expect(style.borderRadius).toBe(16);
    }
  });

  test('kobler tryk-feedback fra hver variant ind i stil-arrayet', async () => {
    await render(
      <View>
        <Button label="Primær" onPress={() => {}} />
        <Button label="Sekundær" variant="secondary" onPress={() => {}} />
        <Button label="Fare" variant="danger" onPress={() => {}} />
      </View>
    );

    for (const name of ['Primær', 'Sekundær', 'Fare']) {
      const style = screen.getByRole('button', { name }).props.style;
      expect(Array.isArray(style)).toBe(true);
      expect(style).toHaveLength(4);
      expect(style[3]).toBe(false);
    }
  });

  test.each([
    ['primary', 0.85],
    ['secondary', 0.7],
    ['danger', 0.7],
  ] as const)('giver %s en synlig tryk-feedback', async (variant, opacity) => {
    await render(<Button label={variant} variant={variant} onPress={() => {}} />);

    expect(variantStyles[variant].pressed.opacity).toBe(opacity);
  });

  test('gør halv bredde til flex, så knapper kan sidde side om side', async () => {
    await render(
      <View>
        <Button label="Annuller" variant="secondary" width="half" onPress={() => {}} />
        <Button label="Gem" width="half" onPress={() => {}} />
      </View>
    );

    expect(flattenButtonStyle('Annuller').flex).toBe(1);
    expect(flattenButtonStyle('Gem').flex).toBe(1);
  });
});
