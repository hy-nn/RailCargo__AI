import { calculatePoolingStatus } from './calculatePoolingStatus';

export function runCalculatePoolingStatusTest() {
  console.log('==================================================');
  console.log('   calculatePoolingStatus Test Runner Output      ');
  console.log('==================================================\n');

  // Role 1 — Representative Demo Case
  console.log('--- [Role 1: Representative Demo Case] ---');
  const train1 = {
    currentCBM: 46.2,
    currentWeightKg: 16000,
    poolId: 'POOL-20260822-3002',
    poolStatus: 'CONFIRMED',
  };
  const cargo1 = { volumeCBM: 8.5, weightKg: 3000 };

  const res1 = calculatePoolingStatus(train1, cargo1);
  console.log('Result 1:');
  console.log(JSON.stringify(res1, null, 2));

  console.log('\n[Role 1 Verification Check]:');
  console.log(`  - canBook: ${res1.canBook} (Expected: true)`);
  console.log(`  - poolAfter.cbm: ${res1.poolAfter?.cbm} (Expected: 54.7)`);
  console.log(`  - poolAfter.status: ${res1.poolAfter?.status} (Expected: "CONFIRMED")`);
  console.log(`  - remainingCapacity.cbm: ${res1.remainingCapacity?.cbm} (Expected: 5.3)`);
  console.log('--------------------------------------------------\n');

  // Role 2 — Capacity Overflow Rejection Case
  console.log('--- [Role 2: Capacity Overflow Rejection Case] ---');
  const train2 = {
    currentCBM: 55.0,
    currentWeightKg: 20000,
    poolId: 'POOL-TEST-OVERFLOW',
    poolStatus: 'CONFIRMED',
  };
  const cargo2 = { volumeCBM: 10.0, weightKg: 2000 };

  const res2 = calculatePoolingStatus(train2, cargo2);
  console.log('Result 2:');
  console.log(JSON.stringify(res2, null, 2));

  console.log('\n[Role 2 Verification Check]:');
  console.log(`  - canBook: ${res2.canBook} (Expected: false)`);
  console.log(`  - rejectReason: "${res2.rejectReason}"`);
  console.log('--------------------------------------------------\n');

  // Role 3 — CLOSED Status Transition Case
  console.log('--- [Role 3: CLOSED Status Transition Case] ---');
  const train3 = {
    currentCBM: 58.0,
    currentWeightKg: 24000,
    poolId: 'POOL-TEST-CLOSE',
    poolStatus: 'CONFIRMED',
  };
  const cargo3 = { volumeCBM: 2.0, weightKg: 500 };

  const res3 = calculatePoolingStatus(train3, cargo3);
  console.log('Result 3:');
  console.log(JSON.stringify(res3, null, 2));

  console.log('\n[Role 3 Verification Check]:');
  console.log(`  - canBook: ${res3.canBook} (Expected: true)`);
  console.log(`  - poolAfter.cbm: ${res3.poolAfter?.cbm} (Expected: 60)`);
  console.log(`  - poolAfter.status: "${res3.poolAfter?.status}" (Expected: "CLOSED")`);

  console.log('\n==================================================');
  console.log('           Test Runner Completed                  ');
  console.log('==================================================');
}

runCalculatePoolingStatusTest();
