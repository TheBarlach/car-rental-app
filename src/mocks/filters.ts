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
  { id: 'gasoline', label: 'Gasoline' },
  { id: 'gasoline-mild-hybrid', label: 'Gasoline/Mild Hybrid' },
  { id: 'diesel', label: 'Diesel' },
  { id: 'hybrid', label: 'Hybrid' },
  { id: 'electric', label: 'Electric' },
];

export const mockInsuranceOptions: PickerItem[] = [
  { id: 'full', label: 'Full Insurance' },
  { id: 'liability', label: 'Liability Insurance' },
  { id: 'none', label: 'No cover' },
];

export const mockCapacities: PickerItem[] = [
  { id: '2', label: '2 persons' },
  { id: '4', label: '4 persons' },
  { id: '5', label: '5 persons' },
  { id: '5plus', label: '5+ persons' },
];