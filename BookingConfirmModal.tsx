import { CheckCircle2 } from "lucide-react";
import { Button } from "../ui/button";
import { EsgCertificateButton } from "./EsgCertificateButton";

interface BookingConfirmModalProps {
  bookingId: string;
  onGoHome: () => void;
  createdAt: string;
  originName: string;
  destinationName: string;
  cargoDescription: string;
  cargoVolumeCBM: number;
  cargoWeightKg: number;
  railEmissionKgCO2e: number;
  truckEmissionKgCO2e: number;
  estimatedSavingKgCO2e: number;
  reductionRatePercent: number;
}

export const BookingConfirmModal = ({
  bookingId,
  onGoHome,
  createdAt,
  originName,
  destinationName,
  cargoDescription,
  cargoVolumeCBM,
  cargoWeightKg,
  railEmissionKgCO2e,
  truckEmissionKgCO2e,
  estimatedSavingKgCO2e,
  reductionRatePercent,
}: BookingConfirmModalProps): JSX.Element => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4 backdrop-blur-xs">
      <div className="flex w-full max-w-md flex-col items-center gap-5 rounded-3xl bg-white p-8 text-center shadow-2xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-blue-50 text-[#005bac]">
          <CheckCircle2 className="h-10 w-10" />
        </div>

        <div className="space-y-2">
          <h3 className="text-2xl font-extrabold text-[#0b1c30]">
            예약이 확정되었습니다
          </h3>
          <p className="text-sm font-medium leading-relaxed text-[#5f6875]">
            귀하의 이메일로 확정사항을 보내드렸습니다.
          </p>
        </div>

        <div className="w-full rounded-2xl bg-[#f5f6f8] p-4 text-center">
          <p className="text-xs font-bold text-[#727783]">예약 번호</p>
          <p className="mt-1 text-xl font-black tracking-wider text-[#005bac]">
            {bookingId}
          </p>
        </div>

        <div className="w-full">
          <EsgCertificateButton
            bookingId={bookingId}
            createdAt={createdAt}
            originName={originName}
            destinationName={destinationName}
            cargoDescription={cargoDescription}
            cargoVolumeCBM={cargoVolumeCBM}
            cargoWeightKg={cargoWeightKg}
            railEmissionKgCO2e={railEmissionKgCO2e}
            truckEmissionKgCO2e={truckEmissionKgCO2e}
            estimatedSavingKgCO2e={estimatedSavingKgCO2e}
            reductionRatePercent={reductionRatePercent}
          />
        </div>

        <Button
          type="button"
          onClick={onGoHome}
          className="mt-2 h-12 w-full rounded-xl bg-[#005bac] text-base font-extrabold text-white hover:bg-[#004482]"
        >
          홈으로 돌아가기
        </Button>
      </div>
    </div>
  );
};
