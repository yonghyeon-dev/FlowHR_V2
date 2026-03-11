import type {
  DashboardPage,
  EmployeeFlowPage,
  EmployeeHomePage,
  LocalizedText,
} from "@/lib/content/types";

export type SupportedPack = "office" | "retail";
export type AdminView = "home" | "attendance" | "leave" | "workflow" | "documents" | "settings";
export type EmployeeView = "home" | "requests" | "signatures";
export type SessionRole =
  | "platform_operator"
  | "tenant_admin"
  | "tenant_manager"
  | "tenant_employee";

export type TenantStatus = "trial" | "active" | "grace";

export type AppSession = {
  role: SessionRole;
  tenantId: string;
  updatedAt: string;
};

export type TenantRecord = {
  id: string;
  name: string;
  pack: SupportedPack;
  status: TenantStatus;
  industry: string;
  seatCount: number;
  featureSelections: string[];
  createdAt: string;
  updatedAt: string;
};

export type TenantOption = Pick<TenantRecord, "id" | "name" | "pack" | "status">;

export type TenantUpdateRequest = {
  tenantId: string;
  pack: SupportedPack;
  status: TenantStatus;
};

export type TenantUpdateResponse = {
  result: "success";
  tenant: TenantRecord;
  message: string;
};

export type ApiMeta = {
  scope: string;
  generatedAt: string;
  source: "mock";
};

export type ApiResponse<T> = {
  data: T;
  meta: ApiMeta;
};

export type PlatformOverviewResponse = DashboardPage & {
  eyebrow: LocalizedText;
};

export type AdminPageResponse = DashboardPage & {
  eyebrow: LocalizedText;
  pack: SupportedPack;
  view: AdminView;
};

export type EmployeeHomeResponse = EmployeeHomePage & {
  eyebrow: LocalizedText;
  pack: SupportedPack;
  view: "home";
};

export type EmployeeFlowResponse = EmployeeFlowPage & {
  eyebrow: LocalizedText;
  pack: SupportedPack;
  view: "requests" | "signatures";
};

export type PackFeature = {
  id: string;
  title: LocalizedText;
  description: LocalizedText;
  included: boolean;
};

export type PackSetup = {
  id: SupportedPack;
  title: LocalizedText;
  summary: LocalizedText;
  primaryUse: LocalizedText;
  defaultScreens: LocalizedText[];
  featurePacks: PackFeature[];
};

export type PackSetupSelection = {
  selectedPack: SupportedPack;
  featureSelections: Record<SupportedPack, string[]>;
  savedAt?: string;
};

export type ActionActor =
  | "tenant_admin"
  | "tenant_manager"
  | "employee";

export type ActionDomain =
  | "settings"
  | "approval"
  | "request"
  | "signature";

export type ActionEvent = {
  id: string;
  domain: ActionDomain;
  actionType: ActionSimulationRequest["actionType"];
  actor: ActionActor;
  tenantId?: string;
  pack?: SupportedPack;
  message: string;
  createdAt: string;
};

export type MockStoreState = {
  selection: PackSetupSelection;
  actionEvents: ActionEvent[];
};

export type PackSetupResponse = {
  recommendedOrder: SupportedPack[];
  packs: PackSetup[];
  selection: PackSetupSelection;
};

export type PackSetupSaveRequest = {
  selectedPack: SupportedPack;
  featureSelections: Record<SupportedPack, string[]>;
  locale?: "ko" | "en";
};

export type PackSetupSaveResponse = {
  result: "success";
  message: string;
  savedAt: string;
  selection: PackSetupSelection;
};

export type ActionScenario = "success" | "validation_error" | "access_denied" | "server_error";

export type ActionSimulationRequest = {
  actionType: "request_submit" | "signature_submit" | "approval_approve" | "settings_save" | "feature_selection_save";
  scenario: ActionScenario;
  locale?: "ko" | "en";
  pack?: SupportedPack;
  actor?: ActionActor;
};

export type ActionSimulationSuccess = {
  result: "success";
  message: string;
  resourceId: string;
};

export type ActionSimulationFailure = {
  result: "error";
  code: "VALIDATION_ERROR" | "ACCESS_DENIED" | "SERVER_ERROR";
  message: string;
  fieldErrors?: Record<string, string>;
};
