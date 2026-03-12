"use client";

import { useRouter } from "next/navigation";
import { useRef, useState } from "react";

type DemoAccount = {
  label: string;
  email: string;
  password: string;
  target: string;
};

type LoginSession = {
  role: "platform_operator" | "tenant_admin" | "tenant_manager" | "tenant_employee";
};

const demoAccounts: DemoAccount[] = [
  {
    label: "플랫폼 운영자",
    email: "platform@flowhr.dev",
    password: "flowhr123!",
    target: "/platform/overview",
  },
  {
    label: "오피스 관리자",
    email: "admin@acme.flowhr.dev",
    password: "flowhr123!",
    target: "/admin/home",
  },
  {
    label: "오피스 직원",
    email: "employee@acme.flowhr.dev",
    password: "flowhr123!",
    target: "/employee/home",
  },
];

function defaultTarget(session?: LoginSession) {
  if (!session) return "/admin/home";
  if (session.role === "platform_operator") return "/platform/overview";
  if (session.role === "tenant_employee") return "/employee/home";
  return "/admin/home";
}

export function LoginClient() {
  const router = useRouter();
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const [email, setEmail] = useState("admin@acme.flowhr.dev");
  const [password, setPassword] = useState("flowhr123!");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(nextEmail?: string, nextPassword?: string, target?: string) {
    const resolvedEmail = nextEmail ?? emailRef.current?.value ?? email;
    const resolvedPassword = nextPassword ?? passwordRef.current?.value ?? password;

    setLoading(true);
    setMessage("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: resolvedEmail,
        password: resolvedPassword,
      }),
    });

    const data = (await response.json()) as {
      ok: boolean;
      message?: string;
      session?: LoginSession;
    };

    setLoading(false);

    if (!data.ok) {
      setMessage(data.message ?? "로그인에 실패했습니다.");
      return;
    }

    router.push(target ?? defaultTarget(data.session));
    router.refresh();
  }

  return (
    <div className="login-page">
      <div className="login-shell">
        <div className="login-brand">
          <div className="login-brand-logo">FlowHR</div>
          <h2>
            하나의 계정으로
            <br />
            모든 HR 업무를 시작하세요
          </h2>
          <p>
            근태, 휴가, 결재, 문서, 급여, 성과까지.
            <br />
            하나의 플랫폼에서 모든 HR 업무를 처리할 수 있습니다.
          </p>
        </div>

        <div className="login-form-panel">
          <h1>로그인</h1>
          <p className="login-desc">이메일과 비밀번호를 입력해 주세요.</p>

          <div className="login-form">
            <div className="form-group">
              <label className="form-label">이메일</label>
              <input
                ref={emailRef}
                className="form-input"
                type="email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">비밀번호</label>
              <input
                ref={passwordRef}
                className="form-input"
                type="password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>

            <button className="login-submit" type="button" onClick={() => handleLogin()}>
              {loading ? "로그인 중..." : "로그인"}
            </button>

            {message ? <p style={{ color: "var(--status-danger-solid)", marginTop: "12px" }}>{message}</p> : null}

            <div className="demo-access">
              <div className="demo-access-title">데모 계정 바로 진입</div>
              <div className="demo-links">
                {demoAccounts.map((account) => (
                  <button
                    key={account.email}
                    className="demo-link"
                    style={{ border: "none", background: "transparent" }}
                    onClick={() => {
                      setEmail(account.email);
                      setPassword(account.password);
                      handleLogin(account.email, account.password, account.target);
                    }}
                  >
                    <span>{account.label}</span>
                    <span className="demo-arrow">→</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
