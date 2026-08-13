import bookings from "../data/bookings.json";

interface BookingItem {
  bookingId: string;
  bookingStatus: string;
  carbon?: {
    estimatedSavingKgCO2e?: number;
  };
}

export const getMonthlySavingsKgCO2e = (): number => {
  const allBookings = bookings as BookingItem[];

  const confirmedBookings = allBookings.filter(
    (b) => b.bookingStatus === "CONFIRMED"
  );

  const totalSaving = confirmedBookings.reduce((sum, b) => {
    const saving = b.carbon?.estimatedSavingKgCO2e ?? 0;
    return sum + (typeof saving === "number" ? saving : 0);
  }, 0);

  return Math.round(totalSaving * 100) / 100;
};
