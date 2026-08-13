import { Link } from "react-router-dom";
import { Ship } from "lucide-react";
import { TopNavigation } from "../../components/layout/TopNavigation";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const loadMetrics = [
  {
    label: "참여 전",
    value: "34.4 CBM · 2,650kg",
    percent: 57.3,
    barClassName: "bg-[#ff8a5b]",
    labelClassName: "text-[#424751]",
  },
  {
    label: "참여 후 (내 화물 포함)",
    value: "45.4 CBM · 4,650kg",
    percent: 75.7,
    barClassName: "bg-[#005bac]",
    labelClassName: "text-[#005bac]",
  },
];

const domesticFareBreakdown = [
  { label: "철도 운임", value: "₩58,960" },
  { label: "CFS 비용", value: "₩50,000" },
  { label: "혼재 수수료", value: "₩50,000" },
];

const forwardingSteps = [
  {
    icon: "📦",
    title: "CFS 환적",
    subtitle: "부산신항 CFS",
  },
  {
    icon: "🚢",
    title: "해상운송",
    subtitle: "전 세계 항로",
  },
  {
    icon: "🏁",
    title: "최종 목적지",
    subtitle: "Door Delivery",
  },
];

export const RailForwardingBookingConfirm = (): JSX.Element => {
  return (
    <main className="min-h-screen w-full bg-[#f5f6f8]">
      <TopNavigation activeTabLabel="철도+포워딩 운송" />
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 py-8">
        <section className="space-y-2">
          <Link
            to="/11_forwarding_recommend"
            className="inline-block text-[15px] font-extrabold text-[#005bac] hover:text-[#005bac]"
          >
            ‹ 뒤로가기
          </Link>
          <h1 className="text-[34px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#0b1c30]">
            선택한 열차와 운송 정보를 확인해보세요.
          </h1>
          <p className="text-[17px] font-bold leading-[1.6] text-[#424751]">
            운송 일정과 예상 운임을 확인한 후 예약을 확정해주세요.
          </p>
        </section>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
            <dl className="grid flex-1 grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4 xl:gap-8">
              <div>
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  운송 경로
                </dt>
                <dd className="mt-1 text-[24px] font-extrabold text-[#0b1c30]">
                  오봉 → 부산신항
                </dd>
                <dd className="mt-1 text-[13px] font-bold text-[#7b8696]">
                  #KR-3007 · 8월 20일(목)
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  출발 예정일
                </dt>
                <dd className="mt-1 text-[24px] font-extrabold text-[#0b1c30]">
                  8월 20일 (목)
                </dd>
                <dd className="mt-1 text-[13px] font-bold text-[#7b8696]">
                  오후 06:48 출발
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  도착 예정일
                </dt>
                <dd className="mt-1 text-[24px] font-extrabold text-[#0b1c30]">
                  8월 20일 (목)
                </dd>
                <dd className="mt-1 text-[13px] font-bold text-[#7b8696]">
                  오후 11:53 도착
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  화물 규격
                </dt>
                <dd className="mt-1 whitespace-nowrap text-[22px] font-extrabold text-[#0b1c30]">
                  11 CBM / 2,000kg
                </dd>
              </div>
            </dl>

            <div className="flex min-w-[170px] flex-col items-center justify-center rounded-xl bg-[#fff1f3] px-5 py-3">
              <Badge className="rounded-md border-0 bg-[#ffe4e6] px-3 py-1 text-[13px] font-extrabold text-[#dc2626]">
                ⏱ 모집 중
              </Badge>
              <p className="mt-2 text-[13px] font-extrabold text-[#dc2626]">
                확정까지 2일 남음
              </p>
            </div>
          </CardContent>
        </Card>

        <section className="rounded-xl border border-[#d5e3ff] bg-[#eff4ff] px-6 py-3">
          <p className="text-[15px] font-bold leading-6 text-[#004482]">
            ✨ AI 추천을 통해 최적의 철도+포워딩 운송을 한 번에 확인해보세요.
          </p>
        </section>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <CardContent className="space-y-6 p-6">
            <header className="flex items-center justify-between border-b border-[#dbe0ea] pb-4">
              <h2 className="text-[26px] font-extrabold text-[#0b1c30]">
                ① 국내운송·부산신항까지{" "}
                <span className="text-[20px] font-bold text-[#424751]">
                  (철도+도로)
                </span>
              </h2>
              <Badge className="rounded-full border border-[#b7e4b7] bg-[#f0f9f0] px-4 py-2 text-[14px] font-extrabold text-[#1e8a1e] hover:bg-[#f0f9f0]">
                ✓ 국내 구간 확정
              </Badge>
            </header>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-none">
                <CardContent className="space-y-6 p-6">
                  <h3 className="text-[24px] font-extrabold text-[#0b1c30]">
                    🚛 공동 적재 현황
                  </h3>

                  <div className="space-y-5">
                    {loadMetrics.map((metric) => (
                      <div key={metric.label} className="space-y-2">
                        <div className="flex items-end justify-between">
                          <span
                            className={`text-[15px] font-black ${metric.labelClassName}`}
                          >
                            {metric.label}
                          </span>
                          <strong className="text-[17px] font-extrabold text-[#0b1c30]">
                            {metric.value}
                          </strong>
                        </div>
                        <div className="h-2.5 w-full rounded-full bg-[#e5eeff]">
                          <div
                            className={`h-full rounded-full ${metric.barClassName}`}
                            style={{ width: `${metric.percent}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    <div className="rounded-xl bg-[#f7f9fc] p-4 text-center">
                      <p className="text-[13px] font-bold text-[#5f6875]">
                        확정까지 남은 양
                      </p>
                      <p className="mt-1 text-[30px] font-extrabold leading-none text-[#0b1c30]">
                        10.6 CBM
                      </p>
                    </div>
                    <div className="rounded-xl bg-[#f7f9fc] p-4 text-center">
                      <p className="text-[13px] font-bold text-[#5f6875]">
                        추가 적재 가능량
                      </p>
                      <p className="mt-1 text-[30px] font-extrabold leading-none text-[#0b1c30]">
                        25.6 CBM
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#eefaf0] px-4 py-3">
                    <p className="text-[15px] font-black text-[#1e8a1e]">
                      ✓ 트럭 대비 약 161.72KG 탄소 절감 예상
                    </p>
                  </div>
                </CardContent>
              </Card>

              <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-none">
                <CardContent className="space-y-6 p-6">
                  <h3 className="text-[24px] font-extrabold text-[#0b1c30]">
                    💳 운임 내역{" "}
                    <span className="text-[18px] font-bold text-[#424751]">
                      (국내구간)
                    </span>
                  </h3>

                  <dl className="space-y-4">
                    {domesticFareBreakdown.map((item) => (
                      <div
                        key={item.label}
                        className="flex items-center justify-between border-b border-[#e8edf5] pb-3 last:border-b-0 last:pb-0"
                      >
                        <dt className="text-[16px] font-bold text-[#424751]">
                          {item.label}
                        </dt>
                        <dd className="text-[18px] font-extrabold text-[#0b1c30]">
                          {item.value}
                        </dd>
                      </div>
                    ))}
                  </dl>

                  <div className="flex items-center justify-between border-t border-[#dbe0ea] pt-4">
                    <p className="text-[17px] font-extrabold text-[#0b1c30]">
                      국내 구간 합계
                    </p>
                    <p className="text-[24px] font-extrabold text-[#0b1c30]">
                      ₩158,960
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#d5e3ff] bg-[#eff4ff] px-5 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[22px] font-extrabold leading-none text-[#005bac]">
                        국내 구간 예상 합계
                      </p>
                      <p className="text-[22px] font-extrabold leading-none text-[#005bac]">
                        ₩158,960
                      </p>
                    </div>
                    <p className="mt-2 text-right text-[13px] font-bold text-[#727783]">
                      (VAT 별도)
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </CardContent>
        </Card>

        <section className="flex flex-col items-center py-1">
          <div className="h-8 border-l-2 border-dashed border-[#004482]" />
          <p className="py-1 text-[15px] font-extrabold text-[#004482]">
            부산신항 도착
          </p>
          <div className="h-8 border-l-2 border-dashed border-[#004482]" />
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#005bac]">
            <Ship className="h-5 w-5 text-white" />
          </div>
          <div className="h-8 border-l-2 border-dashed border-[#004482]" />
        </section>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <CardContent className="space-y-6 p-6">
            <header className="border-b border-[#dbe0ea] pb-4">
              <h2 className="text-[26px] font-extrabold text-[#0b1c30]">
                ② 국제운송·부산신항 이후{" "}
                <span className="text-[20px] font-bold text-[#424751]">
                  (포워딩)
                </span>
              </h2>
            </header>

            <div className="grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
              {forwardingSteps.map((step, index) => (
                <div key={step.title} className="contents">
                  <Card className="rounded-2xl border border-[#d4dbe6] bg-[#f8f9ff] shadow-none">
                    <CardContent className="flex min-h-[140px] flex-col items-center justify-center p-6 text-center">
                      <span className="text-[28px]">{step.icon}</span>
                      <h3 className="mt-2 text-[20px] font-extrabold text-[#005bac]">
                        {step.title}
                      </h3>
                      <p className="mt-1 text-[14px] font-bold text-[#424751]">
                        {step.subtitle}
                      </p>
                    </CardContent>
                  </Card>
                  {index < forwardingSteps.length - 1 && (
                    <div className="hidden items-center justify-center text-[30px] font-extrabold text-[#7b8696] lg:flex">
                      →
                    </div>
                  )}
                </div>
              ))}
            </div>

            <section className="rounded-2xl border border-[#d5e3ff] bg-[#eff4ff] px-6 py-5">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-[20px] font-extrabold text-[#004482]">
                    부산신항 이후, 국제운송은 별도예요.
                  </h3>
                  <p className="mt-2 text-[15px] font-bold leading-7 text-[#424751]">
                    이 예약은 국내 구간(철도+도로) 요금만 포함합니다.
                    <br />
                    부산신항 도착 후 CFS 환적 및 국제운송은 글로비스 포워딩팀이
                    별도로 안내해 드립니다.
                  </p>
                </div>
                <div className="flex flex-col items-center gap-2">
                  <Button
                    type="button"
                    variant="outline"
                    className="h-11 rounded-xl border-[#005bac] bg-white px-5 text-[15px] font-extrabold text-[#005bac] hover:bg-white hover:text-[#005bac]"
                  >
                    글로비스 포워딩팀에 문의하기
                  </Button>
                  <p className="w-full text-center text-[13px] font-bold text-[#424751]">
                    담당자가 24시간 내 연락드립니다.
                  </p>
                </div>
              </div>
            </section>
          </CardContent>
        </Card>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-[#f8f9ff] shadow-none">
          <CardContent className="p-5">
            <h3 className="text-[16px] font-black text-[#0b1c30]">
              ⓘ 예약 전 확인해주세요
            </h3>
            <p className="mt-1 text-[14px] font-bold leading-6 text-[#424751]">
              예약 확정 후 취소 시 취소 수수료가 발생할 수 있어요. 실제 운송은
              열차 출발 시간에 맞춰 진행돼요.
            </p>
          </CardContent>
        </Card>

        <div className="flex flex-wrap items-center justify-end gap-3 pb-2">
          <Button
            type="button"
            variant="outline"
            className="h-11 rounded-xl border-[#005bac] bg-white px-5 text-[15px] font-extrabold text-[#005bac] hover:bg-white hover:text-[#005bac]"
          >
            운송 현황 보기
          </Button>
          <Button
            type="button"
            className="h-11 rounded-xl bg-[#005bac] px-6 text-[15px] font-extrabold text-white hover:bg-[#005bac]"
          >
            ✓ 공동배차 참여 및 예약 확정
          </Button>
        </div>
      </div>
    </main>
  );
};
