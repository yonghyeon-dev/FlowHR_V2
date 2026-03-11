import { NextResponse } from "next/server";
import { getPackSetup, savePackSetup } from "@/lib/api/mock";
import type { PackSetupSaveRequest } from "@/lib/api/types";

export async function GET() {
  return NextResponse.json(getPackSetup());
}

export async function POST(request: Request) {
  const body = (await request.json()) as PackSetupSaveRequest;
  return NextResponse.json(savePackSetup(body));
}
