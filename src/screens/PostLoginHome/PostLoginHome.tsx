import { TopNavigation } from "../../components/layout/TopNavigation";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const deadlineDispatches = [
  {
    status: "배차 확정",
    statusClassName: "bg-[#e8f1ff] text-[#005bac]",
    dispatchId: "#KR-3802",
    route: "부산신항 → 오봉",
    loadRate: 75,
    guide: "바로 확정 가능",
    guideClassName: "text-[#005bac]",
  },
  {
    status: "배차 확정",
    statusClassName: "bg-[#e8f1ff] text-[#005bac]",
    dispatchId: "#KR-3192",
    route: "동해 → 대전조차장",
    loadRate: 82,
    guide: "바로 확정 가능",
    guideClassName: "text-[#005bac]",
  },
  {
    status: "마감 임박",
    statusClassName: "bg-[#ffe3e3] text-[#d61f1f]",
    dispatchId: "#KR-3811",
    route: "오봉 → 부산신항",
    loadRate: 57,
    guide: "10 CBM만 더 모이면 확정",
    guideClassName: "text-[#c05700]",
  },
  {
    status: "모집 중",
    statusClassName: "bg-[#fff1df] text-[#d97706]",
    dispatchId: "#KR-3072",
    route: "신광양 → 오봉",
    loadRate: 35,
    guide: "24 CBM만 더 모이면 확정",
    guideClassName: "text-[#4a5160]",
  },
  {
    status: "모집 중",
    statusClassName: "bg-[#fff1df] text-[#d97706]",
    dispatchId: "#KR-3435",
    route: "천안 → 광양항",
    loadRate: 24,
    guide: "30 CBM만 더 모이면 확정",
    guideClassName: "text-[#4a5160]",
  },
];

const participatedDispatches = [
  {
    route: "부산신항 → 오봉",
    dispatchId: "#KR-3802",
    departureDate: "8/18(월)",
    loadRate: 75,
    status: "배차 확정",
    statusClassName: "bg-[#e8f1ff] text-[#005bac]",
  },
  {
    route: "오봉 → 부산신항",
    dispatchId: "#KR-3811",
    departureDate: "8/20(목)",
    loadRate: 57,
    status: "마감 임박",
    statusClassName: "bg-[#ffe3e3] text-[#d61f1f]",
  },
  {
    route: "신광양 → 오봉",
    dispatchId: "#KR-3072",
    departureDate: "8/23(토)",
    loadRate: 35,
    status: "모집 중",
    statusClassName: "bg-[#fff1df] text-[#d97706]",
  },
];

export const PostLoginHome = (): JSX.Element => {
  return (
    <main className="min-h-screen w-full bg-[#f5f6f8]">
      <TopNavigation activeTabLabel="홈" />
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 py-8">
        <section className="space-y-2">
          <h1 className="text-[38px] font-extrabold leading-[1.3] tracking-[-0.02em] text-[#0b1c30]">
            AI로 내 화물에 맞는 최적의 운송을 찾아보세요
          </h1>
          <p className="text-[18px] font-bold leading-[1.6] text-[#424751]">
            마감 임박 공동배차를 확인하고, 내 운송 조건에 맞는 배차에 간편하게
            참여해보세요.
          </p>
        </section>

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

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {deadlineDispatches.map((dispatch) => (
              <Card
                key={dispatch.dispatchId}
                className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]"
              >
                <CardContent className="flex h-full flex-col gap-4 p-4">
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

                  <p className="text-[20px] font-extrabold text-[#0b1c30]">
                    {dispatch.route}
                  </p>

                  <div className="space-y-2">
                    <div className="flex items-end justify-between">
                      <span className="text-[14px] font-bold text-[#424751]">
                        현재 적재율
                      </span>
                      <span className="text-[16px] font-extrabold text-[#005bac]">
                        {dispatch.loadRate}%
                      </span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-[#e5eeff]">
                      <div
                        className="h-full rounded-full bg-[#005bac]"
                        style={{ width: `${dispatch.loadRate}%` }}
                      />
                    </div>
                  </div>

                  <p
                    className={`text-[14px] font-extrabold ${dispatch.guideClassName}`}
                  >
                    {dispatch.guide}
                  </p>

                  <Button
                    type="button"
                    variant="link"
                    className="h-auto justify-start p-0 text-[15px] font-extrabold text-[#1f2937] hover:text-[#1f2937]"
                  >
                    상세보기 →
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <CardContent className="p-0">
            <section>
              <header className="flex items-center justify-between border-b border-[#e5eaf1] px-6 py-5">
                <h2 className="text-[26px] font-extrabold text-[#0b1c30]">
                  📋 참여 중인 공동배차
                </h2>
                <Button
                  type="button"
                  variant="link"
                  className="h-auto p-0 text-[16px] font-extrabold text-[#1f2937] hover:text-[#1f2937]"
                >
                  전체 보기 &gt;
                </Button>
              </header>

              <div className="px-6 py-3">
                {participatedDispatches.map((dispatch, index) => (
                  <article
                    key={`${dispatch.route}-${dispatch.departureDate}`}
                    className={`grid grid-cols-1 gap-4 py-4 lg:grid-cols-[2.5fr_1.2fr_2fr_1.2fr_auto] lg:items-center ${index > 0 ? "border-t border-[#edf1f6]" : ""}`}
                  >
                    <div>
                      <p className="text-[20px] font-extrabold text-[#0b1c30]">
                        {dispatch.route}
                      </p>
                      <p className="mt-1 text-[14px] font-extrabold text-[#2e3440]">
                        {dispatch.dispatchId}
                      </p>
                    </div>

                    <div>
                      <p className="text-[13px] font-bold text-[#5f6875]">
                        출발일
                      </p>
                      <p className="text-[17px] font-extrabold text-[#0b1c30]">
                        {dispatch.departureDate}
                      </p>
                    </div>

                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between">
                        <p className="text-[13px] font-bold text-[#5f6875]">
                          현재 적재율
                        </p>
                        <p className="text-[16px] font-extrabold text-[#0b1c30]">
                          {dispatch.loadRate}%
                        </p>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-[#e5eeff]">
                        <div
                          className="h-full rounded-full bg-[#001d36]"
                          style={{ width: `${dispatch.loadRate}%` }}
                        />
                      </div>
                    </div>

                    <div>
                      <p className="text-[13px] font-bold text-[#5f6875]">
                        상태
                      </p>
                      <Badge
                        className={`mt-1 rounded-md border-0 px-2.5 py-1 text-[12px] font-extrabold ${dispatch.statusClassName}`}
                      >
                        {dispatch.status}
                      </Badge>
                    </div>

                    <Button
                      type="button"
                      variant="link"
                      className="h-auto p-0 text-[15px] font-extrabold text-[#1f2937] hover:text-[#1f2937]"
                    >
                      상세보기 →
                    </Button>
                  </article>
                ))}
              </div>
            </section>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <CardContent className="px-6 py-5">
            <p className="text-[15px] font-bold leading-[1.7] text-[#424751]">
              공동배차는 필요 적재량이 충족된 후 확정되며, 출발 5일 전까지
              예약해야 안정적인 운송 계획을 세울 수 있습니다.
            </p>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
