"use client";

import { useState } from "react";

import { AppButton, Card, DataTable, KpiRow, PageHeader, QueueList, StatRows } from "@/components/primitives";
import type { AuditLogRecord, Tenant } from "@/lib/domain/types";

export function PlatformConsoleClient({
  tenants,
  auditLogs,
}: {
  tenants: Tenant[];
  auditLogs: AuditLogRecord[];
}) {
  const [items, setItems] = useState(tenants);
  const [busyId, setBusyId] = useState<string | null>(null);

  async function patchTenant(tenantId: string, field: "pack" | "status", value: string) {
    setBusyId(tenantId);
    const current = items.find((item) => item.id === tenantId);
    const response = await fetch("/api/platform/tenants", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
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
        breadcrumb={["Platform", "Console"]}
        title="플랫폼 콘솔"
        subtitle="테넌트 운영, 플랜 상태, 지원 이슈, 보안 이벤트를 한 곳에서 관리합니다."
      />

      <KpiRow
        items={[
          { eyebrow: "활성 테넌트", label: "운영 중", value: String(items.filter((item) => item.status === "active").length), tone: "critical" },
          { eyebrow: "체험 테넌트", label: "전환 필요", value: String(items.filter((item) => item.status === "trial").length), tone: "warning" },
          { eyebrow: "감사 이벤트", label: "오늘 로그", value: String(auditLogs.length), tone: "neutral" },
          {
            eyebrow: "팩 분포",
            label: "office / retail",
            value: `${items.filter((item) => item.pack === "office").length} / ${items.filter((item) => item.pack === "retail").length}`,
            tone: "success",
          },
        ]}
      />

      <div className="content-grid cols-2-1" style={{ marginTop: "24px" }}>
        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Card title="운영 큐" right={<span className="badge warning">실시간</span>}>
            <QueueList
              items={[
                { tone: "critical", title: "결제 실패 고객사 3건", meta: "체험 종료 또는 구독 실패 고객사를 우선 확인해야 합니다." },
                { tone: "warning", title: "민감 권한 변경 2건", meta: "오늘 발생한 역할 변경 이력을 검토해야 합니다." },
                { tone: "neutral", title: "리테일 팩 기능 구성 변경", meta: "Nova Team 매장형 기능 구성이 수정되었습니다." },
              ]}
            />
          </Card>

          <Card title="테넌트 운영">
            <DataTable
              columns={["테넌트", "Pack", "상태", "기능", "수정"]}
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
                  <option value="office">office</option>
                  <option value="retail">retail</option>
                </select>,
                <select
                  key={`${tenant.id}-status`}
                  className="form-select"
                  value={tenant.status}
                  onChange={(event) => patchTenant(tenant.id, "status", event.target.value)}
                  disabled={busyId === tenant.id}
                >
                  <option value="active">active</option>
                  <option value="trial">trial</option>
                  <option value="grace">grace</option>
                </select>,
                <span key={`${tenant.id}-features`} className="text-sm">
                  {tenant.enabledFeatures.join(", ")}
                </span>,
                <span key={`${tenant.id}-busy`} className="text-sm text-muted">
                  {busyId === tenant.id ? "저장 중..." : "적용 완료"}
                </span>,
              ])}
            />
          </Card>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <Card title="플랫폼 헬스">
            <StatRows
              rows={[
                { label: "API 성공률", value: "99.7%", tone: "success" },
                { label: "Webhook 전송", value: "98.2%", tone: "success" },
                { label: "SSO 인증", value: "94.5%", tone: "warning" },
                { label: "동기화 지연", value: "12분", tone: "warning" },
              ]}
            />
          </Card>

          <Card title="감사 로그" right={<AppButton tone="ghost">전체 보기</AppButton>}>
            <QueueList
              items={auditLogs.map((log) => ({
                tone:
                  log.eventType === "approval_reject" || log.eventType === "tenant_update"
                    ? "warning"
                    : "neutral",
                title: log.message,
                meta: `${log.actorRole} · ${new Date(log.createdAt).toLocaleString("ko-KR")}`,
              }))}
            />
          </Card>
        </div>
      </div>
    </>
  );
}
