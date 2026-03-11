import { NextResponse } from "next/server";
import { getPackSetup } from "@/lib/api/mock";

export async function GET() {
  return NextResponse.json(getPackSetup());
}
