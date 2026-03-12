import { notFound, redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { EmployeeDocuments, EmployeeHome, EmployeeInbox, EmployeeRequests } from "@/components/employee-pages";
import { roleLabel } from "@/lib/session-labels";
import { WireframeScreen } from "@/components/wireframe-screen";
import { canAccessRole, getSession } from "@/lib/server/auth";
import { listDocuments, listRequests } from "@/lib/server/dev-store";
import { employeeViews, type EmployeeView, getWireframePage } from "@/lib/wireframes";

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
  const navItems = [
    { href: "/employee/home", label: "Home", icon: "🏠" },
    { href: "/employee/requests", label: "Requests", icon: "📋", badge: String(requests.length) },
    { href: "/employee/inbox", label: "Inbox", icon: "📥" },
    { href: "/employee/documents", label: "Documents", icon: "📄", badge: String(documents.filter((item) => item.status === "pending_signature").length) },
    { href: "/ui", label: "All UI", icon: "🧭" },
  ];

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
      content = <WireframeScreen screen={getWireframePage(`employee/${view}.html`, "employee")} />;
      break;
  }

  return (
    <AppShell roleLabel={roleLabel(session.role)} tenant={session.tenant} navItems={navItems}>
      {content}
    </AppShell>
  );
}
