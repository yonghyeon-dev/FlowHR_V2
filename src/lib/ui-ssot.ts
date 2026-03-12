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
    id: "UI-PLATFORM-CONSOLE",
    route: "/platform/console",
    sourceFile: "flowhr-ui/platform/console.html",
    implementation: "src/app/platform/console/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-HOME",
    route: "/admin/home",
    sourceFile: "flowhr-ui/admin/home.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-PEOPLE",
    route: "/admin/people",
    sourceFile: "flowhr-ui/admin/people.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-ATTENDANCE",
    route: "/admin/attendance",
    sourceFile: "flowhr-ui/admin/attendance.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-LEAVE",
    route: "/admin/leave",
    sourceFile: "flowhr-ui/admin/leave.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-WORKFLOW",
    route: "/admin/workflow",
    sourceFile: "flowhr-ui/admin/workflow.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-DOCUMENTS",
    route: "/admin/documents",
    sourceFile: "flowhr-ui/admin/documents.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-PAYROLL",
    route: "/admin/payroll",
    sourceFile: "flowhr-ui/admin/payroll.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-PERFORMANCE",
    route: "/admin/performance",
    sourceFile: "flowhr-ui/admin/performance.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-RECRUITING",
    route: "/admin/recruiting",
    sourceFile: "flowhr-ui/admin/recruiting.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-REPORTS",
    route: "/admin/reports",
    sourceFile: "flowhr-ui/admin/reports.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-ADMIN-SETTINGS",
    route: "/admin/settings",
    sourceFile: "flowhr-ui/admin/settings.html",
    implementation: "src/app/admin/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-EMPLOYEE-HOME",
    route: "/employee/home",
    sourceFile: "flowhr-ui/employee/home.html",
    implementation: "src/app/employee/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-EMPLOYEE-SCHEDULE",
    route: "/employee/schedule",
    sourceFile: "flowhr-ui/employee/schedule.html",
    implementation: "src/app/employee/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-EMPLOYEE-REQUESTS",
    route: "/employee/requests",
    sourceFile: "flowhr-ui/employee/requests.html",
    implementation: "src/app/employee/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-EMPLOYEE-INBOX",
    route: "/employee/inbox",
    sourceFile: "flowhr-ui/employee/inbox.html",
    implementation: "src/app/employee/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-EMPLOYEE-DOCUMENTS",
    route: "/employee/documents",
    sourceFile: "flowhr-ui/employee/documents.html",
    implementation: "src/app/employee/[view]/page.tsx -> WireframeScreen",
  },
  {
    id: "UI-EMPLOYEE-PROFILE",
    route: "/employee/profile",
    sourceFile: "flowhr-ui/employee/profile.html",
    implementation: "src/app/employee/[view]/page.tsx -> WireframeScreen",
  },
];
