import { NextResponse } from "next/server";

import { canAccessRole, canPerformAction, requireSession } from "@/lib/server/auth";
import { createRequest, listRequests } from "@/lib/server/dev-store";

export async function GET() {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }
  if (!canAccessRole(session.role, "employee")) {
    return NextResponse.json({ ok: false, message: "직원 영역 접근 권한이 없습니다." }, { status: 403 });
  }

  return NextResponse.json({
    ok: true,
    requests: listRequests(session.tenantId),
  });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }
  if (!canPerformAction(session.role, "employee.requests.submit")) {
    return NextResponse.json({ ok: false, message: "요청 제출 권한이 없습니다." }, { status: 403 });
  }

  const body = (await request.json()) as {
    category?: string;
    title?: string;
    reason?: string;
  };

  if (!body.category || !body.title || !body.reason) {
    return NextResponse.json({ ok: false, message: "요청 정보가 누락되었습니다." }, { status: 400 });
  }

  const record = createRequest(session.tenantId, session.user, {
    category: body.category,
    title: body.title,
    reason: body.reason,
  });

  return NextResponse.json({ ok: true, record });
}
