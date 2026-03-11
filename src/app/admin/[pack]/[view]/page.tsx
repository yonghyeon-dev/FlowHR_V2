import { notFound } from "next/navigation";
import { AdminClient } from "@/components/flowhr-client";
import { fetchAdminPage } from "@/lib/api/fetchers";
import { tx } from "@/lib/content/appCopy";
import type { DashboardPage } from "@/lib/content/types";
import type { AdminView, SupportedPack } from "@/lib/api/types";

const VALID_PACKS = ["office", "retail"] as const;
const VALID_VIEWS = ["home", "attendance", "leave", "workflow", "documents", "settings"] as const;

type Pack = (typeof VALID_PACKS)[number];
type View = (typeof VALID_VIEWS)[number];

type ViewActionPanel = {
  title: ReturnType<typeof tx>;
  description: ReturnType<typeof tx>;
  endpoint: string;
  primaryLabel: ReturnType<typeof tx>;
};

type ViewMeta = {
  wi: string;
  label: ReturnType<typeof tx>;
  actionPanel?: ViewActionPanel;
};

const VIEW_META: Record<View, ViewMeta> = {
  home: {
    wi: "001",
    label: tx("홈", "Home"),
  },
  attendance: {
    wi: "003",
    label: tx("근태", "Attendance"),
  },
  leave: {
    wi: "004",
    label: tx("휴가", "Leave"),
  },
  workflow: {
    wi: "005",
    label: tx("워크플로", "Workflow"),
    actionPanel: {
      title: tx("승인 실행 상태", "Approval execution state"),
      description: tx(
        "승인 실행 이후 성공, 검증 실패, 권한 오류 상태가 어떻게 드러나는지 먼저 검토한다.",
        "Review how success, validation failures, and permission errors appear after an approval action.",
      ),
      endpoint: "/api/admin/approvals/approve",
      primaryLabel: tx("승인 처리 테스트", "Test approval action"),
    },
  },
  documents: {
    wi: "006",
    label: tx("문서", "Documents"),
  },
  settings: {
    wi: "007",
    label: tx("설정", "Settings"),
    actionPanel: {
      title: tx("설정 저장 상태", "Settings save state"),
      description: tx(
        "권한과 민감 범위 변경을 저장할 때 발생할 수 있는 성공, 검증 실패, 권한 오류를 미리 본다.",
        "Preview success, validation, and permission states when saving roles and sensitive access settings.",
      ),
      endpoint: "/api/admin/settings/save",
      primaryLabel: tx("설정 저장 테스트", "Test settings save"),
    },
  },
};

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
      eyebrow={tx(
        `WI-TA-${VIEW_META[typedView].wi} / ${typedPack === "office" ? "Office" : "Retail"} Pack`,
        `WI-TA-${VIEW_META[typedView].wi} / ${typedPack === "office" ? "Office" : "Retail"} Pack`,
      )}
      tone={typedPack === "office" ? "office-tone" : "retail-tone"}
      navigation={VALID_VIEWS.map((item) => ({
        href: `/admin/${typedPack}/${item}`,
        label: VIEW_META[item].label,
      }))}
      actionPanel={VIEW_META[typedView].actionPanel}
    />
  );
}
