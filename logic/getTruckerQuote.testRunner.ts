import { getTruckerQuote } from './getTruckerQuote';

export function runGetTruckerQuoteTest() {
  console.log('==================================================');
  console.log('       getTruckerQuote Test Runner Output         ');
  console.log('==================================================\n');

  // Role 1 — Representative Demo Case ("군포시", 8.5 CBM, 3000 kg)
  console.log('--- [Role 1: Representative Demo Case] ---');
  const res1 = getTruckerQuote('군포시', { volumeCBM: 8.5, weightKg: 3000 });
  console.log('Result 1:');
  console.log(JSON.stringify(res1, null, 2));

  console.log('\n[Role 1 Verification Check]:');
  console.log(`  - assignedVehicleCode: "${res1.assignedVehicleCode}" (Expected: "3.5T") -> ${res1.assignedVehicleCode === '3.5T' ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - oneWayFareWon: ${res1.oneWayFareWon} (Expected: 80000) -> ${res1.oneWayFareWon === 80000 ? 'MATCH' : 'MISMATCH'}`);
  console.log('--------------------------------------------------\n');

  // Role 2 — Different Vehicle & Distance Band ("안양시", 40 CBM, 7500 kg)
  console.log('--- [Role 2: Different Vehicle & Distance Band] ---');
  const res2 = getTruckerQuote('안양시', { volumeCBM: 40, weightKg: 7500 });
  console.log('Result 2:');
  console.log(JSON.stringify(res2, null, 2));

  console.log('\n[Role 2 Verification Check]:');
  console.log(`  - assignedVehicleCode: "${res2.assignedVehicleCode}" (Expected: "8T") -> ${res2.assignedVehicleCode === '8T' ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - oneWayFareWon: ${res2.oneWayFareWon} (Expected: 140000) -> ${res2.oneWayFareWon === 140000 ? 'MATCH' : 'MISMATCH'}`);
  console.log('--------------------------------------------------\n');

  // Role 3 — Over Capacity Exception Case ("화성시", 70 CBM, 30000 kg)
  console.log('--- [Role 3: Over Capacity Exception Case] ---');
  const res3 = getTruckerQuote('화성시', { volumeCBM: 70, weightKg: 30000 });
  console.log('Result 3:');
  console.log(JSON.stringify(res3, null, 2));

  console.log('\n[Role 3 Verification Check]:');
  console.log(`  - overCapacity: ${res3.overCapacity} (Expected: true) -> ${res3.overCapacity === true ? 'MATCH' : 'MISMATCH'}`);

  console.log('\n==================================================');
  console.log('           Test Runner Completed                  ');
  console.log('==================================================');
}

runGetTruckerQuoteTest();
