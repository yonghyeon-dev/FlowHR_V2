import { redirect } from "next/navigation";

import { LoginClient } from "@/components/login-client";
import { getSession } from "@/lib/server/auth";

export default async function Page() {
  const session = await getSession();
  if (session) {
    if (session.role === "platform_operator") {
      redirect("/platform/console");
    }

    if (session.role === "tenant_admin" || session.role === "tenant_manager") {
      redirect("/admin/home");
    }

    redirect("/employee/home");
  }

  return <LoginClient />;
}
