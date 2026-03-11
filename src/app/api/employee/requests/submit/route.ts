import { NextResponse } from "next/server";
import type { ActionSimulationRequest } from "@/lib/api/types";
import {
  createActionFailure,
  createActionSuccess,
  pickLocale,
} from "@/lib/api/action-responses";
import { recordActionEvent } from "@/lib/api/mock";
import { createRequestRecord } from "@/lib/server/store";
import { canAccessAction, getServerSession } from "@/lib/server/session";

export async function POST(request: Request) {
  const body = (await request.json()) as ActionSimulationRequest;
  const locale = pickLocale(body.locale);
  const session = await getServerSession();

  if (!canAccessAction(session.role, "request_submit")) {
    const failure = createActionFailure("access_denied", locale);
    return NextResponse.json(failure, { status: 403 });
  }

  if (body.scenario === "success") {
    const success = createActionSuccess("request_submit", locale);
    recordActionEvent(session.tenantId, "request", { ...body, actionType: "request_submit", actor: "employee" }, success);
    createRequestRecord({
      id: success.resourceId,
      tenantId: session.tenantId,
      pack: body.pack ?? "office",
      category: body.pack === "retail" ? "attendance" : "leave",
      title:
        body.pack === "retail"
          ? "출퇴근 정정 요청이 제출되었습니다."
          : "휴가 요청이 제출되었습니다.",
      status: "submitted",
      createdAt: new Date().toISOString(),
    });
    return NextResponse.json(success);
  }

  const failure = createActionFailure(body.scenario, locale);
  const status = body.scenario === "access_denied" ? 403 : body.scenario === "validation_error" ? 422 : 500;
  return NextResponse.json(failure, { status });
}
