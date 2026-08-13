import sampleRequests from "../data/sampleRequests.json";
import { parseRequest } from "./parseRequest";

export async function runTestRunner() {
  console.log("==================================================");
  console.log("     parseRequest NLU Test Runner Output         ");
  console.log("==================================================\n");

  for (const sample of sampleRequests as Array<any>) {
    console.log(`--------------------------------------------------`);
    console.log(`[Sample ID]: ${sample.sampleId}`);
    console.log(`[Input Text (naturalLanguage)]: "${sample.naturalLanguage}"`);
    console.log(`[Input Service Tab (serviceTab)]: "${sample.serviceTab}"`);

    try {
      const actual = await parseRequest(sample.naturalLanguage, sample.serviceTab);
      console.log("\n[Actual Result (parseRequest output)]:");
      console.log(JSON.stringify(actual, null, 2));
    } catch (error) {
      console.error("\n[Actual Result Error]:", error);
    }

    console.log("\n[Expected Parsing (ground truth in JSON)]:");
    console.log(JSON.stringify(sample.expectedParsing, null, 2));
    console.log(`--------------------------------------------------\n`);
  }

  console.log("==================================================");
  console.log("             Test Runner Completed               ");
  console.log("==================================================");
}

// Execute immediately if executed directly via Node / tsx
if (typeof process !== "undefined" && process.env) {
  runTestRunner().catch(console.error);
}
