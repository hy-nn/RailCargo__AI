import { processBookingRequest } from './processBookingRequest';
import { finalizeBooking } from './finalizeBooking';

export async function runFinalizeBookingTest() {
  console.log('==================================================');
  console.log('       finalizeBooking Test Runner Output         ');
  console.log('==================================================\n');

  // Case 1: RAIL_ONLY
  console.log('--- [Case 1: RAIL_ONLY Service Tab] ---');
  const text1 = "부산신항에 있는 자동차 전장부품 팔레트 4개를 군포에 있는 제 창고로 8월 22일까지 배송하고 싶어요. 화물은 8.5CBM이고 무게는 3,000kg입니다.";
  const serviceTab1 = "RAIL_ONLY";
  const selectedSlotId1 = "SLOT-20260822-3002-BNP-OBO";

  const processResult1 = await processBookingRequest(text1, serviceTab1, selectedSlotId1);
  const booking1 = finalizeBooking(processResult1);

  console.log('Full Booking Result 1:');
  console.log(JSON.stringify(booking1, null, 2));

  console.log('\n[Case 1 Verification Checks]:');
  console.log(`  - bookingId format (BOOK-YYYYMMDD-NNN): "${booking1.bookingId}" -> ${/^BOOK-\d{8}-\d{3}$/.test(booking1.bookingId) ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - fareQuote.totalFareWon: ${booking1.fareQuote?.totalFareWon} (Expected: 145560) -> ${booking1.fareQuote?.totalFareWon === 145560 ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - carbon.railEmissionKgCO2e: ${booking1.carbon?.railEmissionKgCO2e}`);
  console.log(`  - carbon.truckEmissionKgCO2e: ${booking1.carbon?.truckEmissionKgCO2e}`);
  console.log(`  - carbon.estimatedSavingKgCO2e: ${booking1.carbon?.estimatedSavingKgCO2e}`);
  console.log(`  - carbon.reductionRatePercent: ${booking1.carbon?.reductionRatePercent}%`);
  console.log(`  - truckerServiceId: ${booking1.truckerServiceId} (Expected: null) -> ${booking1.truckerServiceId === null ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - globisCardId: ${booking1.globisCardId} (Expected: null) -> ${booking1.globisCardId === null ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - bookingStatus: "${booking1.bookingStatus}" (Expected: "CONFIRMED") -> ${booking1.bookingStatus === 'CONFIRMED' ? 'MATCH' : 'MISMATCH'}`);
  console.log('--------------------------------------------------\n');

  // Case 2: RAIL_TRUCKER
  console.log('--- [Case 2: RAIL_TRUCKER Service Tab] ---');
  const text2 = "부산신항에 있는 자동차 전장부품 팔레트 4개를 군포 창고로 8월 22일에 출발시키고 싶어요. 화물은 8.5CBM이고 무게는 3,000kg입니다.";
  const serviceTab2 = "RAIL_TRUCKER";
  const selectedSlotId2 = "SLOT-20260822-3002-BNP-OBO";

  const processResult2 = await processBookingRequest(text2, serviceTab2, selectedSlotId2);
  const booking2 = finalizeBooking(processResult2);

  console.log('Full Booking Result 2:');
  console.log(JSON.stringify(booking2, null, 2));

  console.log('\n[Case 2 Verification Checks]:');
  console.log(`  - bookingId format (BOOK-YYYYMMDD-NNN): "${booking2.bookingId}" -> ${/^BOOK-\d{8}-\d{3}$/.test(booking2.bookingId) ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - fareQuote.totalFareWon: ${booking2.fareQuote?.totalFareWon} (Expected: 225560) -> ${booking2.fareQuote?.totalFareWon === 225560 ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - carbon.railEmissionKgCO2e: ${booking2.carbon?.railEmissionKgCO2e}`);
  console.log(`  - carbon.truckEmissionKgCO2e: ${booking2.carbon?.truckEmissionKgCO2e}`);
  console.log(`  - carbon.estimatedSavingKgCO2e: ${booking2.carbon?.estimatedSavingKgCO2e}`);
  console.log(`  - carbon.reductionRatePercent: ${booking2.carbon?.reductionRatePercent}%`);
  console.log(`  - truckerServiceId: "${booking2.truckerServiceId}" (Expected non-null) -> ${booking2.truckerServiceId !== null ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - globisCardId: ${booking2.globisCardId} (Expected: null) -> ${booking2.globisCardId === null ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - bookingStatus: "${booking2.bookingStatus}" (Expected: "CONFIRMED") -> ${booking2.bookingStatus === 'CONFIRMED' ? 'MATCH' : 'MISMATCH'}`);
  console.log('--------------------------------------------------\n');

  // Case 3: FULL_PACKAGE
  console.log('--- [Case 3: FULL_PACKAGE Service Tab] ---');
  const text3 = "오봉역에서 부산신항으로 전자부품 11CBM을 8월 20일에 출발시키고 싶어요. 무게는 2,000kg입니다.";
  const serviceTab3 = "FULL_PACKAGE";
  const selectedSlotId3 = "SLOT-20260820-3801-OBO-BNP";

  const processResult3 = await processBookingRequest(text3, serviceTab3, selectedSlotId3);
  const booking3 = finalizeBooking(processResult3);

  console.log('Full Booking Result 3:');
  console.log(JSON.stringify(booking3, null, 2));

  console.log('\n[Case 3 Verification Checks]:');
  console.log(`  - bookingId format (BOOK-YYYYMMDD-NNN): "${booking3.bookingId}" -> ${/^BOOK-\d{8}-\d{3}$/.test(booking3.bookingId) ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - fareQuote.totalFareWon: ${booking3.fareQuote?.totalFareWon} (Expected: 158960) -> ${booking3.fareQuote?.totalFareWon === 158960 ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - carbon.railEmissionKgCO2e: ${booking3.carbon?.railEmissionKgCO2e}`);
  console.log(`  - carbon.truckEmissionKgCO2e: ${booking3.carbon?.truckEmissionKgCO2e}`);
  console.log(`  - carbon.estimatedSavingKgCO2e: ${booking3.carbon?.estimatedSavingKgCO2e}`);
  console.log(`  - carbon.reductionRatePercent: ${booking3.carbon?.reductionRatePercent}%`);
  console.log(`  - truckerServiceId: ${booking3.truckerServiceId} (Expected: null) -> ${booking3.truckerServiceId === null ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - globisCardId: "${booking3.globisCardId}" (Expected non-null) -> ${booking3.globisCardId !== null ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - bookingStatus: "${booking3.bookingStatus}" (Expected: "CONFIRMED") -> ${booking3.bookingStatus === 'CONFIRMED' ? 'MATCH' : 'MISMATCH'}`);

  console.log('\n==================================================');
  console.log('           Test Runner Completed                  ');
  console.log('==================================================');
}

runFinalizeBookingTest();
