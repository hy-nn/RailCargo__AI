import stationList from '../data/stationList.json';
import warehouseToStationMap from '../data/warehouseToStationMap.json';

export interface ParsedRequest {
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
}

export function mapWarehouseToStation<T extends ParsedRequest>(parsedRequest: T): T {
  const result: T = JSON.parse(JSON.stringify(parsedRequest));

  // 1. origin.stationId matching
  let matchedOriginStationId: string | null = null;
  const originText = result.origin?.originText || '';

  if (originText) {
    for (const station of stationList) {
      if (Array.isArray(station.aliases)) {
        const hasMatchingAlias = station.aliases.some(
          (alias: string) => alias && originText.includes(alias)
        );
        if (hasMatchingAlias) {
          matchedOriginStationId = station.stationId;
          break;
        }
      }
    }
  }

  result.origin.stationId = matchedOriginStationId;

  // 2. finalDestination.mappedStationId matching
  let matchedDestinationStationId: string | null = null;
  const destText = result.finalDestination?.destinationText || '';
  const destCity = result.finalDestination?.city || '';

  // Step 1: Check stationList aliases against finalDestination.destinationText
  if (destText) {
    for (const station of stationList) {
      if (Array.isArray(station.aliases)) {
        const hasMatchingAlias = station.aliases.some(
          (alias: string) => alias && destText.includes(alias)
        );
        if (hasMatchingAlias) {
          matchedDestinationStationId = station.stationId;
          break;
        }
      }
    }
  }

  // Step 2: If not found in Step 1, check warehouseToStationMap
  if (!matchedDestinationStationId) {
    let bestMatchItem: { mappedStationId: string; priority: number } | null = null;

    for (const item of warehouseToStationMap) {
      if (Array.isArray(item.destinationKeywords)) {
        const isMatched = item.destinationKeywords.some((keyword: string) => {
          if (!keyword) return false;
          const matchInText = destText ? destText.includes(keyword) : false;
          const matchInCity = destCity ? destCity.includes(keyword) : false;
          return matchInText || matchInCity;
        });

        if (isMatched) {
          if (!bestMatchItem || item.priority < bestMatchItem.priority) {
            bestMatchItem = {
              mappedStationId: item.mappedStationId,
              priority: item.priority,
            };
          }
        }
      }
    }

    if (bestMatchItem) {
      matchedDestinationStationId = bestMatchItem.mappedStationId;
    }
  }

  result.finalDestination.mappedStationId = matchedDestinationStationId;

  return result;
}

export default mapWarehouseToStation;
