import { NextResponse } from "next/server";
import { getAdminPage } from "@/lib/api/mock";
import type { AdminView, SupportedPack } from "@/lib/api/types";
import { getServerSession } from "@/lib/server/session";

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

  return NextResponse.json(getAdminPage(session.tenantId, pack as SupportedPack, view as AdminView));
}
