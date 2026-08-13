import { TopNavigation } from "../../components/layout/TopNavigation";
import { SectionAnalysisSubsection } from "./sections/SectionAnalysisSubsection";
import { SectionRecommendedSubsection } from "./sections/SectionRecommendedSubsection";

export const MainMargin = (): JSX.Element => {
  return (
    <main
      className="flex w-full flex-col items-center bg-[#f5f6f8] px-5"
      data-model-id="1:826"
    >
      <TopNavigation />
      <div className="flex w-full max-w-[1240px] flex-col px-6">
        <SectionAnalysisSubsection />
        <SectionRecommendedSubsection />
      </div>
    </main>
  );
};
