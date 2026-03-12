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

export const platformViews = [
  "overview",
  "tenants",
  "billing",
  "support",
  "monitoring",
  "security",
  "settings",
] as const;

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

const areaAccess: Record<AppArea, UserRole[]> = {
  platform: ["platform_operator"],
  admin: ["tenant_admin", "tenant_manager"],
  employee: ["tenant_employee"],
};

const adminViewAccess: Record<AdminView, UserRole[]> = {
  home: ["tenant_admin", "tenant_manager"],
  people: ["tenant_admin", "tenant_manager"],
  attendance: ["tenant_admin", "tenant_manager"],
  leave: ["tenant_admin", "tenant_manager"],
  workflow: ["tenant_admin", "tenant_manager"],
  documents: ["tenant_admin", "tenant_manager"],
  payroll: ["tenant_admin"],
  performance: ["tenant_admin", "tenant_manager"],
  recruiting: ["tenant_admin"],
  reports: ["tenant_admin", "tenant_manager"],
  settings: ["tenant_admin"],
};

const employeeViewAccess: Record<EmployeeView, UserRole[]> = {
  home: ["tenant_employee"],
  schedule: ["tenant_employee"],
  requests: ["tenant_employee"],
  inbox: ["tenant_employee"],
  documents: ["tenant_employee"],
  profile: ["tenant_employee"],
};

const platformViewAccess: Record<PlatformView, UserRole[]> = {
  overview: ["platform_operator"],
  tenants: ["platform_operator"],
  billing: ["platform_operator"],
  support: ["platform_operator"],
  monitoring: ["platform_operator"],
  security: ["platform_operator"],
  settings: ["platform_operator"],
};

const actionAccess: Record<AppAction, UserRole[]> = {
  "platform.tenants.manage": ["platform_operator"],
  "admin.workflow.approve": ["tenant_admin", "tenant_manager"],
  "admin.settings.update": ["tenant_admin"],
  "employee.requests.submit": ["tenant_employee"],
  "employee.documents.sign": ["tenant_employee"],
};

export function canAccessArea(role: UserRole, area: AppArea) {
  return areaAccess[area].includes(role);
}

export function canAccessAdminView(role: UserRole, view: AdminView) {
  return adminViewAccess[view].includes(role);
}

export function canAccessEmployeeView(role: UserRole, view: EmployeeView) {
  return employeeViewAccess[view].includes(role);
}

export function canAccessPlatformView(role: UserRole, view: PlatformView) {
  return platformViewAccess[view].includes(role);
}

export function canPerformAction(role: UserRole, action: AppAction) {
  return actionAccess[action].includes(role);
}

export function getDefaultRouteForRole(role: UserRole) {
  if (role === "platform_operator") return "/platform/overview";
  if (role === "tenant_admin" || role === "tenant_manager") return "/admin/home";
  return "/employee/home";
}

export function getAllowedAdminViews(role: UserRole) {
  return adminViews.filter((view) => canAccessAdminView(role, view));
}

export function getAllowedEmployeeViews(role: UserRole) {
  return employeeViews.filter((view) => canAccessEmployeeView(role, view));
}

export function getAllowedPlatformViews(role: UserRole) {
  return platformViews.filter((view) => canAccessPlatformView(role, view));
}
