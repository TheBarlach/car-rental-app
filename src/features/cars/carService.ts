export type Car = {
    id: string;
    name: string;
    pricePerDay: number;
    currency: string;
    registrationNumber: string;
    seats: number;
    transmission: string;
    fuelType: string;
    laneAssist: boolean;
    description: string;
    insuranceOptions: {
        id: string;
        name: string;
        pricePerDay: number;
    }[];
};

// Fiktive data til udvikling og test.
const cars: Car[] = [
    {
        id: 'car-001',
        name: 'VW Golf VIII 1.5 eTSI',
        pricePerDay: 650,
        currency: 'DKK',
        registrationNumber: 'AB 12 345',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Petrol',
        laneAssist: true,
        description:
            'A comfortable compact car with room for five people. Ideal for city driving and weekend trips.',
        insuranceOptions: [
            { id: 'basic', name: 'Basic Insurance', pricePerDay: 0 },
            { id: 'full', name: 'Full Insurance', pricePerDay: 150 },
        ],
    },
    {
        id: 'car-002',
        name: 'Toyota Yaris 1.5',
        pricePerDay: 450,
        currency: 'DKK',
        registrationNumber: 'CD 67 890',
        seats: 5,
        transmission: 'Manual',
        fuelType: 'Petrol',
        laneAssist: false,
        description:
            'A small and practical car that is easy to park. A good choice for short trips and everyday driving.',
        insuranceOptions: [
            { id: 'basic', name: 'Basic Insurance', pricePerDay: 0 },
            { id: 'full', name: 'Full Insurance', pricePerDay: 100 },
        ],
    },
    {
        id: 'car-003',
        name: 'Tesla Model 3',
        pricePerDay: 950,
        currency: 'DKK',
        registrationNumber: 'EF 23 456',
        seats: 5,
        transmission: 'Automatic',
        fuelType: 'Electric',
        laneAssist: true,
        description:
            'A spacious electric car with a quiet cabin and a modern interior. Suitable for both daily travel and longer journeys.',
        insuranceOptions: [
            { id: 'basic', name: 'Basic Insurance', pricePerDay: 0 },
            { id: 'full', name: 'Full Insurance', pricePerDay: 200 },
        ],
    },
];

// Hent alle biler til biloversigten.
export async function getCars(): Promise<Car[]> {
    return cars;
}

// Hent én bil til CarDetailsScreen.
export async function getCarById(id: string): Promise<Car | null> {
    const car = cars.find((car) => car.id === id);
    return car ?? null;
}
