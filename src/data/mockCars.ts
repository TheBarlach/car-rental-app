import { ImageSourcePropType } from 'react-native';

export type CarStatus =
  | 'active'
  | 'rented'
  | 'not-active';

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
};

export const mockCars: Car[] = [
  {
    id: '1',
    name: 'VW Golf VIII 1.5 eTSI',
    registrationNumber: 'AB 12 345',
    pricePerDay: 13350,
    status: 'active',
    carType: 'Station Car',
    gearType: 'Manual',
    capacity: '2 Persons',
    fuelType: 'Benzin',
    description:
      'A stylish and comfortable sedan, perfect for both city drives and long trips.',
    image: require('../../assets/images/Gold viii.jpg'),
  },
  {
    id: '2',
    name: 'Tesla Model 3',
    registrationNumber: 'CD 45 678',
    pricePerDay: 15000,
    status: 'rented',
    carType: 'Sedan',
    gearType: 'Automatic',
    capacity: '5 Persons',
    fuelType: 'Electric',
    description:
      'Electric car used for testing.',
    image: require('../../assets/images/Tesla model 3.jpg'),
  },
];