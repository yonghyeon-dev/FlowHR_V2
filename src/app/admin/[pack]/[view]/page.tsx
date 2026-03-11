import { notFound } from "next/navigation";
import { AdminClient } from "@/components/flowhr-client";
import { fetchAdminPage } from "@/lib/api/fetchers";
import { tx } from "@/lib/content/appCopy";
import type { DashboardPage } from "@/lib/content/types";
import type { AdminView, SupportedPack } from "@/lib/api/types";

const VALID_PACKS = ["office", "retail"] as const;
const VALID_VIEWS = ["home", "attendance", "leave", "workflow", "documents"] as const;

type Pack = (typeof VALID_PACKS)[number];
type View = (typeof VALID_VIEWS)[number];

export default async function Page({
  params,
}: {
  params: Promise<{ pack: string; view: string }>;
}) {
  const { pack, view } = await params;

  if (!VALID_PACKS.includes(pack as Pack) || !VALID_VIEWS.includes(view as View)) {
    notFound();
  }

  const typedPack = pack as Pack;
  const typedView = view as View;
  const page = (await fetchAdminPage(
    typedPack as SupportedPack,
    typedView as AdminView,
  )) as DashboardPage;

  return (
    <AdminClient
      packTitle={typedPack === "office" ? tx("Office Pack", "Office Pack") : tx("Retail Pack", "Retail Pack")}
      subtitle={page.title}
      page={page}
      eyebrow={tx(`WI-TA-00${typedView === "home" ? "1" : typedView === "attendance" ? "3" : typedView === "leave" ? "4" : typedView === "workflow" ? "5" : "6"} / ${typedPack === "office" ? "Office" : "Retail"} Pack`, `WI-TA-00${typedView === "home" ? "1" : typedView === "attendance" ? "3" : typedView === "leave" ? "4" : typedView === "workflow" ? "5" : "6"} / ${typedPack === "office" ? "Office" : "Retail"} Pack`)}
      tone={typedPack === "office" ? "office-tone" : "retail-tone"}
      navigation={VALID_VIEWS.map((item) => ({
        href: `/admin/${typedPack}/${item}`,
        label: tx(
          item === "home"
            ? "Home"
            : item === "attendance"
              ? "Attendance"
              : item === "leave"
                ? "Leave"
                : item === "workflow"
                  ? "Workflow"
                  : "Documents",
          item === "home"
            ? "Home"
            : item === "attendance"
              ? "Attendance"
              : item === "leave"
                ? "Leave"
                : item === "workflow"
                  ? "Workflow"
                  : "Documents",
        ),
      }))}
    />
  );
}
