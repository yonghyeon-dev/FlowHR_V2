import { NextResponse } from "next/server";

import { canPerformAction, requireSession } from "@/lib/server/auth";
import { getLatestSettings, saveSettings } from "@/lib/server/dev-store";

export async function GET() {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }
  if (!canPerformAction(session.role, "admin.settings.update")) {
    return NextResponse.json({ ok: false, message: "설정 조회 권한이 없습니다." }, { status: 403 });
  }

  return NextResponse.json({
    ok: true,
    settings: getLatestSettings(session.tenantId),
  });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }
  if (!canPerformAction(session.role, "admin.settings.update")) {
    return NextResponse.json({ ok: false, message: "설정 수정 권한이 없습니다." }, { status: 403 });
  }

  const body = (await request.json()) as {
    companyName?: string;
    businessNumber?: string;
    timezone?: string;
    workStart?: string;
    workEnd?: string;
  };

  if (!body.companyName || !body.businessNumber || !body.timezone || !body.workStart || !body.workEnd) {
    return NextResponse.json({ ok: false, message: "필수 설정값이 누락되었습니다." }, { status: 400 });
  }

  const settings = saveSettings(
    session.tenantId,
    {
      companyName: body.companyName,
      businessNumber: body.businessNumber,
      timezone: body.timezone,
      workStart: body.workStart,
      workEnd: body.workEnd,
      updatedBy: session.user.id,
    },
    session.user,
  );

  return NextResponse.json({ ok: true, settings });
}
