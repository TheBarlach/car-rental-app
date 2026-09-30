import { StyleSheet, Text, View } from 'react-native';
import type { ViewStyle } from 'react-native';
import { render, screen, userEvent } from '@testing-library/react-native';

import { Avatar, ScreenHeader } from '../src/components';
import { styles as headerStyles } from '../src/components/ScreenHeader.styles';

function avatarStyle(): ViewStyle {
  return StyleSheet.flatten(screen.getByRole('button', { name: 'Min profil' }).props.style) as ViewStyle;
}

describe('ScreenHeader', () => {
  test('renderer alle tre slots', async () => {
    await render(
      <ScreenHeader
        left={<Text>venstre</Text>}
        center={<Text>center</Text>}
        right={<Text>højre</Text>}
      />
    );

    expect(screen.getByText('venstre')).toBeTruthy();
    expect(screen.getByText('center')).toBeTruthy();
    expect(screen.getByText('højre')).toBeTruthy();
  });

  test('bærer en centreret slot uden sideindhold, som auth-skærmene kræver', async () => {
    await render(<ScreenHeader center={<Text>Drive On The Go</Text>} />);

    expect(screen.getByText('Drive On The Go')).toBeTruthy();
  });

  test('bærer venstre og højre slot uden centerindhold, som appsiderne kræver', async () => {
    await render(
      <ScreenHeader
        left={<Text>Drive On The Go</Text>}
        right={<Avatar accessibilityLabel="Min profil" onPress={() => {}} initials="AB" />}
      />
    );

    expect(screen.getByText('Drive On The Go')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Min profil' })).toBeTruthy();
  });

  test('holder designsystemets sidelæns margin og minimumshøjde', () => {
    expect(headerStyles.container.paddingHorizontal).toBe(30);
    expect(headerStyles.container.minHeight).toBe(44);
  });

  test('fordeler side-slottene i hver sin ende, så center automatisk centreres', () => {
    expect(headerStyles.sideLeft.flex).toBe(1);
    expect(headerStyles.sideRight.flex).toBe(1);
    expect(headerStyles.sideLeft.alignItems).toBe('flex-start');
    expect(headerStyles.sideRight.alignItems).toBe('flex-end');
  });
});

describe('Avatar', () => {
  test('videresender tryk til sin egen handler', async () => {
    const onPress = jest.fn();
    await render(<Avatar accessibilityLabel="Min profil" onPress={onPress} initials="AB" />);

    await userEvent.press(screen.getByRole('button', { name: 'Min profil' }));

    expect(onPress).toHaveBeenCalledTimes(1);
  });

  test('er opdagelig som knap for skærmlæsere', async () => {
    await render(
      <View>
        <Avatar accessibilityLabel="Min profil" onPress={() => {}} initials="AB" />
      </View>
    );

    expect(screen.getByRole('button', { name: 'Min profil' })).toBeTruthy();
  });

  test('har designsystemets mål, form og farve', async () => {
    await render(<Avatar accessibilityLabel="Min profil" onPress={() => {}} initials="AB" />);

    const style = avatarStyle();
    expect(style.width).toBe(44);
    expect(style.height).toBe(44);
    expect(style.borderRadius).toBe(22);
    expect(style.backgroundColor).toBe('#CED0F8');
  });

  test('udvider trykfladen til 48dp uden at gøre cirklen større', async () => {
    await render(<Avatar accessibilityLabel="Min profil" onPress={() => {}} initials="AB" />);

    const avatar = screen.getByRole('button', { name: 'Min profil' });
    const size = avatarStyle();
    const hitSlop = avatar.props.hitSlop as number;

    expect(hitSlop).toBe(2);
    expect((size.width as number) + hitSlop * 2).toBe(48);
    expect((size.height as number) + hitSlop * 2).toBe(48);
  });

  test('har en synlig ring, så cirklen kan ses mod hvid baggrund', async () => {
    await render(<Avatar accessibilityLabel="Min profil" onPress={() => {}} initials="AB" />);

    const style = avatarStyle();
    expect(style.borderWidth).toBe(1);
    expect(style.borderColor).toBe('#71748A');
  });

  test('falder tilbage til initials når der ikke er noget billede', async () => {
    const onPress = () => {};
    const { rerender } = await render(
      <Avatar accessibilityLabel="Min profil" onPress={onPress} initials="AB" />
    );

    expect(screen.getByText('AB')).toBeTruthy();

    await rerender(
      <Avatar accessibilityLabel="Min profil" onPress={onPress} initials="AB" imageUri="data:image/png;base64,iVBOR" />
    );

    expect(screen.queryByText('AB')).toBeNull();
  });
});
