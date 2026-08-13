import { Bell, ChevronDown, Settings } from "lucide-react";
import { Link } from "react-router-dom";

const navTabs = [
  { label: "홈", to: "/02_home_loggedin" },
  { label: "철도 운송", to: "/05_rail_recommend" },
  { label: "철도+도로운송", to: "/07_road_nlp_input" },
  { label: "철도+포워딩 운송", to: "/10_forwarding_nlp_input" },
];

interface TopNavigationProps {
  activeTabLabel?: string;
}

export const TopNavigation = ({
  activeTabLabel = "철도 운송",
}: TopNavigationProps): JSX.Element => {
  return (
    <header className="w-full border-b border-[#dbe0ea] bg-white">
      <div className="mx-auto flex h-[76px] w-full max-w-[1240px] items-center justify-between px-6">
        <div className="flex h-full items-center gap-8">
          <div className="flex items-center gap-3">
            <span className="rounded-md bg-[#005bac] px-2.5 py-1 text-xs font-bold leading-4 tracking-[0] text-white [font-family:'Noto_Sans_KR',Helvetica]">
              KORAIL
            </span>
            <span className="text-[22px] font-bold leading-7 tracking-[0] text-[#0b1c30] [font-family:'Noto_Sans_KR',Helvetica]">
              Rail Cargo AI
            </span>
          </div>

          <nav aria-label="메인 내비게이션" className="flex h-full items-end">
            <ul className="flex h-full items-end gap-6">
              {navTabs.map((tab) => (
                <li key={tab.label} className="h-full">
                  <Link
                    to={tab.to}
                    className={`flex h-full items-center border-b-[3px] pb-1 text-[17px] leading-5 tracking-[0] [font-family:'Noto_Sans_KR',Helvetica] ${tab.label === activeTabLabel ? "border-[#005bac] font-bold text-[#005bac]" : "border-transparent font-semibold text-[#424751]"}`}
                  >
                    {tab.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="flex items-center gap-4">
          <button
            type="button"
            aria-label="알림"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#424751]"
          >
            <Bell className="h-5 w-5" />
          </button>
          <button
            type="button"
            aria-label="설정"
            className="flex h-9 w-9 items-center justify-center rounded-full text-[#424751]"
          >
            <Settings className="h-5 w-5" />
          </button>
          <button
            type="button"
            className="flex items-center gap-2 rounded-full pl-1 pr-2"
          >
            <img
              src="https://i.pravatar.cc/64?img=32"
              alt="김유진 프로필"
              className="h-9 w-9 rounded-full object-cover"
            />
            <span className="text-[15px] font-semibold leading-5 tracking-[0] text-[#0b1c30] [font-family:'Noto_Sans_KR',Helvetica]">
              김유진
            </span>
            <ChevronDown className="h-4 w-4 text-[#424751]" />
          </button>
        </div>
      </div>
    </header>
  );
};
