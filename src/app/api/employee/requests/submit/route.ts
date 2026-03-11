import { NextResponse } from "next/server";
import type { ActionSimulationRequest } from "@/lib/api/types";
import {
  createActionFailure,
  createActionSuccess,
  pickLocale,
} from "@/lib/api/action-responses";

export async function POST(request: Request) {
  const body = (await request.json()) as ActionSimulationRequest;
  const locale = pickLocale(body.locale);

  if (body.scenario === "success") {
    return NextResponse.json(createActionSuccess("request_submit", locale));
  }

  const failure = createActionFailure(body.scenario, locale);
  const status = body.scenario === "access_denied" ? 403 : body.scenario === "validation_error" ? 422 : 500;
  return NextResponse.json(failure, { status });
}
