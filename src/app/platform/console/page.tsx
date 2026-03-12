import { redirect } from "next/navigation";

import { WireframeScreen } from "@/components/wireframe-screen";
import { getWireframePage } from "@/lib/wireframes";
import { canAccessRole, getSession } from "@/lib/server/auth";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (!canAccessRole(session.role, "platform")) {
    redirect("/login");
  }

  return <WireframeScreen screen={getWireframePage("platform/console.html", "platform")} />;
}
