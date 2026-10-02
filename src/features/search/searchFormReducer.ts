import { PRICE_RANGE } from './priceRange';
import type { SearchFormAction, SearchFormState } from './types';

function toNumber(raw: string, fallback: number): number {
  const trimmed = raw.trim();
  if (trimmed === '') return fallback;
  const parsed = Number(trimmed);
  return Number.isFinite(parsed) ? parsed : fallback;
}

function snap(value: number): number {
  return Math.round(value / PRICE_RANGE.step) * PRICE_RANGE.step;
}

function clamp(value: number, floor: number, ceiling: number): number {
  return Math.min(Math.max(value, floor), Math.max(floor, ceiling));
}

function currentCeiling(state: SearchFormState): number {
  return toNumber(state.maxPrice, PRICE_RANGE.initialMax);
}

function currentFloor(state: SearchFormState): number {
  return toNumber(state.minPrice, PRICE_RANGE.initialMin);
}

export function searchFormReducer(state: SearchFormState, action: SearchFormAction): SearchFormState {
  switch (action.type) {
    case 'setPickupDate': return { ...state, pickupDate: action.value };
    case 'setPickupTime': return { ...state, pickupTime: action.value };
    case 'setReturnDate': return { ...state, returnDate: action.value };
    case 'setReturnTime': return { ...state, returnTime: action.value };
    case 'setCapacity': return { ...state, capacity: action.value };
    case 'setGearType': return { ...state, gearType: action.value };
    case 'setCarType': return { ...state, carType: action.value };
    case 'setFuelType': return { ...state, fuelType: action.value };
    case 'setInsurance': return { ...state, insurance: action.value };
    case 'setMinPriceText': return { ...state, minPrice: action.value };
    case 'setMaxPriceText': return { ...state, maxPrice: action.value };
    case 'commitMinPrice': {
      const ceiling = Math.min(currentCeiling(state), PRICE_RANGE.max);
      return { ...state, minPrice: String(clamp(snap(toNumber(state.minPrice, PRICE_RANGE.initialMin)), PRICE_RANGE.min, ceiling)) };
    }
    case 'commitMaxPrice': {
      const floor = Math.max(currentFloor(state), PRICE_RANGE.min);
      return { ...state, maxPrice: String(clamp(snap(toNumber(state.maxPrice, PRICE_RANGE.initialMax)), floor, PRICE_RANGE.max)) };
    }
    case 'setPriceRangeFromSlider': {
      const nextMin = snap(action.min);
      const nextMax = Math.max(snap(action.max), nextMin);
      return { ...state, minPrice: String(nextMin), maxPrice: String(nextMax) };
    }
    default:
      return state;
  }
}
