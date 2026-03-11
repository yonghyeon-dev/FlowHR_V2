import { ADMIN_PAGES } from "@/lib/content/adminContent";
import { tx } from "@/lib/content/appCopy";
import type { DashboardPage } from "@/lib/content/types";
import { EMPLOYEE_PAGES } from "@/lib/content/employeeContent";
import { PLATFORM_PAGE } from "@/lib/content/platformContent";
import {
  appendActionEvent,
  getPackSelection,
  getTenantById,
  listApprovalRecords,
  listActionEvents,
  listRequestRecords,
  listSettingsSnapshots,
  listSignatureRecords,
  listTenants,
  savePackSelection,
} from "@/lib/server/store";
import type {
  ActionActor,
  ActionDomain,
  ActionEvent,
  ActionSimulationRequest,
  ActionSimulationSuccess,
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

const defaultPackSelection: PackSetupResponse["selection"] = {
  selectedPack: "office",
  featureSelections: {
    office: [...packCatalog.office.required],
    retail: [...packCatalog.retail.required],
  },
  savedAt: now(),
};

function getRelevantEvents(
  domain: ActionDomain,
  pack: SupportedPack | undefined,
  tenantId?: string,
): ActionEvent[] {
  return listActionEvents(domain, pack, 3, defaultPackSelection, tenantId);
}

function formatEventLine(event: ActionEvent): ReturnType<typeof tx> {
  const actorMap = {
    tenant_admin: tx("관리자", "Admin"),
    tenant_manager: tx("매니저", "Manager"),
    employee: tx("직원", "Employee"),
  } satisfies Record<ActionActor, ReturnType<typeof tx>>;

  return tx(
    `${actorMap[event.actor].ko} / ${event.message} / ${new Date(event.createdAt).toLocaleString("ko-KR")}`,
    `${actorMap[event.actor].en} / ${event.message} / ${new Date(event.createdAt).toLocaleString("en-US")}`,
  );
}

function statusLabel(status: "trial" | "active" | "grace") {
  switch (status) {
    case "trial":
      return tx("체험", "Trial");
    case "active":
      return tx("활성", "Active");
    case "grace":
      return tx("유예", "Grace");
  }
}

export function recordActionEvent(
  tenantId: string,
  domain: ActionDomain,
  payload: Pick<ActionSimulationRequest, "actionType" | "locale" | "pack" | "actor">,
  success: ActionSimulationSuccess,
) {
  const nextEvent: ActionEvent = {
    id: success.resourceId,
    domain,
    actionType: payload.actionType,
    actor: payload.actor ?? "tenant_admin",
    pack: payload.pack,
    tenantId,
    message: success.message,
    createdAt: now(),
  };

  appendActionEvent(nextEvent, defaultPackSelection, tenantId);
}

export function getPlatformOverview(): ApiResponse<PlatformOverviewResponse> {
  const tenants = listTenants(defaultPackSelection);
  const activeCount = tenants.filter((tenant) => tenant.status === "active").length;
  const graceCount = tenants.filter((tenant) => tenant.status === "grace").length;
  const trialCount = tenants.filter((tenant) => tenant.status === "trial").length;
  const officeCount = tenants.filter((tenant) => tenant.pack === "office").length;
  const retailCount = tenants.filter((tenant) => tenant.pack === "retail").length;

  return wrap("platform.overview", {
    ...PLATFORM_PAGE,
    kpis: [
      { value: String(tenants.length), label: tx("전체 고객사", "Total tenants") },
      { value: String(activeCount), label: tx("활성 고객사", "Active tenants") },
      { value: String(graceCount), label: tx("유예 상태", "Grace accounts") },
      { value: String(trialCount), label: tx("체험 중", "Trials") },
    ],
    columns: [
      {
        title: tx("Operations Queue", "Operations Queue"),
        eyebrow: tx("즉시 확인", "Needs action"),
        tone: "primary",
        items: tenants
          .filter((tenant) => tenant.status !== "active")
          .map((tenant) => ({
            title: tx(
              `${tenant.name} / ${statusLabel(tenant.status).ko}`,
              `${tenant.name} / ${statusLabel(tenant.status).en}`,
            ),
            meta:
              tenant.pack === "office"
                ? tx("갱신과 승인 흐름 점검", "Review renewal and approval flow")
                : tx("커버리지와 결제 리스크 점검", "Review coverage and billing risk"),
            tone: tenant.status === "grace" ? "critical" : "watch",
          })),
      },
      {
        title: tx("Tenant Portfolio", "Tenant Portfolio"),
        eyebrow: tx("고객사 구성", "Tenant mix"),
        items: [
          {
            title: tx(`오피스형 고객사 ${officeCount}`, `Office tenants ${officeCount}`),
            meta: tx("문서, 승인, 유연근무 중심", "Document, approval, and flexible-work heavy"),
            tone: "healthy",
          },
          {
            title: tx(`리테일형 고객사 ${retailCount}`, `Retail tenants ${retailCount}`),
            meta: tx("커버리지, 브레이크, 시프트 응답 중심", "Coverage, breaks, and shift-response heavy"),
            tone: "watch",
          },
        ],
      },
      {
        title: tx("Recent Tenant Changes", "Recent Tenant Changes"),
        eyebrow: tx("최근 변경", "Recent updates"),
        items: [...tenants]
          .sort((left, right) => right.updatedAt.localeCompare(left.updatedAt))
          .slice(0, 3)
          .map((tenant) => ({
            title: tx(
              `${tenant.name} / ${tenant.pack === "office" ? "Office Pack" : "Retail Pack"}`,
              `${tenant.name} / ${tenant.pack === "office" ? "Office Pack" : "Retail Pack"}`,
            ),
            meta: tx(
              `좌석 ${tenant.seatCount} / ${new Date(tenant.updatedAt).toLocaleString("ko-KR")}`,
              `${tenant.seatCount} seats / ${new Date(tenant.updatedAt).toLocaleString("en-US")}`,
            ),
          })),
      },
      {
        title: tx("Security Signals", "Security Signals"),
        eyebrow: tx("운영 기준", "Operator scope"),
        items: [
          { title: tx("민감 권한 변경 2건", "2 sensitive permission changes"), meta: tx("감사 검토 필요", "Audit review needed"), tone: "critical" },
          { title: tx("비정상 로그인 시도 4건", "4 suspicious login attempts"), meta: tx("IP와 영향 테넌트 확인", "Review IPs and impacted tenants"), tone: "watch" },
          { title: tx("지연 SLA 1건", "1 delayed support SLA"), meta: tx("오늘 처리", "Handle today"), tone: "critical" },
        ],
      },
    ],
  } as PlatformOverviewResponse);
}

export function getAdminPage(
  tenantId: string,
  pack: SupportedPack,
  view: AdminView,
): ApiResponse<AdminPageResponse> {
  const page = ADMIN_PAGES[pack][view] as DashboardPage;
  const tenant = getTenantById(tenantId, defaultPackSelection);
  const currentPackSelection = getPackSelection(defaultPackSelection, tenant.id);
  const enabledFeatures = currentPackSelection.featureSelections[pack] ?? [];
  const featureItems = page.contextSummary?.items ?? [];
  const settingsEvents = getRelevantEvents("settings", pack, tenant.id);
  const approvalEvents = getRelevantEvents("approval", pack, tenant.id);
  const settingsRecords = listSettingsSnapshots(tenant.id, pack, 3);
  const approvalRecords = listApprovalRecords(tenant.id, pack, 3);

  return wrap(`admin.${tenant.id}.${pack}.${view}`, {
    ...page,
    contextSummary:
      view === "settings"
        ? {
            title: tx("현재 적용된 팩 설정", "Current applied pack configuration"),
            description: tx(
              "선택된 tenant에 저장된 팩과 기능 구성이 이 화면에 그대로 반영됩니다.",
              "The saved pack and feature selection for the active tenant is reflected on this screen.",
            ),
            items: [
              tx(`고객사: ${tenant.name}`, `Tenant: ${tenant.name}`),
              tx(
                `선택 팩: ${currentPackSelection.selectedPack === "office" ? "Office Pack" : "Retail Pack"}`,
                `Selected pack: ${currentPackSelection.selectedPack === "office" ? "Office Pack" : "Retail Pack"}`,
              ),
              tx(`이 팩 활성 기능 수: ${enabledFeatures.length}`, `Enabled features for this pack: ${enabledFeatures.length}`),
              tx(`좌석 수: ${tenant.seatCount}`, `Seats: ${tenant.seatCount}`),
              ...(currentPackSelection.savedAt
                ? [
                    tx(
                      `최근 저장: ${new Date(currentPackSelection.savedAt).toLocaleString("ko-KR")}`,
                      `Last saved: ${new Date(currentPackSelection.savedAt).toLocaleString("en-US")}`,
                    ),
                  ]
                : []),
              ...settingsRecords.map((record) =>
                tx(
                  `${record.title} / ${new Date(record.createdAt).toLocaleString("ko-KR")}`,
                  `${record.title} / ${new Date(record.createdAt).toLocaleString("en-US")}`,
                ),
              ),
              ...settingsEvents.map(formatEventLine),
              ...featureItems,
            ],
          }
        : view === "workflow" && (approvalEvents.length || approvalRecords.length)
          ? {
              title: tx("최근 승인 실행 기록", "Recent approval activity"),
              description: tx(
                "현재 tenant에서 실행한 승인 액션의 최근 기록을 보여줍니다.",
                "Recent approval actions executed for the current tenant are shown here.",
              ),
              items: [
                ...approvalRecords.map((record) =>
                  tx(
                    `${record.title} / ${new Date(record.createdAt).toLocaleString("ko-KR")}`,
                    `${record.title} / ${new Date(record.createdAt).toLocaleString("en-US")}`,
                  ),
                ),
                ...approvalEvents.map(formatEventLine),
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
  tenantId: string,
  pack: SupportedPack,
  view: EmployeeView,
): ApiResponse<EmployeeHomeResponse | EmployeeFlowResponse> {
  if (view === "home") {
    return wrap(`employee.${tenantId}.${pack}.home`, {
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
  const recentEvents = getRelevantEvents(view === "requests" ? "request" : "signature", pack, tenantId);
  const requestRecords = view === "requests" ? listRequestRecords(tenantId, pack, 3) : [];
  const signatureRecords = view === "signatures" ? listSignatureRecords(tenantId, pack, 3) : [];
  const recentHistory = recentEvents.map(formatEventLine);

  return wrap(`employee.${tenantId}.${pack}.${view}`, {
    ...detailView,
    history: [
      ...(view === "requests"
        ? requestRecords.map((record) =>
            tx(
              `${record.title} / ${new Date(record.createdAt).toLocaleString("ko-KR")}`,
              `${record.title} / ${new Date(record.createdAt).toLocaleString("en-US")}`,
            ),
          )
        : signatureRecords.map((record) =>
            tx(
              `${record.title} / ${new Date(record.createdAt).toLocaleString("ko-KR")}`,
              `${record.title} / ${new Date(record.createdAt).toLocaleString("en-US")}`,
            ),
          )),
      ...recentHistory,
      ...detailView.history,
    ].slice(0, 6),
    eyebrow: tx(
      `WI-TE-00${view === "requests" ? "3" : "4"} / ${pack === "office" ? "Office" : "Retail"} Pack`,
      `WI-TE-00${view === "requests" ? "3" : "4"} / ${pack === "office" ? "Office" : "Retail"} Pack`,
    ),
    pack,
    view,
  } as EmployeeFlowResponse);
}

export function getPackSetup(tenantId: string): ApiResponse<PackSetupResponse> {
  const tenant = getTenantById(tenantId, defaultPackSelection);
  const currentPackSelection = getPackSelection(defaultPackSelection, tenant.id);

  return wrap("setup.packs", {
    recommendedOrder: ["office", "retail"],
    selection: currentPackSelection,
    packs: [
      {
        id: "office",
        title: tx("Office Pack", "Office Pack"),
        summary: tx(
          "승인, 문서, 유연근무 예외, 팀 일정 충돌을 중심으로 운영하는 오피스형 조직용 팩입니다.",
          "A pack for office organizations driven by approvals, documents, flexible-work exceptions, and team schedule conflicts.",
        ),
        primaryUse: tx(
          "스타트업, 본사 조직, 전문 서비스, 지식 노동 조직",
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
          "결원, 커버리지, 브레이크, 초과근무, 시프트 응답을 중심으로 운영하는 매장형 조직용 팩입니다.",
          "A pack for store operations driven by gaps, coverage, breaks, overtime, and shift responses.",
        ),
        primaryUse: tx(
          "리테일, 외식, 프랜차이즈, 다점포 운영 조직",
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
            description: tx("시프트 변경 응답, 스왑, 체크인 예외", "Shift responses, swaps, and check-in exceptions"),
            included: true,
          },
          {
            id: "advanced-rules",
            title: tx("고급 규칙", "Advanced Rules"),
            description: tx("브레이크·수당 자동 규칙과 연속근무 제어", "Automated break and allowance rules come later"),
            included: false,
          },
        ],
      },
    ],
  });
}

export function savePackSetup(
  tenantId: string,
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

  savePackSelection(nextSelection, tenantId);

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
