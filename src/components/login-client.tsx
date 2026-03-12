"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

type DemoAccount = {
  label: string;
  email: string;
  password: string;
  target: string;
};

const demoAccounts: DemoAccount[] = [
  {
    label: "플랫폼 운영자",
    email: "platform@flowhr.dev",
    password: "flowhr123!",
    target: "/platform/console",
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

export function LoginClient() {
  const router = useRouter();
  const [email, setEmail] = useState("admin@acme.flowhr.dev");
  const [password, setPassword] = useState("flowhr123!");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleLogin(nextEmail = email, nextPassword = password, target?: string) {
    setLoading(true);
    setMessage("");

    const response = await fetch("/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: nextEmail,
        password: nextPassword,
      }),
    });

    const data = (await response.json()) as { ok: boolean; message?: string };
    setLoading(false);

    if (!data.ok) {
      setMessage(data.message ?? "로그인에 실패했습니다.");
      return;
    }

    router.push(target ?? "/admin/home");
    router.refresh();
  }

  return (
    <div className="login-shell">
      <div className="login-brand">
        <div className="login-brand-logo">FlowHR</div>
        <h2>
          하나의 계정으로
          <br />
          모든 HR 업무를
        </h2>
        <p>
          근태, 휴가, 결재, 문서, 급여, 평가까지.
          <br />
          하나의 플랫폼에서 모든 HR 업무를 처리하세요.
        </p>
      </div>
      <div className="login-form-panel">
        <h1>로그인</h1>
        <p className="login-desc">이메일과 비밀번호를 입력하세요</p>
        <div className="login-form">
          <div className="form-group">
            <label className="form-label">이메일</label>
            <input className="form-input" value={email} onChange={(event) => setEmail(event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">비밀번호</label>
            <input
              className="form-input"
              type="password"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
            />
          </div>
          <button className="login-submit" onClick={() => handleLogin()}>
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
  );
}
