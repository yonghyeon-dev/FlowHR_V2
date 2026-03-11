import { NextResponse } from "next/server";
import { getPackSetup, savePackSetup } from "@/lib/api/mock";
import type { PackSetupSaveRequest } from "@/lib/api/types";
import { canAccessAction, getServerSession } from "@/lib/server/session";

export async function GET() {
  return NextResponse.json(getPackSetup());
}

export async function POST(request: Request) {
  const body = (await request.json()) as PackSetupSaveRequest;
  const session = await getServerSession();

  if (!canAccessAction(session.role, "feature_selection_save")) {
    return NextResponse.json(
      {
        error: {
          code: "ACCESS_DENIED",
          message: body.locale === "en"
            ? "You do not have permission to save pack selections."
            : "팩 선택을 저장할 권한이 없습니다.",
        },
      },
      { status: 403 },
    );
  }
  return NextResponse.json(savePackSetup(body));
}
