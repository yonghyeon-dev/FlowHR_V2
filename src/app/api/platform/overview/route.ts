import { NextResponse } from "next/server";
import { getPlatformOverview } from "@/lib/api/mock";
import { canAccessArea, getServerSession } from "@/lib/server/session";

export async function GET() {
  const session = await getServerSession();

  if (!canAccessArea(session.role, "platform")) {
    return NextResponse.json(
      {
        error: {
          code: "ACCESS_DENIED",
          message: "Only platform operators can access platform overview.",
        },
      },
      { status: 403 },
    );
  }

  return NextResponse.json(getPlatformOverview());
}
