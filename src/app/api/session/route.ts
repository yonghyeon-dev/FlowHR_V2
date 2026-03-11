import { NextResponse } from "next/server";
import type { SessionRole } from "@/lib/api/types";
import { getServerSession, roleLabel, setServerSession } from "@/lib/server/session";

export async function GET() {
  const session = await getServerSession();
  return NextResponse.json({
    data: {
      session,
      label: roleLabel(session.role),
      roles: [
        "platform_operator",
        "tenant_admin",
        "tenant_manager",
        "tenant_employee",
      ] as SessionRole[],
    },
  });
}

export async function POST(request: Request) {
  const body = (await request.json()) as { role: SessionRole };
  const session = await setServerSession(body.role);

  return NextResponse.json({
    data: {
      session,
      label: roleLabel(session.role),
    },
  });
}
