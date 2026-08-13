import tariffDb from '../data/tariff_db.json';
import pricingPolicy from '../data/pricingPolicy.json';

export interface Cargo {
  volumeCBM: number;
  weightKg: number;
}

export interface FareCalculationResult {
  containerRailFareWon: number;
  volumeShareRate: number;
  weightShareRate: number;
  appliedShareRate: number;
  allocatedRailFareWon: number;
  originCfsChargeWon: number;
  destinationCfsChargeWon: number;
  consolidationOperationsFeeWon: number;
  truckerFareWon: number;
  totalFareWon: number;
  error?: boolean;
  reason?: string | null;
}

export function calculateFare(
  routeId: string,
  cargo: Cargo,
  truckerFareWon: number = 0
): FareCalculationResult {
  const tariffs = (tariffDb as any).tariffs || [];
  const tariff = tariffs.find((t: any) => t.routeId === routeId);

  const containerRailFareWon = tariff ? (tariff.containerRailFareWon || 0) : 0;

  const maxCBM = (pricingPolicy as any).containerReference?.maxCBM || 60;
  const maxWeightKg = (pricingPolicy as any).containerReference?.maxWeightKg || 25000;

  const cargoVolume = cargo?.volumeCBM || 0;
  const cargoWeight = cargo?.weightKg || 0;

  const volumeShareRate = cargoVolume / maxCBM;
  const weightShareRate = cargoWeight / maxWeightKg;
  const appliedShareRate = Math.max(volumeShareRate, weightShareRate);

  if (appliedShareRate > 1.0) {
    return {
      containerRailFareWon,
      volumeShareRate,
      weightShareRate,
      appliedShareRate,
      allocatedRailFareWon: 0,
      originCfsChargeWon: 0,
      destinationCfsChargeWon: 0,
      consolidationOperationsFeeWon: 0,
      truckerFareWon: truckerFareWon || 0,
      totalFareWon: 0,
      error: true,
      reason: '점유율 100% 초과',
    };
  }

  // 1원 단위 사사오입 (Math.round)
  const allocatedRailFareWon = Math.round(containerRailFareWon * appliedShareRate);

  const cfsPolicy = (pricingPolicy as any).cfsPolicy || {};
  const originCfsChargeWon = cfsPolicy.originCfsFixedFeeWon ?? 25000;
  const destinationCfsChargeWon = cfsPolicy.destinationCfsFixedFeeWon ?? 25000;

  const consolidationFeePolicy = (pricingPolicy as any).consolidationFeePolicy || {};
  const consolidationOperationsFeeWon = consolidationFeePolicy.amountWon ?? 50000;

  const actualTruckerFareWon = truckerFareWon || 0;

  const railServiceFareWon =
    allocatedRailFareWon +
    originCfsChargeWon +
    destinationCfsChargeWon +
    consolidationOperationsFeeWon;

  const totalFareWon = railServiceFareWon + actualTruckerFareWon;

  return {
    containerRailFareWon,
    volumeShareRate,
    weightShareRate,
    appliedShareRate,
    allocatedRailFareWon,
    originCfsChargeWon,
    destinationCfsChargeWon,
    consolidationOperationsFeeWon,
    truckerFareWon: actualTruckerFareWon,
    totalFareWon,
    error: false,
    reason: null,
  };
}

export default calculateFare;
