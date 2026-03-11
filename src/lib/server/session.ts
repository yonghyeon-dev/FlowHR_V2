import { cookies } from "next/headers";
import type {
  AppSession,
  PackSetupResponse,
  SessionRole,
  SupportedPack,
  TenantOption,
  TenantRecord,
} from "@/lib/api/types";
import { getTenantById, listTenantOptions } from "@/lib/server/store";

const SESSION_COOKIE = "flowhr_session";

const defaultPackSelection: PackSetupResponse["selection"] = {
  selectedPack: "office",
  featureSelections: {
    office: ["core-hr", "attendance"],
    retail: ["coverage-core", "shift-response"],
  },
};

export type SessionArea = "platform" | "admin" | "employee" | "setup";

function defaultTenantId() {
  return listTenantOptions(defaultPackSelection)[0]?.id ?? "acme-corp";
}

function createDefaultSession(): AppSession {
  return {
    role: "tenant_admin",
    tenantId: defaultTenantId(),
    updatedAt: new Date().toISOString(),
  };
}

function normalizeSession(raw: Partial<AppSession> | undefined): AppSession {
  const options = listTenantOptions(defaultPackSelection);
  const safeTenantId =
    options.find((item) => item.id === raw?.tenantId)?.id ?? options[0]?.id ?? "acme-corp";

  return {
    role: raw?.role ?? "tenant_admin",
    tenantId: safeTenantId,
    updatedAt: raw?.updatedAt ?? new Date().toISOString(),
  };
}

export async function getServerSession(): Promise<AppSession> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;

  if (!raw) return createDefaultSession();

  try {
    return normalizeSession(JSON.parse(raw) as Partial<AppSession>);
  } catch {
    return createDefaultSession();
  }
}

export async function setServerSession(
  next: Partial<Pick<AppSession, "role" | "tenantId">>,
): Promise<AppSession> {
  const cookieStore = await cookies();
  const current = await getServerSession();
  const nextSession = normalizeSession({
    role: next.role ?? current.role,
    tenantId: next.tenantId ?? current.tenantId,
    updatedAt: new Date().toISOString(),
  });

  cookieStore.set(SESSION_COOKIE, JSON.stringify(nextSession), {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  return nextSession;
}

export function listSessionTenants(): TenantOption[] {
  return listTenantOptions(defaultPackSelection);
}

export function getSessionTenant(tenantId: string | undefined): TenantRecord {
  return getTenantById(tenantId, defaultPackSelection);
}

export function roleLabel(role: SessionRole): { ko: string; en: string } {
  switch (role) {
    case "platform_operator":
      return { ko: "플랫폼 운영자", en: "Platform Operator" };
    case "tenant_admin":
      return { ko: "고객사 관리자", en: "Tenant Admin" };
    case "tenant_manager":
      return { ko: "팀 매니저", en: "Tenant Manager" };
    case "tenant_employee":
      return { ko: "직원", en: "Employee" };
  }
}

export function canAccessArea(role: SessionRole, area: SessionArea) {
  switch (area) {
    case "platform":
      return role === "platform_operator";
    case "admin":
      return role === "tenant_admin" || role === "tenant_manager";
    case "employee":
      return role === "tenant_employee";
    case "setup":
      return role === "tenant_admin";
  }
}

export function canAccessAction(
  role: SessionRole,
  action:
    | "settings_save"
    | "approval_approve"
    | "request_submit"
    | "signature_submit"
    | "feature_selection_save",
) {
  switch (action) {
    case "settings_save":
      return role === "tenant_admin";
    case "approval_approve":
      return role === "tenant_admin" || role === "tenant_manager";
    case "request_submit":
    case "signature_submit":
      return role === "tenant_employee";
    case "feature_selection_save":
      return role === "tenant_admin";
  }
}

export function resolvePackPath(
  area: "admin" | "employee",
  pack: SupportedPack,
  view: string,
) {
  return `/${area}/${pack}/${view}`;
}
