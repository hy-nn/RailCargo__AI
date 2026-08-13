import { TopNavigation } from "../../components/layout/TopNavigation";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const recommendedKeywords = ["오봉행 화물", "청량 컨테이너", "긴급 배송"];

const imminentDispatches = [
  {
    status: "마감D-3",
    statusClassName: "bg-[#ffe3e3] text-[#d61f1f]",
    dispatchId: "#KR-3004",
    route: "부산신항 → 오봉",
    loadRate: 68,
    notice: "4.2 CBM만 더 모이면 배차 확정",
    noticeClassName: "text-[#d61f1f]",
    recruitment: "40.8 / 60 CBM",
    companies: "3개사",
  },
  {
    status: "배차확정",
    statusClassName: "bg-[#e8f1ff] text-[#005bac]",
    dispatchId: "#KR-3192",
    route: "동해 → 대전조차장",
    loadRate: 82,
    notice: "운송 진행 확정되었습니다.",
    noticeClassName: "text-[#005bac]",
    recruitment: "49.2 / 60 CBM",
    companies: "5개사",
  },
  {
    status: "모집시작",
    statusClassName: "bg-[#fff1df] text-[#d97706]",
    dispatchId: "#KR-3072",
    route: "신광양 → 오봉",
    loadRate: 35,
    notice: "D-12일 남음",
    noticeClassName: "text-[#6b7280]",
    recruitment: "21.0 / 60 CBM",
    companies: "1개사",
  },
];

const myDispatchSummary = [
  { label: "모집 중", value: "02" },
  { label: "배차 확정", value: "04" },
  { label: "운송 완료", value: "12" },
];

export const RailRoadNaturalInput = (): JSX.Element => {
  return (
    <main className="min-h-screen w-full bg-[#f5f6f8]">
      <TopNavigation activeTabLabel="철도+도로운송" />
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 py-8">
        <section className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
          <div className="space-y-2">
            <h1 className="whitespace-nowrap text-[33px] font-extrabold leading-[1.3] tracking-[-0.02em] text-[#0b1c30]">
              AI로 철도와 차량을 연결한 최적의 D2D 운송을 찾아보세요.
            </h1>
            <p className="text-[18px] font-bold leading-[1.6] text-[#424751]">
              철도 구간에 카카오 트러커를 연계하여 목적지 앞까지 한 번에 운송해
              드립니다.
            </p>
          </div>

          <Card className="w-full max-w-[330px] rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
            <CardContent className="flex items-center justify-between gap-3 p-5">
              <div>
                <p className="text-[13px] font-bold text-[#424751]">
                  이번 달 공동배차 절감
                </p>
                <p className="text-[30px] font-extrabold leading-none text-[#005bac]">
                  ₩1,240,000
                </p>
              </div>
              <Button
                type="button"
                variant="link"
                className="h-auto p-0 text-[14px] font-extrabold text-[#005bac] hover:text-[#005bac]"
              >
                리포트 확인 →
              </Button>
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <CardContent className="space-y-4 p-6">
            <h2 className="text-[24px] font-extrabold text-[#005bac]">
              ✨ AI로 운송 요청하기
            </h2>

            <form
              className="flex flex-col gap-3 lg:flex-row lg:items-center"
              onSubmit={(event) => event.preventDefault()}
            >
              <input
                type="text"
                className="h-12 w-full flex-1 rounded-xl border border-[#dbe0ea] bg-white px-4 text-[16px] font-semibold text-[#424751] outline-none placeholder:text-[#7b8696]"
                placeholder="예) 부산신항 화물을 대전까지 8월 22일까지 보내고 싶어요."
              />
              <Button
                type="submit"
                className="h-12 rounded-xl bg-[#005bac] px-6 text-[16px] font-extrabold text-white hover:bg-[#005bac]"
              >
                ✨ 공동배차 찾기
              </Button>
            </form>

            <p className="text-[14px] font-bold text-[#5f6875]">
              철도역을 입력하지 않아도 출발지와 목적지만 입력하면 AI가 가까운
              화물취급역을 찾아 연결합니다.
            </p>

            <div className="flex flex-wrap items-center gap-2">
              <span className="text-[14px] font-extrabold text-[#424751]">
                추천 검색어:
              </span>
              {recommendedKeywords.map((keyword) => (
                <Badge
                  key={keyword}
                  className="rounded-full border-0 bg-[#e8f1ff] px-3 py-1 text-[13px] font-extrabold text-[#005bac]"
                >
                  {keyword}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <CardContent className="px-6 py-4">
            <p className="text-[17px] font-extrabold leading-[1.6] text-[#0b1c30]">
              운송할 화물이 있으신가요? 현재 모집 중인 공동배차를 확인해보세요.
            </p>
          </CardContent>
        </Card>

        <section className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-[26px] font-extrabold text-[#0b1c30]">
              🕐 마감 임박 공동배차
            </h2>
            <Button
              type="button"
              variant="link"
              className="h-auto p-0 text-[16px] font-extrabold text-[#1f2937] hover:text-[#1f2937]"
            >
              전체 보기 &gt;
            </Button>
          </div>

          <div className="grid grid-cols-1 gap-4 xl:grid-cols-4">
            {imminentDispatches.map((dispatch) => (
              <Card
                key={dispatch.dispatchId}
                className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]"
              >
                <CardContent className="flex h-full flex-col gap-4 p-5">
                  <div className="flex items-center justify-between">
                    <Badge
                      className={`rounded-md border-0 px-2.5 py-1 text-[12px] font-extrabold ${dispatch.statusClassName}`}
                    >
                      {dispatch.status}
                    </Badge>
                    <span className="text-[14px] font-extrabold text-[#2e3440]">
                      {dispatch.dispatchId}
                    </span>
                  </div>

                  <div className="space-y-2">
                    <p className="text-[22px] font-extrabold text-[#0b1c30]">
                      {dispatch.route}
                    </p>
                    <Badge className="w-fit rounded-md border-0 bg-[#e8f7ee] px-2.5 py-1 text-[12px] font-extrabold text-[#1f8a4c]">
                      🚚 도착 후 트럭 연계 가능
                    </Badge>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-end justify-between">
                      <span className="text-[14px] font-bold text-[#424751]">
                        현재 적재율
                      </span>
                      <span className="text-[18px] font-extrabold text-[#005bac]">
                        {dispatch.loadRate}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[#e5eeff]">
                      <div
                        className="h-full rounded-full bg-[#005bac]"
                        style={{ width: `${dispatch.loadRate}%` }}
                      />
                    </div>
                    <p
                      className={`text-[13px] font-extrabold ${dispatch.noticeClassName}`}
                    >
                      {dispatch.notice}
                    </p>
                  </div>

                  <dl className="mt-auto grid grid-cols-2 gap-3 border-t border-[#edf1f6] pt-3">
                    <div>
                      <dt className="text-[12px] font-bold text-[#727783]">
                        모집 현황
                      </dt>
                      <dd className="text-[14px] font-extrabold text-[#0b1c30]">
                        {dispatch.recruitment}
                      </dd>
                    </div>
                    <div className="text-right">
                      <dt className="text-[12px] font-bold text-[#727783]">
                        참여 기업
                      </dt>
                      <dd className="text-[14px] font-extrabold text-[#0b1c30]">
                        {dispatch.companies}
                      </dd>
                    </div>
                  </dl>

                  <Button
                    type="button"
                    className="h-11 rounded-xl bg-[#005bac] text-[15px] font-extrabold text-white hover:bg-[#005bac]"
                  >
                    공동배차 참여
                  </Button>
                </CardContent>
              </Card>
            ))}

            <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
              <CardContent className="flex h-full flex-col p-5">
                <h3 className="text-[22px] font-extrabold text-[#0b1c30]">
                  내 공동배차
                </h3>
                <dl className="mt-5 flex flex-1 flex-col gap-5">
                  {myDispatchSummary.map((item) => (
                    <div
                      key={item.label}
                      className="flex items-center justify-between"
                    >
                      <dt className="text-[16px] font-bold text-[#0b1c30]">
                        {item.label}
                      </dt>
                      <dd className="text-[30px] font-extrabold leading-none text-[#0b1c30]">
                        {item.value}
                      </dd>
                    </div>
                  ))}
                </dl>
                <Button
                  type="button"
                  variant="link"
                  className="mt-5 h-auto justify-start border-t border-[#d4dbe6] p-0 pt-4 text-[15px] font-extrabold text-[#424751] hover:text-[#424751]"
                >
                  내역 전체보기
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </main>
  );
};
