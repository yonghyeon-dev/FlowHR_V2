"use client";

import { useMemo, useState } from "react";

import { AppButton, Card, DataTable, KpiRow, PageHeader, QueueList, StatRows, type Tone } from "@/components/primitives";
import type { DocumentRecord, RequestRecord, Tenant } from "@/lib/domain/types";

export function EmployeeHome({
  tenant,
  requests,
  documents,
}: {
  tenant: Tenant;
  requests: RequestRecord[];
  documents: DocumentRecord[];
}) {
  const isOffice = tenant.pack === "office";
  return (
    <>
      <PageHeader
        breadcrumb={["Employee", tenant.pack, "Home"]}
        title={isOffice ? "오피스 직원 홈" : "리테일 직원 홈"}
        subtitle={
          isOffice
            ? "오늘 처리해야 할 요청, 문서, 일정을 우선으로 보여줍니다."
            : "오늘 근무와 체크인, 시프트 변경, 현장 공지를 우선으로 보여줍니다."
        }
      />
      <KpiRow
        items={
          isOffice
            ? [
                { eyebrow: "오늘 상태", label: "근무 중", value: "09:02 - 18:00", tone: "success" },
                { eyebrow: "요청", label: "진행 중", value: String(requests.length), tone: "warning" },
                { eyebrow: "문서", label: "서명 필요", value: String(documents.filter((item) => item.status === "pending_signature").length), tone: "critical" },
              ]
            : [
                { eyebrow: "오늘 근무", label: "오픈 시프트", value: "10:00 - 19:00", tone: "success" },
                { eyebrow: "시프트 변경", label: "응답 필요", value: String(requests.length), tone: "warning" },
                { eyebrow: "문서", label: "확인 필요", value: String(documents.length), tone: "neutral" },
              ]
        }
      />
      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="오늘 할 일">
          <QueueList
            items={[
              {
                tone: "critical",
                title: documents[0]?.title ?? "서명 문서 없음",
                meta: "전자 문서 서명이 필요합니다.",
              },
              {
                tone: "warning",
                title: requests[0]?.title ?? "제출된 요청 없음",
                meta: "현재 요청 상태를 다시 확인하세요.",
              },
              {
                tone: "neutral",
                title: isOffice ? "금주 일정 확인" : "오늘 시프트 확인",
                meta: isOffice ? "회의와 1:1 일정을 확인하세요." : "매장 오픈/마감 시간과 교대 현황을 확인하세요.",
              },
            ]}
          />
        </Card>
        <Card title="내 요약">
          <StatRows
            rows={[
              { label: "진행 중 요청", value: `${requests.length}건`, tone: "warning" },
              { label: "서명 대기 문서", value: `${documents.filter((item) => item.status === "pending_signature").length}건`, tone: "critical" },
              { label: "이번 주 지각", value: isOffice ? "0회" : "1회", tone: "neutral" },
            ]}
          />
        </Card>
      </div>
    </>
  );
}

export function EmployeeRequests({ requests }: { requests: RequestRecord[] }) {
  const [items, setItems] = useState(requests);
  const [category, setCategory] = useState("leave");
  const [title, setTitle] = useState("연차 요청");
  const [reason, setReason] = useState("개인 일정");
  const [message, setMessage] = useState("");

  async function handleSubmit() {
    const response = await fetch("/api/employee/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        category,
        title,
        reason,
      }),
    });

    const data = (await response.json()) as { ok: boolean; record?: RequestRecord; message?: string };
    if (!data.ok || !data.record) {
      setMessage(data.message ?? "요청 제출에 실패했습니다.");
      return;
    }

    setItems((prev) => [data.record!, ...prev]);
    setMessage("요청이 제출되었습니다.");
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Employee", "Requests"]}
        title="요청 허브"
        subtitle="휴가, 정정, 일반 요청을 직접 제출하고 현재 상태를 확인합니다."
      />
      <div className="content-grid cols-2">
        <Card title="새 요청 작성" right={<AppButton onClick={handleSubmit}>제출</AppButton>}>
          <div className="form-group">
            <label className="form-label">유형</label>
            <select className="form-select" value={category} onChange={(event) => setCategory(event.target.value)}>
              <option value="leave">leave</option>
              <option value="attendance_correction">attendance_correction</option>
              <option value="general">general</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">제목</label>
            <input className="form-input" value={title} onChange={(event) => setTitle(event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">사유</label>
            <textarea className="form-textarea" rows={4} value={reason} onChange={(event) => setReason(event.target.value)} />
          </div>
          {message ? <p style={{ color: "var(--brand-primary)" }}>{message}</p> : null}
        </Card>
        <Card title="최근 요청">
          <DataTable
            columns={["제목", "유형", "상태"]}
            rows={items.map((item) => [item.title, item.category, item.status])}
          />
        </Card>
      </div>
    </>
  );
}

export function EmployeeDocuments({ documents }: { documents: DocumentRecord[] }) {
  const [items, setItems] = useState(documents);
  const [message, setMessage] = useState("");

  async function handleSign(documentId: string) {
    const response = await fetch("/api/employee/documents/sign", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ documentId }),
    });

    const data = (await response.json()) as { ok: boolean; record?: DocumentRecord; message?: string };
    if (!data.ok || !data.record) {
      setMessage(data.message ?? "문서 서명에 실패했습니다.");
      return;
    }

    setItems((prev) => prev.map((item) => (item.id === documentId ? data.record! : item)));
    setMessage("문서 서명이 완료되었습니다.");
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Employee", "Documents"]}
        title="문서와 서명"
        subtitle="서명 대기 문서를 확인하고 완료 상태를 관리합니다."
      />
      <Card title="문서 목록">
        <DataTable
          columns={["문서", "상태", "처리"]}
          rows={items.map((item) => [
            item.title,
            item.status,
            item.status === "pending_signature" ? (
              <AppButton key={`${item.id}-sign`} onClick={() => handleSign(item.id)}>
                서명
              </AppButton>
            ) : (
              <span key={`${item.id}-done`} className="badge success">
                완료
              </span>
            ),
          ])}
        />
        {message ? <p style={{ color: "var(--brand-primary)", marginTop: "12px" }}>{message}</p> : null}
      </Card>
    </>
  );
}

export function EmployeeInbox({
  requests,
  documents,
}: {
  requests: RequestRecord[];
  documents: DocumentRecord[];
}) {
  const items = useMemo(
    () => [
      ...requests.slice(0, 3).map((request) => ({
        tone: (request.status === "rejected" ? "warning" : "neutral") as Tone,
        title: `${request.title} 상태 변경`,
        meta: `${request.status} · ${new Date(request.updatedAt).toLocaleString("ko-KR")}`,
      })),
      ...documents.slice(0, 2).map((document) => ({
        tone: (document.status === "pending_signature" ? "critical" : "success") as Tone,
        title: `${document.title}`,
        meta: `${document.status} · ${new Date(document.updatedAt).toLocaleString("ko-KR")}`,
      })),
    ],
    [documents, requests],
  );

  return (
    <>
      <PageHeader
        breadcrumb={["Employee", "Inbox"]}
        title="인박스"
        subtitle="요청 상태 변경, 문서 서명, 운영 공지를 한 화면에서 확인합니다."
      />
      <Card title="최신 알림">
        <QueueList items={items} />
      </Card>
    </>
  );
}
