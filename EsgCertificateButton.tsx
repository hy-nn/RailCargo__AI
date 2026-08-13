import React, { useState } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";

export interface EsgCertificateButtonProps {
  bookingId: string;
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

const formatDateString = (isoString: string): string => {
  const date = new Date(isoString);
  if (isNaN(date.getTime())) return isoString;
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");
  return `${year}년 ${month}월 ${day}일`;
};

export const EsgCertificateButton = ({
  bookingId,
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
}: EsgCertificateButtonProps): JSX.Element => {
  const [isGenerating, setIsGenerating] = useState(false);

  const handleDownloadPdf = async () => {
    if (isGenerating) return;
    setIsGenerating(true);

    try {
      const formattedDate = formatDateString(createdAt);
      const formattedRate = reductionRatePercent.toFixed(2);

      // Create off-screen container for HTML rendering
      const container = document.createElement("div");
      container.style.position = "absolute";
      container.style.left = "-9999px";
      container.style.top = "-9999px";
      container.style.width = "794px"; // Standard A4 width in pixels at 96DPI
      container.style.minHeight = "1123px"; // Standard A4 height in pixels
      container.style.backgroundColor = "#ffffff";
      container.style.padding = "48px 56px";
      container.style.fontFamily =
        "'Pretendard', 'Malgun Gothic', 'Apple SD Gothic Neo', sans-serif";
      container.style.boxSizing = "border-box";
      container.style.color = "#0b1c30";

      const cargoInfoText = cargoDescription.trim()
        ? `${cargoDescription} / ${cargoVolumeCBM} CBM / ${cargoWeightKg.toLocaleString()}kg`
        : "";

      container.innerHTML = `
        <div style="border: 2px solid #1e8a1e; border-radius: 20px; padding: 40px; height: 100%; box-sizing: border-box; position: relative;">
          <!-- Header -->
          <div style="text-align: center; border-bottom: 2px solid #eefaf0; padding-bottom: 24px; margin-bottom: 32px;">
            <p style="font-size: 16px; font-weight: 800; color: #005bac; margin: 0 0 8px 0; letter-spacing: 1px;">Rail Cargo AI</p>
            <h1 style="font-size: 28px; font-weight: 900; color: #1e8a1e; margin: 0; letter-spacing: -0.5px;">ESG 탄소배출 절감 증명서</h1>
          </div>

          <!-- Issuance Info -->
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 18px 24px; margin-bottom: 28px; display: flex; justify-content: space-between; align-items: center;">
            <div>
              <span style="font-size: 13px; font-weight: 700; color: #64748b; display: block;">발급일자</span>
              <span style="font-size: 15px; font-weight: 800; color: #0f172a; margin-top: 2px; display: block;">${formattedDate}</span>
            </div>
            <div style="text-align: right;">
              <span style="font-size: 13px; font-weight: 700; color: #64748b; display: block;">예약번호</span>
              <span style="font-size: 16px; font-weight: 900; color: #005bac; margin-top: 2px; display: block; letter-spacing: 0.5px;">${bookingId}</span>
            </div>
          </div>

          <!-- Transport Info Section -->
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; border-left: 4px solid #1e8a1e; padding-left: 10px;">운송 정보</h2>
            <div style="border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px 20px; background-color: #ffffff;">
              <div style="margin-bottom: ${cargoInfoText ? "10px" : "0"};">
                <span style="font-size: 13px; font-weight: 700; color: #64748b; display: inline-block; width: 80px;">운송구간</span>
                <span style="font-size: 15px; font-weight: 800; color: #0f172a;">${originName} → ${destinationName}</span>
              </div>
              ${
                cargoInfoText
                  ? `<div>
                <span style="font-size: 13px; font-weight: 700; color: #64748b; display: inline-block; width: 80px;">화물정보</span>
                <span style="font-size: 14px; font-weight: 700; color: #334155;">${cargoInfoText}</span>
              </div>`
                  : ""
              }
            </div>
          </div>

          <!-- Carbon Emission Comparison Section -->
          <div style="margin-bottom: 32px;">
            <h2 style="font-size: 16px; font-weight: 800; color: #0f172a; margin: 0 0 12px 0; border-left: 4px solid #1e8a1e; padding-left: 10px;">탄소배출 비교 현황</h2>
            <table style="width: 100%; border-collapse: collapse; font-size: 14px; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0;">
              <thead>
                <tr style="background-color: #f1f5f9; color: #475569; font-weight: 800; text-align: left;">
                  <th style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0;">구분</th>
                  <th style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; text-align: right;">배출 및 절감 수치</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #334155; font-weight: 700;">철도 예상 배출량</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #0f172a; font-weight: 800;">${railEmissionKgCO2e.toLocaleString()} kgCO2e</td>
                </tr>
                <tr>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; color: #334155; font-weight: 700;">트럭 예상 배출량</td>
                  <td style="padding: 12px 16px; border-bottom: 1px solid #e2e8f0; text-align: right; color: #0f172a; font-weight: 800;">${truckEmissionKgCO2e.toLocaleString()} kgCO2e</td>
                </tr>
                <tr style="background-color: #eefaf0;">
                  <td style="padding: 14px 16px; border-bottom: 1px solid #dcfce7; color: #1e8a1e; font-weight: 900; font-size: 15px;">절감량</td>
                  <td style="padding: 14px 16px; border-bottom: 1px solid #dcfce7; text-align: right; color: #1e8a1e; font-weight: 900; font-size: 16px;">${estimatedSavingKgCO2e.toLocaleString()} kgCO2e</td>
                </tr>
                <tr style="background-color: #eefaf0;">
                  <td style="padding: 14px 16px; color: #1e8a1e; font-weight: 900; font-size: 15px;">절감률</td>
                  <td style="padding: 14px 16px; text-align: right; color: #1e8a1e; font-weight: 900; font-size: 16px;">${formattedRate}%</td>
                </tr>
              </tbody>
            </table>
          </div>

          <!-- Basis Section -->
          <div style="background-color: #f8fafc; border-radius: 12px; padding: 16px 20px; margin-bottom: 40px; border: 1px dashed #cbd5e1;">
            <p style="font-size: 13px; font-weight: 800; color: #334155; margin: 0 0 6px 0;">[산정 근거]</p>
            <p style="font-size: 12px; font-weight: 600; color: #64748b; margin: 0 0 4px 0;">• 국토교통부 「제2차 철도물류산업 육성계획」 기준</p>
            <p style="font-size: 12px; font-weight: 600; color: #64748b; margin: 0;">• 배출계수: 철도 8g CO2e/톤·km, 트럭 209g CO2e/톤·km</p>
          </div>

          <!-- Footer Note -->
          <div style="position: absolute; bottom: 40px; left: 40px; right: 40px; text-align: center;">
            <p style="font-size: 11px; font-weight: 500; color: #94a3b8; margin: 0; line-height: 1.4;">
              ※ 본 증명서는 MVP 시연을 위한 mock 문서이며, 실제 법적 효력이 있는 공식 탄소배출 인증서가 아닙니다.
            </p>
          </div>
        </div>
      `;

      document.body.appendChild(container);

      const canvas = await html2canvas(container, {
        scale: 2,
        useCORS: true,
        backgroundColor: "#ffffff",
      });

      document.body.removeChild(container);

      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "mm", "a4");
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

      pdf.addImage(imgData, "PNG", 0, 0, pdfWidth, pdfHeight);
      pdf.save(`ESG증명서_${bookingId}.pdf`);
    } catch (err) {
      console.error("PDF 생성 중 오류 발생:", err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      type="button"
      onClick={handleDownloadPdf}
      disabled={isGenerating}
      className="w-full h-auto rounded-xl border border-[#a3e635]/40 bg-[#eefaf0] px-4 py-3 text-[14px] font-extrabold text-[#1e8a1e] hover:bg-[#e0f5e3] hover:text-[#1e8a1e] shadow-none transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
    >
      {isGenerating ? (
        <span className="flex items-center justify-center gap-2">
          <Loader2 className="h-4 w-4 animate-spin" />
          PDF 증명서 생성 중...
        </span>
      ) : (
        "🌱 ESG 탄소배출 증명서 다운로드"
      )}
    </Button>
  );
};
