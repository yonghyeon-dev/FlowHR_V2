import { notFound, redirect } from "next/navigation";
import { AccessDeniedClient } from "@/components/access-denied-client";
import { AdminClient } from "@/components/flowhr-client";
import { fetchAdminPage } from "@/lib/api/fetchers";
import { tx } from "@/lib/content/appCopy";
import type { DashboardPage } from "@/lib/content/types";
import type { ActionActor, AdminView, SupportedPack } from "@/lib/api/types";
import {
  canAccessArea,
  getServerSession,
  getSessionTenant,
  resolvePackPath,
} from "@/lib/server/session";

const VALID_PACKS = ["office", "retail"] as const;
const VALID_VIEWS = ["home", "attendance", "leave", "workflow", "documents", "settings"] as const;

type Pack = (typeof VALID_PACKS)[number];
type View = (typeof VALID_VIEWS)[number];

type ViewActionPanel = {
  title: ReturnType<typeof tx>;
  description: ReturnType<typeof tx>;
  endpoint: string;
  primaryLabel: ReturnType<typeof tx>;
  actor?: ActionActor;
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
        "승인 실행 이후 성공, 검증 실패, 권한 오류 상태가 어떻게 드러나는지 먼저 검토합니다.",
        "Review how success, validation failures, and permission errors appear after an approval action.",
      ),
      endpoint: "/api/admin/approvals/approve",
      primaryLabel: tx("승인 처리 테스트", "Test approval action"),
      actor: "tenant_manager",
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
        "권한과 민감 범위 변경을 저장할 때 성공, 검증 실패, 권한 오류가 어떻게 보이는지 확인합니다.",
        "Preview success, validation, and permission states when saving roles and sensitive access settings.",
      ),
      endpoint: "/api/admin/settings/save",
      primaryLabel: tx("설정 저장 테스트", "Test settings save"),
      actor: "tenant_admin",
    },
  },
};

export default async function Page({
  params,
}: {
  params: Promise<{ pack: string; view: string }>;
}) {
  const session = await getServerSession();
  const { pack, view } = await params;

  if (!VALID_PACKS.includes(pack as Pack) || !VALID_VIEWS.includes(view as View)) {
    notFound();
  }

  if (!canAccessArea(session.role, "admin")) {
    return <AccessDeniedClient />;
  }

  const activeTenant = getSessionTenant(session.tenantId);
  const typedPack = pack as Pack;
  const typedView = view as View;
  const canonicalPack = activeTenant.pack as Pack;

  if (typedPack !== canonicalPack) {
    redirect(resolvePackPath("admin", canonicalPack, typedView));
  }

  const page = (await fetchAdminPage(
    canonicalPack as SupportedPack,
    typedView as AdminView,
  )) as DashboardPage;

  return (
    <AdminClient
      packTitle={canonicalPack === "office" ? tx("Office Pack", "Office Pack") : tx("Retail Pack", "Retail Pack")}
      subtitle={page.title}
      page={page}
      eyebrow={tx(
        `WI-TA-${VIEW_META[typedView].wi} / ${canonicalPack === "office" ? "Office" : "Retail"} Pack`,
        `WI-TA-${VIEW_META[typedView].wi} / ${canonicalPack === "office" ? "Office" : "Retail"} Pack`,
      )}
      tone={canonicalPack === "office" ? "office-tone" : "retail-tone"}
      pack={canonicalPack}
      navigation={VALID_VIEWS.map((item) => ({
        href: `/admin/${canonicalPack}/${item}`,
        label: VIEW_META[item].label,
      }))}
      actionPanel={VIEW_META[typedView].actionPanel}
    />
  );
}
