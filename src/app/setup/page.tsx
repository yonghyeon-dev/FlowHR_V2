import { SetupClient } from "@/components/setup-client";
import { fetchPackSetup } from "@/lib/api/fetchers";

export default async function Page() {
  const data = await fetchPackSetup();

  return <SetupClient data={data} />;
}
