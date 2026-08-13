import tariffDb from '../data/tariff_db.json';
import stationList from '../data/stationList.json';

export interface MappedRequest {
  intent: string;
  status: string;
  serviceTab: string;
  requestedDepartureDate: string | null;
  requestedArrivalByDate: string | null;
  origin: {
    originText: string;
    stationId: string | null;
  };
  finalDestination: {
    destinationText: string;
    city: string | null;
    mappedStationId: string | null;
  };
  cargo: {
    description: string | null;
    packageType: string | null;
    packageCount: number | null;
    volumeCBM: number | null;
    weightKg: number | null;
  };
  missingFields: string[];
  followUpQuestion: string | null;
  [key: string]: any;
}

export function checkRouteCoverage<T extends MappedRequest>(
  mappedRequest: T
): T & { routeCoverage: 'SUPPORTED' | 'UNSUPPORTED'; routeId: string | null } {
  const result = JSON.parse(JSON.stringify(mappedRequest));

  const originStationId = result.origin?.stationId || null;
  const destinationStationId = result.finalDestination?.mappedStationId || null;

  if (!originStationId || !destinationStationId) {
    return {
      ...result,
      routeCoverage: 'UNSUPPORTED',
      routeId: null,
    };
  }

  const tariffs = (tariffDb as any).tariffs || [];
  const matchedTariff = tariffs.find(
    (t: any) =>
      t.originStationId === originStationId &&
      t.destinationStationId === destinationStationId &&
      t.pricingStatus === 'ACTIVE'
  );

  if (matchedTariff) {
    return {
      ...result,
      routeCoverage: 'SUPPORTED',
      routeId: matchedTariff.routeId,
    };
  }

  return {
    ...result,
    routeCoverage: 'UNSUPPORTED',
    routeId: null,
  };
}

export function getSupportedRoutes(): string[] {
  const tariffs = (tariffDb as any).tariffs || [];
  const activeTariffs = tariffs.filter((t: any) => t.pricingStatus === 'ACTIVE');

  const stationMap = new Map<string, string>();
  for (const station of stationList as any[]) {
    stationMap.set(station.stationId, station.displayName || station.stationId);
  }

  const supportedRoutes: string[] = [];
  const seenRoutes = new Set<string>();

  for (const tariff of activeTariffs) {
    const originName = stationMap.get(tariff.originStationId) || tariff.originStationId;
    const destName = stationMap.get(tariff.destinationStationId) || tariff.destinationStationId;
    const routeStr = `${originName} → ${destName}`;

    if (!seenRoutes.has(routeStr)) {
      seenRoutes.add(routeStr);
      supportedRoutes.push(routeStr);
    }
  }

  return supportedRoutes;
}

export default checkRouteCoverage;
