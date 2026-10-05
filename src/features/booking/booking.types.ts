import { colors } from '../../theme/colors';

export type BookingStatus = 'Waiting for pick-up' | 'Driving';

export type Booking = {
  id: string;
  vehicleName: string;
  dailyRate: number;
  startDate: string;
  endDate: string;
  duration: string;
  status: BookingStatus;
  statusColor: string;
  total: number;
  registrationNumber: string;
  seats: string;
  transmission: string;
  fuel: string;
  assistance: string;
  description: string;
};

// Mock data for bookings
export const bookings: Booking[] = [
  {
    id: 'booking-vw-golf',
    vehicleName: 'VW Golf VIII 1.5 eTSI',
    dailyRate: 2200,
    startDate: 'Dec 1',
    endDate: 'Dec 7',
    duration: '6 days',
    status: 'Waiting for pick-up',
    statusColor: colors.bookingStatusWaiting,
    total: 13350,
    registrationNumber: 'AB 12 345',
    seats: '5 Seats',
    transmission: 'Manual',
    fuel: 'Diesel',
    assistance: 'Lane assist',
    description: 'A stylish and comfortable sedan, perfect for both city drives and long trips.',
  },
  {
    id: 'booking-bmw-320d',
    vehicleName: 'BMW 320d 2.0',
    dailyRate: 1800,
    startDate: 'Dec 7',
    endDate: 'Dec 13',
    duration: '6 days',
    status: 'Driving',
    statusColor: colors.bookingStatusDriving,
    total: 10800,
    registrationNumber: 'CD 34 567',
    seats: '5 Seats',
    transmission: 'Automatic',
    fuel: 'Diesel',
    assistance: 'Lane assist',
    description: 'A refined and comfortable vehicle for everyday driving and longer journeys.',
  },
];

export function getBookingById(bookingId: string) {
  return bookings.find((booking) => booking.id === bookingId);
}