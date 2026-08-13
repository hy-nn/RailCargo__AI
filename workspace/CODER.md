<instructions>
This file will be automatically added to your context. 
It serves multiple purposes:
  1. Storing frequently used tools so you can use them without searching each time
  2. Recording the user's code style preferences (naming conventions, preferred libraries, etc.)
  3. Maintaining useful information about the codebase structure and organization
  4. Remembering tricky quirks from this codebase

When you spend time searching for certain configuration files, tricky code coupled dependencies, or other codebase information, add that to this CODER.md file so you can remember it for next time.
Keep entries sorted in DESC order (newest first) so recent knowledge stays in prompt context if the file is truncated.
</instructions>

<coder>
- 2026-08-05: Login screen branding/button copy lives in `src/screens/Login/Login.tsx`; top badge can be swapped with hosted logo image and CTA icon is from `lucide-react`.
- 2026-08-05: Top nav tab alignment and tab font weight are controlled in `src/components/layout/TopNavigation.tsx`; tabs can be left-anchored beside logo by grouping logo+nav in one left flex container.
- 2026-08-05: Main page background below nav is controlled in `src/screens/MainMargin/MainMargin.tsx` via main container class.
- 2026-08-05: Main rail screen uses `src/screens/MainMargin/MainMargin.tsx` as composition root; reusable top nav component added at `src/components/layout/TopNavigation.tsx`.
- 2026-08-05: `SectionAnalysisSubsection.tsx` controls 운송 경로/조건 수정/안내 문구 UI; `SectionRecommendedSubsection.tsx` controls candidate train cards and badge/date rendering.
# File Content Goes Here
</coder>
