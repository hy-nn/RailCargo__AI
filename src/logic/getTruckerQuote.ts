import d2dServices from '../data/d2d_services.json';

export interface Cargo {
  volumeCBM: number;
  weightKg: number;
}

export interface TruckerQuoteResult {
  supported: boolean;
  overCapacity?: boolean;
  action?: string;
  assignedVehicleCode?: string;
  assignedVehicleName?: string;
  cargoWeightKg?: number;
  cargoVolumeCBM?: number;
  distanceKm?: number;
  distanceBandId?: string;
  distanceBandDisplayName?: string;
  oneWayFareWon?: number;
  vatIncluded?: boolean;
  pricingStatus?: string;
  distanceNotice?: string;
}

export function getTruckerQuote(
  destinationCity: string,
  cargo: Cargo
): TruckerQuoteResult {
  const data = d2dServices as any;
  const services: any[] = data.services || [];

  // 1. Find service matching destinationCity
  const service = services.find(
    (s: any) => s.destinationArea && s.destinationArea.city === destinationCity
  );

  if (!service) {
    return { supported: false };
  }

  const cargoWeight = cargo?.weightKg ?? 0;
  const cargoVolume = cargo?.volumeCBM ?? 0;

  // 2. Find matching vehicle rule from vehicleAssignmentPolicy.rules
  const vehiclePolicy = data.vehicleAssignmentPolicy || {};
  const rules: any[] = vehiclePolicy.rules || [];

  const matchedRule = rules.find((rule: any) => {
    const maxWeight = rule.maxWeightKgInclusive;
    const maxCBM = rule.maxCBMInclusive;
    return cargoWeight <= maxWeight && cargoVolume <= maxCBM;
  });

  // 3. Handle over capacity if no rule matched
  if (!matchedRule) {
    return {
      supported: true,
      overCapacity: true,
      action: vehiclePolicy.overCapacityAction || 'MANUAL_QUOTE',
    };
  }

  // 4. Calculate fare using distanceBandId and fareVehicleCode
  const distanceBandId = service.distanceBandId;
  const fareVehicleCode =
    matchedRule.fareVehicleCode || matchedRule.vehicleCode || matchedRule.assignedVehicleCode;

  const farePolicy = data.farePolicy || {};
  const fareTableWon = farePolicy.fareTableWon || {};
  const bandTable = fareTableWon[distanceBandId] || {};
  const oneWayFareWon = bandTable[fareVehicleCode] ?? 0;

  // Extract metadata fields from service / farePolicy / matchedRule
  const assignedVehicleCode =
    matchedRule.assignedVehicleCode || matchedRule.vehicleCode || fareVehicleCode;
  const assignedVehicleName =
    matchedRule.displayName || matchedRule.assignedVehicleName || matchedRule.vehicleName || matchedRule.name || '';

  const distanceKm = service.distanceKm ?? 0;

  // Distance band display name lookup
  let distanceBandDisplayName = service.distanceBandDisplayName || '';
  if (!distanceBandDisplayName && Array.isArray(farePolicy.distanceBands)) {
    const bandObj = farePolicy.distanceBands.find((b: any) => b.bandId === distanceBandId);
    if (bandObj) {
      distanceBandDisplayName = bandObj.displayName || bandObj.name || '';
    }
  }

  const vatIncluded =
    data.vatIncluded ?? service.vatIncluded ?? farePolicy.vatIncluded ?? false;
  const pricingStatus =
    service.pricingStatus || farePolicy.pricingStatus || 'FIXED_FARE';
  const distanceNotice =
    farePolicy.additionalChargeNotice || service.distanceNotice || farePolicy.distanceNotice || '';

  return {
    supported: true,
    overCapacity: false,
    assignedVehicleCode,
    assignedVehicleName,
    cargoWeightKg: cargoWeight,
    cargoVolumeCBM: cargoVolume,
    distanceKm,
    distanceBandId,
    distanceBandDisplayName,
    oneWayFareWon,
    vatIncluded,
    pricingStatus,
    distanceNotice,
  };
}

export default getTruckerQuote;
