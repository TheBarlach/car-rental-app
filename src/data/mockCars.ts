export type Car = {
  id: string;
  name: string;
  pricePerDay: number;
  image?: string;
};

export const mockCars: Car[] = [
  {
    id: '1',
    name: 'VW Golf VIII 1.5 eTSI',
    pricePerDay: 2200,
  },
  {
    id: '2',
    name: 'BMW 320d 2.0',
    pricePerDay: 1800,
  },
];