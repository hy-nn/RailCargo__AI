import { DEMO_CURRENT_DATE } from '../config/demoDate';
import trainSlots from '../data/trainSlots.json';
import containerFillState from '../data/containerFillState.json';

export interface CandidateTrain {
  slotId: string;
  trainNo: string;
  departureDateTime: string;
  arrivalDateTime: string;
  bookingDeadlineDate: string;
  poolId: string | null;
  currentCBM: number | null;
  currentWeightKg: number | null;
  participantCount: number | null;
  poolStatus: string | null;
  isFastest: boolean;
}

export function getCandidateTrains(mappedRequest: any): CandidateTrain[] {
  if (!mappedRequest || mappedRequest.routeCoverage !== 'SUPPORTED' || !mappedRequest.routeId) {
    return [];
  }

  const routeId = mappedRequest.routeId;
  const reqDepDate = mappedRequest.requestedDepartureDate || null;
  const reqArrByDate = mappedRequest.requestedArrivalByDate || null;

  // Filter slots
  const validSlots = (trainSlots as any[]).filter((slot) => {
    // 1. routeId match
    if (slot.routeId !== routeId) return false;

    // 2. OPEN status
    if (slot.slotStatus !== 'OPEN') return false;

    // 3. bookingDeadlineDate >= DEMO_CURRENT_DATE
    if (!slot.bookingDeadlineDate || slot.bookingDeadlineDate < DEMO_CURRENT_DATE) {
      return false;
    }

    // 4. Date conditions (AND condition if both specified)
    if (reqDepDate) {
      const opDate = slot.operationDate || (slot.departureDateTime ? slot.departureDateTime.split('T')[0] : '');
      if (opDate < reqDepDate) {
        return false;
      }
    }

    if (reqArrByDate) {
      const arrDate = slot.arrivalDateTime ? slot.arrivalDateTime.split('T')[0] : '';
      if (arrDate > reqArrByDate) {
        return false;
      }
    }

    return true;
  });

  // 5. Sort slots based on date constraints
  validSlots.sort((a, b) => {
    if (reqDepDate) {
      return (a.departureDateTime || '').localeCompare(b.departureDateTime || '');
    } else if (reqArrByDate) {
      const opDateA = a.operationDate || (a.departureDateTime ? a.departureDateTime.split('T')[0] : '');
      const opDateB = b.operationDate || (b.departureDateTime ? b.departureDateTime.split('T')[0] : '');

      if (opDateA !== opDateB) {
        return opDateB.localeCompare(opDateA);
      }
      return (a.departureDateTime || '').localeCompare(b.departureDateTime || '');
    } else {
      return (a.departureDateTime || '').localeCompare(b.departureDateTime || '');
    }
  });

  // Take top 3
  const top3Slots = validSlots.slice(0, 3);

  // Map to CandidateTrain objects with container fill state
  const fillStateMap = new Map<string, any>();
  for (const fill of containerFillState as any[]) {
    if (fill.slotId) {
      fillStateMap.set(fill.slotId, fill);
    }
  }

  return top3Slots.map((slot, index) => {
    const fill = fillStateMap.get(slot.slotId);

    return {
      slotId: slot.slotId,
      trainNo: slot.trainNo,
      departureDateTime: slot.departureDateTime,
      arrivalDateTime: slot.arrivalDateTime,
      bookingDeadlineDate: slot.bookingDeadlineDate,
      poolId: fill ? fill.poolId ?? null : null,
      currentCBM: fill ? fill.currentCBM ?? null : null,
      currentWeightKg: fill ? fill.currentWeightKg ?? null : null,
      participantCount: fill ? fill.participantCount ?? null : null,
      poolStatus: fill ? fill.poolStatus ?? null : null,
      isFastest: index === 0,
    };
  });
}

export default getCandidateTrains;
