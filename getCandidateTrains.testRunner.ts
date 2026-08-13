import sampleRequests from '../data/sampleRequests.json';
import { getCandidateTrains } from './getCandidateTrains';

export function runGetCandidateTrainsTest() {
  console.log('==================================================');
  console.log('    getCandidateTrains Test Runner Output         ');
  console.log('==================================================\n');

  // Role 1 — Representative Demo Case
  console.log('--- [Role 1: Representative Demo Case] ---');
  const role1Input = {
    routeCoverage: 'SUPPORTED',
    routeId: 'ROUTE-BNP-OBO',
    requestedDepartureDate: null,
    requestedArrivalByDate: '2026-08-22',
    origin: { stationId: 'ST-BNP' },
    finalDestination: { mappedStationId: 'ST-OBO' },
  };

  const role1Candidates = getCandidateTrains(role1Input);
  console.log('Candidate Trains Output:');
  console.log(JSON.stringify(role1Candidates, null, 2));

  const targetSlot = role1Candidates.find(
    (c) => c.slotId === 'SLOT-20260822-3002-BNP-OBO'
  );

  if (targetSlot) {
    console.log(
      `\nTarget Slot 'SLOT-20260822-3002-BNP-OBO' IS included.`
    );
    console.log(`isFastest status: ${targetSlot.isFastest}`);
  } else {
    console.log(
      `\nTarget Slot 'SLOT-20260822-3002-BNP-OBO' IS NOT included.`
    );
  }
  console.log('--------------------------------------------------\n');

  // Role 2 — AND Condition Verification (REQ-SAMPLE-005)
  console.log('--- [Role 2: AND Condition Verification (REQ-SAMPLE-005)] ---');
  const role2Input = {
    routeCoverage: 'SUPPORTED',
    routeId: 'ROUTE-BNP-OBO',
    requestedDepartureDate: '2026-08-22',
    requestedArrivalByDate: '2026-08-23',
    origin: { stationId: 'ST-BNP' },
    finalDestination: { mappedStationId: 'ST-OBO' },
  };

  const role2Candidates = getCandidateTrains(role2Input);
  console.log(`Candidate count: ${role2Candidates.length}`);
  role2Candidates.forEach((c, idx) => {
    const depDate = c.departureDateTime.split('T')[0];
    const arrDate = c.arrivalDateTime.split('T')[0];
    console.log(
      ` Candidate #${idx + 1}: slotId=${c.slotId}, trainNo=${c.trainNo}`
    );
    console.log(`   Departure: ${c.departureDateTime} (Date: ${depDate})`);
    console.log(`   Arrival:   ${c.arrivalDateTime} (Date: ${arrDate})`);
    console.log(`   Departure >= 2026-08-22: ${depDate >= '2026-08-22'}`);
    console.log(`   Arrival <= 2026-08-23: ${arrDate <= '2026-08-23'}`);
  });
  console.log('--------------------------------------------------\n');

  // Role 3 — Remaining Samples
  console.log('--- [Role 3: Remaining Samples Test] ---');
  const targetSampleIds = ['REQ-SAMPLE-001', 'REQ-SAMPLE-002', 'REQ-SAMPLE-003', 'REQ-SAMPLE-004', 'REQ-SAMPLE-006', 'REQ-SAMPLE-007'];

  sampleRequests.forEach((sample) => {
    const sampleId = (sample as any).sampleId || (sample as any).id;
    if (!targetSampleIds.includes(sampleId)) return;

    const isSample3 = sampleId === 'REQ-SAMPLE-003';
    const parsing = sample.expectedParsing as any;

    const inputObj = {
      routeCoverage: 'SUPPORTED',
      routeId: isSample3 ? 'ROUTE-OBO-BNP' : 'ROUTE-BNP-OBO',
      requestedDepartureDate: parsing.requestedDepartureDate || null,
      requestedArrivalByDate: parsing.requestedArrivalByDate || null,
      origin: { stationId: isSample3 ? 'ST-OBO' : 'ST-BNP' },
      finalDestination: { mappedStationId: isSample3 ? 'ST-BNP' : 'ST-OBO' },
    };

    const candidates = getCandidateTrains(inputObj);

    console.log(`[Sample ID]: ${sampleId}`);
    console.log(`  Req Dep Date: ${inputObj.requestedDepartureDate}, Req Arr Date: ${inputObj.requestedArrivalByDate}`);
    console.log(`  Candidate Count: ${candidates.length}`);
    candidates.forEach((c) => {
      console.log(`    - slotId: ${c.slotId}, Departure: ${c.departureDateTime}, isFastest: ${c.isFastest}`);
    });
    console.log('--------------------------------------------------');
  });

  console.log('\n==================================================');
  console.log('           Test Runner Completed                  ');
  console.log('==================================================');
}

runGetCandidateTrainsTest();
