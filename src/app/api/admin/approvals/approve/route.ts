import { NextResponse } from "next/server";
import type { ActionSimulationRequest } from "@/lib/api/types";
import {
  createActionFailure,
  createActionSuccess,
  pickLocale,
} from "@/lib/api/action-responses";
import { recordActionEvent } from "@/lib/api/mock";
import { createApprovalRecord } from "@/lib/server/store";
import { canAccessAction, getServerSession } from "@/lib/server/session";

export async function POST(request: Request) {
  const body = (await request.json()) as ActionSimulationRequest;
  const locale = pickLocale(body.locale);
  const session = await getServerSession();

  if (!canAccessAction(session.role, "approval_approve")) {
    const failure = createActionFailure("access_denied", locale);
    return NextResponse.json(failure, { status: 403 });
  }

  if (body.scenario === "success") {
    const success = createActionSuccess("approval_approve", locale);
    const actor = session.role === "tenant_manager" ? "tenant_manager" : "tenant_admin";
    recordActionEvent(
      session.tenantId,
      "approval",
      {
        ...body,
        actionType: "approval_approve",
        actor,
      },
      success,
    );
    createApprovalRecord({
      id: success.resourceId,
      tenantId: session.tenantId,
      pack: body.pack ?? "office",
      requestType: body.pack === "retail" ? "shift" : "leave",
      title:
        body.pack === "retail"
          ? "시프트 변경 승인 처리가 완료되었습니다."
          : "휴가 승인 처리가 완료되었습니다.",
      actor,
      status: "approved",
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json(success);
  }

  const failure = createActionFailure(body.scenario, locale);
  const status = body.scenario === "access_denied" ? 403 : body.scenario === "validation_error" ? 422 : 500;
  return NextResponse.json(failure, { status });
}
