import { Pencil, Sparkles } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../../../components/ui/button";
import { Card, CardContent } from "../../../../components/ui/card";
import stationList from "../../../../data/stationList.json";

interface SectionAnalysisSubsectionProps {
  mappedResult?: any;
  backRoutePath?: string;
  showStationMappingNotice?: boolean;
}

export const SectionAnalysisSubsection = ({
  mappedResult,
  backRoutePath = "/04_rail_nlp_input",
  showStationMappingNotice = true,
}: SectionAnalysisSubsectionProps): JSX.Element => {
  const navigate = useNavigate();

  const originStationId = mappedResult?.origin?.stationId;
  const matchedOriginStation = stationList.find(
    (st: any) => st.stationId === originStationId
  );
  const originName =
    matchedOriginStation?.displayName ||
    mappedResult?.origin?.originText ||
    "부산신항";

  const rawDestinationText =
    mappedResult?.finalDestination?.destinationText || "군포 창고";

  const targetStationId = mappedResult?.finalDestination?.mappedStationId;
  const matchedStation = stationList.find(
    (st: any) => st.stationId === targetStationId
  );
  const mappedDestinationStationName =
    matchedStation?.displayName ||
    mappedResult?.finalDestination?.destinationText ||
    "오봉역";

  const stationNameWithSuffix = mappedDestinationStationName.endsWith("역")
    ? mappedDestinationStationName
    : `${mappedDestinationStationName}역`;

  const destinationName = stationNameWithSuffix;

  const volumeCbm = mappedResult?.cargo?.volumeCBM;
  const weightKg = mappedResult?.cargo?.weightKg;

  let cargoSpec = "8.5 CBM / 6,500kg";
  if (volumeCbm != null || weightKg != null) {
    const cbmText = volumeCbm != null ? `${volumeCbm} CBM` : "";
    const weightText =
      weightKg != null ? `${weightKg.toLocaleString()}kg` : "";
    const parts = [cbmText, weightText].filter(Boolean);
    if (parts.length > 0) {
      cargoSpec = parts.join(" / ");
    }
  }

  const reqArrivalDate =
    mappedResult?.requestedArrivalByDate ||
    mappedResult?.requestedDepartureDate;

  function formatKoreanDate(dateStr?: string): string {
    if (!dateStr) return "8월 22일";
    if (dateStr.includes("월")) return dateStr;
    const parts = dateStr.split(/[-T ]/);
    if (parts.length >= 3) {
      const month = parseInt(parts[1], 10);
      const day = parseInt(parts[2], 10);
      if (!isNaN(month) && !isNaN(day)) {
        return `${month}월 ${day}일`;
      }
    }
    return dateStr;
  }

  const arrivalDateText = formatKoreanDate(reqArrivalDate);

  const transportDetails = [
    {
      label: "운송 경로",
      values: [originName, destinationName],
      isRoute: true,
    },
    {
      label: "화물 규격",
      values: [cargoSpec],
      isRoute: false,
    },
    {
      label: "희망 도착일",
      values: [arrivalDateText],
      isRoute: false,
    },
  ];

  return (
    <section
      aria-labelledby="analysis-subsection-title"
      className="relative flex w-full flex-[0_0_auto] flex-col items-start px-0 pb-0 pt-8"
    >
      <header className="flex w-full flex-[0_0_auto] flex-col items-start">
        <h2
          id="analysis-subsection-title"
          className="mt-[-1px] flex self-stretch [font-family:'Noto_Sans_KR',Helvetica] text-[32px] font-extrabold leading-10 tracking-[0] text-[#0b1c30]"
        >
          AI가 추천하는 공동열차를 확인해보세요.
        </h2>
        <p className="mt-2 flex self-stretch [font-family:'Noto_Sans_KR',Helvetica] text-[17px] font-normal leading-5 tracking-[0] text-[#424751]">
          입력한 운송 조건과 공동배차 현황을 바탕으로 적합한 열차를
          추천해드려요.
        </p>
      </header>
      <Card className="mt-6 w-full rounded-[20px] border-[#c2c6d3] bg-[#eff4ff] p-0 shadow-none">
        <CardContent className="flex flex-col gap-6 px-10 py-8">
          <div className="flex w-full items-center justify-between">
            <dl className="inline-flex items-start gap-24">
              {transportDetails.map((detail) => (
                <div
                  key={detail.label}
                  className="flex flex-col items-start gap-1"
                >
                  <dt className="mt-[-1px] whitespace-nowrap [font-family:'Noto_Sans_KR',Helvetica] text-sm font-normal leading-5 tracking-[0] text-[#424751]">
                    {detail.label}
                  </dt>
                  <dd
                    className={
                      detail.isRoute
                        ? "flex items-center gap-3"
                        : "flex flex-col items-start"
                    }
                  >
                    {detail.isRoute ? (
                      <>
                        <span className="mt-[-1px] whitespace-nowrap [font-family:'Noto_Sans_KR',Helvetica] text-xl font-bold leading-5 tracking-[0] text-[#0b1c30]">
                          {detail.values[0]}
                        </span>
                        <span
                          aria-hidden="true"
                          className="text-xl font-bold leading-5 tracking-[0] text-[#0b1c30]"
                        >
                          →
                        </span>
                        <span className="mt-[-1px] whitespace-nowrap [font-family:'Noto_Sans_KR',Helvetica] text-xl font-bold leading-5 tracking-[0] text-[#0b1c30]">
                          {detail.values[1]}
                        </span>
                      </>
                    ) : (
                      detail.values.map((value) => (
                        <span
                          key={value}
                          className="mt-[-1px] whitespace-nowrap [font-family:'Noto_Sans_KR',Helvetica] text-xl font-bold leading-5 tracking-[0] text-[#0b1c30]"
                        >
                          {value}
                        </span>
                      ))
                    )}
                  </dd>
                </div>
              ))}
            </dl>
            <Button
              type="button"
              onClick={() => navigate(backRoutePath)}
              className="h-auto rounded-[20px] bg-[#005bac] px-7 py-3.5 [font-family:'Noto_Sans_KR',Helvetica] text-[17px] font-bold leading-5 tracking-[0] text-white shadow-[0px_1px_2px_#0000000d] hover:bg-[#005bac]"
            >
              <Pencil className="mr-2 h-4 w-4" />
              조건 수정
            </Button>
          </div>
          {showStationMappingNotice && (
            <aside className="flex w-full items-center gap-4 rounded-[20px] border border-blue-100 bg-white px-6 py-4">
              <Sparkles className="h-5 w-5 shrink-0 text-[#005bac]" />
              <p className="mt-[-1px] whitespace-nowrap [font-family:'Noto_Sans_KR',Helvetica] text-base font-medium leading-5 tracking-[0] text-[#004482]">
                목적지와 가장 가까운 화물취급역을 찾아 {stationNameWithSuffix}으로 연결해드렸어요.
                ({rawDestinationText} → {stationNameWithSuffix})
              </p>
            </aside>
          )}
        </CardContent>
      </Card>
    </section>
  );
};

