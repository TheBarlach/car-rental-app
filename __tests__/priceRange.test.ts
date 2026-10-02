import { clampPriceRange, PRICE_RANGE, PRICE_SLIDER } from '../src/features/search/priceRange';
import { hitTarget } from '../src/theme';

describe('clampPriceRange', () => {
  it('lader gyldige værdier passere uændret', () => {
    expect(clampPriceRange(2000, 6000)).toEqual([2000, 6000]);
  });

  it('snapper værdier til step', () => {
    expect(clampPriceRange(1585, 8432)).toEqual([1600, 8400]);
  });

  it('klemmer værdier uden for intervallet', () => {
    expect(clampPriceRange(-500, 40000)).toEqual([
      PRICE_RANGE.min,
      PRICE_RANGE.max,
    ]);
  });

  it('trækker minimum ned når maksimum er for tæt på', () => {
    const [min, max] = clampPriceRange(8900, 8950);

    expect(max).toBe(9000);
    expect(min).toBe(max - PRICE_RANGE.minimumRange);
  });

  it('klemmer minimum ned når den sendes tættere på enda minimumRange', () => {
    expect(clampPriceRange(8950, 9000)).toEqual([
      9000 - PRICE_RANGE.minimumRange,
      9000,
    ]);
  });

  it('løfter minimum når det sendes over maksimum', () => {
    const [min, max] = clampPriceRange(9800, 9000);

    expect(min).toBeLessThanOrEqual(max);
  });

  it('sender ikke minimum under PRICE_RANGE.min', () => {
    expect(clampPriceRange(500, 0)[0]).toBe(PRICE_RANGE.min);
  });

  it('sender ikke maksimum over PRICE_RANGE.max', () => {
    expect(clampPriceRange(0, 50000)[1]).toBe(PRICE_RANGE.max);
  });
});

describe('PRICE_SLIDER giver et trykbånd på mindst 48dp', () => {
  it('tager track og padding sammen', () => {
    const band = PRICE_SLIDER.trackHeight + 2 * PRICE_SLIDER.touchPadding;

    expect(band).toBeGreaterThanOrEqual(hitTarget.min);
  });
});
