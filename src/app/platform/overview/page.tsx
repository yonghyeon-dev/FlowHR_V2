import { AccessDeniedClient } from "@/components/access-denied-client";
import { PlatformClient } from "@/components/flowhr-client";
import { fetchPlatformOverview } from "@/lib/api/fetchers";
import type { DashboardPage, LocalizedText } from "@/lib/content/types";
import { canAccessArea, getServerSession } from "@/lib/server/session";

export default async function Page() {
  const session = await getServerSession();

  if (!canAccessArea(session.role, "platform")) {
    return <AccessDeniedClient />;
  }

  const page = await fetchPlatformOverview();

  return <PlatformClient page={page as DashboardPage & { eyebrow: LocalizedText }} />;
}
