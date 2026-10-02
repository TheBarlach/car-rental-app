import { act, render, screen, userEvent } from '@testing-library/react-native';
import { StyleSheet } from 'react-native';

import { hitTarget } from '../src/theme';
import {
  mockCapacities,
  mockCarTypes,
  mockFuelTypes,
  mockGearTypes,
  mockInsuranceOptions,
} from '../src/mocks/filters';
import { PRICE_RANGE, PRICE_SLIDER } from '../src/features/search/priceRange';
import { SearchScreen } from '../src/features/search/screens/SearchScreen';
import { styles } from '../src/features/search/screens/SearchScreen.styles';

const PICKS = [
  ['Capacity', mockCapacities],
  ['Gear Type', mockGearTypes],
  ['Car Type', mockCarTypes],
  ['Fuel', mockFuelTypes],
  ['Insurance', mockInsuranceOptions],
] as const;

describe('SearchScreen', () => {
  it('viser titlen og undertitlen', async () => {
    await render(<SearchScreen />);

    expect(screen.getByText('Search for a car')).toBeTruthy();
    expect(
      screen.getByText('Enter the things you wish for the car')
    ).toBeTruthy();
  });

  it('viser pickup- og return-afsnit med fire felter', async () => {
    await render(<SearchScreen />);

    expect(screen.getByText('Pickup')).toBeTruthy();
    expect(screen.getByText('Return')).toBeTruthy();
    expect(screen.getByLabelText('Pickup date')).toBeTruthy();
    expect(screen.getByLabelText('Pickup time')).toBeTruthy();
    expect(screen.getByLabelText('Return date')).toBeTruthy();
    expect(screen.getByLabelText('Return time')).toBeTruthy();
  });

  it('viser filtersektioner med designets labels', async () => {
    await render(<SearchScreen />);

    expect(screen.getByLabelText('Capacity')).toBeTruthy();
    expect(screen.getByLabelText('Gear Type')).toBeTruthy();
    expect(screen.getByLabelText('Car Type')).toBeTruthy();
    expect(screen.getByLabelText('Fuel')).toBeTruthy();
    expect(screen.getByLabelText('Insurance')).toBeTruthy();
  });

  it('viser prisgruppe med tekstfelter og én range-slider', async () => {
    await render(<SearchScreen />);

    expect(screen.getByText('Price Range')).toBeTruthy();
    expect(screen.getByLabelText('Min price')).toBeTruthy();
    expect(screen.getByLabelText('Max price')).toBeTruthy();
    expect(screen.getByLabelText('Price range slider')).toBeTruthy();
  });

  it('viser designsystemets knap', async () => {
    await render(<SearchScreen />);

    expect(screen.getByRole('button', { name: 'Search' })).toBeTruthy();
  });

  it('viser header med logo og avatar', async () => {
    await render(<SearchScreen />);

    expect(screen.getByLabelText('Drive On The Go')).toBeTruthy();
    expect(screen.getByRole('button', { name: 'Profile' })).toBeTruthy();
  });

  it('viser statisk bundnavigation med tre tabs', async () => {
    await render(<SearchScreen />);

    expect(screen.getByRole('tab', { name: 'Search' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Map' })).toBeTruthy();
    expect(screen.getByRole('tab', { name: 'Bookings' })).toBeTruthy();
  });

  it('markerer Search som den aktive tab', async () => {
    await render(<SearchScreen />);

    expect(
      screen.getByRole('tab', { name: 'Search' }).props.accessibilityState
    ).toEqual({ selected: true });
    expect(
      screen.getByRole('tab', { name: 'Map' }).props.accessibilityState
    ).toEqual({ selected: false });
  });

  it('kan ændre min-pris via tekstfelt', async () => {
    await render(<SearchScreen />);

    await act(async () => {
      screen.getByLabelText('Min price').props.onChangeText('1500');
    });

    expect(screen.getByLabelText('Min price').props.value).toBe('1500');
  });

  it('normaliserer tekstfeltet ved blur', async () => {
    await render(<SearchScreen />);

    await act(async () => {
      screen.getByLabelText('Min price').props.onChangeText('2750');
    });
    await act(async () => {
      screen.getByLabelText('Min price').props.onBlur();
    });

    expect(screen.getByLabelText('Min price').props.value).toBe('2800');
  });

  it('kan vælge gear type', async () => {
    await render(<SearchScreen />);

    await act(async () => {
      screen.getByLabelText('Gear Type').props.onValueChange('automatic');
    });

    expect(screen.getByLabelText('Gear Type').props.selectedValue).toBe(
      'automatic'
    );
  });

  it('kan vælge forsikring', async () => {
    await render(<SearchScreen />);

    await act(async () => {
      screen.getByLabelText('Insurance').props.onValueChange('none');
    });

    expect(screen.getByLabelText('Insurance').props.selectedValue).toBe('none');
  });

  it('slideren skriver begge priser tilbage i tekstfelterne', async () => {
    await render(<SearchScreen />);

    await act(async () => {
      screen.getByLabelText('Price range slider').props.onValueChange([1800, 8500]);
    });

    expect(screen.getByLabelText('Min price').props.value).toBe('1800');
    expect(screen.getByLabelText('Max price').props.value).toBe('8500');
  });

  it('slideren følger tekstfeltets værdier', async () => {
    await render(<SearchScreen />);

    expect(screen.getByLabelText('Price range slider').props.range).toEqual([
      500, 9000,
    ]);
  });

  it.each(['Min price', 'Max price'])(
    'lader slideren beholde standardværdien når %s tømmes',
    async (label) => {
      await render(<SearchScreen />);

      await act(async () => {
        screen.getByLabelText(label).props.onChangeText('');
      });

      expect(screen.getByLabelText('Price range slider').props.range).toEqual([
        PRICE_RANGE.initialMin,
        PRICE_RANGE.initialMax,
      ]);
    }
  );

  it.each(['Min price', 'Max price'])(
    'lader slideren beholde standardværdien når %s kun indeholder mellemrum',
    async (label) => {
      await render(<SearchScreen />);

      await act(async () => {
        screen.getByLabelText(label).props.onChangeText('   ');
      });

      expect(screen.getByLabelText('Price range slider').props.range).toEqual([
        PRICE_RANGE.initialMin,
        PRICE_RANGE.initialMax,
      ]);
    }
  );

  it('springer sliderens værdier til step', async () => {
    await render(<SearchScreen />);

    await act(async () => {
      screen.getByLabelText('Price range slider').props.onValueChange([1585, 8432]);
    });

    expect(screen.getByLabelText('Min price').props.value).toBe('1600');
    expect(screen.getByLabelText('Max price').props.value).toBe('8400');
  });

  it('lader sliderens thumbs ikke krydse hinanden', async () => {
    await render(<SearchScreen />);

    const slider = screen.getByLabelText('Price range slider');

    expect(slider.props.crossingAllowed).toBe(false);

    await act(async () => {
      slider.props.onValueChange([300, 9800]);
    });

    expect(screen.getByLabelText('Price range slider').props.range).toEqual([
      300, 9800,
    ]);
  });

  it('løfter max op hvis slideren sender min over max', async () => {
    await render(<SearchScreen />);

    await act(async () => {
      screen.getByLabelText('Price range slider').props.onValueChange([9800, 9000]);
    });

    expect(screen.getByLabelText('Price range slider').props.range).toEqual([
      9800, 9800,
    ]);
    expect(screen.getByLabelText('Min price').props.value).toBe('9800');
    expect(screen.getByLabelText('Max price').props.value).toBe('9800');
  });

  it('har hvid baggrund uden om og grå boks', () => {
    expect(styles.screen.backgroundColor).toBe('#FFFFFF');
    expect(styles.card.backgroundColor).toBe('#F4F5F8');
  });

  it('har en linje under undertitlen', () => {
    expect(styles.subtitle.borderBottomWidth).toBe(1);
    expect(styles.subtitle.borderBottomColor).toBe('#EAEAEA');
  });

  it('viser Min per day og Max per day', async () => {
    await render(<SearchScreen />);

    expect(screen.getByText('Min per day')).toBeTruthy();
    expect(screen.getByText('Max per day')).toBeTruthy();
  });

  it('viser en synlig label over hvert filterfelt', async () => {
    await render(<SearchScreen />);

    ['Capacity', 'Gear Type', 'Car Type', 'Price Range', 'Fuel', 'Insurance'].forEach(
      (label) => {
        expect(screen.getAllByText(label).length).toBeGreaterThan(0);
      },
    );
  });

  it('skriver antal personer som designets fire valg uden select', async () => {
    await render(<SearchScreen />);

    const labels = screen
      .getByLabelText('Capacity')
      .props.children.flat()
      .filter((item: unknown) => item !== null)
      .map((item: { props: { label: string } }) => item.props.label);

    expect(labels).toEqual([
      '2 persons',
      '4 persons',
      '5 persons',
      '5+ persons',
    ]);
  });

  it.each(PICKS)('%s har ingen select-option', async (label) => {
    await render(<SearchScreen />);

    const labels = screen
      .getByLabelText(label)
      .props.children.flat()
      .filter((item: unknown) => item !== null)
      .map((item: { props: { label: string } }) => item.props.label);

    expect(labels).not.toContain('Select...');
  });

  it.each(PICKS)('%s viser sit første valg som default', async (label, items) => {
    await render(<SearchScreen />);

    expect(screen.getByLabelText(label).props.selectedValue).toBe(items[0].id);
  });

  it('giver hvert af de fire felter sit ikon', async () => {
    await render(<SearchScreen />);

    expect(screen.getAllByTestId('field-icon', { includeHiddenElements: true })).toHaveLength(4);
  });

  it('skjuler ikonerne for skærmlæsere', async () => {
    await render(<SearchScreen />);

    screen
      .getAllByTestId('field-icon', { includeHiddenElements: true })
      .forEach((icon) => {
        expect(icon.props.importantForAccessibility).toBe('no');
        expect(icon.props.accessibilityElementsHidden).toBe(true);
      });
  });

  it('bruger kalenderikon på dato og urikon på tid', async () => {
    await render(<SearchScreen />);

    const paths = screen
      .getAllByTestId('field-icon', { includeHiddenElements: true })
      .map((icon) => icon.props.children.props.d);
    const [kalender, ur] = paths;

    expect(kalender).not.toBe(ur);
    expect(paths.filter((path) => path === kalender)).toHaveLength(2);
    expect(paths.filter((path) => path === ur)).toHaveLength(2);
  });

  it('åbner datovælgeren for pickup', async () => {
    await render(<SearchScreen />);

    await userEvent.press(screen.getByRole('button', { name: 'Pickup date' }));

    expect(screen.getByTestId('mock-datetime-picker')).toBeTruthy();
  });

  it('lukker datovælgeren igen', async () => {
    await render(<SearchScreen />);

    await userEvent.press(screen.getByRole('button', { name: 'Pickup date' }));
    await act(async () => {
      screen.getByTestId('mock-datetime-picker').props.onChange(
        {},
        new Date(2026, 4, 1)
      );
    });

    expect(screen.queryByTestId('mock-datetime-picker')).toBeNull();
    expect(screen.getByText('01 May 2026')).toBeTruthy();
  });

  it('sætter tidspunktet i stedet for datoen', async () => {
    await render(<SearchScreen />);

    await userEvent.press(screen.getByRole('button', { name: 'Pickup time' }));
    await act(async () => {
      screen.getByTestId('mock-datetime-picker').props.onChange(
        {},
        new Date(2026, 4, 1, 14, 30)
      );
    });

    expect(screen.getByText('14:30')).toBeTruthy();
  });

  it('crash ikke når der trykkes på Search', async () => {
    await render(<SearchScreen />);

    await userEvent.press(screen.getByRole('button', { name: 'Search' }));

    expect(screen.getByText('Search for a car')).toBeTruthy();
  });

  describe('tilgængelighed', () => {
    it.each(['Pickup date', 'Pickup time', 'Return date', 'Return time'])(
      'giver %s et trykflade på mindst 48dp',
      async (label) => {
        await render(<SearchScreen />);

        const target = StyleSheet.flatten(screen.getByLabelText(label).props.style);

        expect(target.minHeight).toBeGreaterThanOrEqual(hitTarget.min);
      }
    );

    it.each(['Min price', 'Max price'])(
      'giver %s et trykflade på mindst 48dp',
      async (label) => {
        await render(<SearchScreen />);

        const target = StyleSheet.flatten(screen.getByLabelText(label).props.style);

        expect(target.minHeight).toBeGreaterThanOrEqual(hitTarget.min);
      }
    );

    it('eksponerer slideren som en justerbar kontrol med værdier', async () => {
      await render(<SearchScreen />);

      const slider = screen.getByLabelText('Price range slider');

      expect(screen.getByRole('adjustable', { name: 'Price range slider' })).toBeTruthy();
      expect(slider.props.accessibilityValue).toEqual({
        min: PRICE_RANGE.min,
        max: PRICE_RANGE.max,
        now: PRICE_RANGE.initialMax,
        text: `Fra ${PRICE_RANGE.initialMin} til ${PRICE_RANGE.initialMax} pr. dag`,
      });
    });

    it('tilbyder handlinger for begge thumbs', async () => {
      await render(<SearchScreen />);

      expect(screen.getByLabelText('Price range slider').props.accessibilityActions).toEqual([
        { name: 'increment', label: 'Hæv maksimumpris' },
        { name: 'decrement', label: 'Sænk maksimumpris' },
        { name: 'incrementMinimum', label: 'Hæv minimumpris' },
        { name: 'decrementMinimum', label: 'Sænk minimumpris' },
      ]);
    });

    it.each([
      ['increment', PRICE_RANGE.initialMax + PRICE_RANGE.step, PRICE_RANGE.initialMin],
      ['decrement', PRICE_RANGE.initialMax - PRICE_RANGE.step, PRICE_RANGE.initialMin],
      ['incrementMinimum', PRICE_RANGE.initialMax, PRICE_RANGE.initialMin + PRICE_RANGE.step],
      ['decrementMinimum', PRICE_RANGE.initialMax, PRICE_RANGE.initialMin - PRICE_RANGE.step],
    ])('flytter %s priserne i teksten', async (action, expectedMax, expectedMin) => {
      await render(<SearchScreen />);

      await act(async () => {
        screen
          .getByLabelText('Price range slider')
          .props.onAccessibilityAction({ nativeEvent: { actionName: action } });
      });

      expect(screen.getByLabelText('Min price').props.value).toBe(String(expectedMin));
      expect(screen.getByLabelText('Max price').props.value).toBe(String(expectedMax));
    });

    it('gør sliderens trykbånd til mindst 48dp', async () => {
      await render(<SearchScreen />);

      const band =
        PRICE_SLIDER.trackHeight + 2 * PRICE_SLIDER.touchPadding;

      expect(band).toBeGreaterThanOrEqual(hitTarget.min);
    });

    it('kan ikke skubbe minimum over maksimum via handlingerne', async () => {
      await render(<SearchScreen />);

      await act(async () => {
        screen
          .getByLabelText('Price range slider')
          .props.onAccessibilityAction({ nativeEvent: { actionName: 'incrementMinimum' } });
        screen
          .getByLabelText('Price range slider')
          .props.onAccessibilityAction({ nativeEvent: { actionName: 'incrementMinimum' } });
      });

      const min = Number(screen.getByLabelText('Min price').props.value);
      const max = Number(screen.getByLabelText('Max price').props.value);

      expect(min).toBeLessThanOrEqual(max);
    });
  });
});