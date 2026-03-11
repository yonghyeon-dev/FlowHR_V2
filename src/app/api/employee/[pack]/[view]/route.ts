import { NextResponse } from "next/server";
import { getEmployeePage } from "@/lib/api/mock";
import type { EmployeeView, SupportedPack } from "@/lib/api/types";
import { getServerSession } from "@/lib/server/session";

const validPacks: SupportedPack[] = ["office", "retail"];
const validViews: EmployeeView[] = ["home", "requests", "signatures"];

export async function GET(
  _: Request,
  context: { params: Promise<{ pack: string; view: string }> },
) {
  const { pack, view } = await context.params;
  const session = await getServerSession();

  if (!validPacks.includes(pack as SupportedPack) || !validViews.includes(view as EmployeeView)) {
    return NextResponse.json({ error: { code: "NOT_FOUND" } }, { status: 404 });
  }

  return NextResponse.json(getEmployeePage(session.tenantId, pack as SupportedPack, view as EmployeeView));
}
