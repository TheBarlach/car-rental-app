import type { PickerItem } from '../features/search/types';

export const mockGearTypes: PickerItem[] = [
  { id: 'manual', label: 'Manuel' },
  { id: 'automatic', label: 'Automatic' },
];

export const mockCarTypes: PickerItem[] = [
  { id: 'station', label: 'Station Car' },
  { id: 'suv', label: 'SUV' },
  { id: 'van', label: 'Van' },
  { id: 'luxury', label: 'Luxury Car' },
];

export const mockFuelTypes: PickerItem[] = [
  { id: 'petrol', label: 'Benzin' },
  { id: 'diesel', label: 'Diesel' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'electric', label: 'Electric' },
];

export const mockInsuranceOptions: PickerItem[] = [
  { id: 'full', label: 'Full Insurance' },
  { id: 'basic', label: 'Basic Insurance' },
  { id: 'none', label: 'No Insurance' },
];

export const mockCapacities = [1, 2, 3, 4, 5, 7, 9];
