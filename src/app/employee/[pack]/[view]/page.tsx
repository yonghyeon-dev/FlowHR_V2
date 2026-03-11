import { notFound } from "next/navigation";
import {
  EmployeeFlowClient,
  EmployeeHomeClient,
} from "@/components/flowhr-client";
import { fetchEmployeePage } from "@/lib/api/fetchers";
import { tx } from "@/lib/content/appCopy";
import type { EmployeeFlowPage, EmployeeHomePage } from "@/lib/content/types";
import type { EmployeeView, SupportedPack } from "@/lib/api/types";

const VALID_PACKS = ["office", "retail"] as const;
const VALID_VIEWS = ["home", "requests", "signatures"] as const;

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
  const page = await fetchEmployeePage(
    typedPack as SupportedPack,
    typedView as EmployeeView,
  );
  const navigation = VALID_VIEWS.map((item) => ({
    href: `/employee/${typedPack}/${item}`,
    label: tx(
      item === "home" ? "홈" : item === "requests" ? "요청 허브" : "서명 인박스",
      item === "home" ? "Home" : item === "requests" ? "Request Hub" : "Signature Inbox",
    ),
  }));
  const packTitle = typedPack === "office" ? tx("Office Pack", "Office Pack") : tx("Retail Pack", "Retail Pack");
  const tone = typedPack === "office" ? "employee-tone" : "retail-tone";

  if (typedView === "home") {
    return (
      <EmployeeHomeClient
        pack={typedPack}
        packTitle={packTitle}
        subtitle={(page as EmployeeHomePage).title}
        navigation={navigation}
        page={page as EmployeeHomePage}
        eyebrow={tx(`WI-TE-001 / ${typedPack === "office" ? "Office" : "Retail"} Pack`, `WI-TE-001 / ${typedPack === "office" ? "Office" : "Retail"} Pack`)}
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
        eyebrow={tx(`WI-TE-003 / ${typedPack === "office" ? "Office" : "Retail"} Pack`, `WI-TE-003 / ${typedPack === "office" ? "Office" : "Retail"} Pack`)}
        tone={tone}
        detailTitle={tx("Request Form", "Request Form")}
        detailMeta={tx("초안 저장부터 제출, 재제출까지 한 흐름으로 처리", "One flow from draft to submit to resubmit")}
        actionPanel={{
          title: tx("요청 제출 상태", "Request submit state"),
          description: tx(
            "요청 제출 이후 성공, 검증 실패, 권한 오류 상태가 어떻게 드러나는지 먼저 확인한다.",
            "Review how success, validation, and permission errors appear after a request submission.",
          ),
          actionType: "request_submit",
          primaryLabel: tx("요청 제출 테스트", "Test request submit"),
        }}
      />
    );
  }

  return (
    <EmployeeFlowClient
      packTitle={packTitle}
      subtitle={(page as EmployeeFlowPage).title}
      navigation={navigation}
      page={page as EmployeeFlowPage}
      eyebrow={tx(`WI-TE-004 / ${typedPack === "office" ? "Office" : "Retail"} Pack`, `WI-TE-004 / ${typedPack === "office" ? "Office" : "Retail"} Pack`)}
      tone={tone}
      detailTitle={tx("Document Viewer", "Document Viewer")}
      detailMeta={tx("문서 제목, 영향도, 동의 체크를 바로 확인", "Review title, impact, and acknowledgement in one view")}
      actionPanel={{
        title: tx("서명 처리 상태", "Signature state"),
        description: tx(
          "서명 처리 이후 성공, 검증 실패, 권한 오류 상태가 어떻게 드러나는지 먼저 확인한다.",
          "Review how success, validation, and permission errors appear after a signature action.",
        ),
        actionType: "signature_submit",
        primaryLabel: tx("서명 처리 테스트", "Test signature action"),
      }}
    />
  );
}
