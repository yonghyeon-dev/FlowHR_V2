import { notFound, redirect } from "next/navigation";

import { AdminAttendance, AdminHome, AdminSettings, AdminWorkflow } from "@/components/admin-pages";
import { AppShell } from "@/components/app-shell";
import { WireframeScreen } from "@/components/wireframe-screen";
import { roleLabel } from "@/lib/session-labels";
import { canAccessRole, getSession } from "@/lib/server/auth";
import {
  getLatestSettings,
  getTenantFeatureSummary,
  listApprovals,
  listDocuments,
  listRequests,
} from "@/lib/server/dev-store";
import { adminViews, type AdminView, getWireframePage } from "@/lib/wireframes";

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

  const navItems = [
    { href: "/admin/home", label: "Home", icon: "🏠" },
    { href: "/admin/attendance", label: "Attendance", icon: "⏰" },
    { href: "/admin/workflow", label: "Workflow", icon: "🔄", badge: String(requests.filter((item) => item.status === "submitted").length) },
    { href: "/admin/settings", label: "Settings", icon: "⚙" },
    { href: "/ui", label: "All UI", icon: "🧭" },
  ];

  let content: React.ReactNode;
  switch (view as AdminView) {
    case "home":
      content = <AdminHome tenant={session.tenant} pendingRequests={requests.filter((item) => item.status === "submitted")} documentCount={documents.length} />;
      break;
    case "attendance":
      content = <AdminAttendance tenant={session.tenant} />;
      break;
    case "workflow":
      content = <AdminWorkflow requests={requests} approvals={approvals} canApprove={session.role !== "tenant_employee"} />;
      break;
    case "settings":
      content = <AdminSettings settings={settings} features={features} />;
      break;
    default:
      content = <WireframeScreen screen={getWireframePage(`admin/${view}.html`, "admin")} />;
      break;
  }

  return (
    <AppShell roleLabel={roleLabel(session.role)} tenant={session.tenant} navItems={navItems}>
      {content}
    </AppShell>
  );
}
