import type { MapCar } from './map.types';

export const mockMapCars: MapCar[] = [
	{
		id: 'car-1',
		name: 'City Hatchback',
		locationName: 'Central Station',
		latitude: 28,
		longitude: 22,
		isAvailable: true,
        specifications: {
            brandModel: 'Toyota Yaris',
            year: 2021,
            kilometer: 15000,
            fuelType: 'Petrol',
            gearbox: 'Automatic',
            price: 25000,
            registrationNumber: 'ABC1234',
        }
	},
	{
		id: 'car-2',
		name: 'Family SUV',
		locationName: 'Harbour Parking',
		latitude: 52,
		longitude: 68,
		isAvailable: true,
        specifications: {
            brandModel: 'Honda CR-V',
            year: 2020,
            kilometer: 30000,
            fuelType: 'Diesel',
            gearbox: 'Manual',
            price: 35000,
            registrationNumber: 'XYZ5678',
        }
	},
	{
		id: 'car-3',
		name: 'Electric Sedan',
		locationName: 'Airport Terminal 2',
		latitude: 72,
		longitude: 38,
		isAvailable: true,
        specifications: {
            brandModel: 'Tesla Model 3',
            year: 2022,
            kilometer: 10000,
            fuelType: 'Electric',
            gearbox: 'Automatic',
            price: 45000,
            registrationNumber: 'TESLA123',
        }
	},
	{
		id: 'car-4',
		name: 'Unavailable Convertible',
		locationName: 'North Car Park',
		latitude: 34,
		longitude: 82,
		isAvailable: false,
        specifications: {
            brandModel: 'BMW Z4',
            year: 2021,
            kilometer: 25000,
            fuelType: 'Petrol',
            gearbox: 'Manual',
            price: 55000,
            registrationNumber: 'BMW4567',
        }
	},
];
