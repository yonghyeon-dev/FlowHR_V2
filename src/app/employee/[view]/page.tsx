import { notFound, redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { EmployeeDocuments, EmployeeHome, EmployeeInbox, EmployeeRequests } from "@/components/employee-pages";
import { RawWireframeMain } from "@/components/raw-wireframe-main";
import { roleLabel } from "@/lib/session-labels";
import { canAccessRole, getSession } from "@/lib/server/auth";
import { listDocuments, listRequests } from "@/lib/server/dev-store";
import { employeeViews, type EmployeeView, getWireframeMain } from "@/lib/wireframes";

const employeeNavMeta: Record<EmployeeView, { label: string; icon: string }> = {
  home: { label: "Home", icon: "🏠" },
  schedule: { label: "Schedule", icon: "🗓️" },
  requests: { label: "Requests", icon: "📋" },
  inbox: { label: "Inbox", icon: "📥" },
  documents: { label: "Documents", icon: "📄" },
  profile: { label: "Profile", icon: "🙍" },
};

export default async function Page({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;

  if (!employeeViews.includes(view as EmployeeView)) {
    notFound();
  }

  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (!canAccessRole(session.role, "employee")) {
    redirect("/login");
  }

  const requests = listRequests(session.tenantId);
  const documents = listDocuments(session.tenantId);
  const navItems = employeeViews.map((employeeView) => ({
    href: `/employee/${employeeView}`,
    label: employeeNavMeta[employeeView].label,
    icon: employeeNavMeta[employeeView].icon,
    badge:
      employeeView === "requests"
        ? String(requests.length)
        : employeeView === "documents"
          ? String(documents.filter((item) => item.status === "pending_signature").length)
          : undefined,
  }));

  let content: React.ReactNode;
  switch (view as EmployeeView) {
    case "home":
      content = <EmployeeHome tenant={session.tenant} requests={requests} documents={documents} />;
      break;
    case "requests":
      content = <EmployeeRequests requests={requests} />;
      break;
    case "documents":
      content = <EmployeeDocuments documents={documents} />;
      break;
    case "inbox":
      content = <EmployeeInbox requests={requests} documents={documents} />;
      break;
    default:
      content = <RawWireframeMain markup={getWireframeMain(`employee/${view}.html`)} />;
      break;
  }

  return (
    <AppShell roleLabel={roleLabel(session.role)} tenant={session.tenant} navItems={navItems}>
      {content}
    </AppShell>
  );
}
