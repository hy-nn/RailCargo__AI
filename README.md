# Rail Cargo AI

**MOVE-AI Challenge 2026 (KORAIL 트랙) — 싱크로지스(Synclogis) 팀**

소규모 화주가 자연어로 철도 화물 운송을 예약할 수 있는 B2B 웹 대시보드입니다. 화주가 자연어로 운송 요청을 입력하면 Gemini API가 이를 구조화된 데이터로 파싱하고, 규칙 기반 로직이 공동배차 열차 추천·운임 계산·예약 처리를 수행합니다.

- 🔗 **배포 URL**: https://railcargo-ai.ai.studio
- 🚂 **MVP 노선**: 부산신항 ↔ 오봉역
- 🧩 **3개 서비스 탭**: 철도 단독 / 철도+도로 / 철도+포워딩

## 핵심 설계 원칙

- Gemini API는 자연어 이해(요청 파싱)와 예외 응답 생성에만 사용
- 열차 추천, 운임 계산, 라우팅 등 나머지 로직은 전부 규칙 기반(rule-based)으로 처리해 안정성과 예측 가능성을 확보

## 기술 스택

- React + TypeScript + Vite + Tailwind CSS
- Google Gemini API (`@google/genai`)
- html2canvas + jsPDF (ESG 증명서 PDF 생성)

## 개발 프로세스 안내

본 프로젝트는 사전 환경 구축(UI 템플릿 및 기본 프레임워크) 단계를 거쳐, 대회 당일(2026-08-13) Google AI Studio를 활용해 핵심 백엔드 로직(자연어 파싱, 열차 매칭, 운임 계산 등) 구현 및 Gemini API 연동·데이터 바인딩을 최종 완성하였습니다.

## 실행 방법

```bash
npm install
npm run dev
```

`.env.example`을 참고해 `.env` 파일을 만들고 `GEMINI_API_KEY`를 설정해주세요.

```bash
npm run build
```

## 팀 구성

- **싱크로지스(Synclogis)**: 기획 및 백엔드 로직, 데이터 설계, UI 디자인
