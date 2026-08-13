import { parseRequest, NLURequestResult } from './parseRequest';
import { mapWarehouseToStation } from './mapWarehouseToStation';
import { checkRouteCoverage } from './checkRouteCoverage';
import { getCandidateTrains, CandidateTrain } from './getCandidateTrains';
import { calculatePoolingStatus, PoolingStatusResult } from './calculatePoolingStatus';
import { calculateFare, FareCalculationResult } from './calculateFare';
import { getTruckerQuote, TruckerQuoteResult } from './getTruckerQuote';
import { getForwardingCard } from './getForwardingCard';

export interface ProcessBookingRequestResult {
  parseResult: NLURequestResult;
  mappedResult: any;
  coverageResult: any;
  candidateTrains: CandidateTrain[];
  selectedTrain: CandidateTrain | null;
  poolingResult: PoolingStatusResult | null;
  fareResult: FareCalculationResult | null;
  truckerQuote?: TruckerQuoteResult;
  forwardingCard?: any;
}

export async function processBookingRequest(
  naturalLanguageText: string,
  serviceTab: string,
  selectedSlotId?: string
): Promise<ProcessBookingRequestResult> {
  // 1. Parse natural language request
  const parseResult = await parseRequest(naturalLanguageText, serviceTab);

  // 2. Map warehouse/text to station IDs
  const mappedResult = mapWarehouseToStation(parseResult);

  // 3. Check route coverage
  const coverageResult = checkRouteCoverage(mappedResult);

  if (coverageResult.routeCoverage === 'UNSUPPORTED' || !coverageResult.routeId) {
    return {
      parseResult,
      mappedResult,
      coverageResult,
      candidateTrains: [],
      selectedTrain: null,
      poolingResult: null,
      fareResult: null,
    };
  }

  // 4. Find candidate trains
  const candidateTrains = getCandidateTrains(coverageResult);

  if (!candidateTrains || candidateTrains.length === 0) {
    return {
      parseResult,
      mappedResult,
      coverageResult,
      candidateTrains: [],
      selectedTrain: null,
      poolingResult: null,
      fareResult: null,
    };
  }

  // 5. Select train slot
  let selectedTrain: CandidateTrain | null = null;
  if (selectedSlotId) {
    selectedTrain = candidateTrains.find((train) => train.slotId === selectedSlotId) || candidateTrains[0] || null;
  } else {
    selectedTrain = candidateTrains.find((train) => train.isFastest) || candidateTrains[0] || null;
  }

  if (!selectedTrain) {
    return {
      parseResult,
      mappedResult,
      coverageResult,
      candidateTrains,
      selectedTrain: null,
      poolingResult: null,
      fareResult: null,
    };
  }

  // 6. Calculate pooling status
  const cargo = {
    volumeCBM: parseResult.cargo?.volumeCBM ?? 0,
    weightKg: parseResult.cargo?.weightKg ?? 0,
  };

  const poolingResult = calculatePoolingStatus(selectedTrain, cargo);

  // 7. Calculate fare & handle modal/service specific quotes
  let truckerQuote: TruckerQuoteResult | undefined = undefined;
  let truckerFareWon = 0;

  const isTruckerTab = serviceTab === 'RAIL_TRUCKER' || serviceTab === '철도+도로';
  const isForwardingTab = serviceTab === 'FULL_PACKAGE' || serviceTab === '철도+포워딩';

  if (isTruckerTab) {
    const destinationCity = parseResult.finalDestination?.city || '';
    truckerQuote = getTruckerQuote(destinationCity, cargo);
    if (truckerQuote && typeof truckerQuote.oneWayFareWon === 'number') {
      truckerFareWon = truckerQuote.oneWayFareWon;
    }
  }

  let forwardingCard: any | undefined = undefined;
  if (isForwardingTab) {
    forwardingCard = getForwardingCard() || undefined;
  }

  const fareResult = calculateFare(coverageResult.routeId, cargo, truckerFareWon);

  const result: ProcessBookingRequestResult = {
    parseResult,
    mappedResult,
    coverageResult,
    candidateTrains,
    selectedTrain,
    poolingResult,
    fareResult,
  };

  if (truckerQuote !== undefined) {
    result.truckerQuote = truckerQuote;
  }

  if (forwardingCard !== undefined) {
    result.forwardingCard = forwardingCard;
  }

  return result;
}

export default processBookingRequest;
