import { notFound, redirect } from "next/navigation";

import { WireframeScreen } from "@/components/wireframe-screen";
import { employeeViews, type EmployeeView } from "@/lib/access-policy";
import { getWireframePage } from "@/lib/wireframes";
import { canAccessEmployeeView, canAccessRole, getAllowedEmployeeViews, getSession } from "@/lib/server/auth";

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

  if (!canAccessEmployeeView(session.role, view as EmployeeView)) {
    const fallbackView = getAllowedEmployeeViews(session.role)[0] ?? "home";
    redirect(`/employee/${fallbackView}`);
  }

  return <WireframeScreen screen={getWireframePage(`employee/${view}.html`, "employee")} />;
}
