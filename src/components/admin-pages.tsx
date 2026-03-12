"use client";

import { useMemo, useState } from "react";

import { AppButton, Card, DataTable, KpiRow, PageHeader, QueueList, StatRows } from "@/components/primitives";
import type { ApprovalRecord, RequestRecord, SettingsSnapshot, Tenant } from "@/lib/domain/types";

export function AdminHome({
  tenant,
  pendingRequests,
  documentCount,
}: {
  tenant: Tenant;
  pendingRequests: RequestRecord[];
  documentCount: number;
}) {
  const isOffice = tenant.pack === "office";

  return (
    <>
      <PageHeader
        breadcrumb={["Admin", tenant.pack, "Home"]}
        title={isOffice ? "오피스 관리자 홈" : "리테일 관리자 홈"}
        subtitle={
          isOffice
            ? "승인, 문서, 근태 예외를 먼저 처리하는 관리자 허브입니다."
            : "결원, 브레이크 위험, 시프트 변경을 먼저 처리하는 관리자 허브입니다."
        }
      />

      <KpiRow
        items={
          isOffice
            ? [
                { eyebrow: "승인 대기", label: "오늘 확인 필요", value: String(pendingRequests.length), tone: "critical" },
                { eyebrow: "문서", label: "서명 대기", value: String(documentCount), tone: "warning" },
                { eyebrow: "근태", label: "예외 케이스", value: "9", tone: "neutral" },
                { eyebrow: "설정", label: "최근 변경", value: "1", tone: "success" },
              ]
            : [
                { eyebrow: "결원", label: "대체 필요", value: "4", tone: "critical" },
                { eyebrow: "브레이크", label: "위험 알림", value: "6", tone: "warning" },
                { eyebrow: "출근", label: "미체크", value: "5", tone: "neutral" },
                { eyebrow: "요청", label: "시프트 변경", value: String(pendingRequests.length), tone: "success" },
              ]
        }
      />

      <div className="content-grid cols-2-1" style={{ marginTop: "24px" }}>
        <Card title="오늘 처리 큐">
          <QueueList
            items={pendingRequests.slice(0, 4).map((request) => ({
              tone: request.status === "submitted" ? "critical" : "neutral",
              title: request.title,
              meta: `${request.category} · ${request.reason}`,
            }))}
          />
        </Card>

        <Card title="조직 스냅샷">
          <StatRows
            rows={
              isOffice
                ? [
                    { label: "승인 SLA 초과", value: "3건", tone: "warning" },
                    { label: "서명 대기 문서", value: `${documentCount}건`, tone: "warning" },
                    { label: "유연근무 예외", value: "2건", tone: "neutral" },
                  ]
                : [
                    { label: "브레이크 위험", value: "2개 매장", tone: "warning" },
                    { label: "피크타임 결원", value: "1개 매장", tone: "critical" },
                    { label: "시프트 교체 요청", value: `${pendingRequests.length}건`, tone: "neutral" },
                  ]
            }
          />
        </Card>
      </div>
    </>
  );
}

export function AdminAttendance({ tenant }: { tenant: Tenant }) {
  const isOffice = tenant.pack === "office";

  return (
    <>
      <PageHeader
        breadcrumb={["Admin", tenant.pack, "Attendance"]}
        title={isOffice ? "근태 예외 대시보드" : "매장 운영 근태 대시보드"}
        subtitle={
          isOffice
            ? "오피스형 조직의 지각, 누락, 초과근무 위험을 모니터링합니다."
            : "리테일 매장의 미체크인, 브레이크 위험, 시프트 공백을 모니터링합니다."
        }
      />

      <div className="content-grid cols-2">
        <Card title="예외 목록">
          <QueueList
            items={
              isOffice
                ? [
                    { tone: "critical", title: "체크아웃 누락 4건", meta: "개발팀 2건, 영업팀 2건" },
                    { tone: "warning", title: "초과근무 경고 3건", meta: "주 52시간 한계치 근접" },
                    { tone: "neutral", title: "근무 기록 보정 2건", meta: "입장 로그와 출퇴근 기록 불일치" },
                  ]
                : [
                    { tone: "critical", title: "오픈 시프트 결원 2건", meta: "강남점, 사의점" },
                    { tone: "warning", title: "브레이크 미준수 위험 4건", meta: "피크타임 직전" },
                    { tone: "neutral", title: "미체크인 직원 5명", meta: "10분 이상 미체크인" },
                  ]
            }
          />
        </Card>

        <Card title="운영 요약">
          <StatRows
            rows={
              isOffice
                ? [
                    { label: "오늘 지각", value: "8건", tone: "warning" },
                    { label: "체크아웃 누락", value: "4건", tone: "critical" },
                    { label: "보정 요청", value: "3건", tone: "neutral" },
                  ]
                : [
                    { label: "결원 매장", value: "2개", tone: "critical" },
                    { label: "브레이크 위험", value: "4건", tone: "warning" },
                    { label: "시프트 조정 필요", value: "3건", tone: "neutral" },
                  ]
            }
          />
        </Card>
      </div>
    </>
  );
}

export function AdminWorkflow({
  requests,
  approvals,
  canApprove,
}: {
  requests: RequestRecord[];
  approvals: ApprovalRecord[];
  canApprove: boolean;
}) {
  const [items, setItems] = useState(requests);
  const [message, setMessage] = useState("");
  const pending = useMemo(() => items.filter((item) => item.status === "submitted"), [items]);

  async function handleDecision(requestId: string, action: "approve" | "reject") {
    const response = await fetch("/api/admin/approvals", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        requestId,
        action,
      }),
    });

    const data = (await response.json()) as { ok: boolean; record?: RequestRecord; message?: string };
    if (!data.ok || !data.record) {
      setMessage(data.message ?? "처리에 실패했습니다.");
      return;
    }

    setItems((prev) => prev.map((item) => (item.id === requestId ? data.record! : item)));
    setMessage(action === "approve" ? "요청을 승인했습니다." : "요청을 반려했습니다.");
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Admin", "Workflow"]}
        title="결재와 승인"
        subtitle="직원 요청의 현재 상태를 확인하고 승인 또는 반려를 처리합니다."
      />

      <Card title="승인 대기 요청" right={<span className="badge warning">{pending.length}건</span>}>
        <DataTable
          columns={["제목", "유형", "상태", "처리"]}
          rows={items.map((request) => [
            <div key={`${request.id}-title`}>
              <div className="font-semibold">{request.title}</div>
              <div className="text-sm text-muted">{request.reason}</div>
            </div>,
            request.category,
            request.status,
            request.status === "submitted" ? (
              <div key={`${request.id}-action`} style={{ display: "flex", gap: "8px" }}>
                <AppButton tone="primary" onClick={() => handleDecision(request.id, "approve")} disabled={!canApprove}>
                  승인
                </AppButton>
                <AppButton tone="ghost" onClick={() => handleDecision(request.id, "reject")} disabled={!canApprove}>
                  반려
                </AppButton>
              </div>
            ) : (
              <span key={`${request.id}-done`} className="text-sm text-muted">
                처리 완료
              </span>
            ),
          ])}
        />
        {message ? <p style={{ marginTop: "12px", color: "var(--brand-primary)" }}>{message}</p> : null}
      </Card>

      <div style={{ marginTop: "24px" }}>
        <Card title="최근 승인 로그">
          <QueueList
            items={approvals.slice(0, 6).map((approval) => ({
              tone: approval.action === "approve" ? "success" : "warning",
              title: approval.action === "approve" ? "승인 처리" : "반려 처리",
              meta: new Date(approval.createdAt).toLocaleString("ko-KR"),
            }))}
          />
        </Card>
      </div>
    </>
  );
}

export function AdminSettings({
  settings,
  features,
}: {
  settings: SettingsSnapshot | null;
  features: string[];
}) {
  const [companyName, setCompanyName] = useState(settings?.companyName ?? "");
  const [businessNumber, setBusinessNumber] = useState(settings?.businessNumber ?? "");
  const [timezone, setTimezone] = useState(settings?.timezone ?? "Asia/Seoul");
  const [workStart, setWorkStart] = useState(settings?.workStart ?? "09:00");
  const [workEnd, setWorkEnd] = useState(settings?.workEnd ?? "18:00");
  const [message, setMessage] = useState("");

  async function handleSave() {
    const response = await fetch("/api/admin/settings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        companyName,
        businessNumber,
        timezone,
        workStart,
        workEnd,
      }),
    });

    const data = (await response.json()) as { ok: boolean; message?: string };
    setMessage(data.ok ? "설정을 저장했습니다." : data.message ?? "설정 저장에 실패했습니다.");
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Admin", "Settings"]}
        title="설정"
        subtitle="회사 정보, 역할/권한, 기능팩 기본값을 관리합니다."
      />

      <div className="content-grid cols-2">
        <Card title="회사 기본 정보" right={<AppButton onClick={handleSave}>저장</AppButton>}>
          <div className="form-group">
            <label className="form-label">회사명</label>
            <input className="form-input" value={companyName} onChange={(event) => setCompanyName(event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">사업자등록번호</label>
            <input
              className="form-input"
              value={businessNumber}
              onChange={(event) => setBusinessNumber(event.target.value)}
            />
          </div>
          <div className="form-group">
            <label className="form-label">시간대</label>
            <input className="form-input" value={timezone} onChange={(event) => setTimezone(event.target.value)} />
          </div>
          <div className="content-grid cols-2">
            <div className="form-group">
              <label className="form-label">근무 시작</label>
              <input className="form-input" value={workStart} onChange={(event) => setWorkStart(event.target.value)} />
            </div>
            <div className="form-group">
              <label className="form-label">근무 종료</label>
              <input className="form-input" value={workEnd} onChange={(event) => setWorkEnd(event.target.value)} />
            </div>
          </div>
          {message ? <p style={{ color: "var(--brand-primary)" }}>{message}</p> : null}
        </Card>

        <Card title="활성 기능">
          <QueueList
            items={features.map((feature) => ({
              tone: "neutral",
              title: feature,
              meta: "현재 tenant에 활성화된 기능입니다.",
            }))}
          />
        </Card>
      </div>
    </>
  );
}
