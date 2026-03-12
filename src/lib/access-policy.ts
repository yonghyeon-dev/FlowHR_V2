import type { UserRole } from "@/lib/domain/types";

export const adminViews = [
  "home",
  "people",
  "attendance",
  "leave",
  "workflow",
  "documents",
  "payroll",
  "performance",
  "recruiting",
  "reports",
  "settings",
] as const;

export const employeeViews = [
  "home",
  "schedule",
  "requests",
  "inbox",
  "documents",
  "profile",
] as const;

// Platform 화면 SSOT는 flowhr-ui의 console.html 하나다.
export const platformViews = ["console"] as const;

export type AdminView = (typeof adminViews)[number];
export type EmployeeView = (typeof employeeViews)[number];
export type PlatformView = (typeof platformViews)[number];
export type AppArea = "platform" | "admin" | "employee";

export type AppAction =
  | "platform.tenants.manage"
  | "admin.workflow.approve"
  | "admin.settings.update"
  | "employee.requests.submit"
  | "employee.documents.sign";

export type FieldKey =
  | "tenant.pack"
  | "tenant.status"
  | "tenant.enabledFeatures"
  | "settings.companyName"
  | "settings.businessNumber"
  | "settings.timezone"
  | "settings.workStart"
  | "settings.workEnd"
  | "request.category"
  | "request.title"
  | "request.reason"
  | "document.signature";

type RolePolicy = {
  defaultRoute: string;
  areas: AppArea[];
  adminViews: AdminView[];
  employeeViews: EmployeeView[];
  platformViews: PlatformView[];
  actions: AppAction[];
  fields: FieldKey[];
};

export const rolePolicies: Record<UserRole, RolePolicy> = {
  platform_operator: {
    defaultRoute: "/platform/console",
    areas: ["platform"],
    adminViews: [],
    employeeViews: [],
    platformViews: ["console"],
    actions: ["platform.tenants.manage"],
    fields: ["tenant.pack", "tenant.status", "tenant.enabledFeatures"],
  },
  tenant_admin: {
    defaultRoute: "/admin/home",
    areas: ["admin"],
    adminViews: [...adminViews],
    employeeViews: [],
    platformViews: [],
    actions: ["admin.workflow.approve", "admin.settings.update"],
    fields: [
      "settings.companyName",
      "settings.businessNumber",
      "settings.timezone",
      "settings.workStart",
      "settings.workEnd",
    ],
  },
  tenant_manager: {
    defaultRoute: "/admin/home",
    areas: ["admin"],
    adminViews: [
      "home",
      "people",
      "attendance",
      "leave",
      "workflow",
      "documents",
      "performance",
      "reports",
    ],
    employeeViews: [],
    platformViews: [],
    actions: ["admin.workflow.approve"],
    fields: [],
  },
  tenant_employee: {
    defaultRoute: "/employee/home",
    areas: ["employee"],
    adminViews: [],
    employeeViews: [...employeeViews],
    platformViews: [],
    actions: ["employee.requests.submit", "employee.documents.sign"],
    fields: ["request.category", "request.title", "request.reason", "document.signature"],
  },
};

export function getPolicy(role: UserRole) {
  return rolePolicies[role];
}

export function canAccessArea(role: UserRole, area: AppArea) {
  return getPolicy(role).areas.includes(area);
}

export function canAccessAdminView(role: UserRole, view: AdminView) {
  return getPolicy(role).adminViews.includes(view);
}

export function canAccessEmployeeView(role: UserRole, view: EmployeeView) {
  return getPolicy(role).employeeViews.includes(view);
}

export function canAccessPlatformView(role: UserRole, view: PlatformView) {
  return getPolicy(role).platformViews.includes(view);
}

export function canPerformAction(role: UserRole, action: AppAction) {
  return getPolicy(role).actions.includes(action);
}

export function canAccessField(role: UserRole, field: FieldKey) {
  return getPolicy(role).fields.includes(field);
}

export function getDefaultRouteForRole(role: UserRole) {
  return getPolicy(role).defaultRoute;
}

export function getAllowedAdminViews(role: UserRole) {
  return getPolicy(role).adminViews;
}

export function getAllowedEmployeeViews(role: UserRole) {
  return getPolicy(role).employeeViews;
}

export function getAllowedPlatformViews(role: UserRole) {
  return getPolicy(role).platformViews;
}
