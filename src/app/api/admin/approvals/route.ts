import { NextResponse } from "next/server";

import { canAccessRole, requireSession } from "@/lib/server/auth";
import { approveRequest, listApprovals, listRequests } from "@/lib/server/dev-store";

export async function GET() {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }
  if (!canAccessRole(session.role, "admin")) {
    return NextResponse.json({ ok: false, message: "관리자 영역 접근 권한이 없습니다." }, { status: 403 });
  }

  return NextResponse.json({
    ok: true,
    approvals: listApprovals(session.tenantId),
    requests: listRequests(session.tenantId),
  });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }
  if (!canAccessRole(session.role, "admin")) {
    return NextResponse.json({ ok: false, message: "관리자 영역 접근 권한이 없습니다." }, { status: 403 });
  }

  const body = (await request.json()) as {
    requestId?: string;
    action?: "approve" | "reject";
  };

  if (!body.requestId || !body.action) {
    return NextResponse.json({ ok: false, message: "요청 정보가 누락되었습니다." }, { status: 400 });
  }

  const record = approveRequest(body.requestId, body.action, session.user);
  if (!record) {
    return NextResponse.json({ ok: false, message: "요청을 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, record });
}
