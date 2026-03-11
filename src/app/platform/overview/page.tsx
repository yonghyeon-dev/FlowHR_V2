import { PlatformClient } from "@/components/flowhr-client";
import { PLATFORM_PAGE } from "@/lib/content/platformContent";
import type { DashboardPage, LocalizedText } from "@/lib/content/types";

export default function Page() {
  return <PlatformClient page={PLATFORM_PAGE as DashboardPage & { eyebrow: LocalizedText }} />;
}
