import { NextResponse } from "next/server";
import type { ActionSimulationRequest } from "@/lib/api/types";
import {
  createActionFailure,
  createActionSuccess,
  pickLocale,
} from "@/lib/api/action-responses";
import { recordActionEvent } from "@/lib/api/mock";
import { canAccessAction, getServerSession } from "@/lib/server/session";

export async function POST(request: Request) {
  const body = (await request.json()) as ActionSimulationRequest;
  const locale = pickLocale(body.locale);
  const session = await getServerSession();

  if (!canAccessAction(session.role, "signature_submit")) {
    const failure = createActionFailure("access_denied", locale);
    return NextResponse.json(failure, { status: 403 });
  }

  if (body.scenario === "success") {
    const success = createActionSuccess("signature_submit", locale);
    recordActionEvent("signature", { ...body, actionType: "signature_submit", actor: "employee" }, success);
    return NextResponse.json(success);
  }

  const failure = createActionFailure(body.scenario, locale);
  const status = body.scenario === "access_denied" ? 403 : body.scenario === "validation_error" ? 422 : 500;
  return NextResponse.json(failure, { status });
}
