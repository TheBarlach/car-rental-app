import type { CarStatus } from '../src/data/mockCars';
import { mockCars } from '../src/data/mockCars';

// These mirror src/mocks/filters.ts on the search branch. Swap for the real
// imports once search merges, so the data and the pickers cannot drift apart.
const CAPACITIES = ['2 persons', '4 persons', '5 persons', '5+ persons'];
const GEAR_TYPES = ['Manual', 'Automatic'];
const CAR_TYPES = ['Station Car', 'SUV', 'Van', 'Luxury Car'];
const FUEL_TYPES = [
  'Gas',
  'Gas/Mild Hybrid',
  'Diesel',
  'Hybrid',
  'Electric',
];
const INSURANCE = ['Full Insurance', 'Liability Insurance', 'No cover'];

const PRICE_MIN = 0;
const PRICE_MAX = 10000;

const VALID_STATUSES: CarStatus[] = ['active', 'rented', 'not-active'];

type Dimension = 'capacity' | 'gearType' | 'carType' | 'fuelType' | 'insurance';

const expectCoversAll = (key: Dimension, expected: string[]) => {
  const actual = new Set(mockCars.map((car) => car[key]));
  const missing = expected.filter((value) => !actual.has(value));
  expect(missing).toEqual([]);
};

const expectOnlyKnownValues = (key: Dimension, allowed: string[]) => {
  const allowedSet = new Set(allowed);
  const unknown = [
    ...new Set(
      mockCars.map((car) => car[key]).filter((value) => !allowedSet.has(value)),
    ),
  ];
  expect(unknown).toEqual([]);
};

describe('mockCars', () => {
  it('indeholder 20 biler', () => {
    expect(mockCars).toHaveLength(20);
  });

  it('giver hver bil et unikt id', () => {
    expect(new Set(mockCars.map((car) => car.id)).size).toBe(mockCars.length);
  });

  it('giver hver bil et unikt registreringsnummer', () => {
    expect(
      new Set(mockCars.map((car) => car.registrationNumber)).size,
    ).toBe(mockCars.length);
  });

  it('giver hver bil et billede', () => {
    const missing = mockCars.filter((car) => !car.image).map((car) => car.name);
    expect(missing).toEqual([]);
  });

  it('giver hver bil en beskrivelse', () => {
    const missing = mockCars.filter((car) => !car.description.trim()).map((c) => c.name);
    expect(missing).toEqual([]);
  });

  it('dækker alle kapaciteter', () => {
    expectCoversAll('capacity', CAPACITIES);
  });

  it('dækker alle gear-typer', () => {
    expectCoversAll('gearType', GEAR_TYPES);
  });

  it('dækker alle biltyper', () => {
    expectCoversAll('carType', CAR_TYPES);
  });

  it('dækker alle brændstoffer', () => {
    expectCoversAll('fuelType', FUEL_TYPES);
  });

  it('dækker alle forsikringsvalg', () => {
    expectCoversAll('insurance', INSURANCE);
  });

  it('bruger kun kapacitetsværdier fra listen', () => {
    expectOnlyKnownValues('capacity', CAPACITIES);
  });

  it('bruger kun brændstofværdier fra listen', () => {
    expectOnlyKnownValues('fuelType', FUEL_TYPES);
  });

  it('ligger alle priser i sliderens interval', () => {
    const outside = mockCars
      .filter(
        (car) => car.pricePerDay < PRICE_MIN || car.pricePerDay > PRICE_MAX,
      )
      .map((car) => `${car.name}: ${car.pricePerDay}`);
    expect(outside).toEqual([]);
  });

  it('fordeler priserne over hele intervallet', () => {
    const prices = mockCars.map((car) => car.pricePerDay);
    expect(Math.min(...prices)).toBeLessThan(1500);
    expect(Math.max(...prices)).toBeGreaterThan(9000);
  });

  it('bruger ingen pris to gange', () => {
    expect(new Set(mockCars.map((car) => car.pricePerDay)).size).toBe(
      mockCars.length,
    );
  });

  it('kun bruger gyldige statusser', () => {
    const invalid = mockCars
      .filter((car) => !VALID_STATUSES.includes(car.status))
      .map((car) => `${car.name}: ${car.status}`);
    expect(invalid).toEqual([]);
  });

  it('har nok aktive biler til at søgningen kan vise noget', () => {
    expect(mockCars.filter((car) => car.status === 'active').length).toBeGreaterThanOrEqual(
      10,
    );
  });
});