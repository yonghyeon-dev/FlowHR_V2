import { NextResponse } from "next/server";
import { getAdminPage } from "@/lib/api/mock";
import type { AdminView, SupportedPack } from "@/lib/api/types";
import { canAccessArea, getServerSession, getSessionTenant } from "@/lib/server/session";

const validPacks: SupportedPack[] = ["office", "retail"];
const validViews: AdminView[] = ["home", "attendance", "leave", "workflow", "documents", "settings"];

export async function GET(
  _: Request,
  context: { params: Promise<{ pack: string; view: string }> },
) {
  const { pack, view } = await context.params;
  const session = await getServerSession();

  if (!validPacks.includes(pack as SupportedPack) || !validViews.includes(view as AdminView)) {
    return NextResponse.json({ error: { code: "NOT_FOUND" } }, { status: 404 });
  }

  if (!canAccessArea(session.role, "admin")) {
    return NextResponse.json(
      {
        error: {
          code: "ACCESS_DENIED",
          message: "The current session cannot access admin pages.",
        },
      },
      { status: 403 },
    );
  }

  const tenant = getSessionTenant(session.tenantId);

  if (pack !== tenant.pack) {
    return NextResponse.json(
      {
        error: {
          code: "PACK_MISMATCH",
          message: `Use the active tenant pack '${tenant.pack}' instead.`,
          expectedPack: tenant.pack,
        },
      },
      { status: 409 },
    );
  }

  return NextResponse.json(getAdminPage(session.tenantId, pack as SupportedPack, view as AdminView));
}
