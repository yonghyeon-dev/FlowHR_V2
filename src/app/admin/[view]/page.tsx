import { notFound } from "next/navigation";

import { WireframeScreen } from "@/components/wireframe-screen";
import { adminViews, type AdminView, getWireframePage } from "@/lib/wireframes";

export default async function Page({
  params,
}: {
  params: Promise<{ view: string }>;
}) {
  const { view } = await params;

  if (!adminViews.includes(view as AdminView)) {
    notFound();
  }

  return <WireframeScreen screen={getWireframePage(`admin/${view}.html`, "admin")} />;
}
