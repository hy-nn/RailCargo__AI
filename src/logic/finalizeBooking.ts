import demoUsers from '../data/demoUsers.json';
import tariffDb from '../data/tariff_db.json';
import d2dServices from '../data/d2d_services.json';
import { DEMO_CURRENT_DATE } from '../config/demoDate';

let bookingSequenceCounter = 1;

export function finalizeBooking(processResult: any) {
  const selectedTrain = processResult.selectedTrain || {};
  const mappedResult = processResult.mappedResult || {};
  const coverageResult = processResult.coverageResult || {};
  const poolingResult = processResult.poolingResult || {};
  const fareResult = processResult.fareResult || {};

  // 1. Generate bookingId: "BOOK-{YYYYMMDD}-{001}"
  const dateSource = selectedTrain.operationDate || selectedTrain.departureDateTime || '2026-08-22';
  const datePart = dateSource.slice(0, 10).replace(/-/g, '');
  const seqStr = String(bookingSequenceCounter).padStart(3, '0');
  bookingSequenceCounter += 1;
  const bookingId = `BOOK-${datePart}-${seqStr}`;

  // 2. Fetch User Info from demoUsers.json
  const usersList: any[] = Array.isArray(demoUsers)
    ? demoUsers
    : (demoUsers as any).users || [];
  const firstUser = usersList[0] || {};
  const userId = firstUser.userId || 'USER-001';
  const companyName = firstUser.companyName || '테스트기업';

  // 3. Construct fareQuote
  const serviceTab = mappedResult.serviceTab || processResult.parseResult?.serviceTab || 'RAIL_ONLY';
  let fareScope = 'DOMESTIC_RAIL_SECTION';
  if (serviceTab === 'RAIL_TRUCKER' || serviceTab === '철도+도로') {
    fareScope = 'DOMESTIC_RAIL_AND_LAST_MILE';
  } else if (serviceTab === 'FULL_PACKAGE' || serviceTab === '철도+포워딩') {
    fareScope = 'DOMESTIC_RAIL_SECTION_ONLY';
  }

  const fareQuote = {
    ...fareResult,
    fareScope,
    pricingStatus: 'ACTIVE_WITH_FIXED_FEES',
  };

  // 4. Calculate Carbon Emission Comparison
  const carbonPolicy = (tariffDb as any).carbonComparisonPolicy || {};
  const tariffsList: any[] = (tariffDb as any).tariffs || (Array.isArray(tariffDb) ? tariffDb : []);

  const routeId = coverageResult.routeId;
  const matchedTariff = tariffsList.find((item: any) => item.routeId === routeId);
  const routeDistanceKm = matchedTariff?.actualDistanceKm ?? 0;

  const cargoWeightKg = mappedResult.cargo?.weightKg ?? 0;
  const cargoWeightTon = cargoWeightKg / 1000;

  const railEmissionFactorGCO2ePerTonKm = carbonPolicy.railEmissionFactorGCO2ePerTonKm ?? 0;
  const truckEmissionFactorGCO2ePerTonKm = carbonPolicy.truckEmissionFactorGCO2ePerTonKm ?? 0;

  const rawRailEmission = (cargoWeightTon * routeDistanceKm * railEmissionFactorGCO2ePerTonKm) / 1000;
  const railEmissionKgCO2e = Math.round(rawRailEmission * 100) / 100;

  const rawTruckEmission = (cargoWeightTon * routeDistanceKm * truckEmissionFactorGCO2ePerTonKm) / 1000;
  const truckEmissionKgCO2e = Math.round(rawTruckEmission * 100) / 100;

  const estimatedSavingKgCO2e = Math.round((truckEmissionKgCO2e - railEmissionKgCO2e) * 100) / 100;
  const rawReductionRate = truckEmissionKgCO2e > 0 ? (estimatedSavingKgCO2e / truckEmissionKgCO2e) * 100 : 0;
  const reductionRatePercent = Math.round(rawReductionRate * 100) / 100;

  const carbon = {
    cargoWeightTon,
    routeDistanceKm,
    railEmissionFactorGCO2ePerTonKm,
    truckEmissionFactorGCO2ePerTonKm,
    railEmissionKgCO2e,
    truckEmissionKgCO2e,
    estimatedSavingKgCO2e,
    reductionRatePercent,
    comparisonScope: 'RAIL_ROUTE_ONLY',
    calculationStatus: 'CALCULATED_WITH_KORAIL_CONFIRMED_MOLIT_FACTORS',
    evidenceDownloadAction: 'MOCK_DOWNLOAD',
  };

  // Helper for truckerServiceId from d2d_services.json
  let truckerServiceId: string | null = null;
  const truckerQuote = processResult.truckerQuote || null;

  if (truckerQuote) {
    const servicesList: any[] = Array.isArray(d2dServices)
      ? d2dServices
      : (d2dServices as any).services || (d2dServices as any).items || [];
    const destinationCity = mappedResult.finalDestination?.city || '';
    const matchedService = servicesList.find((s: any) => s.destinationArea?.city === destinationCity);
    if (matchedService?.serviceId) {
      truckerServiceId = matchedService.serviceId;
    }
  }

  const globisCardId = processResult.forwardingCard?.cardId || null;

  // Timestamp formatting
  const now = new Date();
  const hh = String(now.getHours()).padStart(2, '0');
  const mm = String(now.getMinutes()).padStart(2, '0');
  const ss = String(now.getSeconds()).padStart(2, '0');
  const demoDateValue = DEMO_CURRENT_DATE || '2026-08-15';
  const createdAt = `${demoDateValue}T${hh}:${mm}:${ss}+09:00`;

  return {
    bookingId,
    userId,
    companyName,
    serviceTab,
    slotId: selectedTrain.slotId || '',
    poolId: selectedTrain.poolId || '',
    bookingDeadlineDate: selectedTrain.bookingDeadlineDate || '',
    cargo: {
      description: mappedResult.cargo?.description || '',
      packageType: mappedResult.cargo?.packageType ?? null,
      packageCount: mappedResult.cargo?.packageCount ?? null,
      volumeCBM: mappedResult.cargo?.volumeCBM || 0,
      weightKg: mappedResult.cargo?.weightKg || 0,
    },
    finalDestination: {
      destinationText: mappedResult.finalDestination?.destinationText || '',
      city: mappedResult.finalDestination?.city || '',
    },
    mappedStationId: mappedResult.finalDestination?.mappedStationId || null,
    poolBefore: poolingResult.poolBefore || null,
    poolAfter: poolingResult.poolAfter || null,
    fareQuote,
    truckerServiceId,
    truckerQuote,
    globisCardId,
    carbon,
    bookingStatus: 'CONFIRMED',
    createdAt,
  };
}

export default finalizeBooking;
