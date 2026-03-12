import { redirect } from "next/navigation";

import { LoginClient } from "@/components/login-client";
import { getDefaultRouteForRole, getSession } from "@/lib/server/auth";

export default async function Page() {
  const session = await getSession();
  if (session) {
    redirect(getDefaultRouteForRole(session.role));
  }

  return <LoginClient />;
}
