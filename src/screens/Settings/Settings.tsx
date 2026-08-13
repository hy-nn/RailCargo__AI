import { Bell, Building2, Pencil, Star } from "lucide-react";
import { TopNavigation } from "../../components/layout/TopNavigation";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Switch } from "../../components/ui/switch";

export const Settings = (): JSX.Element => {
  return (
    <main className="min-h-screen w-full bg-[#f5f6f8]">
      <TopNavigation activeTabLabel="홈" />

      <div className="mx-auto flex w-full max-w-[1240px] flex-col gap-6 px-6 py-8">
        <section className="space-y-2">
          <h1 className="text-[38px] font-extrabold leading-[1.3] tracking-[-0.02em] text-[#0b1c30]">
            설정
          </h1>
          <p className="text-[18px] font-bold leading-[1.6] text-[#424751]">
            계정 정보와 알림, 선호하는 운송 조건을 간편하게 관리해보세요.
          </p>
        </section>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <CardContent className="space-y-6 p-8">
            <div className="flex items-center justify-between">
              <h2 className="flex items-center gap-2 text-[26px] font-extrabold text-[#0b1c30]">
                <Building2 className="h-6 w-6 text-[#005bac]" />
                회사 정보
              </h2>
              <Button
                type="button"
                variant="outline"
                className="h-10 rounded-xl border-[#c2c6d3] px-4 text-[15px] font-extrabold text-[#005bac] hover:bg-[#f7faff] hover:text-[#005bac]"
              >
                <Pencil className="h-4 w-4 text-[#005bac]" />
                수정
              </Button>
            </div>

            <dl className="grid grid-cols-1 gap-6 md:grid-cols-3 md:gap-8">
              <div className="space-y-1">
                <dt className="text-[13px] font-bold text-[#5f6875]">회사명</dt>
                <dd className="m-0 text-[20px] font-extrabold text-[#0b1c30]">
                  싱크물류
                </dd>
              </div>
              <div className="space-y-1 md:border-l md:border-[#e5eaf1] md:pl-8">
                <dt className="text-[13px] font-bold text-[#5f6875]">
                  담당자명
                </dt>
                <dd className="m-0 text-[20px] font-extrabold text-[#0b1c30]">
                  김유진
                </dd>
              </div>
              <div className="space-y-1 md:border-l md:border-[#e5eaf1] md:pl-8">
                <dt className="text-[13px] font-bold text-[#5f6875]">이메일</dt>
                <dd className="m-0 text-[20px] font-extrabold text-[#0b1c30]">
                  demo@synclogis.com
                </dd>
              </div>
            </dl>
          </CardContent>
        </Card>

        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
            <CardContent className="space-y-6 p-8">
              <h2 className="flex items-center gap-2 text-[26px] font-extrabold text-[#0b1c30]">
                <Bell className="h-6 w-6 text-[#005bac]" />
                알림 설정
              </h2>

              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#edf1f6] pb-4">
                  <span className="text-[17px] font-bold text-[#424751]">
                    배차 지연 알림
                  </span>
                  <Switch
                    checked
                    disabled
                    aria-label="배차 지연 알림"
                    className="h-6 w-12 border-0 bg-[#d3e4fe] px-1 disabled:opacity-100 data-[state=checked]:bg-[#005bac] [&amp;&gt;span]:h-4 [&amp;&gt;span]:w-4 [&amp;&gt;span]:data-[state=checked]:translate-x-6"
                  />
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-[17px] font-bold text-[#424751]">
                    신규 슬롯 알림
                  </span>
                  <Switch
                    checked={false}
                    disabled
                    aria-label="신규 슬롯 알림"
                    className="h-6 w-12 border-0 bg-[#d1d5db] px-1 disabled:opacity-100 data-[state=unchecked]:bg-[#d1d5db] [&amp;&gt;span]:h-4 [&amp;&gt;span]:w-4"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
            <CardContent className="space-y-6 p-8">
              <div className="flex items-center justify-between">
                <h2 className="flex items-center gap-2 text-[26px] font-extrabold text-[#0b1c30]">
                  <Star className="h-6 w-6 text-[#005bac]" />
                  선호 노선 관리
                </h2>
                <Button
                  type="button"
                  variant="outline"
                  className="h-10 rounded-xl border-[#c2c6d3] px-4 text-[15px] font-extrabold text-[#005bac] hover:bg-[#f7faff] hover:text-[#005bac]"
                >
                  <Pencil className="h-4 w-4 text-[#005bac]" />
                  관리
                </Button>
              </div>

              <div className="rounded-xl bg-[#eff4ff] p-4">
                <p className="flex items-center gap-2 text-[18px] font-extrabold text-[#0b1c30]">
                  <Star className="h-4 w-4 text-[#005bac]" />
                  부산신항 → 오봉
                </p>
              </div>
            </CardContent>
          </Card>
        </section>

        <Card className="rounded-2xl border border-[#d4dbe6] bg-white shadow-[0_2px_6px_rgba(0,0,0,0.04)]">
          <CardContent className="flex justify-center p-8">
            <Button
              type="button"
              variant="outline"
              className="h-11 rounded-xl border-[#c2c6d3] bg-white px-8 text-[17px] font-extrabold text-[#424751] hover:bg-white hover:text-[#424751]"
            >
              →] 로그아웃
            </Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );
};
