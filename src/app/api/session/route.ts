import { NextResponse } from "next/server";
import type { SessionRole } from "@/lib/api/types";
import {
  getServerSession,
  listSessionTenants,
  roleLabel,
  setServerSession,
} from "@/lib/server/session";

export async function GET() {
  const session = await getServerSession();
  const tenants = listSessionTenants();
  const activeTenant = tenants.find((item) => item.id === session.tenantId) ?? tenants[0];
  return NextResponse.json({
    data: {
      session,
      label: roleLabel(session.role),
      activeTenant,
      tenants,
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
  const body = (await request.json()) as { role?: SessionRole; tenantId?: string };
  const session = await setServerSession({
    role: body.role,
    tenantId: body.tenantId,
  });
  const tenants = listSessionTenants();
  const activeTenant = tenants.find((item) => item.id === session.tenantId) ?? tenants[0];

  return NextResponse.json({
    data: {
      session,
      label: roleLabel(session.role),
      activeTenant,
      tenants,
    },
  });
}
