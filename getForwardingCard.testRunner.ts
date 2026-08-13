import { getForwardingCard } from './getForwardingCard';

export function runGetForwardingCardTest() {
  console.log('==================================================');
  console.log('      getForwardingCard Test Runner Output        ');
  console.log('==================================================\n');

  const card = getForwardingCard();
  console.log('Result:');
  console.log(JSON.stringify(card, null, 2));

  console.log('\n[Verification Checks]:');
  console.log(`  - direction: "${card?.direction}" (Expected: "EXPORT") -> ${card?.direction === 'EXPORT' ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - cardId: "${card?.cardId}" (Expected: "GLOBIS-FWD-BNP-EXPORT-01") -> ${card?.cardId === 'GLOBIS-FWD-BNP-EXPORT-01' ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - price: ${card?.price} (Expected: null) -> ${card?.price === null ? 'MATCH' : 'MISMATCH'}`);
  console.log(`  - title: "${card?.title}" (Expected: "부산신항 수출 포워딩 연계") -> ${card?.title === '부산신항 수출 포워딩 연계' ? 'MATCH' : 'MISMATCH'}`);

  console.log('\n==================================================');
  console.log('           Test Runner Completed                  ');
  console.log('==================================================');
}

runGetForwardingCardTest();
