import { Check, Pencil, Sparkles, Star, Zap } from "lucide-react";
import { TopNavigation } from "../../components/layout/TopNavigation";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "../../components/ui/card";

const transportDetails = [
  {
    label: "운송 경로",
    values: ["오봉", "부산신항"],
    isRoute: true,
  },
  {
    label: "화물 규격",
    values: ["11 CBM / 2,000kg"],
    isRoute: false,
  },
  {
    label: "희망 도착일",
    values: ["8월 21일"],
    isRoute: false,
  },
];

const recommendedTrains = [
  {
    id: "train-a",
    badge: "가장 빠름",
    badgeClassName: "bg-[#005bac] text-white hover:bg-[#005bac]",
    borderClassName: "border-[#c2c6d3]",
    departureDate: "8월 20일",
    arrivalDate: "8월 20일",
    departureTime: "오전 04:26 출발",
    arrivalTime: "오전 10:03 도착",
    loadPercentage: 34,
    loadedText: "34% 적재됨",
    loadedAmount: "20.4 / 60 CBM",
    companies: "3개사",
    remainingCapacity: "39.6 CBM",
  },
  {
    id: "train-b",
    badge: "추천 최적",
    badgeClassName: "bg-[#f0f9f0] text-[#1e8a1e] hover:bg-[#f0f9f0]",
    borderClassName: "border-[#c2c6d3]",
    departureDate: "8월 20일",
    arrivalDate: "8월 20일",
    departureTime: "오후 06:48 출발",
    arrivalTime: "오후 11:53 도착",
    loadPercentage: 57.3,
    loadedText: "57.3% 적재됨",
    loadedAmount: "34.4 / 60 CBM",
    companies: "2개사",
    remainingCapacity: "25.6 CBM",
  },
  {
    id: "train-c",
    badge: "배차 확정",
    badgeClassName: "bg-blue-50 text-blue-700 hover:bg-blue-50",
    borderClassName: "border-[#00448233]",
    departureDate: "8월 21일",
    arrivalDate: "8월 21일",
    departureTime: "오후 03:13 출발",
    arrivalTime: "오후 08:11 도착",
    loadPercentage: 78.3,
    loadedText: "78.3% 적재됨",
    loadedAmount: "47 / 60 CBM",
    companies: "2개사",
    remainingCapacity: "13 CBM",
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

export const RailForwardingRecommended = (): JSX.Element => {
  return (
    <main
      className="flex w-full flex-col items-center bg-[#f5f6f8] px-5"
      data-model-id="11:1"
    >
      <TopNavigation activeTabLabel="철도+포워딩 운송" />
      <div className="flex w-full max-w-[1240px] flex-col px-6">
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
            <p className="mt-2 flex self-stretch [font-family:'Noto_Sans_KR',Helvetica] text-[17px] font-bold leading-5 tracking-[0] text-[#424751]">
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
                      <dt className="mt-[-1px] whitespace-nowrap [font-family:'Noto_Sans_KR',Helvetica] text-sm font-bold leading-5 tracking-[0] text-[#424751]">
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
                  className="h-auto rounded-[20px] bg-[#005bac] px-7 py-3.5 [font-family:'Noto_Sans_KR',Helvetica] text-[17px] font-bold leading-5 tracking-[0] text-white shadow-[0px_1px_2px_#0000000d] hover:bg-[#005bac]"
                >
                  <Pencil className="mr-2 h-4 w-4" />
                  조건 수정
                </Button>
              </div>
              <aside className="flex w-full items-center gap-4 rounded-[20px] border border-blue-100 bg-white px-6 py-4">
                <Sparkles className="h-5 w-5 shrink-0 text-[#005bac]" />
                <p className="mt-[-1px] whitespace-nowrap [font-family:'Noto_Sans_KR',Helvetica] text-base font-bold leading-5 tracking-[0] text-[#004482]">
                  출발지와 가장 가까운 화물취급역을 찾아 오봉역으로
                  연결해드렸어요. (군포 창고 → 오봉역)
                </p>
              </aside>
            </CardContent>
          </Card>
        </section>

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
                입력한 운송 조건을 바탕으로 이용 가능한 최적의 열차를
                추천해드려요.
              </p>
            </header>
            <div className="w-full pt-6">
              <div className="grid w-full grid-cols-1 gap-8 xl:grid-cols-3">
                {recommendedTrains.map((train) => (
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
                          오봉 → 부산신항
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
                        className="h-auto w-full rounded-[20px] border-2 border-[#005bac] bg-white px-4 py-4 text-[17px] font-extrabold leading-5 tracking-[0] text-[#005bac] shadow-none hover:bg-[#f0f7fc] [font-family:'Noto_Sans_KR',Helvetica]"
                        type="button"
                        variant="outline"
                      >
                        이 열차 선택
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
};
