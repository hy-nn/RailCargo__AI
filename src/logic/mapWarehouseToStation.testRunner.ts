import sampleRequests from '../data/sampleRequests.json';
import { mapWarehouseToStation } from './mapWarehouseToStation';

export function runMapWarehouseToStationTest() {
  console.log('==================================================');
  console.log('   mapWarehouseToStation Test Runner Output       ');
  console.log('==================================================\n');

  sampleRequests.forEach((sample) => {
    const sampleId = (sample as any).sampleId || (sample as any).id;
    const inputParsing = sample.expectedParsing as any;
    const result = mapWarehouseToStation(inputParsing);

    console.log(`[Sample ID]: ${sampleId}`);
    console.log(`[Input Origin Text]: "${inputParsing.origin?.originText}"`);
    console.log(`[Input Destination Text]: "${inputParsing.finalDestination?.destinationText}"`);
    console.log(`[Input Destination City]: "${inputParsing.finalDestination?.city}"`);
    console.log(`[Mapped origin.stationId]: ${result.origin?.stationId}`);
    console.log(`[Mapped finalDestination.mappedStationId]: ${result.finalDestination?.mappedStationId}`);
    console.log('--------------------------------------------------');
  });

  console.log('==================================================');
  console.log('           Test Runner Completed                  ');
  console.log('==================================================');
}

runMapWarehouseToStationTest();
