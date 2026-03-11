import { existsSync, readFileSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";
import { ADMIN_PAGES } from "@/lib/content/adminContent";
import { tx } from "@/lib/content/appCopy";
import type { DashboardPage } from "@/lib/content/types";
import { EMPLOYEE_PAGES } from "@/lib/content/employeeContent";
import { PLATFORM_PAGE } from "@/lib/content/platformContent";
import type {
  AdminPageResponse,
  AdminView,
  ApiResponse,
  EmployeeFlowResponse,
  EmployeeHomeResponse,
  EmployeeView,
  PackSetupSaveRequest,
  PackSetupSaveResponse,
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

const packCatalog = {
  office: {
    required: ["core-hr", "attendance"],
  },
  retail: {
    required: ["coverage-core", "shift-response"],
  },
} satisfies Record<SupportedPack, { required: string[] }>;

const STORE_PATH = resolve(process.cwd(), ".flowhr-mock-state.json");

const defaultPackSelection: PackSetupResponse["selection"] = {
  selectedPack: "office",
  featureSelections: {
    office: [...packCatalog.office.required],
    retail: [...packCatalog.retail.required],
  },
  savedAt: now(),
};

function readPackSelection(): PackSetupResponse["selection"] {
  if (!existsSync(STORE_PATH)) {
    writeFileSync(STORE_PATH, JSON.stringify(defaultPackSelection, null, 2), "utf8");
    return defaultPackSelection;
  }

  try {
    const raw = readFileSync(STORE_PATH, "utf8");
    return JSON.parse(raw) as PackSetupResponse["selection"];
  } catch {
    writeFileSync(STORE_PATH, JSON.stringify(defaultPackSelection, null, 2), "utf8");
    return defaultPackSelection;
  }
}

function writePackSelection(selection: PackSetupResponse["selection"]) {
  writeFileSync(STORE_PATH, JSON.stringify(selection, null, 2), "utf8");
}

export function getPlatformOverview(): ApiResponse<PlatformOverviewResponse> {
  return wrap("platform.overview", PLATFORM_PAGE as PlatformOverviewResponse);
}

export function getAdminPage(
  pack: SupportedPack,
  view: AdminView,
): ApiResponse<AdminPageResponse> {
  const page = ADMIN_PAGES[pack][view] as DashboardPage;
  const currentPackSelection = readPackSelection();
  const enabledFeatures = currentPackSelection.featureSelections[pack] ?? [];
  const featureItems = page.contextSummary?.items ?? [];

  return wrap(`admin.${pack}.${view}`, {
    ...page,
    contextSummary:
      view === "settings"
        ? {
            title: tx("현재 적용된 팩 설정", "Current applied pack configuration"),
            description: tx(
              "도입 설정에서 저장한 팩과 기능 선택이 이 화면에 반영된다.",
              "The pack and feature selection saved during setup are reflected on this screen.",
            ),
            items: [
              tx(
                `선택 팩: ${currentPackSelection.selectedPack === "office" ? "Office Pack" : "Retail Pack"}`,
                `Selected pack: ${currentPackSelection.selectedPack === "office" ? "Office Pack" : "Retail Pack"}`,
              ),
              tx(
                `이 팩 활성 기능 수: ${enabledFeatures.length}`,
                `Enabled features for this pack: ${enabledFeatures.length}`,
              ),
              ...(currentPackSelection.savedAt
                ? [
                    tx(
                      `최근 저장: ${new Date(currentPackSelection.savedAt).toLocaleString("ko-KR")}`,
                      `Last saved: ${new Date(currentPackSelection.savedAt).toLocaleString("en-US")}`,
                    ),
                  ]
                : []),
              ...featureItems,
            ],
          }
        : page.contextSummary,
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
  const currentPackSelection = readPackSelection();
  return wrap("setup.packs", {
    recommendedOrder: ["office", "retail"],
    selection: currentPackSelection,
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

export function savePackSetup(
  payload: PackSetupSaveRequest,
): ApiResponse<PackSetupSaveResponse> {
  const savedAt = now();
  const nextSelection: PackSetupResponse["selection"] = {
    selectedPack: payload.selectedPack,
    featureSelections: {
      office: Array.from(
        new Set([
          ...packCatalog.office.required,
          ...(payload.featureSelections.office ?? []),
        ]),
      ),
      retail: Array.from(
        new Set([
          ...packCatalog.retail.required,
          ...(payload.featureSelections.retail ?? []),
        ]),
      ),
    },
    savedAt,
  };

  writePackSelection(nextSelection);

  return wrap("setup.packs.save", {
    result: "success",
    message:
      payload.locale === "en"
        ? "Pack selection was saved."
        : "팩 선택이 저장되었습니다.",
    savedAt,
    selection: nextSelection,
  });
}
