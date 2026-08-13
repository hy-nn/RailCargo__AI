import { processBookingRequest } from './processBookingRequest';

export async function runProcessBookingRequestTest() {
  console.log('==================================================');
  console.log('    processBookingRequest Test Runner Output      ');
  console.log('==================================================\n');

  // Case 1: RAIL_ONLY
  console.log('--- [Case 1: RAIL_ONLY Service Tab] ---');
  const text1 = "부산신항에 있는 자동차 전장부품 팔레트 4개를 군포에 있는 제 창고로 8월 22일까지 배송하고 싶어요. 화물은 8.5CBM이고 무게는 3,000kg입니다.";
  const serviceTab1 = "RAIL_ONLY";
  const selectedSlotId1 = "SLOT-20260822-3002-BNP-OBO";

  const result1 = await processBookingRequest(text1, serviceTab1, selectedSlotId1);

  console.log('Full Output Result 1:');
  console.log(JSON.stringify(result1, null, 2));

  console.log('\n[Case 1 Verification Checks]:');
  console.log(`  - coverageResult.routeCoverage: "${result1.coverageResult?.routeCoverage}" (Expected: "SUPPORTED") -> ${result1.coverageResult?.routeCoverage === 'SUPPORTED' ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - selectedTrain.slotId: "${result1.selectedTrain?.slotId}" (Expected: "SLOT-20260822-3002-BNP-OBO") -> ${result1.selectedTrain?.slotId === 'SLOT-20260822-3002-BNP-OBO' ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - poolingResult.poolAfter.cbm: ${result1.poolingResult?.poolAfter?.cbm} (Expected: 54.7) -> ${result1.poolingResult?.poolAfter?.cbm === 54.7 ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - poolingResult.poolAfter.status: "${result1.poolingResult?.poolAfter?.status}" (Expected: "CONFIRMED") -> ${result1.poolingResult?.poolAfter?.status === 'CONFIRMED' ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - fareResult.totalFareWon: ${result1.fareResult?.totalFareWon} (Expected: 145560) -> ${result1.fareResult?.totalFareWon === 145560 ? 'MATCH' : 'MISMATCH'}`);
  console.log('--------------------------------------------------\n');

  // Case 2: RAIL_TRUCKER
  console.log('--- [Case 2: RAIL_TRUCKER Service Tab] ---');
  const text2 = "부산신항에 있는 자동차 전장부품 팔레트 4개를 군포 창고로 8월 22일에 출발시키고 싶어요. 화물은 8.5CBM이고 무게는 3,000kg입니다.";
  const serviceTab2 = "RAIL_TRUCKER";
  const selectedSlotId2 = "SLOT-20260822-3002-BNP-OBO";

  const result2 = await processBookingRequest(text2, serviceTab2, selectedSlotId2);

  console.log('Full Output Result 2:');
  console.log(JSON.stringify(result2, null, 2));

  console.log('\n[Case 2 Verification Checks]:');
  console.log(`  - truckerQuote.assignedVehicleCode: "${result2.truckerQuote?.assignedVehicleCode}" (Expected: "3.5T") -> ${result2.truckerQuote?.assignedVehicleCode === '3.5T' ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - truckerQuote.oneWayFareWon: ${result2.truckerQuote?.oneWayFareWon} (Expected: 80000) -> ${result2.truckerQuote?.oneWayFareWon === 80000 ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - fareResult.totalFareWon: ${result2.fareResult?.totalFareWon} (Expected: 225560) -> ${result2.fareResult?.totalFareWon === 225560 ? 'MATCH' : 'MISMATCH'}`);
  console.log('--------------------------------------------------\n');

  // Case 3: FULL_PACKAGE
  console.log('--- [Case 3: FULL_PACKAGE Service Tab] ---');
  const text3 = "오봉역에서 부산신항으로 전자부품 11CBM을 8월 20일에 출발시키고 싶어요. 무게는 2,000kg입니다.";
  const serviceTab3 = "FULL_PACKAGE";
  const selectedSlotId3 = "SLOT-20260820-3007-OBO-BNP";

  const result3 = await processBookingRequest(text3, serviceTab3, selectedSlotId3);

  console.log('Full Output Result 3:');
  console.log(JSON.stringify(result3, null, 2));

  console.log('\n[Case 3 Verification Checks]:');
  console.log(`  - forwardingCard.direction: "${result3.forwardingCard?.direction}" (Expected: "EXPORT") -> ${result3.forwardingCard?.direction === 'EXPORT' ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - forwardingCard.price: ${result3.forwardingCard?.price} (Expected: null) -> ${result3.forwardingCard?.price === null ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - fareResult.totalFareWon: ${result3.fareResult?.totalFareWon} (Expected: 158960) -> ${result3.fareResult?.totalFareWon === 158960 ? 'MATCH' : 'MISMATCH'}`);

  console.log('\n==================================================');
  console.log('           Test Runner Completed                  ');
  console.log('==================================================');
}

runProcessBookingRequestTest();
