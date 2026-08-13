import { TopNavigation } from "../../components/layout/TopNavigation";
import { SectionAnalysisSubsection } from "../MainMargin/sections/SectionAnalysisSubsection";
import { SectionRecommendedSubsection } from "../MainMargin/sections/SectionRecommendedSubsection";

export const RailRoadRecommended = (): JSX.Element => {
  return (
    <main
      className="flex w-full flex-col items-center bg-[#f5f6f8] px-5"
      data-model-id="1:826"
    >
      <TopNavigation activeTabLabel="철도+도로운송" />
      <div className="flex w-full max-w-[1240px] flex-col px-6">
        <SectionAnalysisSubsection />
        <SectionRecommendedSubsection />
      </div>
    </main>
  );
};
