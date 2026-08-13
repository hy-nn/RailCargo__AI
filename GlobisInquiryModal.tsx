import { useState } from "react";
import { CheckCircle2, Globe, X } from "lucide-react";
import demoUsers from "../../data/demoUsers.json";
import { Button } from "../ui/button";

interface GlobisInquiryModalProps {
  onClose: () => void;
  onGoHome: () => void;
  bookingId: string;
  originName: string;
  destinationName: string;
  cargoDescription: string;
}

export const GlobisInquiryModal = ({
  onClose,
  onGoHome,
  bookingId,
  originName,
  destinationName,
  cargoDescription,
}: GlobisInquiryModalProps): JSX.Element => {
  const firstUser = Array.isArray(demoUsers) ? demoUsers[0] : (demoUsers as any)[0] || {};

  const [companyName, setCompanyName] = useState(firstUser.companyName || "");
  const [contactName, setContactName] = useState(firstUser.userName || "");
  const [contactInfo, setContactInfo] = useState(firstUser.email || "");
  const [notes, setNotes] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div
      onClick={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="relative flex w-full max-w-lg flex-col gap-5 rounded-3xl bg-white p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200"
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-5 top-5 rounded-full p-1 text-gray-400 hover:bg-gray-100 hover:text-gray-600"
          aria-label="닫기"
        >
          <X className="h-5 w-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-[#005bac]">
                <Globe className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-[#0b1c30]">
                  🌏 글로비스 수출 포워딩 문의
                </h3>
                <p className="text-xs font-medium text-[#5f6875]">
                  전문 담당자가 최적의 포워딩 견적과 일정을 안내해드립니다.
                </p>
              </div>
            </div>

            {/* 운송 정보 요약 박스 (조회 전용) */}
            <div className="rounded-2xl border border-gray-100 bg-[#f5f6f8] p-4 text-left space-y-1.5">
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#727783]">예약 번호</span>
                <span className="font-extrabold text-[#005bac]">{bookingId}</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="font-bold text-[#727783]">운송 구간</span>
                <span className="font-bold text-[#0b1c30]">
                  {originName} → {destinationName}
                </span>
              </div>
              {cargoDescription && (
                <div className="flex justify-between text-xs">
                  <span className="font-bold text-[#727783]">화물 정보</span>
                  <span className="font-bold text-[#0b1c30]">{cargoDescription}</span>
                </div>
              )}
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-3 text-left">
              <div>
                <label className="block text-xs font-bold text-[#424751] mb-1">
                  회사명
                </label>
                <input
                  type="text"
                  required
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-semibold text-[#0b1c30] outline-none focus:border-[#005bac]"
                  placeholder="회사명을 입력해주세요"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-[#424751] mb-1">
                    담당자명
                  </label>
                  <input
                    type="text"
                    required
                    value={contactName}
                    onChange={(e) => setContactName(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-semibold text-[#0b1c30] outline-none focus:border-[#005bac]"
                    placeholder="담당자 이름"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-[#424751] mb-1">
                    연락처 (이메일/전화번호)
                  </label>
                  <input
                    type="text"
                    required
                    value={contactInfo}
                    onChange={(e) => setContactInfo(e.target.value)}
                    className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-semibold text-[#0b1c30] outline-none focus:border-[#005bac]"
                    placeholder="example@domain.com"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#424751] mb-1">
                  추가 문의사항 (선택)
                </label>
                <textarea
                  rows={3}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  className="w-full rounded-xl border border-gray-200 px-3.5 py-2 text-sm font-medium text-[#0b1c30] outline-none focus:border-[#005bac] resize-none"
                  placeholder="희망 선적 일자, 스케줄 문의 등 추가 요청사항을 적어주세요."
                />
              </div>

              <Button
                type="submit"
                className="mt-2 h-12 w-full rounded-xl bg-[#005bac] text-base font-extrabold text-white hover:bg-[#004482]"
              >
                문의 접수하기
              </Button>
            </form>
          </>
        ) : (
          <div className="flex flex-col items-center text-center gap-4 py-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full bg-green-50 text-green-600">
              <CheckCircle2 className="h-10 w-10" />
            </div>

            <div className="space-y-1.5">
              <h3 className="text-2xl font-extrabold text-[#0b1c30]">
                문의가 정상적으로 접수되었습니다.
              </h3>
              <p className="text-sm font-medium text-[#5f6875]">
                담당자가 확인 후 24시간 내 연락드립니다.
              </p>
            </div>

            <div className="w-full rounded-2xl bg-[#f5f6f8] p-4 text-center text-xs text-[#5f6875] space-y-1">
              <p>
                <span className="font-bold">접수 회사:</span> {companyName} ({contactName})
              </p>
              <p>
                <span className="font-bold">연락처:</span> {contactInfo}
              </p>
            </div>

            <Button
              type="button"
              onClick={onGoHome}
              className="mt-2 h-12 w-full rounded-xl bg-[#005bac] text-base font-extrabold text-white hover:bg-[#004482]"
            >
              홈으로 돌아가기
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
