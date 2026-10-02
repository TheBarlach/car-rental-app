import { searchFormReducer } from '../src/features/search/searchFormReducer';
import { PRICE_RANGE } from '../src/features/search/priceRange';
import { initialSearchForm } from '../src/features/search/types';
import type {
  PickerItem,
  SearchFormAction,
  SearchFormState,
} from '../src/features/search/types';

const manuel: PickerItem = { id: 'manual', label: 'Manuel' };
const automatisk: PickerItem = { id: 'automatic', label: 'Automatic' };
const stationCar: PickerItem = { id: 'station', label: 'Station Car' };
const suv: PickerItem = { id: 'suv', label: 'SUV' };
const benzin: PickerItem = { id: 'petrol', label: 'Benzin' };
const diesel: PickerItem = { id: 'diesel', label: 'Diesel' };
const fuld: PickerItem = { id: 'full', label: 'Full Insurance' };
const ingen: PickerItem = { id: 'none', label: 'No Insurance' };
const toPersoner: PickerItem = { id: '2', label: '2' };

function apply(
  state: SearchFormState,
  ...actions: SearchFormAction[]
): SearchFormState {
  return actions.reduce(searchFormReducer, state);
}

describe('searchFormReducer', () => {
  describe('initialSearchForm', () => {
    it('starter med tomme dato- og tidspunkter', () => {
      expect(initialSearchForm.pickupDate).toBeNull();
      expect(initialSearchForm.pickupTime).toBeNull();
      expect(initialSearchForm.returnDate).toBeNull();
      expect(initialSearchForm.returnTime).toBeNull();
    });

    it('starter med tomme filtre', () => {
      expect(initialSearchForm.capacity).toBeNull();
      expect(initialSearchForm.gearType).toBeNull();
      expect(initialSearchForm.carType).toBeNull();
      expect(initialSearchForm.fuelType).toBeNull();
      expect(initialSearchForm.insurance).toBeNull();
    });

    it('starter med standardpriserne fra designsystemet', () => {
      expect(initialSearchForm.minPrice).toBe(String(PRICE_RANGE.initialMin));
      expect(initialSearchForm.maxPrice).toBe(String(PRICE_RANGE.initialMax));
    });
  });

  describe('dato- og tidspunkter', () => {
    const pickupDate = new Date(2026, 4, 1);
    const pickupTime = new Date(2026, 4, 1, 14, 30);
    const returnDate = new Date(2026, 4, 8);
    const returnTime = new Date(2026, 4, 8, 9, 0);

    it('sætter pickup-datoen', () => {
      const next = apply(initialSearchForm, {
        type: 'setPickupDate',
        value: pickupDate,
      });

      expect(next.pickupDate).toBe(pickupDate);
    });

    it('sætter pickup-tiden', () => {
      const next = apply(initialSearchForm, {
        type: 'setPickupTime',
        value: pickupTime,
      });

      expect(next.pickupTime).toBe(pickupTime);
    });

    it('sætter return-datoen', () => {
      const next = apply(initialSearchForm, {
        type: 'setReturnDate',
        value: returnDate,
      });

      expect(next.returnDate).toBe(returnDate);
    });

    it('sætter return-tiden', () => {
      const next = apply(initialSearchForm, {
        type: 'setReturnTime',
        value: returnTime,
      });

      expect(next.returnTime).toBe(returnTime);
    });

    it('rydder et tidspunkt igen med null', () => {
      const next = apply(initialSearchForm, {
        type: 'setPickupDate',
        value: pickupDate,
      });
      const cleared = apply(next, { type: 'setPickupDate', value: null });

      expect(cleared.pickupDate).toBeNull();
    });

    it('rører ikke de andre felter ved en enkelt ændring', () => {
      const next = apply(initialSearchForm, {
        type: 'setPickupDate',
        value: pickupDate,
      });

      expect(next.pickupTime).toBeNull();
      expect(next.returnDate).toBeNull();
      expect(next.returnTime).toBeNull();
      expect(next.minPrice).toBe(initialSearchForm.minPrice);
      expect(next.maxPrice).toBe(initialSearchForm.maxPrice);
    });
  });

  describe('filtre', () => {
    it.each([
      ['setCapacity', 'capacity', toPersoner],
      ['setGearType', 'gearType', automatisk],
      ['setCarType', 'carType', suv],
      ['setFuelType', 'fuelType', diesel],
      ['setInsurance', 'insurance', ingen],
    ] as const)('sætter %s på sit eget felt', (type, felt, value) => {
      const next = apply(initialSearchForm, { type, value });

      const felter: Record<string, PickerItem | null> = {
        capacity: next.capacity,
        gearType: next.gearType,
        carType: next.carType,
        fuelType: next.fuelType,
        insurance: next.insurance,
      };

      expect(felter[felt]).toBe(value);

      Object.entries(felter)
        .filter(([navn]) => navn !== felt)
        .forEach(([, faktisk]) => expect(faktisk).toBeNull());
    });

    it('overskriver et filter med en ny værdi', () => {
      const next = apply(initialSearchForm, {
        type: 'setGearType',
        value: manuel,
      });
      const skiftet = apply(next, {
        type: 'setGearType',
        value: automatisk,
      });

      expect(skiftet.gearType).toBe(automatisk);
    });

    it('rydder et filter igen med null', () => {
      const valgt = apply(initialSearchForm, {
        type: 'setInsurance',
        value: fuld,
      });
      const ryddet = apply(valgt, { type: 'setInsurance', value: null });

      expect(ryddet.insurance).toBeNull();
    });
  });

  describe('pristekst', () => {
    it('gemmer min-prisen råt uden at normalisere', () => {
      const next = apply(initialSearchForm, {
        type: 'setMinPriceText',
        value: '1585',
      });

      expect(next.minPrice).toBe('1585');
    });

    it('gemmer max-prisen råt uden at normalisere', () => {
      const next = apply(initialSearchForm, {
        type: 'setMaxPriceText',
        value: '8432',
      });

      expect(next.maxPrice).toBe('8432');
    });

    it('lader et tomt felt stå tomt', () => {
      const next = apply(initialSearchForm, {
        type: 'setMinPriceText',
        value: '',
      });

      expect(next.minPrice).toBe('');
    });

    it('rører ikke max-prisen når min-prisen ændres', () => {
      const next = apply(initialSearchForm, {
        type: 'setMinPriceText',
        value: '1500',
      });

      expect(next.maxPrice).toBe(initialSearchForm.maxPrice);
    });
  });

  describe('commitMinPrice', () => {
    it('springer værdien til step', () => {
      const next = apply(initialSearchForm, {
        type: 'setMinPriceText',
        value: '2750',
      });

      expect(apply(next, { type: 'commitMinPrice' }).minPrice).toBe('2800');
    });

    it('runder værdier tættere på step ned', () => {
      const next = apply(initialSearchForm, {
        type: 'setMinPriceText',
        value: '1585',
      });

      expect(apply(next, { type: 'commitMinPrice' }).minPrice).toBe('1600');
    });

    it('falder tilbage på standardværdien når feltet er tomt', () => {
      const next = apply(initialSearchForm, {
        type: 'setMinPriceText',
        value: '',
      });

      expect(apply(next, { type: 'commitMinPrice' }).minPrice).toBe(
        String(PRICE_RANGE.initialMin),
      );
    });

    it('falder tilbage på standardværdien når feltet kun er mellemrum', () => {
      const next = apply(initialSearchForm, {
        type: 'setMinPriceText',
        value: '   ',
      });

      expect(apply(next, { type: 'commitMinPrice' }).minPrice).toBe(
        String(PRICE_RANGE.initialMin),
      );
    });

    it('springer ikke over den nuværende max-pris', () => {
      const next = apply(
        initialSearchForm,
        { type: 'setMaxPriceText', value: '3000' },
        { type: 'setMinPriceText', value: '5000' },
      );

      expect(apply(next, { type: 'commitMinPrice' }).minPrice).toBe('3000');
    });

    it('tvinger minimum ned når begge priser er under PRICE_RANGE.min', () => {
      const next = apply(
        initialSearchForm,
        { type: 'setMinPriceText', value: '-500' },
        { type: 'setMaxPriceText', value: '-900' },
        { type: 'commitMinPrice' },
      );

      expect(Number(next.minPrice)).toBe(PRICE_RANGE.min);
    });

    it('sender aldrig minimum over PRICE_RANGE.max', () => {
      const next = apply(
        initialSearchForm,
        { type: 'setMinPriceText', value: '45000' },
        { type: 'setMaxPriceText', value: '46000' },
        { type: 'commitMinPrice' },
      );

      expect(Number(next.minPrice)).toBe(PRICE_RANGE.max);
    });
  });

  describe('commitMaxPrice', () => {
    it('springer værdien til step', () => {
      const next = apply(initialSearchForm, {
        type: 'setMaxPriceText',
        value: '8432',
      });

      expect(apply(next, { type: 'commitMaxPrice' }).maxPrice).toBe('8400');
    });

    it('falder tilbage på standardværdien når feltet er tomt', () => {
      const next = apply(initialSearchForm, {
        type: 'setMaxPriceText',
        value: '',
      });

      expect(apply(next, { type: 'commitMaxPrice' }).maxPrice).toBe(
        String(PRICE_RANGE.initialMax),
      );
    });

    it('falder tilbage på standardværdien når feltet kun er mellemrum', () => {
      const next = apply(initialSearchForm, {
        type: 'setMaxPriceText',
        value: '   ',
      });

      expect(apply(next, { type: 'commitMaxPrice' }).maxPrice).toBe(
        String(PRICE_RANGE.initialMax),
      );
    });

    it('springer ikke under den nuværende min-pris', () => {
      const next = apply(
        initialSearchForm,
        { type: 'setMinPriceText', value: '5000' },
        { type: 'setMaxPriceText', value: '2000' },
      );

      expect(apply(next, { type: 'commitMaxPrice' }).maxPrice).toBe('5000');
    });

    it('følger en min-pris der ligger over PRICE_RANGE.max i stedet for at blive lavere', () => {
      const next = apply(
        initialSearchForm,
        { type: 'setMinPriceText', value: '45000' },
        { type: 'setMaxPriceText', value: '46000' },
        { type: 'commitMaxPrice' },
      );

      expect(next.maxPrice).toBe('45000');
    });

    it('sender aldrig maksimum under PRICE_RANGE.min', () => {
      const next = apply(
        initialSearchForm,
        { type: 'setMinPriceText', value: '-2000' },
        { type: 'setMaxPriceText', value: '-1000' },
        { type: 'commitMaxPrice' },
      );

      expect(Number(next.maxPrice)).toBe(PRICE_RANGE.min);
    });
  });

  describe('setPriceRangeFromSlider', () => {
    it('skriver begge priser tilbage i tekstfelterne', () => {
      const next = apply(initialSearchForm, {
        type: 'setPriceRangeFromSlider',
        min: 1800,
        max: 8500,
      });

      expect(next.minPrice).toBe('1800');
      expect(next.maxPrice).toBe('8500');
    });

    it('springer begge værdier til step', () => {
      const next = apply(initialSearchForm, {
        type: 'setPriceRangeFromSlider',
        min: 1585,
        max: 8432,
      });

      expect(next.minPrice).toBe('1600');
      expect(next.maxPrice).toBe('8400');
    });

    it('løfter maksimum når slideren sender minimum over maksimum', () => {
      const next = apply(initialSearchForm, {
        type: 'setPriceRangeFromSlider',
        min: 9800,
        max: 9000,
      });

      expect(next.minPrice).toBe('9800');
      expect(next.maxPrice).toBe('9800');
    });

    it('beholder værdier uden for PRICE_RANGE-grænserne', () => {
      const next = apply(initialSearchForm, {
        type: 'setPriceRangeFromSlider',
        min: 300,
        max: 9800,
      });

      expect(next.minPrice).toBe('300');
      expect(next.maxPrice).toBe('9800');
    });

    it('rører ikke datoer, tidspunkter eller filtre', () => {
      const next = apply(initialSearchForm, {
        type: 'setPriceRangeFromSlider',
        min: 1000,
        max: 2000,
      });

      expect(next.pickupDate).toBeNull();
      expect(next.returnTime).toBeNull();
      expect(next.gearType).toBeNull();
    });
  });

  it('lader state være uændret ved en ukendt action', () => {
    const next = searchFormReducer(initialSearchForm, {
      type: 'noeViIkkeKender',
    } as unknown as SearchFormAction);

    expect(next).toBe(initialSearchForm);
  });

  it('gør ingen mutation af den state den får', () => {
    const before = { ...initialSearchForm };

    apply(initialSearchForm, { type: 'setMinPriceText', value: '1500' });

    expect(initialSearchForm).toEqual(before);
  });
});