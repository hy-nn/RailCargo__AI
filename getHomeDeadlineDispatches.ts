import containerFillState from "../data/containerFillState.json";
import trainSlots from "../data/trainSlots.json";
import stationList from "../data/stationList.json";

export interface HomeDeadlineDispatch {
  dispatchId: string;
  route: string;
  loadRate: number;
  status: "CONFIRMED" | "RECRUITING";
  statusLabel: string;
  statusClassName: string;
  guide: string;
  guideClassName: string;
}

interface ContainerFillStateItem {
  poolId: string;
  slotId: string;
  containerSpecId: string;
  currentCBM: number;
  currentWeightKg: number;
  participantCount: number;
  poolStatus: string;
  updatedAt: string;
}

interface TrainSlotItem {
  slotId: string;
  trainNo: string;
  operationDate: string;
  routeId: string;
  originStationId: string;
  destinationStationId: string;
}

interface StationItem {
  stationId: string;
  stationName: string;
  displayName: string;
}

export const getHomeDeadlineDispatches = (): HomeDeadlineDispatch[] => {
  const fillStates = containerFillState as ContainerFillStateItem[];
  const slots = trainSlots as TrainSlotItem[];
  const stations = stationList as StationItem[];

  // Map slots and stations for quick lookup
  const slotMap = new Map<string, TrainSlotItem>();
  for (const slot of slots) {
    slotMap.set(slot.slotId, slot);
  }

  const stationMap = new Map<string, StationItem>();
  for (const st of stations) {
    stationMap.set(st.stationId, st);
  }

  // 1 & 2. Filter only RECRUITING pools with slot found and currentCBM > 0
  const candidatePools: Array<{ pool: ContainerFillStateItem; slot: TrainSlotItem }> = [];

  for (const pool of fillStates) {
    if (pool.poolStatus !== "RECRUITING" || pool.currentCBM <= 0) {
      continue;
    }
    const slot = slotMap.get(pool.slotId);
    if (!slot) continue;

    candidatePools.push({ pool, slot });
  }

  // Group into buckets
  // A: 10 <= cbm < 20
  // B: 20 <= cbm < 30
  // C: 30 <= cbm < 40
  // D: 40 <= cbm < 45
  const bucketA: Array<{ pool: ContainerFillStateItem; slot: TrainSlotItem }> = [];
  const bucketB: Array<{ pool: ContainerFillStateItem; slot: TrainSlotItem }> = [];
  const bucketC: Array<{ pool: ContainerFillStateItem; slot: TrainSlotItem }> = [];
  const bucketD: Array<{ pool: ContainerFillStateItem; slot: TrainSlotItem }> = [];

  for (const item of candidatePools) {
    const cbm = item.pool.currentCBM;
    if (cbm >= 40 && cbm < 45) {
      bucketD.push(item);
    } else if (cbm >= 30 && cbm < 40) {
      bucketC.push(item);
    } else if (cbm >= 20 && cbm < 30) {
      bucketB.push(item);
    } else if (cbm >= 10 && cbm < 20) {
      bucketA.push(item);
    }
  }

  // Sort each bucket by currentCBM descending
  bucketA.sort((a, b) => b.pool.currentCBM - a.pool.currentCBM);
  bucketB.sort((a, b) => b.pool.currentCBM - a.pool.currentCBM);
  bucketC.sort((a, b) => b.pool.currentCBM - a.pool.currentCBM);
  bucketD.sort((a, b) => b.pool.currentCBM - a.pool.currentCBM);

  // Pick D: 2, C: 1, B: 1, A: 1
  const pickedPoolIds = new Set<string>();
  const selectedItems: Array<{ pool: ContainerFillStateItem; slot: TrainSlotItem }> = [];

  const pickFromBucket = (
    bucket: Array<{ pool: ContainerFillStateItem; slot: TrainSlotItem }>,
    count: number
  ) => {
    let added = 0;
    for (const item of bucket) {
      if (added >= count) break;
      if (!pickedPoolIds.has(item.pool.poolId)) {
        pickedPoolIds.add(item.pool.poolId);
        selectedItems.push(item);
        added++;
      }
    }
  };

  pickFromBucket(bucketD, 2);
  pickFromBucket(bucketC, 1);
  pickFromBucket(bucketB, 1);
  pickFromBucket(bucketA, 1);

  // If less than 5 items, fill from remaining candidatePools sorted by currentCBM descending
  if (selectedItems.length < 5) {
    candidatePools.sort((a, b) => b.pool.currentCBM - a.pool.currentCBM);
    for (const item of candidatePools) {
      if (selectedItems.length >= 5) break;
      if (!pickedPoolIds.has(item.pool.poolId)) {
        pickedPoolIds.add(item.pool.poolId);
        selectedItems.push(item);
      }
    }
  }

  // Sort selected items by currentCBM descending (D -> C -> B -> A)
  selectedItems.sort((a, b) => b.pool.currentCBM - a.pool.currentCBM);

  const top5 = selectedItems.slice(0, 5);

  return top5.map(({ pool, slot }, index) => {
    const originStation = stationMap.get(slot.originStationId);
    const destStation = stationMap.get(slot.destinationStationId);

    const originName = originStation?.displayName || slot.originStationId;
    const destName = destStation?.displayName || slot.destinationStationId;

    const route = `${originName} → ${destName}`;

    // loadRate: Math.round((currentCBM / 60) * 100)
    const loadRate = Math.round((pool.currentCBM / 60) * 100);

    const remainingCBM = 45 - pool.currentCBM;
    const guide = `${remainingCBM.toFixed(1)}CBM만 더 모이면 확정`;

    const isUrgent = index < 3;
    const statusLabel = isUrgent ? "마감 임박" : "모집 중";
    const statusClassName = isUrgent
      ? "bg-[#ffe3e3] text-[#d61f1f]"
      : "bg-[#fff1df] text-[#d97706]";
    const guideClassName = isUrgent ? "text-[#c05700]" : "text-[#4a5160]";

    return {
      dispatchId: `#${slot.trainNo}`,
      route,
      loadRate,
      status: "RECRUITING",
      statusLabel,
      statusClassName,
      guide,
      guideClassName,
    };
  });
};
