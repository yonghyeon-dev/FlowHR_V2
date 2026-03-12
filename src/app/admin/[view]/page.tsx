import { notFound, redirect } from "next/navigation";

import { AdminAttendance, AdminHome, AdminSettings, AdminWorkflow } from "@/components/admin-pages";
import { AppShell } from "@/components/app-shell";
import { RawWireframeMain } from "@/components/raw-wireframe-main";
import { roleLabel } from "@/lib/session-labels";
import { canAccessRole, getSession } from "@/lib/server/auth";
import {
  getLatestSettings,
  getTenantFeatureSummary,
  listApprovals,
  listDocuments,
  listRequests,
} from "@/lib/server/dev-store";
import { adminViews, type AdminView, getWireframeMain } from "@/lib/wireframes";

const adminNavMeta: Record<AdminView, { label: string; icon: string }> = {
  home: { label: "Home", icon: "🏠" },
  people: { label: "People", icon: "👥" },
  attendance: { label: "Attendance", icon: "⏰" },
  leave: { label: "Leave", icon: "🌴" },
  workflow: { label: "Workflow", icon: "🔄" },
  documents: { label: "Documents", icon: "📄" },
  payroll: { label: "Payroll", icon: "💳" },
  performance: { label: "Performance", icon: "📈" },
  recruiting: { label: "Recruiting", icon: "🧲" },
  reports: { label: "Reports", icon: "📊" },
  settings: { label: "Settings", icon: "⚙️" },
};

export default async function Page({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;

  if (!adminViews.includes(view as AdminView)) {
    notFound();
  }

  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (!canAccessRole(session.role, "admin")) {
    redirect("/login");
  }

  const requests = listRequests(session.tenantId);
  const documents = listDocuments(session.tenantId);
  const approvals = listApprovals(session.tenantId);
  const settings = getLatestSettings(session.tenantId);
  const features = getTenantFeatureSummary(session.tenantId).map((item) => item.label);

  const navItems = adminViews.map((adminView) => ({
    href: `/admin/${adminView}`,
    label: adminNavMeta[adminView].label,
    icon: adminNavMeta[adminView].icon,
    badge:
      adminView === "workflow"
        ? String(requests.filter((item) => item.status === "submitted").length)
        : undefined,
  }));

  let content: React.ReactNode;
  switch (view as AdminView) {
    case "home":
      content = (
        <AdminHome
          tenant={session.tenant}
          pendingRequests={requests.filter((item) => item.status === "submitted")}
          documentCount={documents.length}
        />
      );
      break;
    case "attendance":
      content = <AdminAttendance tenant={session.tenant} />;
      break;
    case "workflow":
      content = (
        <AdminWorkflow
          requests={requests}
          approvals={approvals}
          canApprove={session.role !== "tenant_employee"}
        />
      );
      break;
    case "settings":
      content = <AdminSettings settings={settings} features={features} />;
      break;
    default:
      content = <RawWireframeMain markup={getWireframeMain(`admin/${view}.html`)} />;
      break;
  }

  return (
    <AppShell roleLabel={roleLabel(session.role)} tenant={session.tenant} navItems={navItems}>
      {content}
    </AppShell>
  );
}
