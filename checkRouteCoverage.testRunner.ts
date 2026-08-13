import sampleRequests from '../data/sampleRequests.json';
import { checkRouteCoverage, getSupportedRoutes } from './checkRouteCoverage';

export function runCheckRouteCoverageTest() {
  console.log('==================================================');
  console.log('   checkRouteCoverage Test Runner Output          ');
  console.log('==================================================\n');

  // Role 1: Normal 7 sample cases
  console.log('--- [Role 1: 7 Sample Requests Test] ---');
  sampleRequests.forEach((sample) => {
    const sampleId = (sample as any).sampleId || (sample as any).id;
    const isSample3 = sampleId === 'REQ-SAMPLE-003';

    const mockMappedRequest = {
      ...(sample.expectedParsing as any),
      origin: {
        ...(sample.expectedParsing as any).origin,
        stationId: isSample3 ? 'ST-OBO' : 'ST-BNP',
      },
      finalDestination: {
        ...(sample.expectedParsing as any).finalDestination,
        mappedStationId: isSample3 ? 'ST-BNP' : 'ST-OBO',
      },
    };

    const result = checkRouteCoverage(mockMappedRequest);

    console.log(`[Sample ID]: ${sampleId}`);
    console.log(`  Origin Station ID: ${mockMappedRequest.origin.stationId}`);
    console.log(`  Destination Station ID: ${mockMappedRequest.finalDestination.mappedStationId}`);
    console.log(`  routeCoverage: ${result.routeCoverage}`);
    console.log(`  routeId: ${result.routeId}`);
    console.log('--------------------------------------------------');
  });

  // Role 2: Exception cases
  console.log('\n--- [Role 2: Exception Cases Test] ---');

  const caseA = {
    origin: { originText: '부산신항', stationId: 'ST-BNP' },
    finalDestination: { destinationText: '서울역', city: '서울특별시', mappedStationId: 'ST-SEOUL' },
  } as any;
  const resA = checkRouteCoverage(caseA);
  console.log('[Case A - Unsupported Station (ST-BNP -> ST-SEOUL)]');
  console.log(`  routeCoverage: ${resA.routeCoverage}`);
  console.log(`  routeId: ${resA.routeId}`);
  console.log('--------------------------------------------------');

  const caseB = {
    origin: { originText: '알 수 없는 출처', stationId: null },
    finalDestination: { destinationText: '군포 창고', city: '군포시', mappedStationId: 'ST-OBO' },
  } as any;
  const resB = checkRouteCoverage(caseB);
  console.log('[Case B - Unmapped Origin Station (null -> ST-OBO)]');
  console.log(`  routeCoverage: ${resB.routeCoverage}`);
  console.log(`  routeId: ${resB.routeId}`);
  console.log('--------------------------------------------------');

  // Role 3: getSupportedRoutes() call
  console.log('\n--- [Role 3: Supported Routes List] ---');
  const activeRoutes = getSupportedRoutes();
  console.log('Supported Active Routes:', JSON.stringify(activeRoutes, null, 2));

  console.log('\n==================================================');
  console.log('           Test Runner Completed                  ');
  console.log('==================================================');
}

runCheckRouteCoverageTest();
