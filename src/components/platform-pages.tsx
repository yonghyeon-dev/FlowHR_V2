"use client";

import { useMemo, useState } from "react";

import { AppButton, Card, DataTable, KpiRow, PageHeader, QueueList, StatRows } from "@/components/primitives";
import type { AuditLogRecord, Tenant } from "@/lib/domain/types";

type PlatformOverviewProps = {
  tenants: Tenant[];
  auditLogs: AuditLogRecord[];
};

function statusLabel(status: Tenant["status"]) {
  if (status === "active") return "활성";
  if (status === "trial") return "체험";
  return "유예";
}

function packLabel(pack: Tenant["pack"]) {
  return pack === "office" ? "Office Pack" : "Retail Pack";
}

export function PlatformOverview({ tenants, auditLogs }: PlatformOverviewProps) {
  const activeCount = tenants.filter((item) => item.status === "active").length;
  const trialCount = tenants.filter((item) => item.status === "trial").length;
  const graceCount = tenants.filter((item) => item.status === "grace").length;
  const paymentRiskCount = tenants.filter((item) => item.status !== "active").length;

  return (
    <>
      <PageHeader
        breadcrumb={["Platform", "Overview"]}
        title="플랫폼 개요"
        subtitle="오늘 처리해야 할 운영 리스크, 테넌트 상태 변화, 보안 검토 항목을 한 화면에서 확인합니다."
      />

      <KpiRow
        items={[
          { eyebrow: "테넌트", label: "활성 테넌트", value: String(activeCount), tone: "success" },
          { eyebrow: "체험", label: "체험 전환 대상", value: String(trialCount), tone: "warning" },
          { eyebrow: "결제", label: "유예/실패 위험", value: String(paymentRiskCount), tone: "critical" },
          { eyebrow: "감사", label: "오늘 감사 로그", value: String(auditLogs.length), tone: "neutral" },
        ]}
      />

      <div className="content-grid cols-2-1" style={{ marginTop: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Card title="운영 큐" right={<span className="badge warning">즉시 확인</span>}>
            <QueueList
              items={[
                { tone: "critical", title: "결제 실패 테넌트 2건", meta: "요금제 만료 전 복구 여부를 확인해야 합니다." },
                { tone: "warning", title: "체험 종료 예정 1건", meta: "Nova Team 온보딩 완료 후 전환 제안을 준비합니다." },
                { tone: "warning", title: "SSO 오류 증가", meta: "Acme Corp 로그인을 재점검하고 공지를 검토합니다." },
                { tone: "neutral", title: "기능 플래그 변경 요청", meta: "리테일 팩 고급 규칙 활성화 검토가 필요합니다." },
              ]}
            />
          </Card>

          <Card title="최근 테넌트 변경">
            <DataTable
              columns={["테넌트", "팩", "상태", "기능 수"]}
              rows={tenants.map((tenant) => [
                tenant.name,
                packLabel(tenant.pack),
                statusLabel(tenant.status),
                `${tenant.enabledFeatures.length}개`,
              ])}
            />
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Card title="플랫폼 헬스">
            <StatRows
              rows={[
                { label: "API 성공률", value: "99.7%", tone: "success" },
                { label: "Webhook 전달 성공률", value: "98.2%", tone: "success" },
                { label: "SSO 로그인 오류", value: "18건", tone: "warning" },
                { label: "동기화 지연", value: "12분", tone: "warning" },
                { label: "유예 계정", value: `${graceCount}건`, tone: graceCount > 0 ? "critical" : "success" },
              ]}
            />
          </Card>

          <Card title="감사 로그" right={<span className="badge info">최근 10건</span>}>
            <QueueList
              items={auditLogs.slice(0, 6).map((log) => ({
                tone:
                  log.eventType === "approval_reject" || log.eventType === "tenant_update"
                    ? "warning"
                    : "neutral",
                title: log.message,
                meta: new Date(log.createdAt).toLocaleString("ko-KR"),
              }))}
            />
          </Card>
        </div>
      </div>
    </>
  );
}

export function PlatformTenants({ tenants }: { tenants: Tenant[] }) {
  const [items, setItems] = useState(tenants);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function patchTenant(tenantId: string, field: "pack" | "status", value: string) {
    setBusyId(tenantId);
    const current = items.find((item) => item.id === tenantId);
    const response = await fetch("/api/platform/tenants", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        tenantId,
        pack: field === "pack" ? value : current?.pack,
        status: field === "status" ? value : current?.status,
        enabledFeatures: current?.enabledFeatures,
      }),
    });
    const data = (await response.json()) as { ok: boolean; tenant?: Tenant };
    if (data.ok && data.tenant) {
      setItems((prev) => prev.map((item) => (item.id === tenantId ? data.tenant! : item)));
    }
    setBusyId(null);
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Platform", "Tenants"]}
        title="테넌트 운영"
        subtitle="테넌트의 팩, 상태, 기능 구성을 변경하고 운영 메타를 빠르게 점검합니다."
      />
      <Card title="테넌트 목록" right={<span className="badge info">{items.length}개</span>}>
        <DataTable
          columns={["테넌트", "팩", "상태", "기능", "반영"]}
          rows={items.map((tenant) => [
            <div key={`${tenant.id}-name`}>
              <div className="font-semibold">{tenant.name}</div>
              <div className="text-sm text-muted">{tenant.slug}</div>
            </div>,
            <select
              key={`${tenant.id}-pack`}
              className="form-select"
              value={tenant.pack}
              onChange={(event) => patchTenant(tenant.id, "pack", event.target.value)}
              disabled={busyId === tenant.id}
            >
              <option value="office">Office</option>
              <option value="retail">Retail</option>
            </select>,
            <select
              key={`${tenant.id}-status`}
              className="form-select"
              value={tenant.status}
              onChange={(event) => patchTenant(tenant.id, "status", event.target.value)}
              disabled={busyId === tenant.id}
            >
              <option value="active">활성</option>
              <option value="trial">체험</option>
              <option value="grace">유예</option>
            </select>,
            tenant.enabledFeatures.join(", "),
            busyId === tenant.id ? "반영 중..." : "저장됨",
          ])}
        />
      </Card>
    </>
  );
}

export function PlatformBilling({ tenants }: { tenants: Tenant[] }) {
  const [selectedTenantId, setSelectedTenantId] = useState(tenants[0]?.id ?? "");
  const selectedTenant = tenants.find((item) => item.id === selectedTenantId) ?? tenants[0];
  const [adjustmentMemo, setAdjustmentMemo] = useState("리테일 고급 규칙 할인 적용");
  const [message, setMessage] = useState("");

  function saveAdjustment() {
    setMessage(`${selectedTenant?.name ?? "선택 테넌트"} 수동 조정안을 저장했습니다.`);
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Platform", "Plans & Billing"]}
        title="플랜 · 과금 운영"
        subtitle="테넌트별 플랜, 과금 리스크, 수동 조정, 기능 플래그 예외를 운영합니다."
      />

      <KpiRow
        items={[
          { eyebrow: "MRR", label: "예상 월 청구", value: "₩18.4M", tone: "success" },
          { eyebrow: "리스크", label: "결제 실패", value: "2건", tone: "critical" },
          { eyebrow: "만료", label: "체험 종료 예정", value: "1건", tone: "warning" },
          { eyebrow: "예외", label: "기능 플래그 예외", value: "3건", tone: "neutral" },
        ]}
      />

      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="청구 계정과 리스크">
          <DataTable
            columns={["테넌트", "플랜", "청구 상태", "좌석"]}
            rows={tenants.map((tenant) => [
              tenant.name,
              packLabel(tenant.pack),
              tenant.status === "grace" ? "결제 실패" : tenant.status === "trial" ? "체험 중" : "정상",
              tenant.pack === "office" ? "180석" : "64석",
            ])}
          />
        </Card>

        <Card title="수동 조정 등록" right={<AppButton onClick={saveAdjustment}>저장</AppButton>}>
          <div className="form-group">
            <label className="form-label">대상 테넌트</label>
            <select className="form-select" value={selectedTenantId} onChange={(event) => setSelectedTenantId(event.target.value)}>
              {tenants.map((tenant) => (
                <option key={tenant.id} value={tenant.id}>
                  {tenant.name}
                </option>
              ))}
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">조정 메모</label>
            <textarea className="form-textarea" rows={4} value={adjustmentMemo} onChange={(event) => setAdjustmentMemo(event.target.value)} />
          </div>
          {message ? <p style={{ color: "var(--brand-primary)" }}>{message}</p> : null}
        </Card>
      </div>
    </>
  );
}

export function PlatformSupport({ tenants, auditLogs }: PlatformOverviewProps) {
  const [noticeTitle, setNoticeTitle] = useState("오늘 21:00 배포 안내");
  const [noticeTarget, setNoticeTarget] = useState("결제 오류 영향 테넌트");
  const [message, setMessage] = useState("");

  function sendNotice() {
    setMessage(`"${noticeTitle}" 공지를 ${noticeTarget} 대상으로 발송했습니다.`);
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Platform", "Support Ops"]}
        title="지원 운영"
        subtitle="지원 인박스, 이슈 추적, 공지 발송 흐름을 하나의 운영 화면으로 묶습니다."
      />

      <div className="content-grid cols-2" style={{ marginTop: "8px" }}>
        <Card title="지원 인박스">
          <QueueList
            items={[
              { tone: "critical", title: `${tenants[1]?.name ?? "Nova Team"} 결제 실패`, meta: "4시간째 미해결 / 매출 위험" },
              { tone: "warning", title: `${tenants[0]?.name ?? "Acme Corp"} SSO 설정 문의`, meta: "8시간째 응답 대기" },
              { tone: "neutral", title: "온보딩 지원 요청", meta: "신규 테넌트 문서 세팅 필요" },
            ]}
          />
        </Card>

        <Card title="공지 발송" right={<AppButton onClick={sendNotice}>발송</AppButton>}>
          <div className="form-group">
            <label className="form-label">공지 제목</label>
            <input className="form-input" value={noticeTitle} onChange={(event) => setNoticeTitle(event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">대상</label>
            <input className="form-input" value={noticeTarget} onChange={(event) => setNoticeTarget(event.target.value)} />
          </div>
          {message ? <p style={{ color: "var(--brand-primary)" }}>{message}</p> : null}
        </Card>
      </div>

      <div style={{ marginTop: "24px" }}>
        <Card title="최근 지원·감사 이벤트">
          <QueueList
            items={auditLogs.slice(0, 6).map((log) => ({
              tone: log.eventType === "tenant_update" ? "warning" : "neutral",
              title: log.message,
              meta: new Date(log.createdAt).toLocaleString("ko-KR"),
            }))}
          />
        </Card>
      </div>
    </>
  );
}

export function PlatformMonitoring({ tenants }: { tenants: Tenant[] }) {
  const officeCount = tenants.filter((item) => item.pack === "office").length;
  const retailCount = tenants.filter((item) => item.pack === "retail").length;

  return (
    <>
      <PageHeader
        breadcrumb={["Platform", "Monitoring"]}
        title="모니터링"
        subtitle="서비스 상태, 사용량 추이, 팩별 분포와 운영 리스크를 모니터링합니다."
      />

      <KpiRow
        items={[
          { eyebrow: "서비스", label: "API 지연", value: "182ms", tone: "success" },
          { eyebrow: "동기화", label: "실패 재시도", value: "14건", tone: "warning" },
          { eyebrow: "팩 분포", label: "Office / Retail", value: `${officeCount} / ${retailCount}`, tone: "neutral" },
          { eyebrow: "지원", label: "대기 티켓", value: "3건", tone: "warning" },
        ]}
      />

      <div className="content-grid cols-2" style={{ marginTop: "24px" }}>
        <Card title="서비스 상태">
          <StatRows
            rows={[
              { label: "API 성공률", value: "99.7%", tone: "success" },
              { label: "배치 완료율", value: "98.9%", tone: "success" },
              { label: "Webhook 경고", value: "2건", tone: "warning" },
              { label: "로그인 오류 증가", value: "1개 테넌트", tone: "warning" },
            ]}
          />
        </Card>

        <Card title="사용량 인사이트">
          <QueueList
            items={[
              { tone: "neutral", title: "Office Pack 주간 활성 87%", meta: "결재·문서 사용량이 증가했습니다." },
              { tone: "neutral", title: "Retail Pack 교대 변경 12건", meta: "주말 피크타임 영향이 반영되었습니다." },
              { tone: "warning", title: "결재 SLA 지연", meta: "Acme Corp 승인 평균 9.2시간" },
            ]}
          />
        </Card>
      </div>
    </>
  );
}

export function PlatformSecurity({ auditLogs }: { auditLogs: AuditLogRecord[] }) {
  const [stepUpUser, setStepUpUser] = useState("ops@flowhr.dev");
  const [message, setMessage] = useState("");

  function runStepUp() {
    setMessage(`${stepUpUser} 계정에 재인증을 요청했습니다.`);
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Platform", "Audit & Security"]}
        title="감사 · 보안"
        subtitle="운영자 감사 로그, 민감 액션 검토, 재인증과 세션 통제를 관리합니다."
      />

      <div className="content-grid cols-2" style={{ marginTop: "8px" }}>
        <Card title="감사 로그">
          <QueueList
            items={auditLogs.slice(0, 8).map((log) => ({
              tone:
                log.eventType === "approval_reject" || log.eventType === "tenant_update"
                  ? "warning"
                  : "neutral",
              title: log.message,
              meta: `${log.actorRole} · ${new Date(log.createdAt).toLocaleString("ko-KR")}`,
            }))}
          />
        </Card>

        <Card title="승격 인증과 세션 통제" right={<AppButton onClick={runStepUp}>재인증 요청</AppButton>}>
          <div className="form-group">
            <label className="form-label">대상 운영자</label>
            <input className="form-input" value={stepUpUser} onChange={(event) => setStepUpUser(event.target.value)} />
          </div>
          <StatRows
            rows={[
              { label: "오늘 민감 권한 변경", value: "2건", tone: "warning" },
              { label: "비정상 로그인 시도", value: "4건", tone: "critical" },
              { label: "MFA 미준수 계정", value: "0건", tone: "success" },
            ]}
          />
          {message ? <p style={{ color: "var(--brand-primary)", marginTop: "12px" }}>{message}</p> : null}
        </Card>
      </div>
    </>
  );
}

export function PlatformSettings() {
  const [baseDomain, setBaseDomain] = useState("flowhr.app");
  const [supportEmail, setSupportEmail] = useState("support@flowhr.app");
  const [message, setMessage] = useState("");

  function saveSettings() {
    setMessage("플랫폼 전역 설정을 저장했습니다.");
  }

  return (
    <>
      <PageHeader
        breadcrumb={["Platform", "Settings"]}
        title="플랫폼 설정"
        subtitle="전역 도메인, 지원 채널, 운영 기본값과 외부 연동 정보를 관리합니다."
      />

      <div className="content-grid cols-2" style={{ marginTop: "8px" }}>
        <Card title="전역 설정" right={<AppButton onClick={saveSettings}>저장</AppButton>}>
          <div className="form-group">
            <label className="form-label">기본 도메인</label>
            <input className="form-input" value={baseDomain} onChange={(event) => setBaseDomain(event.target.value)} />
          </div>
          <div className="form-group">
            <label className="form-label">지원 이메일</label>
            <input className="form-input" value={supportEmail} onChange={(event) => setSupportEmail(event.target.value)} />
          </div>
          {message ? <p style={{ color: "var(--brand-primary)" }}>{message}</p> : null}
        </Card>

        <Card title="연동 상태">
          <StatRows
            rows={[
              { label: "Supabase", value: "준비됨", tone: "success" },
              { label: "Prisma", value: "스키마 반영", tone: "success" },
              { label: "Vercel", value: "배포 가능", tone: "success" },
              { label: "SSO Provider", value: "설정 대기", tone: "warning" },
            ]}
          />
        </Card>
      </div>
    </>
  );
}

