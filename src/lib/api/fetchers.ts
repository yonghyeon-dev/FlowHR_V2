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

export async function fetchPlatformOverview(): Promise<PlatformOverviewResponse> {
  noStore();
  return getPlatformOverview().data;
}

export async function fetchAdminPage(
  pack: SupportedPack,
  view: AdminView,
): Promise<AdminPageResponse> {
  noStore();
  return getAdminPage(pack, view).data;
}

export async function fetchEmployeePage(
  pack: SupportedPack,
  view: EmployeeView,
): Promise<EmployeeHomeResponse | EmployeeFlowResponse> {
  noStore();
  return getEmployeePage(pack, view).data;
}

export async function fetchPackSetup(): Promise<PackSetupResponse> {
  noStore();
  return getPackSetup().data;
}
