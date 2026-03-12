import { notFound, redirect } from "next/navigation";

import { WireframeScreen } from "@/components/wireframe-screen";
import { adminViews, type AdminView } from "@/lib/access-policy";
import { getWireframePage } from "@/lib/wireframes";
import { canAccessAdminView, canAccessRole, getAllowedAdminViews, getSession } from "@/lib/server/auth";

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

  if (!canAccessAdminView(session.role, view as AdminView)) {
    const fallbackView = getAllowedAdminViews(session.role)[0] ?? "home";
    redirect(`/admin/${fallbackView}`);
  }

  return <WireframeScreen screen={getWireframePage(`admin/${view}.html`, "admin")} />;
}
