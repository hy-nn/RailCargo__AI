import { Link } from "react-router-dom";
import { TopNavigation } from "../../components/layout/TopNavigation";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";

const loadMetrics = [
  {
    label: "참여 전",
    value: "46.2 CBM · 16,000kg",
    percent: 77,
    barClassName: "bg-[#f59e0b]",
    labelClassName: "text-[#424751]",
  },
  {
    label: "참여 후 (내 화물 포함)",
    value: "54.7 CBM · 19,000kg",
    percent: 91,
    barClassName: "bg-[#005bac]",
    labelClassName: "text-[#005bac]",
  },
];

const fareBreakdown = [
  { label: "철도 운임", value: "₩45,560" },
  { label: "CFS 비용", value: "₩50,000" },
  { label: "혼재 수수료", value: "₩50,000" },
  { label: "오봉역→군포 라스트마일", value: "₩80,000" },
];

export const RailRoadBookingConfirm = (): JSX.Element => {
  return (
    <main className="min-h-screen w-full bg-[#f5f6f8]">
      <TopNavigation activeTabLabel="철도+도로운송" />
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 py-8">
        <section className="space-y-2">
          <Link
            to="/08_road_recommend"
            className="inline-block text-[15px] font-extrabold text-[#005bac] hover:text-[#005bac]"
          >
            ‹ 뒤로가기
          </Link>
          <h1 className="text-[34px] font-extrabold leading-[1.25] tracking-[-0.02em] text-[#0b1c30]">
            선택한 연계운송 정보를 확인해보세요.
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
                  부산신항 → 오봉
                </dd>
                <dd className="mt-1 text-[13px] font-bold text-[#7b8696]">
                  #KR-3002 · 8월 22일(토)
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  출발 예정일
                </dt>
                <dd className="mt-1 text-[24px] font-extrabold text-[#0b1c30]">
                  8월 22일 (토)
                </dd>
                <dd className="mt-1 text-[13px] font-bold text-[#7b8696]">
                  오전 05:11 출발
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  도착 예정일
                </dt>
                <dd className="mt-1 text-[24px] font-extrabold text-[#0b1c30]">
                  8월 22일 (토)
                </dd>
                <dd className="mt-1 text-[13px] font-bold text-[#7b8696]">
                  오전 11:11 도착
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  화물 규격
                </dt>
                <dd className="mt-1 whitespace-nowrap text-[22px] font-extrabold text-[#0b1c30]">
                  8.5 CBM / 3,000kg
                </dd>
              </div>
            </dl>

            <div className="flex min-w-[170px] flex-col items-center justify-center rounded-xl bg-[#fff1f3] px-5 py-3">
              <Badge className="rounded-md border-0 bg-[#ffe4e6] px-3 py-1 text-[13px] font-extrabold text-[#dc2626]">
                ⏱ 모집 중
              </Badge>
              <p className="mt-2 text-[13px] font-extrabold text-[#dc2626]">
                확정까지 4일 남음
              </p>
            </div>
          </CardContent>
        </Card>

        <section className="rounded-xl border border-[#d5e3ff] bg-[#eff4ff] px-6 py-3">
          <p className="text-[15px] font-bold leading-6 text-[#004482]">
            ✨ AI 추천을 통해 선정한 운송 일정과 적재 현황, 예상 운임을 한눈에
            확인할 수 있어요.
          </p>
        </section>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
            <CardContent className="space-y-6 p-6">
              <h2 className="text-[24px] font-extrabold text-[#0b1c30]">
                🚛 공동 적재 현황
              </h2>

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
                    0 CBM
                  </p>
                  <p className="mt-1 text-[13px] font-extrabold text-[#1e8a1e]">
                    확정 조건 충족
                  </p>
                </div>
                <div className="rounded-xl bg-[#f7f9fc] p-4 text-center">
                  <p className="text-[13px] font-bold text-[#5f6875]">
                    추가 적재 가능량
                  </p>
                  <p className="mt-1 text-[30px] font-extrabold leading-none text-[#0b1c30]">
                    14.0 CBM
                  </p>
                </div>
              </div>

              <div className="rounded-xl bg-[#eefaf0] px-4 py-3">
                <p className="text-[15px] font-black text-[#1e8a1e]">
                  ✓ 트럭 대비 약 242.59KG 탄소 절감 예상
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
            <CardContent className="space-y-6 p-6">
              <h2 className="text-[24px] font-extrabold text-[#0b1c30]">
                💳 운임 내역
              </h2>

              <dl className="space-y-4">
                {fareBreakdown.map((item) => (
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

              <div className="border-t border-[#dbe0ea] pt-5">
                <div className="flex items-end justify-between">
                  <p className="pb-1 text-[16px] font-extrabold text-[#0b1c30]">
                    예상 총 운임
                  </p>
                  <div className="text-right">
                    <p className="text-[42px] font-extrabold leading-none text-[#005bac]">
                      ₩225,560
                    </p>
                    <p className="mt-1 text-[13px] font-bold text-[#727783]">
                      (VAT 별도)
                    </p>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-[#d5e3ff] bg-[#eff4ff] px-4 py-3">
                <p className="text-[14px] font-bold text-[#004482]">
                  ⓘ 현재 공동배차 현황을 반영한 예상 운임이에요.
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-[#f8f9ff] shadow-none">
          <CardContent className="flex flex-col gap-5 p-5 lg:flex-row lg:items-center lg:justify-between">
            <div>
              <h3 className="text-[16px] font-extrabold text-[#0b1c30]">
                ⓘ 예약 전 확인해주세요
              </h3>
              <p className="mt-1 text-[14px] font-bold leading-6 text-[#424751]">
                예약 확정 후 취소 시 취소 수수료가 발생할 수 있어요. 실제 운송은
                열차 출발 시간에 맞춰 진행돼요.
              </p>
            </div>
            <div className="flex flex-wrap items-center justify-end gap-3">
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
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
