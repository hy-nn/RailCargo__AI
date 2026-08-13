import bookings from "../data/bookings.json";
import trainSlots from "../data/trainSlots.json";
import stationList from "../data/stationList.json";
import containerFillState from "../data/containerFillState.json";

export interface ParticipatedDispatch {
  dispatchId: string;
  route: string;
  departureDate: string;
  loadRate: number;
  status: string;
  statusClassName: string;
}

interface BookingItem {
  bookingId: string;
  userId: string;
  slotId: string;
  bookingStatus: string;
}

interface TrainSlotItem {
  slotId: string;
  trainNo: string;
  operationDate: string;
  routeId: string;
  originStationId: string;
  destinationStationId: string;
  departureDateTime: string;
}

interface StationItem {
  stationId: string;
  stationName: string;
  displayName: string;
}

interface ContainerFillStateItem {
  poolId: string;
  slotId: string;
  currentCBM: number;
  poolStatus: string;
}

const dayOfWeekMap = ["일", "월", "화", "수", "목", "금", "토"];

function formatDepartureDate(departureDateTime: string): string {
  if (!departureDateTime || departureDateTime.length < 10) return "";
  const [yearStr, monthStr, dayStr] = departureDateTime.slice(0, 10).split("-");
  const year = parseInt(yearStr, 10);
  const month = parseInt(monthStr, 10);
  const day = parseInt(dayStr, 10);

  if (isNaN(year) || isNaN(month) || isNaN(day)) return "";

  const d = new Date(year, month - 1, day);
  const dayOfWeek = dayOfWeekMap[d.getDay()];
  return `${month}/${day}(${dayOfWeek})`;
}

export const getParticipatedDispatches = (userId: string): ParticipatedDispatch[] => {
  const allBookings = bookings as BookingItem[];
  const allSlots = trainSlots as TrainSlotItem[];
  const allStations = stationList as StationItem[];
  const allFillStates = containerFillState as ContainerFillStateItem[];

  // Quick lookup maps
  const slotMap = new Map<string, TrainSlotItem>();
  for (const slot of allSlots) {
    slotMap.set(slot.slotId, slot);
  }

  const stationMap = new Map<string, StationItem>();
  for (const st of allStations) {
    stationMap.set(st.stationId, st);
  }

  const fillStateMap = new Map<string, ContainerFillStateItem>();
  for (const fs of allFillStates) {
    fillStateMap.set(fs.slotId, fs);
  }

  // 1 & 2. Filter bookings for userId and bookingStatus === "CONFIRMED"
  const userBookings = allBookings.filter(
    (b) => b.userId === userId && b.bookingStatus === "CONFIRMED"
  );

  const results: Array<{ item: ParticipatedDispatch; departureDateTime: string }> = [];

  for (const booking of userBookings) {
    // 3. Match trainSlot by slotId
    const slot = slotMap.get(booking.slotId);
    if (!slot) continue;

    // 5. Origin and destination station display names
    const originStation = stationMap.get(slot.originStationId);
    const destStation = stationMap.get(slot.destinationStationId);
    const originName = originStation?.displayName || slot.originStationId;
    const destName = destStation?.displayName || slot.destinationStationId;
    const route = `${originName} → ${destName}`;

    // Departure date formatted
    const departureDate = formatDepartureDate(slot.departureDateTime);

    // 4. Fill state lookup
    const fillState = fillStateMap.get(booking.slotId);
    let loadRate = 0;
    let status = "정보 없음";
    let statusClassName = "bg-[#e5e7eb] text-[#4b5563]";

    if (fillState) {
      loadRate = Math.round((fillState.currentCBM / 60) * 100);
      if (fillState.poolStatus === "CONFIRMED") {
        status = "배차 확정";
        statusClassName = "bg-[#e8f1ff] text-[#005bac]";
      } else if (fillState.poolStatus === "RECRUITING") {
        status = "모집 중";
        statusClassName = "bg-[#fff1df] text-[#d97706]";
      } else if (fillState.poolStatus === "CLOSED") {
        status = "마감";
        statusClassName = "bg-[#e5e7eb] text-[#4b5563]";
      }
    }

    results.push({
      item: {
        dispatchId: `#${slot.trainNo}`,
        route,
        departureDate,
        loadRate,
        status,
        statusClassName,
      },
      departureDateTime: slot.departureDateTime || "",
    });
  }

  // 6. Sort by departureDateTime ascending
  results.sort((a, b) => a.departureDateTime.localeCompare(b.departureDateTime));

  return results.map((r) => r.item);
};
