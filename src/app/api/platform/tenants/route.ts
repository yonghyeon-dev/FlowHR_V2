import { NextResponse } from "next/server";
import type {
  PackSetupResponse,
  TenantUpdateRequest,
  TenantUpdateResponse,
} from "@/lib/api/types";
import { listTenants, updateTenantConfig } from "@/lib/server/store";
import { getServerSession } from "@/lib/server/session";

const defaultPackSelection: PackSetupResponse["selection"] = {
  selectedPack: "office",
  featureSelections: {
    office: ["core-hr", "attendance"],
    retail: ["coverage-core", "shift-response"],
  },
};

export async function GET() {
  return NextResponse.json({
    data: {
      tenants: listTenants(defaultPackSelection),
    },
  });
}

export async function PATCH(request: Request) {
  const session = await getServerSession();

  if (session.role !== "platform_operator") {
    return NextResponse.json(
      {
        error: {
          code: "ACCESS_DENIED",
          message: "Only platform operators can update tenant configuration.",
        },
      },
      { status: 403 },
    );
  }

  const body = (await request.json()) as TenantUpdateRequest;
  const tenant = updateTenantConfig(
    body.tenantId,
    {
      pack: body.pack,
      status: body.status,
    },
    defaultPackSelection,
  );

  const response: TenantUpdateResponse = {
    result: "success",
    tenant,
    message: "Tenant configuration was updated.",
  };

  return NextResponse.json({ data: response });
}
