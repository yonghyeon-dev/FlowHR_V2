import { notFound, redirect } from "next/navigation";
import { AccessDeniedClient } from "@/components/access-denied-client";
import {
  EmployeeFlowClient,
  EmployeeHomeClient,
} from "@/components/flowhr-client";
import { fetchEmployeePage } from "@/lib/api/fetchers";
import { tx } from "@/lib/content/appCopy";
import type { EmployeeFlowPage, EmployeeHomePage } from "@/lib/content/types";
import type { EmployeeView, SupportedPack } from "@/lib/api/types";
import {
  canAccessArea,
  getServerSession,
  getSessionTenant,
  resolvePackPath,
} from "@/lib/server/session";

const VALID_PACKS = ["office", "retail"] as const;
const VALID_VIEWS = ["home", "requests", "signatures"] as const;

type Pack = (typeof VALID_PACKS)[number];
type View = (typeof VALID_VIEWS)[number];

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

  if (!canAccessArea(session.role, "employee")) {
    return <AccessDeniedClient />;
  }

  const typedPack = pack as Pack;
  const typedView = view as View;
  const activeTenant = getSessionTenant(session.tenantId);
  const canonicalPack = activeTenant.pack as Pack;

  if (typedPack !== canonicalPack) {
    redirect(resolvePackPath("employee", canonicalPack, typedView));
  }

  const page = await fetchEmployeePage(
    canonicalPack as SupportedPack,
    typedView as EmployeeView,
  );
  const navigation = VALID_VIEWS.map((item) => ({
    href: `/employee/${canonicalPack}/${item}`,
    label: tx(
      item === "home" ? "홈" : item === "requests" ? "요청 허브" : "서명 인박스",
      item === "home" ? "Home" : item === "requests" ? "Request Hub" : "Signature Inbox",
    ),
  }));
  const packTitle =
    canonicalPack === "office" ? tx("Office Pack", "Office Pack") : tx("Retail Pack", "Retail Pack");
  const tone = canonicalPack === "office" ? "employee-tone" : "retail-tone";

  if (typedView === "home") {
    return (
      <EmployeeHomeClient
        pack={canonicalPack}
        packTitle={packTitle}
        subtitle={(page as EmployeeHomePage).title}
        navigation={navigation}
        page={page as EmployeeHomePage}
        eyebrow={tx(
          `WI-TE-001 / ${canonicalPack === "office" ? "Office" : "Retail"} Pack`,
          `WI-TE-001 / ${canonicalPack === "office" ? "Office" : "Retail"} Pack`,
        )}
        tone={tone}
      />
    );
  }

  if (typedView === "requests") {
    return (
      <EmployeeFlowClient
        packTitle={packTitle}
        subtitle={(page as EmployeeFlowPage).title}
        navigation={navigation}
        page={page as EmployeeFlowPage}
        eyebrow={tx(
          `WI-TE-003 / ${canonicalPack === "office" ? "Office" : "Retail"} Pack`,
          `WI-TE-003 / ${canonicalPack === "office" ? "Office" : "Retail"} Pack`,
        )}
        tone={tone}
        detailTitle={tx("Request Form", "Request Form")}
        detailMeta={tx(
          "초안 작성부터 제출과 재제출까지 한 흐름으로 처리",
          "One flow from draft to submit to resubmit",
        )}
        actionPanel={{
          title: tx("요청 제출 상태", "Request submit state"),
          description: tx(
            "요청 제출 이후 성공, 검증 실패, 권한 오류 상태가 어떻게 드러나는지 먼저 확인합니다.",
            "Review how success, validation, and permission errors appear after a request submission.",
          ),
          endpoint: "/api/employee/requests/submit",
          primaryLabel: tx("요청 제출 테스트", "Test request submit"),
          actor: "employee",
        }}
        pack={canonicalPack}
      />
    );
  }

  return (
    <EmployeeFlowClient
      packTitle={packTitle}
      subtitle={(page as EmployeeFlowPage).title}
      navigation={navigation}
      page={page as EmployeeFlowPage}
      eyebrow={tx(
        `WI-TE-004 / ${canonicalPack === "office" ? "Office" : "Retail"} Pack`,
        `WI-TE-004 / ${canonicalPack === "office" ? "Office" : "Retail"} Pack`,
      )}
      tone={tone}
      detailTitle={tx("Document Viewer", "Document Viewer")}
      detailMeta={tx(
        "문서 제목, 영향도, 동의 체크를 한 화면에서 확인",
        "Review title, impact, and acknowledgement in one view",
      )}
      actionPanel={{
        title: tx("서명 처리 상태", "Signature state"),
        description: tx(
          "서명 처리 이후 성공, 검증 실패, 권한 오류 상태가 어떻게 드러나는지 먼저 확인합니다.",
          "Review how success, validation, and permission errors appear after a signature action.",
        ),
        endpoint: "/api/employee/signatures/submit",
        primaryLabel: tx("서명 처리 테스트", "Test signature action"),
        actor: "employee",
      }}
      pack={canonicalPack}
    />
  );
}
