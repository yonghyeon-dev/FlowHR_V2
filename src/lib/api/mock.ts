import { ADMIN_PAGES } from "@/lib/content/adminContent";
import { tx } from "@/lib/content/appCopy";
import { EMPLOYEE_PAGES } from "@/lib/content/employeeContent";
import { PLATFORM_PAGE } from "@/lib/content/platformContent";
import type {
  AdminPageResponse,
  AdminView,
  ApiResponse,
  EmployeeFlowResponse,
  EmployeeHomeResponse,
  EmployeeView,
  PackSetupResponse,
  PlatformOverviewResponse,
  SupportedPack,
} from "@/lib/api/types";

const now = () => new Date().toISOString();

function wrap<T>(scope: string, data: T): ApiResponse<T> {
  return {
    data,
    meta: {
      scope,
      generatedAt: now(),
      source: "mock",
    },
  };
}

const adminEyebrowMap: Record<AdminView, string> = {
  home: "001",
  attendance: "003",
  leave: "004",
  workflow: "005",
  documents: "006",
  settings: "007",
};

export function getPlatformOverview(): ApiResponse<PlatformOverviewResponse> {
  return wrap("platform.overview", PLATFORM_PAGE as PlatformOverviewResponse);
}

export function getAdminPage(
  pack: SupportedPack,
  view: AdminView,
): ApiResponse<AdminPageResponse> {
  return wrap(`admin.${pack}.${view}`, {
    ...ADMIN_PAGES[pack][view],
    eyebrow: tx(
      `WI-TA-${adminEyebrowMap[view]} / ${pack === "office" ? "Office" : "Retail"} Pack`,
      `WI-TA-${adminEyebrowMap[view]} / ${pack === "office" ? "Office" : "Retail"} Pack`,
    ),
    pack,
    view,
  } as AdminPageResponse);
}

export function getEmployeePage(
  pack: SupportedPack,
  view: EmployeeView,
): ApiResponse<EmployeeHomeResponse | EmployeeFlowResponse> {
  if (view === "home") {
    return wrap(`employee.${pack}.home`, {
      ...EMPLOYEE_PAGES[pack].home,
      eyebrow: tx(
        `WI-TE-001 / ${pack === "office" ? "Office" : "Retail"} Pack`,
        `WI-TE-001 / ${pack === "office" ? "Office" : "Retail"} Pack`,
      ),
      pack,
      view,
    } as EmployeeHomeResponse);
  }

  const detailView = view === "requests"
    ? EMPLOYEE_PAGES[pack].requests
    : {
        title: EMPLOYEE_PAGES[pack].signatures.title,
        description: EMPLOYEE_PAGES[pack].signatures.description,
        quickActions: EMPLOYEE_PAGES[pack].signatures.priority,
        hints: EMPLOYEE_PAGES[pack].signatures.alerts,
        history: EMPLOYEE_PAGES[pack].signatures.detail,
      };

  return wrap(`employee.${pack}.${view}`, {
    ...detailView,
    eyebrow: tx(
      `WI-TE-00${view === "requests" ? "3" : "4"} / ${pack === "office" ? "Office" : "Retail"} Pack`,
      `WI-TE-00${view === "requests" ? "3" : "4"} / ${pack === "office" ? "Office" : "Retail"} Pack`,
    ),
    pack,
    view,
  } as EmployeeFlowResponse);
}

export function getPackSetup(): ApiResponse<PackSetupResponse> {
  return wrap("setup.packs", {
    recommendedOrder: ["office", "retail"],
    packs: [
      {
        id: "office",
        title: tx("Office Pack", "Office Pack"),
        summary: tx(
          "승인, 문서, 유연근무 예외, 팀 일정 충돌이 핵심인 사무직 조직용 팩",
          "A pack for office organizations driven by approvals, documents, flexible-work exceptions, and team schedule conflicts.",
        ),
        primaryUse: tx(
          "스타트업, 본사 조직, 전문서비스, 지식근로 팀",
          "Startups, HQ teams, professional services, and knowledge-work organizations",
        ),
        defaultScreens: [
          tx("관리자 홈", "Admin Home"),
          tx("근태", "Attendance"),
          tx("휴가", "Leave"),
          tx("워크플로", "Workflow"),
          tx("문서", "Documents"),
        ],
        featurePacks: [
          {
            id: "core-hr",
            title: tx("Core HR", "Core HR"),
            description: tx("조직, 구성원, 문서, 승인, 감사 로그", "Org, people, documents, approvals, and audit logs"),
            included: true,
          },
          {
            id: "attendance",
            title: tx("근태", "Attendance"),
            description: tx("정정 요청, 원격근무 예외, 마감 감시", "Corrections, remote-work exceptions, and close monitoring"),
            included: true,
          },
          {
            id: "performance",
            title: tx("성과", "Performance"),
            description: tx("평가와 성장 관리로 확장", "Expand into reviews and growth"),
            included: false,
          },
        ],
      },
      {
        id: "retail",
        title: tx("Retail Pack", "Retail Pack"),
        summary: tx(
          "결원, 커버리지, 브레이크, 오버타임, 시프트 응답이 핵심인 매장형 조직용 팩",
          "A pack for store operations driven by gaps, coverage, breaks, overtime, and shift responses.",
        ),
        primaryUse: tx(
          "리테일, 외식, 프랜차이즈, 다지점 운영 조직",
          "Retail, food service, franchises, and multi-location operations",
        ),
        defaultScreens: [
          tx("관리자 홈", "Admin Home"),
          tx("근태", "Attendance"),
          tx("휴가", "Leave"),
          tx("워크플로", "Workflow"),
          tx("문서", "Documents"),
        ],
        featurePacks: [
          {
            id: "coverage-core",
            title: tx("Coverage Core", "Coverage Core"),
            description: tx("매장 커버리지, 결원, 피크타임 감시", "Store coverage, gaps, and peak-slot monitoring"),
            included: true,
          },
          {
            id: "shift-response",
            title: tx("Shift Response", "Shift Response"),
            description: tx("시프트 변경 응답, 대체 근무, 체크인 예외", "Shift responses, swaps, and check-in exceptions"),
            included: true,
          },
          {
            id: "advanced-rules",
            title: tx("고급 규정", "Advanced Rules"),
            description: tx("브레이크/수당 자동 규칙은 후속 단계", "Automated break and allowance rules come later"),
            included: false,
          },
        ],
      },
    ],
  });
}
