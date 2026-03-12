import { NextResponse } from "next/server";

import { canAccessRole, requireSession } from "@/lib/server/auth";
import { listDocuments, signDocument } from "@/lib/server/dev-store";

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
    documents: listDocuments(session.tenantId),
  });
}

export async function POST(request: Request) {
  const session = await requireSession();
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인이 필요합니다." }, { status: 401 });
  }
  if (!canAccessRole(session.role, "employee")) {
    return NextResponse.json({ ok: false, message: "직원 영역 접근 권한이 없습니다." }, { status: 403 });
  }

  const body = (await request.json()) as {
    documentId?: string;
  };

  if (!body.documentId) {
    return NextResponse.json({ ok: false, message: "documentId가 필요합니다." }, { status: 400 });
  }

  const record = signDocument(body.documentId, session.user);
  if (!record) {
    return NextResponse.json({ ok: false, message: "문서를 찾을 수 없습니다." }, { status: 404 });
  }

  return NextResponse.json({ ok: true, record });
}
