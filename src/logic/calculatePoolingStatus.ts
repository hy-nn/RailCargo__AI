import containerSpec from '../data/containerSpec.json';

export interface SelectedTrain {
  slotId?: string;
  trainNo?: string;
  departureDateTime?: string;
  arrivalDateTime?: string;
  bookingDeadlineDate?: string;
  poolId?: string | null;
  currentCBM?: number | null;
  currentWeightKg?: number | null;
  participantCount?: number | null;
  poolStatus?: string | null;
  isFastest?: boolean;
  [key: string]: any;
}

export interface NewCargo {
  volumeCBM: number | null | undefined;
  weightKg: number | null | undefined;
  [key: string]: any;
}

export interface PoolState {
  cbm: number;
  weightKg: number;
  status: string | null;
}

export interface RemainingCapacity {
  cbm: number;
  weightKg: number;
}

export interface PoolingStatusResult {
  canBook: boolean;
  rejectReason: string | null;
  poolBefore: PoolState;
  newCargo: {
    volumeCBM: number;
    weightKg: number;
  };
  poolAfter: PoolState | null;
  remainingCapacity: RemainingCapacity | null;
}

function roundToTwoDecimals(num: number): number {
  return Math.round(num * 100) / 100;
}

export function calculatePoolingStatus(
  selectedTrain: SelectedTrain,
  newCargo: NewCargo
): PoolingStatusResult {
  const maxCBM = containerSpec.maxCBM;
  const maxWeightKg = containerSpec.maxWeightKg;
  const confirmedThresholdCBM = containerSpec.confirmationPolicy.thresholdCBM;

  const beforeCBM = selectedTrain?.currentCBM ?? 0;
  const beforeWeight = selectedTrain?.currentWeightKg ?? 0;
  const beforeStatus = selectedTrain?.poolStatus ?? 'RECRUITING';

  const cargoCBM = newCargo?.volumeCBM ?? 0;
  const cargoWeight = newCargo?.weightKg ?? 0;

  const poolBefore: PoolState = {
    cbm: roundToTwoDecimals(beforeCBM),
    weightKg: roundToTwoDecimals(beforeWeight),
    status: beforeStatus,
  };

  const formattedNewCargo = {
    volumeCBM: roundToTwoDecimals(cargoCBM),
    weightKg: roundToTwoDecimals(cargoWeight),
  };

  const afterCBM = roundToTwoDecimals(beforeCBM + cargoCBM);
  const afterWeight = roundToTwoDecimals(beforeWeight + cargoWeight);

  // 3. Capacity verification
  let rejectReasons: string[] = [];
  if (afterCBM > maxCBM) {
    rejectReasons.push(`용적(CBM) 초과 (최대 ${maxCBM} CBM / 요청 후 ${afterCBM} CBM)`);
  }
  if (afterWeight > maxWeightKg) {
    rejectReasons.push(`중량(kg) 초과 (최대 ${maxWeightKg} kg / 요청 후 ${afterWeight} kg)`);
  }

  if (rejectReasons.length > 0) {
    return {
      canBook: false,
      rejectReason: rejectReasons.join(', '),
      poolBefore,
      newCargo: formattedNewCargo,
      poolAfter: null,
      remainingCapacity: null,
    };
  }

  // 4. Determine statusPriority (CLOSED -> CONFIRMED -> RECRUITING)
  let afterStatus = 'RECRUITING';
  if (afterCBM >= maxCBM || afterWeight >= maxWeightKg) {
    afterStatus = 'CLOSED';
  } else if (afterCBM >= confirmedThresholdCBM) {
    afterStatus = 'CONFIRMED';
  } else {
    afterStatus = 'RECRUITING';
  }

  // 5. Remaining capacity calculation
  const remainingCBM = roundToTwoDecimals(maxCBM - afterCBM);
  const remainingWeight = roundToTwoDecimals(maxWeightKg - afterWeight);

  return {
    canBook: true,
    rejectReason: null,
    poolBefore,
    newCargo: formattedNewCargo,
    poolAfter: {
      cbm: afterCBM,
      weightKg: afterWeight,
      status: afterStatus,
    },
    remainingCapacity: {
      cbm: remainingCBM,
      weightKg: remainingWeight,
    },
  };
}

export default calculatePoolingStatus;
