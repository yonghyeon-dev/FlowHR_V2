import { PlatformClient } from "@/components/flowhr-client";
import { fetchPlatformOverview } from "@/lib/api/fetchers";
import type { DashboardPage, LocalizedText } from "@/lib/content/types";

export default async function Page() {
  const page = await fetchPlatformOverview();

  return <PlatformClient page={page as DashboardPage & { eyebrow: LocalizedText }} />;
}
