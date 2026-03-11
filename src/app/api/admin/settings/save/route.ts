import { NextResponse } from "next/server";
import type { ActionSimulationRequest } from "@/lib/api/types";
import {
  createActionFailure,
  createActionSuccess,
  pickLocale,
} from "@/lib/api/action-responses";
import { recordActionEvent } from "@/lib/api/mock";
import { createSettingsSnapshot } from "@/lib/server/store";
import { canAccessAction, getServerSession } from "@/lib/server/session";

export async function POST(request: Request) {
  const body = (await request.json()) as ActionSimulationRequest;
  const locale = pickLocale(body.locale);
  const session = await getServerSession();

  if (!canAccessAction(session.role, "settings_save")) {
    const failure = createActionFailure("access_denied", locale);
    return NextResponse.json(failure, { status: 403 });
  }

  if (body.scenario === "success") {
    const success = createActionSuccess("settings_save", locale);
    recordActionEvent(session.tenantId, "settings", { ...body, actionType: "settings_save", actor: "tenant_admin" }, success);
    createSettingsSnapshot({
      id: success.resourceId,
      tenantId: session.tenantId,
      pack: body.pack ?? "office",
      scope: body.pack === "retail" ? "notification_policy" : "sensitive_scope",
      title:
        body.pack === "retail"
          ? "매장 운영 알림 기준이 저장되었습니다."
          : "민감 권한 범위 설정이 저장되었습니다.",
      actor: "tenant_admin",
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json(success);
  }

  const failure = createActionFailure(body.scenario, locale);
  const status = body.scenario === "access_denied" ? 403 : body.scenario === "validation_error" ? 422 : 500;
  return NextResponse.json(failure, { status });
}
