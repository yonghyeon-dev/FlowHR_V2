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

export async function fetchPlatformOverview(): Promise<PlatformOverviewResponse> {
  return getPlatformOverview().data;
}

export async function fetchAdminPage(
  pack: SupportedPack,
  view: AdminView,
): Promise<AdminPageResponse> {
  return getAdminPage(pack, view).data;
}

export async function fetchEmployeePage(
  pack: SupportedPack,
  view: EmployeeView,
): Promise<EmployeeHomeResponse | EmployeeFlowResponse> {
  return getEmployeePage(pack, view).data;
}

export async function fetchPackSetup(): Promise<PackSetupResponse> {
  return getPackSetup().data;
}
