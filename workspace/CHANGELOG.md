<instructions>
## 🚨 MANDATORY: CHANGELOG TRACKING 🚨

You MUST maintain this file to track your work across messages. This is NON-NEGOTIABLE.

---

## INSTRUCTIONS

- **MAX 5 lines** per entry - be concise but informative
- **Include file paths** of key files modified or discovered
- **Note patterns/conventions** found in the codebase
- **Sort entries by date** in DESCENDING order (most recent first)
- If this file gets corrupted, messy, or unsorted -> re-create it. 
- CRITICAL: Updating this file at the END of EVERY response is MANDATORY.
- CRITICAL: Keep this file under 300 lines. You are allowed to summarize, change the format, delete entries, etc., in order to keep it under the limit.

</instructions>

<changelog>
- 2026-08-06: Renamed all app routes to numbered slugs, reassigned root `/` to guest home, moved rail recommend to `/05_rail_recommend`, and updated route-linked top nav/back links (`src/index.tsx`, `src/components/layout/TopNavigation.tsx`, `src/screens/RailBookingConfirm/RailBookingConfirm.tsx`, `src/screens/RailRoadBookingConfirm/RailRoadBookingConfirm.tsx`, `src/screens/RailForwardingBookingConfirm/RailForwardingBookingConfirm.tsx`).
- 2026-08-06: Updated `/home-guest` only to match 02 screen references for section-title icons, changed lock panel to blue icon-on-light-blue circle, switched "로그인하기" to outline variant, and set first two "바로 확정 가능" guides to blue text without icon (`src/screens/HomeGuest/HomeGuest.tsx`, ref: `src/screens/PostLoginHome/PostLoginHome.tsx`).
- 2026-08-06: Updated `/settings` only: set top nav active tab to "홈", changed company name to "싱크물류", and unified all requested icons to project blue (`#005bac`) (`src/screens/Settings/Settings.tsx`).
- 2026-08-06: Fixed build parse issue in switch component by converting HTML-escaped JSX entities back to valid TSX tokens (`src/components/ui/switch.tsx`).
- 2026-08-06: Refined `/rail-forwarding-booking-confirm` only: split blue total banner label/amount into left-right columns, rebuilt timeline with all-dashed connector + blue circular ship icon, centered helper text under inquiry button, and strengthened notice title weight (`src/screens/RailForwardingBookingConfirm/RailForwardingBookingConfirm.tsx`).
- 2026-08-06: Matched 11번 화면 배지 아이콘 JSX(08번과 동일한 lucide 아이콘/간격) 및 카드 영역 font-weight를 08번 기준으로 정렬 (`src/screens/RailForwardingRecommended/RailForwardingRecommended.tsx`, 참조: `src/screens/MainMargin/sections/SectionRecommendedSubsection/SectionRecommendedSubsection.tsx`).
- 2026-08-06: Fixed 11번 화면 카드 3개 상단 배지 텍스트 띄어쓰기를 08번 화면 기준과 동일하게 조정 (`src/screens/RailForwardingRecommended/RailForwardingRecommended.tsx`).
- 2026-08-06: Reduced 10번 화면 메인 제목 폰트를 한 단계 낮추고 `whitespace-nowrap`를 적용해 한 줄 고정 처리 (`src/screens/RailForwardingNaturalInput/RailForwardingNaturalInput.tsx`).
- 2026-08-06: Updated `/rail-road-transport-booking-confirm` with red-toned "⏱ 모집 중" status badge style and added leading check mark in bottom-right confirm CTA text (`src/screens/RailRoadBookingConfirm/RailRoadBookingConfirm.tsx`).
- 2026-08-06: Rebuilt `/rail-road-transport-recommended` by reusing 05 screen section components and layout exactly; only changed top nav active tab to "철도+도로운송" (`src/screens/RailRoadRecommended/RailRoadRecommended.tsx`).
- 2026-08-06: Matched `/rail-road-transport-recommended` UI details to 05 screen style: blue edit button with pencil icon, badge color/icon mapping, blue date-arrow format, progressbar confirmation marker label, and 3-column stats (`src/screens/RailRoadRecommended/RailRoadRecommended.tsx`).
- 2026-08-06: Replaced `/rail-road-transport-recommended` screen content end-to-end with requested structure (title/subtitle, info box, guide copy, and 3 candidate-train cards with fastest/recommended/confirmed badges) while keeping top nav active tab as "철도+도로운송" (`src/screens/RailRoadRecommended/RailRoadRecommended.tsx`).
- 2026-08-06: Unified only "모집시작" badge in 05 rail+road natural-input card to same orange tone as 04 screen (`bg-[#fff1df] text-[#d97706]`) without touching other badges (`src/screens/RailRoadNaturalInput/RailRoadNaturalInput.tsx`).
- 2026-08-06: Rail booking confirm tweaks: forced "화물 규격" value to one line (`whitespace-nowrap`, `24px → 22px`), changed "모집 중" badge area to light/red theme, and increased weight for load-status labels + carbon-saving sentence (`src/screens/RailBookingConfirm/RailBookingConfirm.tsx`).
- 2026-08-06: Reduced hero title size in rail natural-input header (`38px → 33px`) so "AI로 내 화물에 맞는 최적의 철도 운송을 찾아보세요." stays on one line while preserving all other layout/colors/spacing (`src/screens/RailNaturalInput/RailNaturalInput.tsx`).
- 2026-08-06: Removed the inner bordered box in "✨ AI로 운송 요청하기" by clearing the form container border/background/radius and keeping only the outer card (`src/screens/RailNaturalInput/RailNaturalInput.tsx`).
- 2026-08-05: Added dispatch IDs under each route in the participated dispatch list with the same size/color styling as top deadline card IDs (`#KR-3802`, `#KR-3811`, `#KR-3072`) (`src/screens/PostLoginHome/PostLoginHome.tsx`).
- 2026-08-05: Unified post-login badge colors by status across both top cards and participated list (배차 확정 blue unchanged, 마감 임박 vivid red, 모집 중 orange) and changed all "전체 보기 >"/"상세보기 →" links to dark text (`src/screens/PostLoginHome/PostLoginHome.tsx`).
- 2026-08-05: Center-aligned only login header texts (`KORAIL`, `Rail Cargo AI`, 안내 문구) while keeping form fields and lower sections unchanged (`src/screens/Login/Login.tsx`).
- 2026-08-05: Reverted login top branding from hosted logo image back to small blue `KORAIL` text badge and tightened centering to exact viewport middle while preserving existing layout/color/spacing (`src/screens/Login/Login.tsx`).
- 2026-08-05: Updated login screen to use centered card layout, replaced top KORAIL badge with hosted logo image, changed login button icon to leading `LogIn`, and fixed "회원 가입" spacing (`src/screens/Login/Login.tsx`).
- 2026-08-05: Left-aligned top nav tabs next to logo and increased requested text weights for tabs/titles/card numeric/button labels (`src/components/layout/TopNavigation.tsx`, `src/screens/MainMargin/sections/SectionAnalysisSubsection/SectionAnalysisSubsection.tsx`, `src/screens/MainMargin/sections/SectionRecommendedSubsection/SectionRecommendedSubsection.tsx`).
- 2026-08-05: Updated page body background to light gray while keeping top nav and white content cards unchanged (`src/screens/MainMargin/MainMargin.tsx`).
- 2026-08-05: Added reusable top navigation component and mounted it in main layout (`src/components/layout/TopNavigation.tsx`, `src/screens/MainMargin/MainMargin.tsx`).
- 2026-08-05: Fixed missing route/date arrows and added edit/sparkle icons per design (`src/screens/MainMargin/sections/SectionAnalysisSubsection/SectionAnalysisSubsection.tsx`, `src/screens/MainMargin/sections/SectionRecommendedSubsection/SectionRecommendedSubsection.tsx`).
- 2026-08-05: Added badge icons on all candidate cards (fastest/recommended/confirmed) while preserving existing styles and spacing conventions.
<!-- NEXT_ENTRY_HERE -->
</changelog>
