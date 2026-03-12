import { notFound, redirect } from "next/navigation";

import { AppShell } from "@/components/app-shell";
import {
  PlatformBilling,
  PlatformMonitoring,
  PlatformOverview,
  PlatformSecurity,
  PlatformSettings,
  PlatformSupport,
  PlatformTenants,
} from "@/components/platform-pages";
import { roleLabel } from "@/lib/session-labels";
import { canAccessPlatformView, canAccessRole, getAllowedPlatformViews, getSession } from "@/lib/server/auth";
import { listAuditLogs, listTenants } from "@/lib/server/dev-store";
import { platformViews, type PlatformView } from "@/lib/access-policy";

const navMeta: Record<PlatformView, { label: string; icon: string }> = {
  overview: { label: "개요", icon: "OV" },
  tenants: { label: "테넌트", icon: "TN" },
  billing: { label: "플랜 · 과금", icon: "BL" },
  support: { label: "지원 운영", icon: "SP" },
  monitoring: { label: "모니터링", icon: "MT" },
  security: { label: "감사 · 보안", icon: "SC" },
  settings: { label: "플랫폼 설정", icon: "ST" },
};

export default async function Page({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;
  if (!platformViews.includes(view as PlatformView)) {
    notFound();
  }

  const session = await getSession();
  if (!session) {
    redirect("/login");
  }
  if (!canAccessRole(session.role, "platform")) {
    redirect("/login");
  }

  if (!canAccessPlatformView(session.role, view as PlatformView)) {
    const fallbackView = getAllowedPlatformViews(session.role)[0] ?? "overview";
    redirect(`/platform/${fallbackView}`);
  }

  const tenants = listTenants();
  const auditLogs = listAuditLogs(10);
  const navItems = getAllowedPlatformViews(session.role).map((platformView) => ({
    href: `/platform/${platformView}`,
    label: navMeta[platformView].label,
    icon: navMeta[platformView].icon,
  }));

  let content: React.ReactNode;
  switch (view as PlatformView) {
    case "overview":
      content = <PlatformOverview tenants={tenants} auditLogs={auditLogs} />;
      break;
    case "tenants":
      content = <PlatformTenants tenants={tenants} />;
      break;
    case "billing":
      content = <PlatformBilling tenants={tenants} />;
      break;
    case "support":
      content = <PlatformSupport tenants={tenants} auditLogs={auditLogs} />;
      break;
    case "monitoring":
      content = <PlatformMonitoring tenants={tenants} />;
      break;
    case "security":
      content = <PlatformSecurity auditLogs={auditLogs} />;
      break;
    case "settings":
      content = <PlatformSettings />;
      break;
    default:
      notFound();
  }

  return (
    <AppShell
      roleLabel={roleLabel(session.role)}
      navItems={navItems}
      allowLogout
    >
      {content}
    </AppShell>
  );
}
