import { GoogleGenAI, Type } from "@google/genai";
import { DEMO_CURRENT_DATE } from "../config/demoDate";

export interface NLURequestResult {
  intent: 'SEARCH_POOL' | 'CHECK_BOOKING' | 'UNKNOWN' | string;
  status: 'READY' | 'NEEDS_CLARIFICATION' | 'UNSUPPORTED' | string;
  serviceTab: string;
  requestedDepartureDate: string | null;
  requestedArrivalByDate: string | null;
  origin: {
    originText: string | null;
    stationId: null;
  };
  finalDestination: {
    destinationText: string | null;
    city: string | null;
    mappedStationId: null;
  };
  cargo: {
    description: string | null;
    packageType: string | null;
    packageCount: number | null;
    volumeCBM: number | null;
    weightKg: number | null;
  };
  missingFields: string[];
  followUpQuestion: string | null;
}

const getApiKey = (): string => {
  if (typeof process !== 'undefined' && process.env?.GEMINI_API_KEY) {
    return process.env.GEMINI_API_KEY;
  }
  if (typeof import.meta !== 'undefined' && (import.meta as any).env?.VITE_GEMINI_API_KEY) {
    return (import.meta as any).env.VITE_GEMINI_API_KEY;
  }
  return '';
};

/**
 * Parses natural language input for freight shipping requests using Gemini API.
 * 
 * @param naturalLanguageText The user's input string in natural language.
 * @param serviceTab The service mode passed from caller (e.g. "철도", "철도+도로", "철도+포워딩").
 */
export async function parseRequest(
  naturalLanguageText: string,
  serviceTab: string
): Promise<NLURequestResult> {
  const apiKey = getApiKey();

  const responseSchema = {
    type: Type.OBJECT,
    properties: {
      intent: {
        type: Type.STRING,
        enum: ["SEARCH_POOL", "CHECK_BOOKING", "UNKNOWN"],
        description: "The request intent: SEARCH_POOL, CHECK_BOOKING, or UNKNOWN.",
      },
      status: {
        type: Type.STRING,
        enum: ["READY", "NEEDS_CLARIFICATION", "UNSUPPORTED"],
        description: "Processing status: READY, NEEDS_CLARIFICATION, or UNSUPPORTED.",
      },
      serviceTab: {
        type: Type.STRING,
        description: "Must match the provided serviceTab parameter exactly.",
      },
      requestedDepartureDate: {
        type: Type.STRING,
        nullable: true,
        description: "Requested departure date in YYYY-MM-DD format if explicitly specified as departure date.",
      },
      requestedArrivalByDate: {
        type: Type.STRING,
        nullable: true,
        description: "Requested arrival deadline date in YYYY-MM-DD format if explicitly specified as arrival deadline.",
      },
      origin: {
        type: Type.OBJECT,
        properties: {
          originText: { type: Type.STRING, nullable: true },
          stationId: { type: Type.STRING, nullable: true },
        },
        required: ["originText", "stationId"],
      },
      finalDestination: {
        type: Type.OBJECT,
        properties: {
          destinationText: { type: Type.STRING, nullable: true },
          city: { type: Type.STRING, nullable: true },
          mappedStationId: { type: Type.STRING, nullable: true },
        },
        required: ["destinationText", "city", "mappedStationId"],
      },
      cargo: {
        type: Type.OBJECT,
        properties: {
          description: { type: Type.STRING, nullable: true },
          packageType: { type: Type.STRING, nullable: true },
          packageCount: { type: Type.NUMBER, nullable: true },
          volumeCBM: { type: Type.NUMBER, nullable: true },
          weightKg: { type: Type.NUMBER, nullable: true },
        },
        required: ["description", "packageType", "packageCount", "volumeCBM", "weightKg"],
      },
      missingFields: {
        type: Type.ARRAY,
        items: { type: Type.STRING },
      },
      followUpQuestion: {
        type: Type.STRING,
        nullable: true,
      },
    },
    required: [
      "intent",
      "status",
      "serviceTab",
      "requestedDepartureDate",
      "requestedArrivalByDate",
      "origin",
      "finalDestination",
      "cargo",
      "missingFields",
      "followUpQuestion",
    ],
  };

  const systemInstruction = `
You are an AI NLU parser for a rail & multimodal freight shipping platform.
Parse the user's natural language request into a structured JSON object according to the requested schema.

CRITICAL RULES:
1. Reference Demo Date: Today's date is strictly "${DEMO_CURRENT_DATE}". Do not use system clock or any other date.
   - All relative dates (e.g., "내일", "다음주 월요일", "8/15", "3일 뒤") must be calculated relative to "${DEMO_CURRENT_DATE}".
   - If a year is not provided, evaluate it against "${DEMO_CURRENT_DATE}".
2. serviceTab MUST be set exactly to "${serviceTab}". Do NOT infer serviceTab from the natural language text.
3. "origin.stationId" MUST ALWAYS BE null. Do not attempt to fill or map stationId here.
4. "finalDestination.mappedStationId" MUST ALWAYS BE null. Do not attempt to fill or map mappedStationId here.
5. "origin.originText": MUST extract ONLY the core location name (e.g. station name, port name like "부산신항", "오봉역"). Do NOT include postpositions, modifiers, or connecting words like "~에 있는", "~에서", "~의", and do NOT include cargo text (e.g. for "부산신항에 있는 자동차 전장부품", originText MUST be "부산신항" only).
6. "finalDestination.destinationText": MUST extract the core location/destination phrase without trailing postpositions (e.g. ~로, ~에서, ~까지, ~으로, ~에, ~로의). However, preserve qualifying modifiers describing warehouses or places (e.g. "군포에 있는 제 창고"). Examples: "군포로 보내주세요" -> destinationText: "군포" (postposition "로" removed); "군포에 있는 제 창고로 보내주세요" -> destinationText: "군포에 있는 제 창고" (postposition "로" removed, modifier preserved); "오봉역까지" -> destinationText: "오봉역" (postposition "까지" removed).
7. "finalDestination.city": If the user explicitly mentions a city or county name (e.g. "군포", "군포시", "수원", "수원시", whether with or without formal administrative suffixes like "시" or "군"), this MUST be treated as an explicit mention and MUST be returned with the standard official administrative suffix (e.g. "군포" -> "군포시", "수원" -> "수원시"). Set city to null ONLY when the user does not mention a city or county name at all and only uses other expressions such as station names or port names (e.g. '오봉역으로', '부산신항으로'). Inferring the city using background knowledge of location names is strictly forbidden.
8. "cargo.packageType": MUST be normalized to uppercase English code strings such as "PALLET", "BOX", "CONTAINER", etc. (e.g. convert "팔레트" or "파렛트" to "PALLET"). If not specified or unknown, return null.
9. Dates distinction:
   - "requestedDepartureDate": Set if user clearly requests departure date (e.g. "8월 20일 출발", "내일 출고").
   - "requestedArrivalByDate": Set if user clearly requests arrival deadline (e.g. "8월 25일까지 도착", "월요일 도착 희망").
   - Ambiguous Date: If a date expression is provided but it is unclear whether it is a departure date or an arrival deadline:
     Set "status" to "NEEDS_CLARIFICATION".
     Set "followUpQuestion" to a Korean sentence asking whether the specified date is the departure date or arrival deadline (e.g. "말씀하신 날짜가 출발일인가요, 아니면 도착 희망일인가요?").
     Add "requestedDepartureDate" to "missingFields".
10. Missing Date:
   - If NO date expression is mentioned at all:
     Set "status" to "NEEDS_CLARIFICATION".
     Set "followUpQuestion" to a Korean sentence asking for the departure date or arrival deadline (e.g. "화물 수송을 원하시는 출발일이나 도착 희망일을 알려주세요.").
     Add "requestedDepartureDate" to "missingFields".
11. Cargo missing:
   - cargo.volumeCBM 또는 cargo.weightKg 중 하나라도 사용자가 명시적으로 언급하지 않았다면(둘 다 반드시 언급되어야 함), Gemini는 임의의 수치를 추정하거나 만들어내지 말고 반드시 null로 두어야 한다. 이 경우 status를 NEEDS_CLARIFICATION으로 설정하고, missingFields에 'cargo.volumeCBM' 또는 'cargo.weightKg'를 추가하고, followUpQuestion에 화물의 부피(CBM)와 중량(kg)을 물어보는 한국어 질문을 생성해야 한다 (예: '화물의 부피(CBM)와 중량(kg)을 알려주세요.').
12. Completeness:
   - If origin, destination, cargo information, and a clear date are present, set "status" to "READY", "missingFields" to [], and "followUpQuestion" to null.
   - If essential info (like origin or destination) is missing, set "status" to "NEEDS_CLARIFICATION", list missing fields in "missingFields", and formulate "followUpQuestion" in Korean.
  `;

  try {
    const ai = new GoogleGenAI({
      apiKey: apiKey || '',
      httpOptions: {
        headers: {
          'User-Agent': 'aistudio-build',
        },
      },
    });

    const response = await ai.models.generateContent({
      model: "gemini-3.6-flash",
      contents: naturalLanguageText,
      config: {
        systemInstruction,
        responseMimeType: "application/json",
        responseSchema,
      },
    });

    const responseText = response.text || "{}";
    const parsed = JSON.parse(responseText);

    const hasDeparture = Boolean(parsed.requestedDepartureDate);
    const hasArrival = Boolean(parsed.requestedArrivalByDate);
    let status = parsed.status || "NEEDS_CLARIFICATION";
    let missingFields: string[] = Array.isArray(parsed.missingFields) ? parsed.missingFields : [];
    let followUpQuestion: string | null = parsed.followUpQuestion || null;

    // Date Enforcement in Post-Processing
    if (!hasDeparture && !hasArrival) {
      status = "NEEDS_CLARIFICATION";
      if (!missingFields.includes("requestedDepartureDate") && !missingFields.includes("requestedArrivalByDate")) {
        missingFields.push("requestedDepartureDate");
      }
      if (!followUpQuestion) {
        followUpQuestion = "출발일 또는 도착 희망일을 알려주세요.";
      }
    }

    // Cargo Volume and Weight Enforcement in Post-Processing
    const isVolumeMissing = parsed.cargo?.volumeCBM === null || parsed.cargo?.volumeCBM === undefined;
    const isWeightMissing = parsed.cargo?.weightKg === null || parsed.cargo?.weightKg === undefined;

    if (isVolumeMissing || isWeightMissing) {
      status = "NEEDS_CLARIFICATION";
      if (isVolumeMissing && !missingFields.includes("cargo.volumeCBM")) {
        missingFields.push("cargo.volumeCBM");
      }
      if (isWeightMissing && !missingFields.includes("cargo.weightKg")) {
        missingFields.push("cargo.weightKg");
      }

      if (!hasDeparture && !hasArrival) {
        followUpQuestion = "출발일(또는 도착 희망일)과 화물의 부피(CBM), 중량(kg)을 알려주세요.";
      } else {
        followUpQuestion = "화물의 부피(CBM)와 중량(kg)을 알려주세요.";
      }
    }

    const result: NLURequestResult = {
      intent: parsed.intent || "SEARCH_POOL",
      status,
      serviceTab, // Rule 2: Always pass through the parameter directly
      requestedDepartureDate: parsed.requestedDepartureDate || null,
      requestedArrivalByDate: parsed.requestedArrivalByDate || null,
      origin: {
        originText: parsed.origin?.originText || null,
        stationId: null, // Rule 3: Always null
      },
      finalDestination: {
        destinationText: parsed.finalDestination?.destinationText || null,
        city: parsed.finalDestination?.city || null,
        mappedStationId: null, // Rule 4: Always null
      },
      cargo: {
        description: parsed.cargo?.description || null,
        packageType: parsed.cargo?.packageType || null,
        packageCount: typeof parsed.cargo?.packageCount === "number" ? parsed.cargo.packageCount : null,
        volumeCBM: typeof parsed.cargo?.volumeCBM === "number" ? parsed.cargo.volumeCBM : null,
        weightKg: typeof parsed.cargo?.weightKg === "number" ? parsed.cargo.weightKg : null,
      },
      missingFields,
      followUpQuestion,
    };

    return result;
  } catch (error) {
    console.error("Error in parseRequest with Gemini API:", error);

    // Fallback object maintaining exact schema structure
    return {
      intent: "SEARCH_POOL",
      status: "NEEDS_CLARIFICATION",
      serviceTab,
      requestedDepartureDate: null,
      requestedArrivalByDate: null,
      origin: {
        originText: null,
        stationId: null,
      },
      finalDestination: {
        destinationText: null,
        city: null,
        mappedStationId: null,
      },
      cargo: {
        description: null,
        packageType: null,
        packageCount: null,
        volumeCBM: null,
        weightKg: null,
      },
      missingFields: ["requestedDepartureDate"],
      followUpQuestion: "요청 내용을 분석하는데 오류가 발생했습니다. 출발일 또는 상세 요청사항을 입력해주세요.",
    };
  }
}

