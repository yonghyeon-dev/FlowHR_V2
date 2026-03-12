import { NextResponse } from "next/server";

import { createSession } from "@/lib/server/auth";

export async function POST(request: Request) {
  const body = (await request.json()) as { email?: string; password?: string };

  if (!body.email || !body.password) {
    return NextResponse.json({ ok: false, message: "이메일과 비밀번호를 입력하세요." }, { status: 400 });
  }

  const session = await createSession(body.email, body.password);
  if (!session) {
    return NextResponse.json({ ok: false, message: "로그인 정보가 일치하지 않습니다." }, { status: 401 });
  }

  return NextResponse.json({ ok: true, session });
}
