import { mockBookings } from '../../data/mockBookings';
import type { Booking } from './types';

// Reads from the shared mock data until there is a real backend.

export function getBookings(): Booking[] {
  return mockBookings;
}

export function getBookingById(bookingId: string): Booking | undefined {
  return mockBookings.find((booking) => booking.id === bookingId);
}
