import { AccessDeniedClient } from "@/components/access-denied-client";
import { SetupClient } from "@/components/setup-client";
import { fetchPackSetup } from "@/lib/api/fetchers";
import { canAccessArea, getServerSession } from "@/lib/server/session";

export default async function Page() {
  const session = await getServerSession();

  if (!canAccessArea(session.role, "setup")) {
    return <AccessDeniedClient />;
  }

  const data = await fetchPackSetup();

  return <SetupClient data={data} />;
}
