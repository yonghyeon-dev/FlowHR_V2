import { NextResponse } from "next/server";
import { getPlatformOverview } from "@/lib/api/mock";

export async function GET() {
  return NextResponse.json(getPlatformOverview());
}
