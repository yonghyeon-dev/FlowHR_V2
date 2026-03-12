import { notFound } from "next/navigation";

import { WireframeScreen } from "@/components/wireframe-screen";
import { employeeViews, type EmployeeView, getWireframePage } from "@/lib/wireframes";

export default async function Page({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;

  if (!employeeViews.includes(view as EmployeeView)) {
    notFound();
  }

  return <WireframeScreen screen={getWireframePage(`employee/${view}.html`, "employee")} />;
}
