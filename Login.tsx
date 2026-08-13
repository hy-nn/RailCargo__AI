import { useState } from "react";
import { Lock, LogIn } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "../../components/ui/card";

export const Login = (): JSX.Element => {
  const navigate = useNavigate();
  const [companyName, setCompanyName] = useState("");
  const [contactEmail, setContactEmail] = useState("");

  const handleLogin = () => {
    const user = {
      userId: "USER-SYNC-001",
      userName: "김유진",
      companyName: "싱크물류",
      email: "demo@synclogis.com",
    };
    sessionStorage.setItem("loggedInUser", JSON.stringify(user));
    navigate("/02_home_loggedin");
  };

  return (
    <main className="grid min-h-screen w-full place-items-center bg-gradient-to-br from-[#eef5ff] via-[#f7fbff] to-[#eaf2ff] px-4">
      <Card className="w-full max-w-[460px] rounded-2xl border border-[#dce8ff] bg-white shadow-[0_18px_48px_rgba(31,91,192,0.14)]">
        <CardHeader className="space-y-4 pb-4">
          <div className="space-y-3 text-center">
            <span className="text-xs font-bold tracking-[0.2em] text-[#0b63ce]">
              KORAIL
            </span>
            <CardTitle className="text-[30px] font-extrabold tracking-tight text-[#102348]">
              Rail Cargo AI
            </CardTitle>
          </div>
          <p className="text-center text-[15px] font-semibold text-[#385074]">
            회사 정보를 입력해 Rail Cargo AI를 시작하세요.
          </p>
        </CardHeader>

        <CardContent className="space-y-5">
          <div className="space-y-2">
            <label
              htmlFor="companyName"
              className="block text-sm font-bold text-[#23385c]"
            >
              회사명
            </label>
            <input
              id="companyName"
              type="text"
              placeholder="예: 싱크물류"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#c8daf7] bg-white px-4 text-sm font-semibold text-[#1e2d4d] outline-none transition focus:border-[#3278db] focus:ring-2 focus:ring-[#3278db]/20"
            />
          </div>

          <div className="space-y-2">
            <label
              htmlFor="contactEmail"
              className="block text-sm font-bold text-[#23385c]"
            >
              담당자 이메일
            </label>
            <input
              id="contactEmail"
              type="email"
              placeholder="name@company.com"
              value={contactEmail}
              onChange={(e) => setContactEmail(e.target.value)}
              className="h-12 w-full rounded-xl border border-[#c8daf7] bg-white px-4 text-sm font-semibold text-[#1e2d4d] outline-none transition focus:border-[#3278db] focus:ring-2 focus:ring-[#3278db]/20"
            />
          </div>

          <Button
            type="button"
            onClick={handleLogin}
            className="h-12 w-full rounded-xl bg-[#0b63ce] text-sm font-extrabold text-white shadow-[0_12px_24px_rgba(11,99,206,0.32)] hover:bg-[#0958b8]"
          >
            <LogIn className="h-4 w-4" />
            로그인
          </Button>

          <p className="pt-1 text-center text-sm font-semibold text-[#4d6286]">
            처음이신가요?{" "}
            <a
              href="#"
              className="font-extrabold text-[#0b63ce] hover:underline"
            >
              회원 가입
            </a>
          </p>

          <div className="flex items-center justify-center gap-2 pt-1 text-xs font-semibold text-[#7f8da5]">
            <Lock className="h-3.5 w-3.5" />
            <span>Enterprise Security Protocol Active</span>
          </div>
        </CardContent>
      </Card>
    </main>
  );
};
