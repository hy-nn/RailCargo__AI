import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AlertCircle, Globe, Ship, Train } from "lucide-react";
import { TopNavigation } from "../../components/layout/TopNavigation";
import { BookingConfirmModal } from "../../components/shared/BookingConfirmModal";
import { GlobisInquiryModal } from "../../components/shared/GlobisInquiryModal";
import { Badge } from "../../components/ui/badge";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import stationList from "../../data/stationList.json";
import tariffDb from "../../data/tariff_db.json";
import { calculateFare } from "../../logic/calculateFare";
import { calculatePoolingStatus } from "../../logic/calculatePoolingStatus";
import { finalizeBooking } from "../../logic/finalizeBooking";
import { CandidateTrain } from "../../logic/getCandidateTrains";
import { getForwardingCard } from "../../logic/getForwardingCard";

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

function formatWon(val?: number): string {
  if (val == null) return "₩0";
  return `₩${val.toLocaleString()}`;
}

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
  const location = useLocation();
  const navigate = useNavigate();

  const forwardingCard = getForwardingCard();

  const [bookingState, setBookingState] = useState<{
    mappedResult: any;
    candidateTrains: CandidateTrain[];
    selectedSlotId: string;
  } | null>(null);

  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [finalizedBooking, setFinalizedBooking] = useState<any>(null);
  const [showInquiryModal, setShowInquiryModal] = useState(false);

  useEffect(() => {
    let state = location.state;

    if (
      !state ||
      !state.mappedResult ||
      !state.candidateTrains ||
      !state.selectedSlotId
    ) {
      const draftStr = window.sessionStorage.getItem("forwardingBookingDraft");
      if (draftStr) {
        try {
          const parsed = JSON.parse(draftStr);
          if (
            parsed &&
            parsed.mappedResult &&
            parsed.candidateTrains &&
            parsed.selectedSlotId
          ) {
            state = parsed;
          }
        } catch (e) {
          console.error("sessionStorage parse error:", e);
        }
      }
    }

    if (
      state &&
      state.mappedResult &&
      Array.isArray(state.candidateTrains) &&
      state.selectedSlotId
    ) {
      setBookingState(state);
    } else {
      setErrorMessage("예약 정보를 찾을 수 없습니다. 다시 요청해주세요.");
    }
  }, [location.state]);

  if (errorMessage || !bookingState) {
    return (
      <main className="min-h-screen w-full bg-[#f5f6f8]">
        <TopNavigation activeTabLabel="철도+포워딩 운송" />
        <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center px-6 py-20">
          <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <p className="text-base font-bold text-red-600">
              {errorMessage || "예약 정보를 불러오는 중입니다..."}
            </p>
            {errorMessage && (
              <Button
                type="button"
                onClick={() => navigate("/10_forwarding_nlp_input")}
                className="mt-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
              >
                입력 화면으로 이동
              </Button>
            )}
          </div>
        </div>
      </main>
    );
  }

  const { mappedResult, candidateTrains, selectedSlotId } = bookingState;

  const selectedTrain = candidateTrains.find(
    (train) => train.slotId === selectedSlotId
  );

  if (!selectedTrain) {
    return (
      <main className="min-h-screen w-full bg-[#f5f6f8]">
        <TopNavigation activeTabLabel="철도+포워딩 운송" />
        <div className="mx-auto flex w-full max-w-[1240px] flex-col items-center justify-center px-6 py-20">
          <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
            <AlertCircle className="h-8 w-8 text-red-600" />
            <p className="text-base font-bold text-red-600">
              선택한 열차 정보를 찾을 수 없습니다.
            </p>
            <Button
              type="button"
              onClick={() => navigate("/10_forwarding_nlp_input")}
              className="mt-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white hover:bg-red-700"
            >
              입력 화면으로 이동
            </Button>
          </div>
        </div>
      </main>
    );
  }

  const userCargo = {
    volumeCBM: mappedResult?.cargo?.volumeCBM ?? 0,
    weightKg: mappedResult?.cargo?.weightKg ?? 0,
  };

  const poolingResult = calculatePoolingStatus(selectedTrain, userCargo);

  const routeId = mappedResult?.routeId;
  const fareResult = calculateFare(routeId || "", userCargo, 0);

  // Carbon Savings Calculation
  const tariff = (tariffDb as any).tariffs?.find((t: any) => t.routeId === routeId);
  const actualDistanceKm = tariff?.actualDistanceKm ?? 402.3;
  const policy = (tariffDb as any).carbonComparisonPolicy || {
    railEmissionFactorGCO2ePerTonKm: 8,
    truckEmissionFactorGCO2ePerTonKm: 209,
  };
  const cargoWeightTon = userCargo.weightKg / 1000;
  const railEmissionKg = Number(
    ((cargoWeightTon * actualDistanceKm * policy.railEmissionFactorGCO2ePerTonKm) / 1000).toFixed(2)
  );
  const truckEmissionKg = Number(
    ((cargoWeightTon * actualDistanceKm * policy.truckEmissionFactorGCO2ePerTonKm) / 1000).toFixed(2)
  );
  const estimatedSavingKgCO2e = Number(
    (truckEmissionKg - railEmissionKg).toFixed(2)
  );

  const originStationId = mappedResult?.origin?.stationId;
  const matchedOriginStation = stationList.find(
    (st: any) => st.stationId === originStationId
  );
  const originName =
    matchedOriginStation?.displayName ||
    mappedResult?.origin?.originText ||
    "오봉";

  const targetStationId = mappedResult?.finalDestination?.mappedStationId;
  const matchedStation = stationList.find(
    (st: any) => st.stationId === targetStationId
  );
  const destStationName =
    matchedStation?.displayName ||
    mappedResult?.finalDestination?.destinationText ||
    "부산신항";

  const trainNoDisplay = selectedTrain.trainNo
    ? `#${selectedTrain.trainNo}`
    : "번호 미확인";
  const departureDateText = formatDate(selectedTrain.departureDateTime);
  const arrivalDateText = formatDate(selectedTrain.arrivalDateTime);
  const departureTimeText = formatTime(selectedTrain.departureDateTime, "출발");
  const arrivalTimeText = formatTime(selectedTrain.arrivalDateTime, "도착");

  const cargoSpecText = `${userCargo.volumeCBM} CBM / ${userCargo.weightKg.toLocaleString()}kg`;

  const poolBeforeCbm = poolingResult.poolBefore.cbm;
  const poolBeforeWeight = poolingResult.poolBefore.weightKg;
  const poolBeforePct = Math.min(
    100,
    Math.round((poolBeforeCbm / 60) * 100 * 10) / 10
  );

  const poolAfterCbm = poolingResult.poolAfter
    ? poolingResult.poolAfter.cbm
    : poolBeforeCbm;
  const poolAfterWeight = poolingResult.poolAfter
    ? poolingResult.poolAfter.weightKg
    : poolBeforeWeight;
  const poolAfterPct = Math.min(
    100,
    Math.round((poolAfterCbm / 60) * 100 * 10) / 10
  );
  const poolAfterStatus = poolingResult.poolAfter
    ? poolingResult.poolAfter.status
    : poolingResult.poolBefore.status;

  let statusBadgeText = "모집 중";
  let statusBadgeStyle = "bg-[#ffe1e1] text-[#dc2626]";
  if (poolAfterStatus === "CONFIRMED") {
    statusBadgeText = "배차 확정";
    statusBadgeStyle = "bg-blue-100 text-blue-700";
  } else if (poolAfterStatus === "CLOSED") {
    statusBadgeText = "마감";
    statusBadgeStyle = "bg-gray-200 text-gray-700";
  }

  const showConfirmCard = poolAfterStatus !== "CLOSED";
  let remainAmountText = "";
  let remainLabelText = "";
  if (poolAfterStatus === "RECRUITING") {
    const remainToConfirm = Math.max(0, 45 - poolAfterCbm).toFixed(1);
    remainAmountText = `${remainToConfirm} CBM`;
    remainLabelText = "확정까지 남음";
  } else if (poolAfterStatus === "CONFIRMED") {
    const remainToClose = Math.max(0, 60 - poolAfterCbm).toFixed(1);
    remainAmountText = `${remainToClose} CBM`;
    remainLabelText = "최대 적재량까지 남음";
  }
  const capacityThresholdText = remainAmountText
    ? `${remainAmountText} ${remainLabelText}`
    : "";

  const remainingAvailableCapacity =
    poolingResult.poolAfter != null
      ? `${Math.max(0, 60 - poolingResult.poolAfter.cbm).toFixed(1)} CBM`
      : "예약 불가";

  const cfsTotalWon =
    (fareResult.originCfsChargeWon || 0) +
    (fareResult.destinationCfsChargeWon || 0);

  const domesticFareBreakdown = [
    {
      label: "철도 운임",
      value: formatWon(fareResult.allocatedRailFareWon),
    },
    { label: "CFS 비용", value: formatWon(cfsTotalWon) },
    {
      label: "혼재 수수료",
      value: formatWon(fareResult.consolidationOperationsFeeWon),
    },
  ];

  const handleConfirmBooking = () => {
    if (!poolingResult.canBook || !routeId || isSubmitting) return;
    setIsSubmitting(true);
    try {
      const result = finalizeBooking({
        selectedTrain,
        mappedResult,
        coverageResult: mappedResult,
        poolingResult,
        fareResult,
        truckerQuote: null,
        forwardingCard,
      });
      setFinalizedBooking(result);
    } catch (err) {
      console.error("Booking finalize error:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen w-full bg-[#f5f6f8]">
      <TopNavigation activeTabLabel="철도+포워딩 운송" />
      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 py-8">
        {!routeId && (
          <div className="flex w-full items-center gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-red-700 shadow-sm">
            <AlertCircle className="h-6 w-6 shrink-0 text-red-600" />
            <p className="text-base font-bold">
              노선 정보를 확인할 수 없습니다.
            </p>
          </div>
        )}

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
                <dd className="mt-1 whitespace-nowrap text-[20px] font-extrabold text-[#0b1c30]">
                  {originName} → {destStationName}
                </dd>
                <dd className="mt-1 text-[13px] font-bold text-[#7b8696]">
                  {trainNoDisplay} · {departureDateText}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  출발 예정일
                </dt>
                <dd className="mt-1 text-[24px] font-extrabold text-[#0b1c30]">
                  {departureDateText}
                </dd>
                <dd className="mt-1 text-[13px] font-bold text-[#7b8696]">
                  {departureTimeText}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  도착 예정일
                </dt>
                <dd className="mt-1 text-[24px] font-extrabold text-[#0b1c30]">
                  {arrivalDateText}
                </dd>
                <dd className="mt-1 text-[13px] font-bold text-[#7b8696]">
                  {arrivalTimeText}
                </dd>
              </div>
              <div>
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  화물 규격
                </dt>
                <dd className="mt-1 whitespace-nowrap text-[22px] font-extrabold text-[#0b1c30]">
                  {cargoSpecText}
                </dd>
              </div>
            </dl>

            <div className="flex min-w-[170px] flex-col items-center justify-center rounded-xl bg-[#fff1f1] px-5 py-3">
              <Badge
                className={`rounded-md border-0 px-3 py-1 text-[13px] font-extrabold ${statusBadgeStyle}`}
              >
                {statusBadgeText}
              </Badge>
              {capacityThresholdText && (
                <p className="mt-2 text-[13px] font-extrabold text-[#dc2626]">
                  {capacityThresholdText}
                </p>
              )}
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
            <header className="flex flex-wrap items-center justify-between gap-4 border-b border-[#dbe0ea] pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#005bac]">
                  <Train className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-[26px] font-extrabold text-[#0b1c30]">
                  1 국내운송·부산신항까지{" "}
                  <span className="text-[20px] font-bold text-[#424751]">
                    (철도+도로)
                  </span>
                </h2>
              </div>
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
                    <div className="space-y-2">
                      <div className="flex items-end justify-between">
                        <span className="text-[15px] font-black text-[#424751]">
                          참여 전
                        </span>
                        <strong className="text-[17px] font-extrabold text-[#0b1c30]">
                          {poolBeforeCbm.toFixed(1)} CBM · {poolBeforeWeight.toLocaleString()}kg
                        </strong>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-[#e5eeff]">
                        <div
                          className="h-full rounded-full bg-[#ff8a5b]"
                          style={{ width: `${poolBeforePct}%` }}
                        />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-end justify-between">
                        <span className="text-[15px] font-black text-[#005bac]">
                          참여 후 (내 화물 포함)
                        </span>
                        <strong className="text-[17px] font-extrabold text-[#0b1c30]">
                          {poolAfterCbm.toFixed(1)} CBM · {poolAfterWeight.toLocaleString()}kg
                        </strong>
                      </div>
                      <div className="h-2.5 w-full rounded-full bg-[#e5eeff]">
                        <div
                          className="h-full rounded-full bg-[#005bac]"
                          style={{ width: `${poolAfterPct}%` }}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                    {showConfirmCard && (
                      <div className="rounded-xl bg-[#f7f9fc] p-4 text-center">
                        <p className="text-[13px] font-bold text-[#5f6875]">
                          {remainLabelText || "확정까지 남은 양"}
                        </p>
                        <p className="mt-1 text-[30px] font-extrabold leading-none text-[#0b1c30]">
                          {remainAmountText}
                        </p>
                      </div>
                    )}
                    <div className="rounded-xl bg-[#f7f9fc] p-4 text-center">
                      <p className="text-[13px] font-bold text-[#5f6875]">
                        추가 적재 가능량
                      </p>
                      <p className="mt-1 text-[30px] font-extrabold leading-none text-[#0b1c30]">
                        {remainingAvailableCapacity}
                      </p>
                    </div>
                  </div>

                  <div className="rounded-xl bg-[#eefaf0] px-4 py-3">
                    <p className="text-[15px] font-black text-[#1e8a1e]">
                      ✓ 트럭 대비 약 {estimatedSavingKgCO2e.toLocaleString()}kg CO₂e 탄소 절감 예상
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
                      {formatWon(fareResult.totalFareWon)}
                    </p>
                  </div>

                  <div className="rounded-xl border border-[#d5e3ff] bg-[#eff4ff] px-5 py-4">
                    <div className="flex items-center justify-between">
                      <p className="text-[22px] font-extrabold leading-none text-[#005bac]">
                        국내 구간 예상 합계
                      </p>
                      <p className="text-[22px] font-extrabold leading-none text-[#005bac]">
                        {formatWon(fareResult.totalFareWon)}
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
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#005bac]">
                  <Globe className="h-5 w-5 text-white" />
                </div>
                <h2 className="text-[26px] font-extrabold text-[#0b1c30]">
                  2 국제운송·부산신항 이후{" "}
                  <span className="text-[20px] font-bold text-[#424751]">
                    (포워딩)
                  </span>
                </h2>
              </div>
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
                    onClick={() => setShowInquiryModal(true)}
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
            disabled={!routeId || !poolingResult.canBook || isSubmitting}
            onClick={handleConfirmBooking}
            className="h-11 rounded-xl bg-[#005bac] px-6 text-[15px] font-extrabold text-white hover:bg-[#005bac] disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isSubmitting ? "처리 중..." : "✓ 공동배차 참여 및 예약 확정"}
          </Button>
        </div>
      </div>

      {finalizedBooking && (
        <BookingConfirmModal
          bookingId={finalizedBooking.bookingId}
          onGoHome={() => navigate("/02_home_loggedin")}
          createdAt={finalizedBooking.createdAt}
          originName={originName}
          destinationName={destStationName}
          cargoDescription={mappedResult?.cargo?.description ?? ""}
          cargoVolumeCBM={userCargo.volumeCBM}
          cargoWeightKg={userCargo.weightKg}
          railEmissionKgCO2e={railEmissionKg}
          truckEmissionKgCO2e={truckEmissionKg}
          estimatedSavingKgCO2e={estimatedSavingKgCO2e}
          reductionRatePercent={
            truckEmissionKg > 0
              ? (estimatedSavingKgCO2e / truckEmissionKg) * 100
              : 0
          }
        />
      )}

      {showInquiryModal && (
        <GlobisInquiryModal
          onClose={() => setShowInquiryModal(false)}
          onGoHome={() => navigate("/02_home_loggedin")}
          bookingId={finalizedBooking?.bookingId ?? "예약 전"}
          originName={originName}
          destinationName={destStationName}
          cargoDescription={mappedResult?.cargo?.description ?? ""}
        />
      )}
    </main>
  );
};

