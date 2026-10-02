import type { ImageSourcePropType } from 'react-native';

export type CarStatus = 'active' | 'rented' | 'not-active';

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
  insurance: string;
  description: string;
  image?: ImageSourcePropType | null;
};

// All 20 cars share this until real photos land. Swap the single line below.
const placeholderImage = require('../../assets/icon.png');

export const mockCars: Car[] = [
  {
    id: '1',
    name: 'VW Golf VIII 1.5 eTSI',
    registrationNumber: 'AB 12 345',
    pricePerDay: 2450,
    status: 'active',
    carType: 'Station Car',
    gearType: 'Manual',
    capacity: '5 persons',
    fuelType: 'Gas',
    insurance: 'Full Insurance',
    description:
      'A stylish and comfortable hatchback, perfect for both city drives and long trips.',
    image: placeholderImage,
  },
  {
    id: '2',
    name: 'Tesla Model 3',
    registrationNumber: 'CD 45 678',
    pricePerDay: 8900,
    status: 'active',
    carType: 'Luxury Car',
    gearType: 'Automatic',
    capacity: '5 persons',
    fuelType: 'Electric',
    insurance: 'Full Insurance',
    description:
      'Fully electric saloon with instant torque and a range of around 500 km.',
    image: placeholderImage,
  },
  {
    id: '3',
    name: 'BMW 320d 2.0',
    registrationNumber: 'EF 67 890',
    pricePerDay: 4200,
    status: 'active',
    carType: 'Luxury Car',
    gearType: 'Automatic',
    capacity: '5 persons',
    fuelType: 'Diesel',
    insurance: 'Liability Insurance',
    description:
      'Comfortable executive saloon with a refined diesel engine and good highway manners.',
    image: placeholderImage,
  },
  {
    id: '4',
    name: 'Toyota Corolla Hybrid',
    registrationNumber: 'GH 23 456',
    pricePerDay: 1850,
    status: 'active',
    carType: 'Station Car',
    gearType: 'Automatic',
    capacity: '5 persons',
    fuelType: 'Hybrid',
    insurance: 'No cover',
    description:
      'Reliable hybrid hatchback with low running costs and a compact footprint.',
    image: placeholderImage,
  },
  {
    id: '5',
    name: 'Peugeot e-208',
    registrationNumber: 'IJ 34 567',
    pricePerDay: 1450,
    status: 'active',
    carType: 'Station Car',
    gearType: 'Manual',
    capacity: '4 persons',
    fuelType: 'Electric',
    insurance: 'Liability Insurance',
    description:
      'Small electric city car that is easy to park and cheap to charge.',
    image: placeholderImage,
  },
  {
    id: '6',
    name: 'Mercedes Sprinter',
    registrationNumber: 'KL 45 678',
    pricePerDay: 5600,
    status: 'active',
    carType: 'Van',
    gearType: 'Manual',
    capacity: '5+ persons',
    fuelType: 'Diesel',
    insurance: 'Full Insurance',
    description:
      'Nine-seat van with plenty of luggage room for groups and airport transfers.',
    image: placeholderImage,
  },
  {
    id: '7',
    name: 'Ford Transit Custom',
    registrationNumber: 'MN 56 789',
    pricePerDay: 4300,
    status: 'rented',
    carType: 'Van',
    gearType: 'Manual',
    capacity: '5+ persons',
    fuelType: 'Gas',
    insurance: 'Liability Insurance',
    description:
      'Versatile van with generous cargo space for moving or group travel.',
    image: placeholderImage,
  },
  {
    id: '8',
    name: 'Audi Q5 quattro',
    registrationNumber: 'OP 67 890',
    pricePerDay: 6400,
    status: 'active',
    carType: 'SUV',
    gearType: 'Automatic',
    capacity: '5 persons',
    fuelType: 'Gas/Mild Hybrid',
    insurance: 'Full Insurance',
    description:
      'All-wheel drive SUV with a mild-hybrid engine for confident wet-weather driving.',
    image: placeholderImage,
  },
  {
    id: '9',
    name: 'Volvo XC60 B5',
    registrationNumber: 'QR 78 901',
    pricePerDay: 7100,
    status: 'active',
    carType: 'SUV',
    gearType: 'Automatic',
    capacity: '5 persons',
    fuelType: 'Hybrid',
    insurance: 'Full Insurance',
    description:
      'Safe and comfortable SUV with a hybrid drivetrain and a large, quiet cabin.',
    image: placeholderImage,
  },
  {
    id: '10',
    name: 'Škoda Octavia',
    registrationNumber: 'ST 89 012',
    pricePerDay: 1650,
    status: 'active',
    carType: 'Station Car',
    gearType: 'Manual',
    capacity: '5 persons',
    fuelType: 'Diesel',
    insurance: 'No cover',
    description:
      'Spacious family estate with a big boot and cheap diesel consumption.',
    image: placeholderImage,
  },
  {
    id: '11',
    name: 'Nissan Qashqai e-POWER',
    registrationNumber: 'UV 90 123',
    pricePerDay: 3900,
    status: 'active',
    carType: 'SUV',
    gearType: 'Automatic',
    capacity: '5 persons',
    fuelType: 'Gas/Mild Hybrid',
    insurance: 'Liability Insurance',
    description:
      'SUV with a self-charging mild-hybrid system for quiet urban driving.',
    image: placeholderImage,
  },
  {
    id: '12',
    name: 'Renault Kangoo E-Tech',
    registrationNumber: 'WX 01 234',
    pricePerDay: 1250,
    status: 'not-active',
    carType: 'Van',
    gearType: 'Manual',
    capacity: '2 persons',
    fuelType: 'Electric',
    insurance: 'No cover',
    description:
      'Compact electric van suited to urban deliveries and small moving jobs.',
    image: placeholderImage,
  },
  {
    id: '13',
    name: 'VW Polo',
    registrationNumber: 'YZ 12 456',
    pricePerDay: 950,
    status: 'active',
    carType: 'Station Car',
    gearType: 'Manual',
    capacity: '4 persons',
    fuelType: 'Gas',
    insurance: 'No cover',
    description:
      'Small, agile hatchback that is cheap to run and easy to manoeuvre.',
    image: placeholderImage,
  },
  {
    id: '14',
    name: 'Kia Niro EV',
    registrationNumber: 'AA 23 567',
    pricePerDay: 3200,
    status: 'active',
    carType: 'SUV',
    gearType: 'Automatic',
    capacity: '5 persons',
    fuelType: 'Electric',
    insurance: 'Full Insurance',
    description:
      'Electric crossover with a long range and a practical, upright cabin.',
    image: placeholderImage,
  },
  {
    id: '15',
    name: 'Seat Alhambra',
    registrationNumber: 'BB 34 678',
    pricePerDay: 3700,
    status: 'active',
    carType: 'Van',
    gearType: 'Automatic',
    capacity: '5+ persons',
    fuelType: 'Diesel',
    insurance: 'Full Insurance',
    description:
      'Seven-seat MPV that fits both passengers and bulky luggage.',
    image: placeholderImage,
  },
  {
    id: '16',
    name: 'Hyundai Tucson Hybrid',
    registrationNumber: 'CC 45 789',
    pricePerDay: 3400,
    status: 'active',
    carType: 'SUV',
    gearType: 'Automatic',
    capacity: '5 persons',
    fuelType: 'Hybrid',
    insurance: 'Liability Insurance',
    description:
      'Distinctive SUV with a hybrid drivetrain and a well equipped interior.',
    image: placeholderImage,
  },
  {
    id: '17',
    name: 'Land Rover Defender',
    registrationNumber: 'DD 56 890',
    pricePerDay: 9500,
    status: 'active',
    carType: 'SUV',
    gearType: 'Automatic',
    capacity: '5+ persons',
    fuelType: 'Gas/Mild Hybrid',
    insurance: 'Full Insurance',
    description:
      'Serious off-road capability in a body shape that still works for families.',
    image: placeholderImage,
  },
  {
    id: '18',
    name: 'Fiat 500',
    registrationNumber: 'EE 67 901',
    pricePerDay: 850,
    status: 'active',
    carType: 'Station Car',
    gearType: 'Manual',
    capacity: '2 persons',
    fuelType: 'Gas',
    insurance: 'Liability Insurance',
    description:
      'Iconic small car that is charming to drive and easy to park anywhere.',
    image: placeholderImage,
  },
  {
    id: '19',
    name: 'Jaguar F-Pace',
    registrationNumber: 'FF 78 012',
    pricePerDay: 7900,
    status: 'rented',
    carType: 'SUV',
    gearType: 'Automatic',
    capacity: '5 persons',
    fuelType: 'Gas',
    insurance: 'Full Insurance',
    description:
      'Premium sports SUV with a powerful engine and an excellent driver focus.',
    image: placeholderImage,
  },
  {
    id: '20',
    name: 'VW ID. Buzz',
    registrationNumber: 'GG 89 123',
    pricePerDay: 6800,
    status: 'active',
    carType: 'Van',
    gearType: 'Automatic',
    capacity: '5+ persons',
    fuelType: 'Electric',
    insurance: 'Full Insurance',
    description:
      'Electric van with the classic camper van shape and a very spacious interior.',
    image: placeholderImage,
  },
];