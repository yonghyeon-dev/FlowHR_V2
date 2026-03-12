import { NextResponse } from "next/server";

import { canAccessField, canAccessRole, canPerformAction, requireSession } from "@/lib/server/auth";
import { listAuditLogs, listTenants, updateTenantConfig } from "@/lib/server/dev-store";

export async function GET() {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }
  if (!canAccessRole(session.role, "platform")) {
    return NextResponse.json({ ok: false, message: "플랫폼 운영 영역 접근 권한이 없습니다." }, { status: 403 });
  }

  return NextResponse.json({
    ok: true,
    tenants: listTenants(),
    auditLogs: listAuditLogs(12),
  });
}

export async function PATCH(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }
  if (!canPerformAction(session.role, "platform.tenants.manage")) {
    return NextResponse.json({ ok: false, message: "테넌트 운영 권한이 없습니다." }, { status: 403 });
  }

  const body = (await request.json()) as {
    tenantId?: string;
    pack?: "office" | "retail";
    status?: "active" | "trial" | "grace";
    enabledFeatures?: string[];
  };

  if (!body.tenantId) {
    return NextResponse.json({ ok: false, message: "tenantId가 필요합니다." }, { status: 400 });
  }

  const requestedFields = [
    body.pack ? "tenant.pack" : null,
    body.status ? "tenant.status" : null,
    body.enabledFeatures ? "tenant.enabledFeatures" : null,
  ].filter(Boolean) as Array<"tenant.pack" | "tenant.status" | "tenant.enabledFeatures">;

  if (requestedFields.some((field) => !canAccessField(session.role, field))) {
    return NextResponse.json({ ok: false, message: "테넌트 필드 수정 권한이 없습니다." }, { status: 403 });
  }

  const tenant = updateTenantConfig(
    body.tenantId,
    {
      pack: body.pack,
      status: body.status,
      enabledFeatures: body.enabledFeatures,
    },
    session.user,
  );

  if (!tenant) {
    return NextResponse.json({ ok: false, message: "테넌트를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, tenant });
}
