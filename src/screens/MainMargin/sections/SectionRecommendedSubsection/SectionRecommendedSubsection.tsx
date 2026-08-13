import { Check, Star, Zap } from "lucide-react";
import { useState } from "react";
import { Badge } from "../../../../components/ui/badge";
import { Button } from "../../../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../../../components/ui/card";

const recommendedTrains = [
  {
    id: "august-20",
    badge: "가장 빠름",
    badgeClassName: "bg-[#005bac] text-white hover:bg-[#005bac]",
    borderClassName: "border-[#c2c6d3]",
    departureDate: "8월 20일",
    arrivalDate: "8월 20일",
    departureTime: "오후 04:24 출발",
    arrivalTime: "오후 09:34 도착",
    loadPercentage: 62.5,
    loadedText: "62.5% 적재됨",
    loadedAmount: "37.5 / 60 CBM",
    companies: "3개사",
    remainingCapacity: "22.5 CBM",
  },
  {
    id: "august-21",
    badge: "추천 최적",
    badgeClassName: "bg-[#f0f9f0] text-[#1e8a1e] hover:bg-[#f0f9f0]",
    borderClassName: "border-[#c2c6d3]",
    departureDate: "8월 21일",
    arrivalDate: "8월 21일",
    departureTime: "오전 04:37 출발",
    arrivalTime: "오전 11:34 도착",
    loadPercentage: 68,
    loadedText: "68.0% 적재됨",
    loadedAmount: "40.8 / 60 CBM",
    companies: "4개사",
    remainingCapacity: "19.2 CBM",
  },
  {
    id: "august-22",
    badge: "배차 확정",
    badgeClassName: "bg-blue-50 text-blue-700 hover:bg-blue-50",
    borderClassName: "border-[#00448233]",
    departureDate: "8월 22일",
    arrivalDate: "8월 22일",
    departureTime: "오전 05:11 출발",
    arrivalTime: "오전 11:11 도착",
    loadPercentage: 77,
    loadedText: "77.0% 적재됨",
    loadedAmount: "46.2 / 60 CBM",
    companies: "5개사",
    remainingCapacity: "13.8 CBM",
  },
];

const getBadgeIcon = (badge: string): JSX.Element | null => {
  if (badge === "가장 빠름") {
    return <Zap className="h-3.5 w-3.5" />;
  }

  if (badge === "추천 최적") {
    return <Star className="h-3.5 w-3.5" />;
  }

  if (badge === "배차 확정") {
    return <Check className="h-3.5 w-3.5" />;
  }

  return null;
};

export const SectionRecommendedSubsection = (): JSX.Element => {
  const [selectedTrainId, setSelectedTrainId] = useState<string | null>(null);

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
            {recommendedTrains.map((train) => {
              const isSelected = selectedTrainId === train.id;

              return (
                <Card
                  key={train.id}
                  className={`flex min-h-[536px] flex-col rounded-3xl border bg-white p-8 shadow-[0px_1px_2px_#0000000d] ${train.borderClassName}`}
                >
                  <CardHeader className="p-0 pb-10">
                    <div className="flex items-center justify-between gap-4">
                      <Badge
                        className={`rounded-md px-4 py-1.5 text-[13px] font-bold leading-5 tracking-[0] [font-family:'Noto_Sans_KR',Helvetica] ${train.badgeClassName}`}
                      >
                        <span className="flex items-center gap-1.5">
                          {getBadgeIcon(train.badge)}
                          <span>{train.badge}</span>
                        </span>
                      </Badge>
                      <p className="whitespace-nowrap text-base font-medium leading-5 tracking-[0] text-[#0b1c30] [font-family:'Noto_Sans_KR',Helvetica]">
                        부산신항 → 오봉
                      </p>
                    </div>
                  </CardHeader>
                  <CardContent className="flex flex-1 flex-col p-0">
                    <div className="pb-4">
                      <div className="flex flex-col gap-6">
                        <div className="grid grid-cols-[1fr_auto_1fr] items-center">
                          <p className="text-3xl font-extrabold leading-5 tracking-[0] text-[#005bac] [font-family:'Noto_Sans_KR',Helvetica]">
                            {train.departureDate}
                          </p>
                          <span
                            aria-hidden="true"
                            className="px-3 text-3xl font-bold leading-5 tracking-[0] text-[#005bac]"
                          >
                            →
                          </span>
                          <p className="whitespace-nowrap text-right text-3xl font-extrabold leading-5 tracking-[0] text-[#005bac] [font-family:'Noto_Sans_KR',Helvetica]">
                            {train.arrivalDate}
                          </p>
                        </div>
                        <div className="flex items-center justify-between gap-4">
                          <p className="text-[15px] font-normal leading-5 tracking-[0] text-[#424751] [font-family:'Noto_Sans_KR',Helvetica]">
                            {train.departureTime}
                          </p>
                          <p className="whitespace-nowrap text-right text-[15px] font-normal leading-5 tracking-[0] text-[#424751] [font-family:'Noto_Sans_KR',Helvetica]">
                            {train.arrivalTime}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="py-8">
                      <div className="flex flex-col gap-2">
                        <div className="flex items-end justify-between">
                          <p className="text-sm font-extrabold leading-5 tracking-[0] text-[#005bac] [font-family:'Noto_Sans_KR',Helvetica]">
                            {train.loadedText}
                          </p>
                          <p className="pb-0.5 text-[11px] font-medium leading-5 tracking-[0] text-[#005bac] [font-family:'Noto_Sans_KR',Helvetica]">
                            배차 확정선
                          </p>
                        </div>
                        <div
                          aria-label={`${train.loadedText}, 배차 확정선 75%`}
                          aria-valuemax={100}
                          aria-valuemin={0}
                          aria-valuenow={train.loadPercentage}
                          className="grid h-4 items-center"
                          role="progressbar"
                        >
                          <div className="col-start-1 row-start-1 h-2 rounded bg-slate-200" />
                          <div
                            className="col-start-1 row-start-1 h-2 rounded bg-[#005bac]"
                            style={{ width: `${train.loadPercentage}%` }}
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
                          {train.loadedAmount}
                        </dd>
                      </div>
                      <div className="flex flex-col items-center gap-1">
                        <dt className="text-center text-xs font-normal leading-5 tracking-[0] text-[#424751] [font-family:'Noto_Sans_KR',Helvetica]">
                          참여 업체
                        </dt>
                        <dd className="text-center text-sm font-bold leading-5 tracking-[0] text-[#0b1c30] [font-family:'Noto_Sans_KR',Helvetica]">
                          {train.companies}
                        </dd>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <dt className="whitespace-nowrap text-right text-xs font-normal leading-5 tracking-[0] text-[#424751] [font-family:'Noto_Sans_KR',Helvetica]">
                          잔여 용량
                        </dt>
                        <dd className="whitespace-nowrap text-right text-sm font-extrabold leading-5 tracking-[0] text-[#ba1a1a] [font-family:'Noto_Sans_KR',Helvetica]">
                          {train.remainingCapacity}
                        </dd>
                      </div>
                    </dl>
                  </CardContent>
                  <CardFooter className="p-0 pt-8">
                    <Button
                      aria-pressed={isSelected}
                      className="h-auto w-full rounded-[20px] border-2 border-[#005bac] bg-white px-4 py-4 text-[17px] font-extrabold leading-5 tracking-[0] text-[#005bac] shadow-none hover:bg-[#f0f7fc] [font-family:'Noto_Sans_KR',Helvetica]"
                      variant="outline"
                      onClick={() => setSelectedTrainId(train.id)}
                    >
                      이 열차 선택
                    </Button>
                  </CardFooter>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
