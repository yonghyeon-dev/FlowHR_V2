import { NextResponse } from "next/server";
import { getAdminPage } from "@/lib/api/mock";
import type { AdminView, SupportedPack } from "@/lib/api/types";

const validPacks: SupportedPack[] = ["office", "retail"];
const validViews: AdminView[] = ["home", "attendance", "leave", "workflow", "documents"];

export async function GET(
  _: Request,
  context: { params: Promise<{ pack: string; view: string }> },
) {
  const { pack, view } = await context.params;

  if (!validPacks.includes(pack as SupportedPack) || !validViews.includes(view as AdminView)) {
    return NextResponse.json({ error: { code: "NOT_FOUND" } }, { status: 404 });
  }

  return NextResponse.json(getAdminPage(pack as SupportedPack, view as AdminView));
}
