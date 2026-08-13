import { calculateFare } from './calculateFare';

export function runCalculateFareTest() {
  console.log('==================================================');
  console.log('        calculateFare Test Runner Output          ');
  console.log('==================================================\n');

  // Role 1 — Rail Only (RAIL_ONLY) Representative Demo Case
  console.log('--- [Role 1: Rail Only (RAIL_ONLY) Demo Case] ---');
  const res1 = calculateFare('ROUTE-BNP-OBO', { volumeCBM: 8.5, weightKg: 3000 });
  console.log('Result 1:');
  console.log(JSON.stringify(res1, null, 2));

  console.log('\n[Role 1 Verification Check]:');
  console.log(`  - totalFareWon: ${res1.totalFareWon} (Expected: 145560) -> ${res1.totalFareWon === 145560 ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - allocatedRailFareWon: ${res1.allocatedRailFareWon} (Expected: 45560) -> ${res1.allocatedRailFareWon === 45560 ? 'MATCH' : 'MISMATCH'}`);
  console.log('--------------------------------------------------\n');

  // Role 2 — Rail + Forwarding (FULL_PACKAGE) Case
  console.log('--- [Role 2: Rail + Forwarding (FULL_PACKAGE) Case] ---');
  const res2 = calculateFare('ROUTE-OBO-BNP', { volumeCBM: 11.0, weightKg: 2000 });
  console.log('Result 2:');
  console.log(JSON.stringify(res2, null, 2));

  console.log('\n[Role 2 Verification Check]:');
  console.log(`  - totalFareWon: ${res2.totalFareWon} (Expected: 158960) -> ${res2.totalFareWon === 158960 ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - allocatedRailFareWon: ${res2.allocatedRailFareWon} (Expected: 58960) -> ${res2.allocatedRailFareWon === 58960 ? 'MATCH' : 'MISMATCH'}`);
  console.log('--------------------------------------------------\n');

  // Role 3 — Rail + Trucker (RAIL_TRUCKER) Case
  console.log('--- [Role 3: Rail + Trucker (RAIL_TRUCKER) Case] ---');
  const res3 = calculateFare('ROUTE-BNP-OBO', { volumeCBM: 8.5, weightKg: 3000 }, 80000);
  console.log('Result 3:');
  console.log(JSON.stringify(res3, null, 2));

  console.log('\n[Role 3 Verification Check]:');
  console.log(`  - totalFareWon: ${res3.totalFareWon} (Expected: 225560) -> ${res3.totalFareWon === 225560 ? 'MATCH' : 'MISMATCH'}`);
  console.log('--------------------------------------------------\n');

  // Role 4 — Over 100% Share Exception Case
  console.log('--- [Role 4: Over 100% Share Exception Case] ---');
  const res4 = calculateFare('ROUTE-BNP-OBO', { volumeCBM: 65, weightKg: 3000 });
  console.log('Result 4:');
  console.log(JSON.stringify(res4, null, 2));

  console.log('\n[Role 4 Verification Check]:');
  console.log(`  - error: ${res4.error} (Expected: true)`);
  console.log(`  - reason: "${res4.reason}" (Expected: "점유율 100% 초과")`);

  console.log('\n==================================================');
  console.log('           Test Runner Completed                  ');
  console.log('==================================================');
}

runCalculateFareTest();
