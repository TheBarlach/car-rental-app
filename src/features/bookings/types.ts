export type BookingStatus = 'Waiting for pick-up' | 'Driving';

export type Booking = {
  id: string;
  carId: string;
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
