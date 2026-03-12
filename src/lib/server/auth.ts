import { cookies } from "next/headers";

import {
  canAccessAdminView,
  canAccessArea,
  canAccessEmployeeView,
  canAccessField,
  canAccessPlatformView,
  canPerformAction,
  getAllowedAdminViews,
  getAllowedEmployeeViews,
  getAllowedPlatformViews,
  getDefaultRouteForRole,
} from "@/lib/access-policy";
import type { SessionPayload, UserRole } from "@/lib/domain/types";
import {
  authenticateUser,
  getDefaultSessionForUser,
  getTenantById,
  getUserById,
  getUserTenants,
} from "@/lib/server/dev-store";

const SESSION_KEY = "flowhr_session";

export async function getSession() {
  const cookieStore = await cookies();
  const raw = cookieStore.get(SESSION_KEY)?.value;

  if (!raw) {
    return null;
  }

  try {
    const payload = JSON.parse(raw) as SessionPayload;
    const user = getUserById(payload.userId);
    const tenant = getTenantById(payload.tenantId);

    if (!user || !tenant) {
      return null;
    }

    return {
      ...payload,
      user,
      tenant,
      tenants: getUserTenants(user.id),
    };
  } catch {
    return null;
  }
}

export async function requireSession() {
  return getSession();
}

export async function createSession(email: string, password: string) {
  const user = authenticateUser(email, password);
  if (!user) {
    return null;
  }

  const payload = getDefaultSessionForUser(user);
  const cookieStore = await cookies();
  cookieStore.set(SESSION_KEY, JSON.stringify(payload), {
    httpOnly: true,
    sameSite: "lax",
    secure: false,
    path: "/",
    maxAge: 60 * 60 * 12,
  });

  return payload;
}

export async function destroySession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_KEY);
}

export function canAccessRole(role: UserRole, area: "platform" | "admin" | "employee") {
  return canAccessArea(role, area);
}

export {
  canAccessAdminView,
  canAccessEmployeeView,
  canAccessField,
  canAccessPlatformView,
  canPerformAction,
  getAllowedAdminViews,
  getAllowedEmployeeViews,
  getAllowedPlatformViews,
  getDefaultRouteForRole,
};
