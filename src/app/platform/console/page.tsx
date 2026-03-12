import { redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import { PlatformConsoleClient } from "@/components/platform-console-client";
import { roleLabel } from "@/lib/session-labels";
import { canAccessRole, getSession } from "@/lib/server/auth";
import { listAuditLogs, listTenants } from "@/lib/server/dev-store";

export default async function Page() {
  const session = await getSession();
  if (!session) {
    redirect("/login");
  }

  if (!canAccessRole(session.role, "platform")) {
    redirect("/login");
  }

  return (
    <AppShell
      roleLabel={roleLabel(session.role)}
      navItems={[{ href: "/platform/console", label: "Platform Console", icon: "🛡️" }]}
      allowLogout
    >
      <PlatformConsoleClient tenants={listTenants()} auditLogs={listAuditLogs(10)} />
    </AppShell>
  );
}
