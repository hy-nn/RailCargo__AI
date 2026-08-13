import { Check, Star, Zap } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../components/ui/card";
import { CandidateTrain } from "../../../../logic/getCandidateTrains";
import stationList from "../../../../data/stationList.json";

export interface SectionRecommendedSubsectionProps {
  mappedResult?: any;
  candidateTrains?: CandidateTrain[];
  nextRoutePath?: string;
  sessionStorageKey?: string;
}

function formatDate(dateTimeStr?: string): string {
  if (!dateTimeStr) return "";
  const dateObj = new Date(dateTimeStr);
  if (isNaN(dateObj.getTime())) {
    const parts = dateTimeStr.split(/[-T ]/);
    if (parts.length >= 3) {
      return `${parseInt(parts[1], 10)}월 ${parseInt(parts[2], 10)}일`;
    }
    return dateTimeStr;
  }
  return `${dateObj.getMonth() + 1}월 ${dateObj.getDate()}일`;
}

function formatTime(dateTimeStr?: string, suffix: "출발" | "도착" = "출발"): string {
  if (!dateTimeStr) return "";
  const dateObj = new Date(dateTimeStr);
  if (isNaN(dateObj.getTime())) return dateTimeStr;
  let hours = dateObj.getHours();
  const minutes = dateObj.getMinutes();
  const period = hours >= 12 ? "오후" : "오전";
  hours = hours % 12 || 12;
  const mm = minutes < 10 ? `0${minutes}` : `${minutes}`;
  const hh = hours < 10 ? `0${hours}` : `${hours}`;
  return `${period} ${hh}:${mm} ${suffix}`;
}

export const SectionRecommendedSubsection = ({
  mappedResult,
  candidateTrains = [],
  nextRoutePath = "/06_rail_confirm",
  sessionStorageKey = "railBookingDraft",
}: SectionRecommendedSubsectionProps): JSX.Element => {
  const navigate = useNavigate();
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);

  const originStationId = mappedResult?.origin?.stationId;
  const matchedOriginStation = stationList.find(
    (st: any) => st.stationId === originStationId
  );
  let rawOriginName =
    matchedOriginStation?.displayName ||
    mappedResult?.origin?.originText ||
    "부산신항";
  if (rawOriginName && !rawOriginName.endsWith("역")) {
    rawOriginName += "역";
  }
  const originName = rawOriginName;

  const targetStationId = mappedResult?.finalDestination?.mappedStationId;
  const matchedStation = stationList.find(
    (st: any) => st.stationId === targetStationId
  );
  let rawDestName =
    matchedStation?.displayName ||
    mappedResult?.finalDestination?.destinationText ||
    "오봉";
  if (rawDestName && !rawDestName.endsWith("역")) {
    rawDestName += "역";
  }
  const destStationName = rawDestName;

  const routeHeader = `${originName} → ${destStationName}`;

  const handleSelectTrain = (slotId: string) => {
    setSelectedTrainId(slotId);
    const newDraft = {
      mappedResult,
      candidateTrains,
      selectedSlotId: slotId,
    };
    try {
      window.sessionStorage.setItem(sessionStorageKey, JSON.stringify(newDraft));
    } catch (e) {
      console.error("Failed to save to sessionStorage:", e);
    }
    navigate(nextRoutePath, { state: newDraft });
  };

  return (
    <section
      aria-labelledby="recommended-trains-title"
      className="flex w-full flex-1 flex-col items-start justify-center py-8"
    >
      <div className="flex w-full flex-1 flex-col">
        <header className="flex flex-col gap-1">
          <h2
            id="recommended-trains-title"
            className="text-[28px] font-extrabold leading-[35px] tracking-[0] text-[#0b1c30] [font-family:'Noto_Sans_KR',Helvetica]"
          >
            AI가 내 화물에 맞는 공동배차를 찾았어요.
          </h2>
          <p className="text-base font-normal leading-5 tracking-[0] text-[#424751] [font-family:'Noto_Sans_KR',Helvetica]">
            입력한 운송 조건을 바탕으로 이용 가능한 최적의 열차를 추천해드려요.
          </p>
        </header>
        <div className="w-full pt-6">
          <div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-3">
            {candidateTrains.map((train) => {
              const isConfirmed = train.poolStatus === "CONFIRMED";
              const isHighlighted = isConfirmed;

              let badgeText = "모집중";
              let badgeClassName = "bg-amber-50 text-amber-700 hover:bg-amber-50";
              let badgeIcon = <Star className="h-3.5 w-3.5" />;

              if (isConfirmed) {
                badgeText = "배차 확정";
                badgeClassName = "bg-blue-50 text-blue-700 hover:bg-blue-50";
                badgeIcon = <Check className="h-3.5 w-3.5" />;
              } else if (train.isFastest) {
                badgeText = "가장 빠름";
                badgeClassName = "bg-[#005bac] text-white hover:bg-[#005bac]";
                badgeIcon = <Zap className="h-3.5 w-3.5" />;
              }

              const isSelected = selectedTrainId === train.slotId;

              const departureDateText = formatDate(train.departureDateTime);
              const arrivalDateText = formatDate(train.arrivalDateTime);
              const departureTimeText = formatTime(train.departureDateTime, "출발");
              const arrivalTimeText = formatTime(train.arrivalDateTime, "도착");

              const cbm = train.currentCBM ?? 37.5;
              const loadPercentage = Math.min(
                100,
                Math.max(0, Math.round((cbm / 60) * 100 * 10) / 10)
              );
              const loadedText = `${loadPercentage.toFixed(1)}% 적재됨`;
              const loadedAmount = `${cbm.toFixed(1)} / 60 CBM`;
              const companies = `${train.participantCount ?? 1}개사`;
              const remainingCapacity = `${Math.max(0, 60 - cbm).toFixed(1)} CBM`;

              return (
                <div key={train.slotId} className="relative flex flex-col">
                  {/* Glowing background pulse layer for highlighted card */}
                  {isHighlighted && (
                    <div
                      aria-hidden="true"
                      className="pointer-events-none absolute -inset-1.5 rounded-[28px] bg-gradient-to-r from-blue-600 via-sky-500 to-indigo-600 opacity-60 blur-xl animate-pulse"
                    />
                  )}

                  <Card
                    className={`relative flex min-h-[536px] w-full flex-col rounded-3xl bg-white p-8 transition-all duration-300 ${
                      isHighlighted
                        ? "border-[3px] border-[#005bac] shadow-[0_0_24px_rgba(37,99,235,0.35)] scale-[1.03] z-10"
                        : "border border-[#c2c6d3] shadow-[0px_1px_2px_#0000000d]"
                    }`}
                  >
                    <CardHeader className="p-0 pb-10">
                      <div className="flex items-center justify-between gap-4">
                        <Badge
                          className={`rounded-md px-4 py-1.5 text-[13px] font-bold leading-5 tracking-[0] [font-family:'Noto_Sans_KR',Helvetica] ${badgeClassName}`}
                        >
                          <span className="flex items-center gap-1.5">
                            {badgeIcon}
                            <span>{badgeText}</span>
                          </span>
                        </Badge>
                        <p className="whitespace-nowrap text-base font-medium leading-5 tracking-[0] text-[#0b1c30] [font-family:'Noto_Sans_KR',Helvetica]">
                          {routeHeader}
                        </p>
                      </div>
                    </CardHeader>
                    <CardContent className="flex flex-1 flex-col p-0">
                      <div className="pb-4">
                        <div className="flex flex-col gap-6">
                          <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                            <p className="text-3xl font-extrabold leading-5 tracking-[0] text-[#005bac] [font-family:'Noto_Sans_KR',Helvetica]">
                              {departureDateText}
                            </p>
                            <span
                              aria-hidden="true"
                              className="px-3 text-3xl font-bold leading-5 tracking-[0] text-[#005bac]"
                            >
                              →
                            </span>
                            <p className="whitespace-nowrap text-right text-3xl font-extrabold leading-5 tracking-[0] text-[#005bac] [font-family:'Noto_Sans_KR',Helvetica]">
                              {arrivalDateText}
                            </p>
                          </div>
                          <div className="flex items-center justify-between gap-4">
                            <p className="text-[15px] font-normal leading-5 tracking-[0] text-[#424751] [font-family:'Noto_Sans_KR',Helvetica]">
                              {departureTimeText}
                            </p>
                            <p className="whitespace-nowrap text-right text-[15px] font-normal leading-5 tracking-[0] text-[#424751] [font-family:'Noto_Sans_KR',Helvetica]">
                              {arrivalTimeText}
                            </p>
                          </div>
                        </div>
                      </div>
                      <div className="py-8">
                        <div className="flex flex-col gap-2">
                          <div className="flex items-end justify-between">
                            <p className="text-sm font-extrabold leading-5 tracking-[0] text-[#005bac] [font-family:'Noto_Sans_KR',Helvetica]">
                              {loadedText}
                            </p>
                            <p className="pb-0.5 text-[11px] font-medium leading-5 tracking-[0] text-[#005bac] [font-family:'Noto_Sans_KR',Helvetica]">
                              배차 확정선
                            </p>
                          </div>
                          <div
                            aria-label={`${loadedText}, 배차 확정선 75%`}
                            aria-valuemax={100}
                            aria-valuemin={0}
                            aria-valuenow={loadPercentage}
                            className="grid h-4 items-center"
                            role="progressbar"
                          >
                            <div className="col-start-1 row-start-1 h-2 rounded bg-slate-200" />
                            <div
                              className="col-start-1 row-start-1 h-2 rounded bg-[#005bac]"
                              style={{ width: `${loadPercentage}%` }}
                            />
                            <div
                              className="col-start-1 row-start-1 h-4 w-0 border-l-2 border-[#005bac]"
                              style={{ marginLeft: "75%" }}
                            />
                          </div>
                        </div>
                      </div>
                      <dl className="mt-auto grid grid-cols-3 gap-2 border-t border-[#c2c6d3] pt-6">
                        <div className="flex flex-col gap-1">
                          <dt className="text-xs font-normal leading-5 tracking-[0] text-[#424751] [font-family:'Noto_Sans_KR',Helvetica]">
                            현재 적재량
                          </dt>
                          <dd className="text-sm font-extrabold leading-5 tracking-[0] text-[#0b1c30] [font-family:'Noto_Sans_KR',Helvetica]">
                            {loadedAmount}
                          </dd>
                        </div>
                        <div className="flex flex-col items-center gap-1">
                          <dt className="text-center text-xs font-normal leading-5 tracking-[0] text-[#424751] [font-family:'Noto_Sans_KR',Helvetica]">
                            참여 업체
                          </dt>
                          <dd className="text-center text-sm font-bold leading-5 tracking-[0] text-[#0b1c30] [font-family:'Noto_Sans_KR',Helvetica]">
                            {companies}
                          </dd>
                        </div>
                        <div className="flex flex-col items-end gap-1">
                          <dt className="whitespace-nowrap text-right text-xs font-normal leading-5 tracking-[0] text-[#424751] [font-family:'Noto_Sans_KR',Helvetica]">
                            잔여 용량
                          </dt>
                          <dd className="whitespace-nowrap text-right text-sm font-extrabold leading-5 tracking-[0] text-[#ba1a1a] [font-family:'Noto_Sans_KR',Helvetica]">
                            {remainingCapacity}
                          </dd>
                        </div>
                      </dl>
                    </CardContent>
                    <CardFooter className="p-0 pt-8">
                      <Button
                        aria-pressed={isSelected}
                        className="h-auto w-full rounded-[20px] border-2 border-[#005bac] bg-white px-4 py-4 text-[17px] font-extrabold leading-5 tracking-[0] text-[#005bac] shadow-none hover:bg-[#f0f7fc] [font-family:'Noto_Sans_KR',Helvetica]"
                        variant="outline"
                        onClick={() => handleSelectTrain(train.slotId)}
                      >
                        이 열차 선택
                      </Button>
                    </CardFooter>
                  </Card>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

