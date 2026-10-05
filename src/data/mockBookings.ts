import type { Booking } from '../features/bookings/types';
import { colors } from '../theme/colors';
import { findMockCar } from './mockCars';

// Same fixed fee as on the payment page.
const serviceFee = 150;

type BookingInput = Pick<Booking, 'id' | 'carId' | 'startDate' | 'endDate' | 'status' | 'statusColor'> & {
  days: number;
};

// The car information on a booking comes from the shared mock cars.
function createBooking({ days, ...booking }: BookingInput): Booking {
  const car = findMockCar(booking.carId);
  if (!car) {
    throw new Error(`Mock booking ${booking.id} refers to unknown car ${booking.carId}`);
  }

  return {
    ...booking,
    vehicleName: car.name,
    dailyRate: car.pricePerDay,
    duration: `${days} days`,
    total: car.pricePerDay * days + serviceFee,
    registrationNumber: car.registrationNumber,
    seats: car.capacity,
    transmission: car.gearType,
    fuel: car.fuelType,
    assistance: car.laneAssist ? 'Lane assist' : 'No lane assist',
    description: car.description,
  };
}

export const mockBookings: Booking[] = [
  createBooking({
    id: 'booking-vw-golf',
    carId: '1',
    startDate: 'Dec 1',
    endDate: 'Dec 7',
    days: 6,
    status: 'Waiting for pick-up',
    statusColor: colors.bookingStatusWaiting,
  }),
  createBooking({
    id: 'booking-bmw-320d',
    carId: '5',
    startDate: 'Dec 7',
    endDate: 'Dec 13',
    days: 6,
    status: 'Driving',
    statusColor: colors.bookingStatusDriving,
  }),
];
