import { StyleSheet } from 'react-native';
import type { ImageStyle } from 'react-native';
import { render, screen } from '@testing-library/react-native';

import { Logo, logoVariants } from '../src/components';

const BRAND = 'Drive On The Go';

function flattenLogoStyle(name: string): ImageStyle {
  return StyleSheet.flatten(screen.getByRole('image', { name }).props.style) as ImageStyle;
}

describe('Logo', () => {
  test('viser ordmærket i designsystemets mål som standard', async () => {
    await render(<Logo />);

    const style = flattenLogoStyle(BRAND);
    expect(style.width).toBe(96);
    expect(style.height).toBe(48);
  });

  test('viser market i mindre mål på app-skærmene', async () => {
    await render(<Logo variant="mark" />);

    const style = flattenLogoStyle(BRAND);
    expect(style.width).toBe(43);
    expect(style.height).toBe(21);
  });

  test('strækker aldrig logoet ud over sin ramme', async () => {
    await render(<Logo />);

    expect(flattenLogoStyle(BRAND).resizeMode).toBe('contain');
  });

  test('gør logoet synligt for skærmlæsere med brandnavnet', async () => {
    await render(<Logo />);

    expect(screen.getByRole('image', { name: BRAND })).toBeTruthy();
  });

  test('lader en egen etiket overskrive brandnavnet', async () => {
    await render(<Logo accessibilityLabel="Virksomhedens logo" />);

    expect(screen.getByRole('image', { name: 'Virksomhedens logo' })).toBeTruthy();
  });

  test('bruger midlertidigt samme asset for begge varianter', () => {
    expect(logoVariants.mark.source).toBe(logoVariants.wordmark.source);
  });
});
