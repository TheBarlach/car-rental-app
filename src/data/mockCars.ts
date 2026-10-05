import { ImageSourcePropType } from 'react-native';

// The single source of mock car data. Every screen (map, search, car details,
// payment, bookings, admin) reads its cars from here.

export type CarStatus =
  | 'active'
  | 'rented'
  | 'not-active';

export type InsuranceOption = {
  id: string;
  name: string;
  pricePerDay: number;
};

export type CarLocation = {
  name: string;
  // Position on the placeholder map image, in percent from the top/left.
  latitude: number;
  longitude: number;
};

export type Car = {
  id: string;
  name: string;
  registrationNumber: string;
  pricePerDay: number;
  status: CarStatus;
  carType: string;
  gearType: string;
  capacity: string;
  fuelType: string;
  description: string;
  image?: ImageSourcePropType | null;
  // The fields below are optional because cars added on the admin page don't have them.
  year?: number;
  kilometer?: number;
  laneAssist?: boolean;
  // Pick-up location. Cars without one are not shown on the map.
  location?: CarLocation;
  insuranceOptions?: InsuranceOption[];
};

export const defaultInsuranceOptions: InsuranceOption[] = [
  { id: 'basic', name: 'Basic Insurance', pricePerDay: 0 },
  { id: 'full', name: 'Full Insurance', pricePerDay: 150 },
];

export const mockCars: Car[] = [
  {
    id: '1',
    name: 'VW Golf VIII 1.5 eTSI',
    registrationNumber: 'AB 12 345',
    pricePerDay: 2200,
    status: 'active',
    carType: 'Station Car',
    gearType: 'Manual',
    capacity: '2 Persons',
    fuelType: 'Benzin',
    description:
      'A stylish and comfortable sedan, perfect for both city drives and long trips.',
    image: require('../../assets/images/Gold viii.jpg'),
    year: 2021,
    kilometer: 15000,
    laneAssist: true,
    location: {
      name: 'Campusvej 55, 5230 Odense M',
      latitude: 45,
      longitude: 48,
    },
    insuranceOptions: defaultInsuranceOptions,
  },
  {
    id: '2',
    name: 'Tesla Model 3',
    registrationNumber: 'CD 45 678',
    pricePerDay: 950,
    status: 'active',
    carType: 'Sedan',
    gearType: 'Automatic',
    capacity: '5 Persons',
    fuelType: 'Electric',
    description:
      'A spacious electric car with a quiet cabin and a modern interior. Suitable for both daily travel and longer journeys.',
    image: require('../../assets/images/Tesla model 3.jpg'),
    year: 2022,
    kilometer: 10000,
    laneAssist: true,
    location: {
      name: 'Airport Terminal 2',
      latitude: 72,
      longitude: 38,
    },
    insuranceOptions: [
      { id: 'basic', name: 'Basic Insurance', pricePerDay: 0 },
      { id: 'full', name: 'Full Insurance', pricePerDay: 200 },
    ],
  },
  {
    id: '3',
    name: 'Toyota Yaris 1.5',
    registrationNumber: 'CD 67 890',
    pricePerDay: 450,
    status: 'active',
    carType: 'Station Car',
    gearType: 'Manual',
    capacity: '5 Persons',
    fuelType: 'Benzin',
    description:
      'A small and practical car that is easy to park. A good choice for short trips and everyday driving.',
    image: null,
    year: 2021,
    kilometer: 15000,
    laneAssist: false,
    location: {
      name: 'Central Station',
      latitude: 28,
      longitude: 22,
    },
    insuranceOptions: [
      { id: 'basic', name: 'Basic Insurance', pricePerDay: 0 },
      { id: 'full', name: 'Full Insurance', pricePerDay: 100 },
    ],
  },
  {
    id: '4',
    name: 'Honda CR-V',
    registrationNumber: 'GH 56 789',
    pricePerDay: 750,
    status: 'active',
    carType: 'SUV',
    gearType: 'Manual',
    capacity: '5 Persons',
    fuelType: 'Diesel',
    description:
      'A roomy family SUV with plenty of space for passengers and luggage.',
    image: null,
    year: 2020,
    kilometer: 30000,
    laneAssist: true,
    location: {
      name: 'Harbour Parking',
      latitude: 52,
      longitude: 68,
    },
    insuranceOptions: defaultInsuranceOptions,
  },
  {
    id: '5',
    name: 'BMW 320d 2.0',
    registrationNumber: 'CD 34 567',
    pricePerDay: 1800,
    status: 'rented',
    carType: 'Sedan',
    gearType: 'Automatic',
    capacity: '5 Persons',
    fuelType: 'Diesel',
    description:
      'A refined and comfortable vehicle for everyday driving and longer journeys.',
    image: null,
    year: 2022,
    kilometer: 20000,
    laneAssist: true,
    insuranceOptions: defaultInsuranceOptions,
  },
  {
    id: '6',
    name: 'BMW Z4',
    registrationNumber: 'IJ 78 901',
    pricePerDay: 1200,
    status: 'not-active',
    carType: 'Sedan',
    gearType: 'Manual',
    capacity: '2 Persons',
    fuelType: 'Benzin',
    description: 'A sporty two-seat convertible for sunny days.',
    image: null,
    year: 2021,
    kilometer: 25000,
    laneAssist: false,
    location: {
      name: 'North Car Park',
      latitude: 34,
      longitude: 82,
    },
    insuranceOptions: defaultInsuranceOptions,
  },
];

export function findMockCar(id: string): Car | undefined {
  return mockCars.find((car) => car.id === id);
}
