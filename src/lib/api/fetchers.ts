import { unstable_noStore as noStore } from "next/cache";
import {
  getAdminPage,
  getEmployeePage,
  getPackSetup,
  getPlatformOverview,
} from "@/lib/api/mock";
import type {
  AdminPageResponse,
  AdminView,
  EmployeeFlowResponse,
  EmployeeHomeResponse,
  EmployeeView,
  PackSetupResponse,
  PlatformOverviewResponse,
  SupportedPack,
} from "@/lib/api/types";
import { getServerSession } from "@/lib/server/session";

export async function fetchPlatformOverview(): Promise<PlatformOverviewResponse> {
  noStore();
  return getPlatformOverview().data;
}

export async function fetchAdminPage(
  pack: SupportedPack,
  view: AdminView,
): Promise<AdminPageResponse> {
  noStore();
  const session = await getServerSession();
  return getAdminPage(session.tenantId, pack, view).data;
}

export async function fetchEmployeePage(
  pack: SupportedPack,
  view: EmployeeView,
): Promise<EmployeeHomeResponse | EmployeeFlowResponse> {
  noStore();
  const session = await getServerSession();
  return getEmployeePage(session.tenantId, pack, view).data;
}

export async function fetchPackSetup(): Promise<PackSetupResponse> {
  noStore();
  const session = await getServerSession();
  return getPackSetup(session.tenantId).data;
}
