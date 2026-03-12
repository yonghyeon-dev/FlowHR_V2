export type UiSsotEntry = {
  id: string;
  route: string;
  sourceFile: string;
  sourceSection?: string;
  implementation: string;
};

export const uiSsotEntries: UiSsotEntry[] = [
  {
    id: "UI-LANDING",
    route: "/",
    sourceFile: "flowhr-ui/landing.html",
    implementation: "src/components/landing-page.tsx",
  },
  {
    id: "UI-LOGIN",
    route: "/login",
    sourceFile: "flowhr-ui/login.html",
    implementation: "src/components/login-client.tsx",
  },
  {
    id: "UI-PLATFORM-OVERVIEW",
    route: "/platform/overview",
    sourceFile: "flowhr-ui/platform/console.html",
    sourceSection: "Overview",
    implementation: "src/components/platform-pages.tsx#PlatformOverview",
  },
  {
    id: "UI-PLATFORM-TENANTS",
    route: "/platform/tenants",
    sourceFile: "flowhr-ui/platform/console.html",
    sourceSection: "Tenants",
    implementation: "src/components/platform-pages.tsx#PlatformTenants",
  },
  {
    id: "UI-PLATFORM-BILLING",
    route: "/platform/billing",
    sourceFile: "flowhr-ui/platform/console.html",
    sourceSection: "Plans & Billing",
    implementation: "src/components/platform-pages.tsx#PlatformBilling",
  },
  {
    id: "UI-PLATFORM-SUPPORT",
    route: "/platform/support",
    sourceFile: "flowhr-ui/platform/console.html",
    sourceSection: "Support Ops",
    implementation: "src/components/platform-pages.tsx#PlatformSupport",
  },
  {
    id: "UI-PLATFORM-MONITORING",
    route: "/platform/monitoring",
    sourceFile: "flowhr-ui/platform/console.html",
    sourceSection: "Monitoring",
    implementation: "src/components/platform-pages.tsx#PlatformMonitoring",
  },
  {
    id: "UI-PLATFORM-SECURITY",
    route: "/platform/security",
    sourceFile: "flowhr-ui/platform/console.html",
    sourceSection: "Audit & Security",
    implementation: "src/components/platform-pages.tsx#PlatformSecurity",
  },
  {
    id: "UI-PLATFORM-SETTINGS",
    route: "/platform/settings",
    sourceFile: "flowhr-ui/platform/console.html",
    sourceSection: "Platform Settings",
    implementation: "src/components/platform-pages.tsx#PlatformSettings",
  },
  {
    id: "UI-ADMIN-HOME",
    route: "/admin/home",
    sourceFile: "flowhr-ui/admin/home.html",
    implementation: "src/components/admin-pages.tsx#AdminHome",
  },
  {
    id: "UI-ADMIN-PEOPLE",
    route: "/admin/people",
    sourceFile: "flowhr-ui/admin/people.html",
    implementation: "src/components/admin-people-leave-pages.tsx#AdminPeople",
  },
  {
    id: "UI-ADMIN-ATTENDANCE",
    route: "/admin/attendance",
    sourceFile: "flowhr-ui/admin/attendance.html",
    implementation: "src/components/admin-pages.tsx#AdminAttendance",
  },
  {
    id: "UI-ADMIN-LEAVE",
    route: "/admin/leave",
    sourceFile: "flowhr-ui/admin/leave.html",
    implementation: "src/components/admin-people-leave-pages.tsx#AdminLeave",
  },
  {
    id: "UI-ADMIN-WORKFLOW",
    route: "/admin/workflow",
    sourceFile: "flowhr-ui/admin/workflow.html",
    implementation: "src/components/admin-pages.tsx#AdminWorkflow",
  },
  {
    id: "UI-ADMIN-DOCUMENTS",
    route: "/admin/documents",
    sourceFile: "flowhr-ui/admin/documents.html",
    implementation: "src/components/admin-docs-payroll-pages.tsx#AdminDocuments",
  },
  {
    id: "UI-ADMIN-PAYROLL",
    route: "/admin/payroll",
    sourceFile: "flowhr-ui/admin/payroll.html",
    implementation: "src/components/admin-docs-payroll-pages.tsx#AdminPayroll",
  },
  {
    id: "UI-ADMIN-PERFORMANCE",
    route: "/admin/performance",
    sourceFile: "flowhr-ui/admin/performance.html",
    implementation: "src/components/admin-talent-pages.tsx#AdminPerformance",
  },
  {
    id: "UI-ADMIN-RECRUITING",
    route: "/admin/recruiting",
    sourceFile: "flowhr-ui/admin/recruiting.html",
    implementation: "src/components/admin-talent-pages.tsx#AdminRecruiting",
  },
  {
    id: "UI-ADMIN-REPORTS",
    route: "/admin/reports",
    sourceFile: "flowhr-ui/admin/reports.html",
    implementation: "src/components/admin-talent-pages.tsx#AdminReports",
  },
  {
    id: "UI-ADMIN-SETTINGS",
    route: "/admin/settings",
    sourceFile: "flowhr-ui/admin/settings.html",
    implementation: "src/components/admin-pages.tsx#AdminSettings",
  },
  {
    id: "UI-EMPLOYEE-HOME",
    route: "/employee/home",
    sourceFile: "flowhr-ui/employee/home.html",
    implementation: "src/components/employee-pages.tsx#EmployeeHome",
  },
  {
    id: "UI-EMPLOYEE-SCHEDULE",
    route: "/employee/schedule",
    sourceFile: "flowhr-ui/employee/schedule.html",
    implementation: "src/components/employee-extra-pages.tsx#EmployeeSchedule",
  },
  {
    id: "UI-EMPLOYEE-REQUESTS",
    route: "/employee/requests",
    sourceFile: "flowhr-ui/employee/requests.html",
    implementation: "src/components/employee-pages.tsx#EmployeeRequests",
  },
  {
    id: "UI-EMPLOYEE-INBOX",
    route: "/employee/inbox",
    sourceFile: "flowhr-ui/employee/inbox.html",
    implementation: "src/components/employee-pages.tsx#EmployeeInbox",
  },
  {
    id: "UI-EMPLOYEE-DOCUMENTS",
    route: "/employee/documents",
    sourceFile: "flowhr-ui/employee/documents.html",
    implementation: "src/components/employee-pages.tsx#EmployeeDocuments",
  },
  {
    id: "UI-EMPLOYEE-PROFILE",
    route: "/employee/profile",
    sourceFile: "flowhr-ui/employee/profile.html",
    implementation: "src/components/employee-extra-pages.tsx#EmployeeProfile",
  },
];

