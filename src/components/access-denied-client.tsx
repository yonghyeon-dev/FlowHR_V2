"use client";

import Link from "next/link";

type Props = {
  title?: string;
  description?: string;
};

export function AccessDeniedClient({
  title = "이 영역에 접근할 권한이 없습니다.",
  description = "현재 세션 역할로는 이 화면을 열 수 없습니다. 역할을 바꾸거나 홈으로 돌아가세요.",
}: Props) {
  return (
    <div className="app-root office-tone">
      <main className="access-denied-layout">
        <section className="access-denied-card">
          <p className="eyebrow">Access Control</p>
          <h1>{title}</h1>
          <p>{description}</p>
          <div className="access-denied-actions">
            <Link className="action-button" href="/">
              홈으로 이동
            </Link>
            <Link className="inline-link-button" href="/platform/overview">
              Platform
            </Link>
            <Link className="inline-link-button" href="/setup">
              Setup
            </Link>
          </div>
        </section>
      </main>
    </div>
  );
}
