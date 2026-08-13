import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { TopNavigation } from "../../components/layout/TopNavigation";
import { SectionAnalysisSubsection } from "./sections/SectionAnalysisSubsection";
import { SectionRecommendedSubsection } from "./sections/SectionRecommendedSubsection";
import { CandidateTrain } from "../../logic/getCandidateTrains";

export const MainMargin = (): JSX.Element => {
  const location = useLocation();
  const navigate = useNavigate();

  const [data, setData] = useState<{
    mappedResult: any;
    candidateTrains: CandidateTrain[];
  } | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  useEffect(() => {
    let state = location.state;

    if (!state || !state.mappedResult || !state.candidateTrains) {
      const draftStr = window.sessionStorage.getItem("railBookingDraft");
      if (draftStr) {
        try {
          const parsed = JSON.parse(draftStr);
          if (parsed && parsed.mappedResult && parsed.candidateTrains) {
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
      state.candidateTrains.length > 0
    ) {
      setData({
        mappedResult: state.mappedResult,
        candidateTrains: state.candidateTrains,
      });
      window.sessionStorage.setItem("railBookingDraft", JSON.stringify(state));
    } else {
      setErrorMessage("입력 정보를 찾을 수 없습니다. 다시 요청해주세요.");
      const timer = setTimeout(() => {
        navigate("/04_rail_nlp_input");
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [location.state, navigate]);

  if (errorMessage) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center bg-[#f5f6f8] px-5">
        <TopNavigation />
        <div className="flex w-full max-w-[1240px] flex-col items-center justify-center px-6 py-20">
          <div className="flex w-full max-w-md flex-col items-center gap-4 rounded-2xl border border-red-200 bg-red-50 p-6 text-center shadow-sm">
            <p className="text-lg font-bold text-red-600">{errorMessage}</p>
            <p className="text-sm text-gray-600">3초 후 입력 화면으로 자동 이동합니다.</p>
            <button
              type="button"
              onClick={() => navigate("/04_rail_nlp_input")}
              className="mt-2 rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white transition-colors hover:bg-red-700"
            >
              입력 화면으로 이동
            </button>
          </div>
        </div>
      </main>
    );
  }

  if (!data) {
    return (
      <main className="flex min-h-screen w-full flex-col items-center bg-[#f5f6f8] px-5">
        <TopNavigation />
      </main>
    );
  }

  return (
    <main
      className="flex w-full flex-col items-center bg-[#f5f6f8] px-5"
      data-model-id="1:826"
    >
      <TopNavigation />
      <div className="flex w-full max-w-[1240px] flex-col px-6">
        <SectionAnalysisSubsection
          mappedResult={data.mappedResult}
          backRoutePath="/04_rail_nlp_input"
          showStationMappingNotice={true}
        />
        <SectionRecommendedSubsection
          mappedResult={data.mappedResult}
          candidateTrains={data.candidateTrains}
          nextRoutePath="/06_rail_confirm"
          sessionStorageKey="railBookingDraft"
        />
      </div>
    </main>
  );
};

