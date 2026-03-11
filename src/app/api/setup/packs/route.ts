import { NextResponse } from "next/server";
import { createActionFailure, pickLocale } from "@/lib/api/action-responses";
import { getPackSetup, savePackSetup } from "@/lib/api/mock";
import type { PackSetupSaveRequest } from "@/lib/api/types";
import { canAccessAction, canAccessArea, getServerSession } from "@/lib/server/session";

export async function GET() {
  const session = await getServerSession();

  if (!canAccessArea(session.role, "setup")) {
    return NextResponse.json(createActionFailure("access_denied", "en"), { status: 403 });
  }

  return NextResponse.json(getPackSetup(session.tenantId));
}

export async function POST(request: Request) {
  const body = (await request.json()) as PackSetupSaveRequest;
  const locale = pickLocale(body.locale);
  const session = await getServerSession();

  if (!canAccessArea(session.role, "setup")) {
    return NextResponse.json(createActionFailure("access_denied", locale), { status: 403 });
  }

  if (!canAccessAction(session.role, "feature_selection_save")) {
    return NextResponse.json(createActionFailure("access_denied", locale), { status: 403 });
  }

  return NextResponse.json(savePackSetup(session.tenantId, body));
}
