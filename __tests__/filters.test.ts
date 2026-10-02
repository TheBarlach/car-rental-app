import { mockCapacities, mockCarTypes, mockFuelTypes, mockGearTypes, mockInsuranceOptions } from '../src/mocks/filters';
import { PRICE_RANGE } from '../src/features/search/priceRange';

describe('mockdata til søgefilters', () => {
  const lister = [
    ['gear types', mockGearTypes],
    ['car types', mockCarTypes],
    ['fuel types', mockFuelTypes],
    ['insurance options', mockInsuranceOptions],
  ] as const;

  it.each(lister)('%s er ikke tomme', (_navn, liste) => {
    expect(liste.length).toBeGreaterThan(0);
  });

  it.each(lister)('%s har unikke id-nøgler', (_navn, liste) => {
    const ids = liste.map((option) => option.id);

    expect(new Set(ids).size).toBe(ids.length);
  });

  it.each(lister)('%s har unikke labels', (_navn, liste) => {
    const labels = liste.map((option) => option.label);

    expect(new Set(labels).size).toBe(labels.length);
  });

  it.each(lister)('%s har ikke tomme labels', (_navn, liste) => {
    liste.forEach((option) => {
      expect(option.label.length).toBeGreaterThan(0);
    });
  });

  it('gear type starter med Manuel, så default viser designets valg', () => {
    expect(mockGearTypes[0].label).toBe('Manuel');
  });

  it('car type starter med Station Car, så default viser designets valg', () => {
    expect(mockCarTypes[0].label).toBe('Station Car');
  });

  it('fuel starter med Benzin, så default viser designets valg', () => {
    expect(mockFuelTypes[0].label).toBe('Benzin');
  });

  it('insurance starter med Full Insurance, så default viser designets valg', () => {
    expect(mockInsuranceOptions[0].label).toBe('Full Insurance');
  });

  it('kapaciteter er stigende', () => {
    const sorteret = [...mockCapacities].sort((a, b) => a - b);

    expect(mockCapacities).toEqual(sorteret);
  });

  it('har en kapacitet på 2, som designet viser', () => {
    expect(mockCapacities).toContain(2);
  });

  it('prisintervallet er gyldigt', () => {
    expect(PRICE_RANGE.min).toBeLessThan(PRICE_RANGE.max);
    expect(PRICE_RANGE.initialMin).toBeGreaterThanOrEqual(PRICE_RANGE.min);
    expect(PRICE_RANGE.initialMax).toBeLessThanOrEqual(PRICE_RANGE.max);
  });

  it('prisintervallet har et step der går op i det', () => {
    expect(PRICE_RANGE.step).toBeGreaterThan(0);
    expect(PRICE_RANGE.initialMin % PRICE_RANGE.step).toBe(0);
    expect(PRICE_RANGE.initialMax % PRICE_RANGE.step).toBe(0);
  });
});