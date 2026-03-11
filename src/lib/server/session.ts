import { cookies } from "next/headers";
import type { AppSession, SessionRole } from "@/lib/api/types";

const SESSION_COOKIE = "flowhr_session";

const DEFAULT_SESSION: AppSession = {
  role: "tenant_admin",
  updatedAt: new Date().toISOString(),
};

export async function getServerSession(): Promise<AppSession> {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_COOKIE)?.value;

  if (!raw) return DEFAULT_SESSION;

  try {
    const parsed = JSON.parse(raw) as AppSession;
    if (!parsed.role) return DEFAULT_SESSION;
    return parsed;
  } catch {
    return DEFAULT_SESSION;
  }
}

export async function setServerSession(role: SessionRole): Promise<AppSession> {
  const cookieStore = await cookies();
  const nextSession: AppSession = {
    role,
    updatedAt: new Date().toISOString(),
  };

  cookieStore.set(SESSION_COOKIE, JSON.stringify(nextSession), {
    httpOnly: false,
    sameSite: "lax",
    secure: false,
    path: "/",
  });

  return nextSession;
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

export function canAccessAction(
  role: SessionRole,
  action: "settings_save" | "approval_approve" | "request_submit" | "signature_submit" | "feature_selection_save",
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
