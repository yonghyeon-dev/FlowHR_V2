import { notFound } from "next/navigation";
import {
  EmployeeFlowClient,
  EmployeeHomeClient,
} from "@/components/flowhr-client";
import { EMPLOYEE_PAGES } from "@/lib/content/employeeContent";
import { tx } from "@/lib/content/appCopy";
import type { EmployeeFlowPage, EmployeeHomePage } from "@/lib/content/types";

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
  const pages = EMPLOYEE_PAGES[typedPack];
  const navigation = VALID_VIEWS.map((item) => ({
    href: `/employee/${typedPack}/${item}`,
    label: tx(
      item === "home" ? "Home" : item === "requests" ? "Request Hub" : "Signature Inbox",
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
        subtitle={pages.home.title}
        navigation={navigation}
        page={pages.home as EmployeeHomePage}
        eyebrow={tx(`WI-TE-001 / ${typedPack === "office" ? "Office" : "Retail"} Pack`, `WI-TE-001 / ${typedPack === "office" ? "Office" : "Retail"} Pack`)}
        tone={tone}
      />
    );
  }

  if (typedView === "requests") {
    return (
      <EmployeeFlowClient
        packTitle={packTitle}
        subtitle={pages.requests.title}
        navigation={navigation}
        page={pages.requests as EmployeeFlowPage}
        eyebrow={tx(`WI-TE-003 / ${typedPack === "office" ? "Office" : "Retail"} Pack`, `WI-TE-003 / ${typedPack === "office" ? "Office" : "Retail"} Pack`)}
        tone={tone}
        detailTitle={tx("Request Form", "Request Form")}
        detailMeta={tx("초안 저장부터 제출, 재제출까지 한 흐름으로 처리", "One flow from draft to submit to resubmit")}
      />
    );
  }

  return (
    <EmployeeFlowClient
      packTitle={packTitle}
      subtitle={pages.signatures.title}
      navigation={navigation}
      page={{
        title: pages.signatures.title,
        description: pages.signatures.description,
        quickActions: pages.signatures.priority,
        hints: pages.signatures.alerts,
        history: pages.signatures.detail,
      } as EmployeeFlowPage}
      eyebrow={tx(`WI-TE-004 / ${typedPack === "office" ? "Office" : "Retail"} Pack`, `WI-TE-004 / ${typedPack === "office" ? "Office" : "Retail"} Pack`)}
      tone={tone}
      detailTitle={tx("Document Viewer", "Document Viewer")}
      detailMeta={tx("문서 제목, 영향도, 동의 체크를 바로 확인", "Review title, impact, and acknowledgement in one view")}
    />
  );
}
