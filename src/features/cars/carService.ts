import { findMockCar, mockCars } from '../../data/mockCars';
import type { Car } from '../../data/mockCars';

export type { Car };

// Reads from the shared mock data until there is a real backend.

// Get all cars for the car overview.
export async function getCars(): Promise<Car[]> {
    return mockCars;
}

// Get one car for CarDetailsScreen.
export async function getCarById(id: string): Promise<Car | null> {
    return findMockCar(id) ?? null;
}
