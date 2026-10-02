export interface PickerItem {
  id: string;
  label: string;
}

export type DateTimeValue = Date | null;

export interface SearchFormState {
  pickupDate: DateTimeValue;
  pickupTime: DateTimeValue;
  returnDate: DateTimeValue;
  returnTime: DateTimeValue;
  capacity: PickerItem | null;
  gearType: PickerItem | null;
  carType: PickerItem | null;
  fuelType: PickerItem | null;
  insurance: PickerItem | null;
  minPrice: string;
  maxPrice: string;
}

export type SearchFormAction =
  | { type: 'setPickupDate'; value: DateTimeValue }
  | { type: 'setPickupTime'; value: DateTimeValue }
  | { type: 'setReturnDate'; value: DateTimeValue }
  | { type: 'setReturnTime'; value: DateTimeValue }
  | { type: 'setCapacity'; value: PickerItem | null }
  | { type: 'setGearType'; value: PickerItem | null }
  | { type: 'setCarType'; value: PickerItem | null }
  | { type: 'setFuelType'; value: PickerItem | null }
  | { type: 'setInsurance'; value: PickerItem | null }
  | { type: 'setMinPriceText'; value: string }
  | { type: 'setMaxPriceText'; value: string }
  | { type: 'commitMinPrice' }
  | { type: 'commitMaxPrice' }
  | { type: 'setPriceRangeFromSlider'; min: number; max: number };

export const initialSearchForm: SearchFormState = {
  pickupDate: null,
  pickupTime: null,
  returnDate: null,
  returnTime: null,
  capacity: null,
  gearType: null,
  carType: null,
  fuelType: null,
  insurance: null,
  minPrice: String(500),
  maxPrice: String(9000),
};
